// lib/paths.js
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
export function withBase(path) {
  if (!path) return basePath || '/'
  return `${basePath}${path.startsWith('/') ? path : '/' + path}`
}
