// next.config.mjs
const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',                                // genera /out con `next build`
  basePath: isProd ? '/portfolio' : '',    // ⚠️ pon aquí el nombre EXACTO de tu repo
  images: { unoptimized: true },

  // Exponer basePath al cliente para construir rutas a assets (icons, pdf, etc.)
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? 'portfolio' : ''
  },

  // Útil para servir assets estáticos bajo basePath
  assetPrefix: isProd ? '/portfolio/' : ''
}

export default nextConfig
