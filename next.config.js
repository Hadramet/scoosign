/** @type {import('next').NextConfig} */
const path = require('path')

const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/react',
  '@fullcalendar/daygrid',
  '@fullcalendar/list',
  '@fullcalendar/timegrid',
  '@fullcalendar/timeline'
]);

const nextConfig = withTM({
  reactStrictMode: true,
  webpack: (config)=> {
    config.resolve.modules.push(path.resolve('.'))
    return config
  },
  rewrites: () =>[{ source: '/api/:path*', destination: `${process.env.BACKEND_URI}/:path*`}]
})

module.exports = nextConfig
