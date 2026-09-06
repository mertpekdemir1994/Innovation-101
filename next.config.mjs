/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // Book cover art for /reading, fetched by ISBN so it's the correct
        // edition rather than a fuzzy title match. See content/reading/reading.md.
        protocol: 'https',
        hostname: 'covers.openlibrary.org',
        pathname: '/b/isbn/**',
      },
      {
        // A couple of books' ISBN-linked cover is a dim library-copy scan
        // with a barcode sticker on it; Open Library also has a cleaner,
        // brighter scan of the identical edition, but only reachable by
        // its edition id (olid), not the ISBN.
        protocol: 'https',
        hostname: 'covers.openlibrary.org',
        pathname: '/b/olid/**',
      },
    ],
  },
};

export default nextConfig;
