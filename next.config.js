/** @type {import('next').NextConfig} */
const nextConfig = {
  /**added cause error=>  `next export` has been removed in favor of 'output: export' in next.config.js.
  You should retire this line if you use this out of github deploymen */
 output:'export',
};

module.exports = nextConfig;
