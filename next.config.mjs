// next.config.mjs
const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',                        // genera /out con `next build`
  basePath: isProd ? '/PortfolioLuis' : '', // ← cambia esto
  images: { unoptimized: true },
}

export default nextConfig
