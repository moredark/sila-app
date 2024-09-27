/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  },
}

export default nextConfig
