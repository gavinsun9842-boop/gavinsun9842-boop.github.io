// 零依赖 hash 路由（不引入 react-router-dom）。
// 首页为单页锚点结构；项目详情页使用 #/projects/:slug。
// 采用 hash 而非 history 路径：配合现有 base './'，子路径刷新 / 直访 / 离线打开时
// 静态资源相对路径不会失效；后续若部署到域名根目录，可平滑替换为 history 路由。

import { useEffect, useRef, useState } from 'react'
import {
  createEntryState,
  prepareHistoryNavigation,
  prepareRouteNavigation,
} from './scrollMemory.js'

const listeners = new Set()

function currentPath() {
  const hash = window.location.hash || ''
  if (hash.startsWith('#/')) return decodeURIComponent(hash.slice(1)) || '/'
  return '/'
}

function notify() {
  const path = currentPath()
  listeners.forEach((fn) => fn(path))
}

// 监听 hashchange / popstate（浏览器前进 / 后退、点击 hash 链接、编程式改 hash）。
export function useRoute() {
  const [path, setPath] = useState(currentPath)
  const pathRef = useRef(path)

  useEffect(() => {
    const sync = () => {
      const next = currentPath()
      if (next === pathRef.current) return
      // 浏览器后退 / 前进开始前先记住来源页位置；目标页的位置由 App 恢复。
      prepareHistoryNavigation(next, pathRef.current)
      pathRef.current = next
      setPath(next)
    }
    const onSync = (p) => {
      pathRef.current = p
      setPath(p)
    }
    window.addEventListener('hashchange', sync)
    window.addEventListener('popstate', sync)
    listeners.add(onSync)
    return () => {
      window.removeEventListener('hashchange', sync)
      window.removeEventListener('popstate', sync)
      listeners.delete(onSync)
    }
  }, [])

  return path
}

// 编程式导航。to 形如 /projects/:slug、/#work 或 /。
export function navigate(to, { replace = false } = {}) {
  let hash
  if (to === '/') hash = ''
  else if (to.startsWith('/#')) hash = to.slice(1)
  else hash = `#${to}`

  const url = hash || window.location.pathname
  const fromPath = currentPath()

  if (replace) {
    window.history.replaceState(window.history.state, '', url)
  } else {
    prepareRouteNavigation()
    window.history.pushState(createEntryState(fromPath), '', url)
  }
  // pushState / replaceState 不触发 hashchange，手动同步一次。
  notify()
}

// 解析 /projects/:slug，非项目详情路径返回 null。
export function matchProjectSlug(path) {
  const m = path.match(/^\/projects\/([^/]+)\/?$/)
  return m ? decodeURIComponent(m[1]) : null
}

export function projectUrl(slug) {
  return `/projects/${slug}`
}

// 解析 /interests/:slug，非兴趣专题路径返回 null。
export function matchInterestSlug(path) {
  const m = path.match(/^\/interests\/([^/]+)\/?$/)
  return m ? decodeURIComponent(m[1]) : null
}
