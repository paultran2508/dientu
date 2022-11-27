/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler:{
    styledComponents: true
  },
  images: {
    domains: ['i1-thethao.vnecdn.net', "i.ibb.co"]
  },
}

module.exports = nextConfig
