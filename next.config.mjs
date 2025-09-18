// next.config.mjs
const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',                 // genera /out con `next build`
  basePath: isProd ? '/portfolio' : '',
  images: { unoptimized: true },

  // Exponer basePath al cliente para construir rutas a assets (icons/pdf)
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? '/portfolio' : ''
  },

  // Prefijo para assets estáticos (útil en Pages)
  assetPrefix: isProd ? '/portfolio/' : ''
}

export default nextConfig
