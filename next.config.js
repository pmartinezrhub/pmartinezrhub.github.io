// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true // <- importante para GitHub Pages
  },
  basePath: '/pmartinezr-portfolio.io', // <- si tu repo NO es user.github.io, debes agregarlo
};

module.exports = nextConfig;

