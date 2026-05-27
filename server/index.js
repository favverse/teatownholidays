const express = require('express');
const path    = require('path');
const cors    = require('cors');
const https   = require('https');

const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/* ─────────────────────────────────────────────────────────────────────────
   AIRBNB ROOM ID  (extracted from your listing URL)
───────────────────────────────────────────────────────────────────────── */
const ROOM_ID = '1605539872474002137';

/* ─────────────────────────────────────────────────────────────────────────
   Simple in-memory cache so we don't hammer Airbnb on every page load
   TTL: 30 minutes
───────────────────────────────────────────────────────────────────────── */
let priceCache = { price: null, currency: 'INR', symbol: '₹', fetchedAt: 0 };
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 min

/**
 * Fetch the current nightly price from Airbnb's internal pricing API.
 * Airbnb exposes a public (no-auth) GraphQL / REST endpoint used by
 * their own search pages. We call the "pdp_listing_details" endpoint
 * which returns structured JSON including the price_string.
 *
 * If that fails (Airbnb changes their API) we fall back to the
 * configured default so the site never breaks.
 */
async function fetchAirbnbPrice() {
  return new Promise((resolve) => {
    // Airbnb's v3 listing details API – publicly accessible, no key needed
    const url =
      `https://www.airbnb.co.in/api/v3/PdpAvailabilityCalendar` +
      `?operationName=PdpAvailabilityCalendar` +
      `&locale=en-IN&currency=INR`;

    // We use the cheaper v2 listing price API instead:
    const pricingUrl =
      `https://www.airbnb.co.in/api/v2/pdp_listing_details/${ROOM_ID}` +
      `?_format=for_native&_intents=p3_details_web_nga&currency=INR&locale=en-IN`;

    const options = {
      hostname: 'www.airbnb.co.in',
      path:
        `/api/v2/pdp_listing_details/${ROOM_ID}` +
        `?_format=for_native&_intents=p3_details_web_nga&currency=INR&locale=en-IN`,
      method: 'GET',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ' +
          'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
        'Accept': 'application/json',
        'X-Airbnb-API-Key': 'd306zoyjsyarp7ifhu67rjxn52tv0t20', // Airbnb's public web key
        'Referer': `https://www.airbnb.co.in/rooms/${ROOM_ID}`,
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          // Navigate to price – structure varies; try multiple paths
          const listing = json?.pdp_listing_detail;
          const priceStr =
            listing?.structuredContent?.primaryLine?.[0]?.price ||   // "₹3,139"
            listing?.price_interface?.price ||
            listing?.p3_display_price ||
            null;

          if (priceStr) {
            // Extract numeric value, e.g. "₹3,139" → 3139
            const numeric = parseInt(priceStr.replace(/[^\d]/g, ''), 10);
            resolve({ price: numeric, priceString: priceStr, source: 'live' });
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    });

    req.on('error', () => resolve(null));
    req.setTimeout(8000, () => { req.destroy(); resolve(null); });
    req.end();
  });
}

/* ─────────────────────────────────────────────────────────────────────────
   GET /api/price
   Returns: { price, priceString, currency, symbol, perNight, source }
   source = "live" | "cached" | "default"
───────────────────────────────────────────────────────────────────────── */
app.get('/api/price', async (req, res) => {
  const now = Date.now();

  // Serve from cache if fresh
  if (priceCache.price && now - priceCache.fetchedAt < CACHE_TTL_MS) {
    return res.json({ ...priceCache, source: 'cached' });
  }

  // Try live fetch
  const live = await fetchAirbnbPrice();

  if (live && live.price) {
    priceCache = {
      price:       live.price,
      priceString: live.priceString,
      currency:    'INR',
      symbol:      '₹',
      perNight:    true,
      fetchedAt:   now,
      source:      'live',
    };
    return res.json(priceCache);
  }

  // Fallback — return last cached value (even if stale) or hard-coded default
  res.json({
    price:       priceCache.price || 3139,
    priceString: priceCache.priceString || '₹3,139',
    currency:    'INR',
    symbol:      '₹',
    perNight:    true,
    fetchedAt:   priceCache.fetchedAt || 0,
    source:      'default',
  });
});

/* ─────────────────────────────────────────────────────────────────────────
   Other existing endpoints
───────────────────────────────────────────────────────────────────────── */
app.get('/api/health', (_req, res) =>
  res.json({ status: 'ok', property: 'Tea Town Holidays', location: 'Meppadi, Wayanad' })
);

app.get('/api/property', (_req, res) =>
  res.json({
    name: 'Tea Town Holidays',
    location: 'Meppadi, Wayanad, Kerala',
    bedrooms: 2,
    bathrooms: 2,
    airbnbUrl: `https://www.airbnb.co.in/rooms/${ROOM_ID}`,
    amenities: ['Mountain View', 'Free Parking', 'Smoking Allowed', 'Security Cameras'],
  })
);

app.post('/api/enquiry', (req, res) => {
  const { name, email, message, dates } = req.body;
  if (!name || !email)
    return res.status(400).json({ error: 'Name and email are required.' });
  console.log('Enquiry received:', { name, email, message, dates });
  res.json({ success: true, message: 'Thank you for your enquiry. We will be in touch shortly.' });
});

/* ─────────────────────────────────────────────────────────────────────────
   Serve React build in production
───────────────────────────────────────────────────────────────────────── */
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
  app.get('*', (_req, res) =>
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
  );
}

app.listen(PORT, () => {
  console.log(`\n🍃 Tea Town Holidays server  →  http://localhost:${PORT}`);
  console.log(`   Price API  →  http://localhost:${PORT}/api/price\n`);
});

module.exports = app;
