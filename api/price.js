const https = require('https');

const ROOM_ID = '1605539872474002137';

// Module-level cache persists across warm invocations of the same serverless instance
let priceCache = { price: null, priceString: null, fetchedAt: 0 };
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 min

function fetchAirbnbPrice() {
  return new Promise((resolve) => {
    const options = {
      hostname: 'www.airbnb.co.in',
      path:
        `/api/v2/pdp_listing_details/${ROOM_ID}` +
        `?_format=for_native&_intents=p3_details_web_nga&currency=INR&locale=en-IN`,
      method: 'GET',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124.0 Safari/537.36',
        Accept: 'application/json',
        'X-Airbnb-API-Key': 'd306zoyjsyarp7ifhu67rjxn52tv0t20',
        Referer: `https://www.airbnb.co.in/rooms/${ROOM_ID}`,
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const listing = json?.pdp_listing_detail;
          const priceStr =
            listing?.structuredContent?.primaryLine?.[0]?.price ||
            listing?.price_interface?.price ||
            listing?.p3_display_price ||
            null;
          if (priceStr) {
            const numeric = parseInt(priceStr.replace(/[^\d]/g, ''), 10);
            resolve({ price: numeric, priceString: priceStr });
          } else {
            resolve(null);
          }
        } catch {
          resolve(null);
        }
      });
    });

    req.on('error', () => resolve(null));
    req.setTimeout(8000, () => { req.destroy(); resolve(null); });
    req.end();
  });
}

// Vercel serverless handler
module.exports = async function handler(req, res) {
  // CORS headers so React app on same domain can call it
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const now = Date.now();

  // Serve cache if fresh
  if (priceCache.price && now - priceCache.fetchedAt < CACHE_TTL_MS) {
    return res.status(200).json({ ...priceCache, source: 'cached' });
  }

  const live = await fetchAirbnbPrice();

  if (live?.price) {
    priceCache = { ...live, fetchedAt: now };
    return res.status(200).json({ ...priceCache, currency: 'INR', symbol: '₹', perNight: true, source: 'live' });
  }

  // Fallback
  res.status(200).json({
    price: priceCache.price || 3139,
    priceString: priceCache.priceString || '₹3,139',
    currency: 'INR',
    symbol: '₹',
    perNight: true,
    source: 'default',
  });
};
