/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
   images: {
    unoptimized: true, // Deshabilita la optimización de imágenes
  },
};

module.exports = nextConfig;
