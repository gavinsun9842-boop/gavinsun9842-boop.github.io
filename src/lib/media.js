// 媒体资源路径解析：兼容 dev（BASE_URL='/'）与 build（base:'./'）。
export function resolveAsset(path) {
  if (!path) return path
  return `${import.meta.env.BASE_URL}${String(path).replace(/^\//, '')}`
}
