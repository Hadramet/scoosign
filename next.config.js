/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: () =>[{ source: '/api/:path*', destination: `${process.env.BACKEND_URI}/:path*`}]

}

module.exports = nextConfig
