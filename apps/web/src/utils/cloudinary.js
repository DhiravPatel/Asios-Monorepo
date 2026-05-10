// Cloudinary URL transformation helper.
//
// Inserts on-the-fly delivery transforms (auto-format, auto-quality, width)
// into a Cloudinary URL by injecting them after the `/upload/` segment.
//
// Falls back to the original URL untouched for any non-Cloudinary asset
// (e.g. local fallbacks, external images).

const CLOUDINARY_MARKER = '/upload/';

const buildTransform = ({ width, height, quality = 'auto', format = 'auto', crop = 'fill' }) => {
  const parts = [];
  if (format) parts.push(`f_${format}`);
  if (quality) parts.push(`q_${quality}`);
  if (width) parts.push(`w_${width}`);
  if (height) parts.push(`h_${height}`);
  if (crop) parts.push(`c_${crop}`);
  return parts.join(',');
};

export const cld = (url, opts = {}) => {
  if (!url || typeof url !== 'string') return url;
  const idx = url.indexOf(CLOUDINARY_MARKER);
  if (idx === -1) return url;

  const head = url.slice(0, idx + CLOUDINARY_MARKER.length);
  const tail = url.slice(idx + CLOUDINARY_MARKER.length);

  // If a transform already exists, skip — don't double-stack.
  if (/^[a-z]_[^/]+(?:,[a-z]_[^/]+)*\//.test(tail)) return url;

  const transform = buildTransform(opts);
  return transform ? `${head}${transform}/${tail}` : url;
};

// Common preset sizes — match the visible card / hero dimensions in the design.
export const cldThumb = (url) => cld(url, { width: 400, crop: 'fill' });
export const cldCard = (url) => cld(url, { width: 800, crop: 'fill' });
export const cldHero = (url) => cld(url, { width: 1600, crop: 'fill' });

// Build a srcset string for responsive images.
export const cldSrcSet = (url, widths = [400, 800, 1200, 1600], opts = {}) =>
  widths.map((w) => `${cld(url, { ...opts, width: w })} ${w}w`).join(', ');
