/** @type {import('next').NextConfig} */
const isGhPages = process.env.GITHUB_PAGES === 'true'
const repoBasePath = '/portfolio' // your GitHub Pages project path

const nextConfig = {
  output: 'export', // enables static export
  images: { unoptimized: true },
  trailingSlash: true, // recommended for GH Pages
  basePath: isGhPages ? repoBasePath : '',
  assetPrefix: isGhPages ? repoBasePath + '/' : '',
}

export default nextConfig
