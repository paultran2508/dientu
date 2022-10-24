/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler:{
    styledComponents: true
  },
  images: {
    domains: ['i1-vnexpress.vnecdn.net', "i.ibb.co"]
  },
}

module.exports = nextConfig
