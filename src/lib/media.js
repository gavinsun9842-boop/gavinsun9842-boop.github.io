// 媒体资源路径解析：统一媒体域名开关。
// - 配置了 VITE_MEDIA_BASE_URL（生产构建）：所有媒体走独立资源服务器。
// - 未配置（本地 dev / 回滚）：退回 BASE_URL，仍从本地 public/ 或 GitHub Pages 取图。
const MEDIA_BASE = String(import.meta.env.VITE_MEDIA_BASE_URL ?? '').replace(/\/+$/, '')

export function resolveAsset(path) {
  if (!path) return path
  const relative = String(path).replace(/^\/+/, '')
  if (MEDIA_BASE) return `${MEDIA_BASE}/${relative}`
  return `${import.meta.env.BASE_URL}${relative}`
}

export const mediaBase = MEDIA_BASE
