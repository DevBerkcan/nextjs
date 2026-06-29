/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // GLB/3D assets are loaded via dynamic import on the client only.
};
export default nextConfig;
