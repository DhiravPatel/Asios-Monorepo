// In-flight request dedup + short TTL response cache.
// Prevents StrictMode double-effects and quick back-navigation from refetching.
const inflight = new Map();
const cache = new Map();
const DEFAULT_TTL_MS = 60_000;

export const dedupedFetch = (key, fetcher, ttlMs = DEFAULT_TTL_MS) => {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.t < ttlMs) return Promise.resolve(hit.v);

  const existing = inflight.get(key);
  if (existing) return existing;

  const p = fetcher()
    .then((v) => {
      cache.set(key, { v, t: Date.now() });
      return v;
    })
    .finally(() => {
      inflight.delete(key);
    });
  inflight.set(key, p);
  return p;
};
