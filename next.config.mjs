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
    ],
  },
};

export default nextConfig;
