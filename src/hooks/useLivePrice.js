import { useState, useEffect, useCallback } from 'react';

/**
 * useLivePrice
 * ─────────────
 * Fetches the current nightly price from our Express proxy (/api/price).
 * Falls back to ₹3,139 if the server is unreachable (e.g. dev without backend).
 *
 * Returns:
 *   { price, priceString, loading, error, source, refetch }
 *
 * source = "live" | "cached" | "default"
 */
const FALLBACK = { price: 3139, priceString: '₹3,139', currency: 'INR', symbol: '₹' };

export default function useLivePrice() {
  const [data,    setData]    = useState({ ...FALLBACK, loading: true, error: null, source: null });
  const [tick,    setTick]    = useState(0); // bump to force re-fetch

  const refetch = useCallback(() => setTick(t => t + 1), []);

  useEffect(() => {
    let cancelled = false;
    setData(prev => ({ ...prev, loading: true, error: null }));

    fetch('/api/price')
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(json => {
        if (cancelled) return;
        setData({
          price:       json.price       || FALLBACK.price,
          priceString: json.priceString || FALLBACK.priceString,
          currency:    json.currency    || 'INR',
          symbol:      json.symbol      || '₹',
          loading:     false,
          error:       null,
          source:      json.source,
        });
      })
      .catch(() => {
        if (cancelled) return;
        // Server not running (pure frontend dev) — use fallback silently
        setData({ ...FALLBACK, loading: false, error: null, source: 'default' });
      });

    return () => { cancelled = true; };
  }, [tick]);

  return { ...data, refetch };
}
