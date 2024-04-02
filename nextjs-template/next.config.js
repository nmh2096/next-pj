/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
      // Enables the styled-components SWC transform
      styledComponents: true
    },
  env: {
    BASE_URL: process.env.BASE_URL,
  }
}

module.exports = nextConfig
