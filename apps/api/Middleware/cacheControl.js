// Tiny Cache-Control helper. Apply to GET routes whose response is safe to cache
// briefly at the browser/CDN — categories, catalogues, blog posts, etc.
//
// Usage:
//   router.get('/getAllCategories', publicCache(60), GetAllCategories)
//
// Skips writing the header when the request is authenticated (we don't want to
// poison a shared cache with a per-user response).

const publicCache = (maxAgeSeconds = 60, swrSeconds = 300) => (req, res, next) => {
  // If the route's auth middleware tagged the request as user-specific, skip caching.
  if (req.user || req.headers.authorization) {
    res.set('Cache-Control', 'no-store')
    return next()
  }
  res.set(
    'Cache-Control',
    `public, max-age=${maxAgeSeconds}, stale-while-revalidate=${swrSeconds}`,
  )
  next()
}

module.exports = { publicCache }
