// 路由级滚动位置记忆。
// 浏览器在 hash 路由下无法可靠地恢复 SPA 的历史滚动位置，因此以「每条浏览器历史记录」
// 为单位保存 window.scrollY，并在 React 布局提交、首帧绘制前恢复。
// 不引入新依赖，不接管路由，只给现有 navigate / hashchange 提供位置记录能力。

import { useLayoutEffect } from 'react'

const STATE_KEY = '__portfolioScroll'
const STORAGE_PREFIX = 'portfolio:scroll:'
const RETRY_DELAYS = [80, 200, 420, 800]

let activeEntryId = null
let transitionPending = false
let restoring = false
let restoreToken = 0
let restorePreviousBehavior = ''
let saveTimer = 0
let pendingTargetPath = null
let restoredCurrentEntry = false

function createId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`
}

function readHistoryState() {
  const state = window.history.state
  return state && typeof state === 'object' ? state : {}
}

function readEntry() {
  const entry = readHistoryState()[STATE_KEY]
  if (!entry || typeof entry !== 'object' || typeof entry.id !== 'string') return null
  return entry
}

function readStoredScroll(id) {
  if (!id) return null
  try {
    const value = window.sessionStorage.getItem(`${STORAGE_PREFIX}${id}`)
    if (value == null) return null
    const number = Number(value)
    return Number.isFinite(number) ? Math.max(0, number) : null
  } catch {
    return null
  }
}

function writeStoredScroll(id, y) {
  if (!id) return
  try {
    window.sessionStorage.setItem(`${STORAGE_PREFIX}${id}`, String(Math.max(0, Math.round(y))))
  } catch {
    // 隐私模式 / storage 禁用时静默降级为不记忆，页面仍然可用。
  }
}

// 当前历史条目没有滚动 ID 时补一个；replaceState 不会新增历史记录。
function ensureEntry() {
  const state = readHistoryState()
  const entry = readEntry()
  if (entry) return entry
  const next = { id: createId(), from: null }
  window.history.replaceState({ ...state, [STATE_KEY]: next }, '', window.location.href)
  return next
}

function currentScroll() {
  return Math.max(
    0,
    Math.round(window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0),
  )
}

function cancelRestore() {
  if (!restoring) return
  restoreToken += 1
  restoring = false
  if (restorePreviousBehavior !== null) {
    document.documentElement.style.scrollBehavior = restorePreviousBehavior
  }
}

function applyInstant(top) {
  const root = document.documentElement
  const previous = root.style.scrollBehavior
  root.style.scrollBehavior = 'auto'
  window.scrollTo(0, Math.max(0, top))
  root.scrollTop = Math.max(0, top)
  document.body.scrollTop = Math.max(0, top)
  root.style.scrollBehavior = previous
}

function finishRestore(token) {
  if (token !== restoreToken) return
  restoring = false
  transitionPending = false
  if (restorePreviousBehavior !== null) {
    document.documentElement.style.scrollBehavior = restorePreviousBehavior
    restorePreviousBehavior = ''
  }
}

function retryRestore(token, target, index) {
  if (token !== restoreToken) return

  applyInstant(target)
  const y = currentScroll()
  const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
  const reached = Math.abs(y - target) <= 2
  const layoutTallEnough = max >= target - 2

  if ((reached && layoutTallEnough) || index >= RETRY_DELAYS.length) {
    finishRestore(token)
    return
  }

  window.setTimeout(() => retryRestore(token, target, index + 1), RETRY_DELAYS[index])
}

function restore(target, token) {
  restoring = true
  transitionPending = true
  restorePreviousBehavior = document.documentElement.style.scrollBehavior
  document.documentElement.style.scrollBehavior = 'auto'
  retryRestore(token, target, 0)
}

// 页面滚动时低频记录；真正离开页面前会再强制记录一次，避免丢失最后一段位移。
function scheduleSave() {
  if (transitionPending || restoring || saveTimer) return
  saveTimer = window.setTimeout(() => {
    saveTimer = 0
    if (transitionPending || restoring) return
    saveCurrentScroll()
  }, 120)
}

function saveCurrentScroll() {
  if (!activeEntryId) return
  writeStoredScroll(activeEntryId, currentScroll())
}

// 对外：初始化浏览器滚动策略、当前历史条目和全局监听。
export function initScrollMemory() {
  if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
  activeEntryId = ensureEntry().id

  window.addEventListener('scroll', scheduleSave, { passive: true })
  window.addEventListener('pagehide', saveCurrentScroll)
  window.addEventListener('beforeunload', saveCurrentScroll)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') saveCurrentScroll()
  })
}

// 编程式 push 导航前调用：先记录来源条目，再进入过渡态，防止新页面首帧的
// scroll 事件把来源页的位置覆盖成 0。
export function prepareRouteNavigation() {
  cancelRestore()
  activeEntryId = ensureEntry().id
  saveCurrentScroll()
  transitionPending = true
  restoredCurrentEntry = false
  pendingTargetPath = null
}

// 浏览器前进 / 后退前调用：只记录来源条目，不 ensure 目标条目的 ID。
export function prepareHistoryNavigation(nextPath, previousPath) {
  if (!nextPath || nextPath === previousPath) return
  if (pendingTargetPath === nextPath) return
  cancelRestore()
  saveCurrentScroll()
  transitionPending = true
  restoredCurrentEntry = false
  pendingTargetPath = nextPath
}

// 生成新的历史条目状态：新 ID，并记录来源路径，供详情页返回按钮判断是否应该
// 通过 history.back() 回到来源页，而不是新建一条首页记录。
export function createEntryState(fromPath) {
  const state = readHistoryState()
  return {
    ...state,
    [STATE_KEY]: {
      id: createId(),
      from: fromPath || null,
    },
  }
}

export function getCurrentEntryOrigin() {
  return readEntry()?.from || null
}

// 当前条目的来源页已经恢复过位置时，首页的初始 hash 自动滚动不应再执行。
export function hasRestoredCurrentEntry() {
  return restoredCurrentEntry
}

// 在 App 的最外层使用：path 变化后、首帧绘制前恢复对应历史条目的位置。
export function useScrollRestoration(path) {
  useLayoutEffect(() => {
    cancelRestore()
    const token = ++restoreToken
    const entry = ensureEntry()
    activeEntryId = entry.id
    pendingTargetPath = null

    const target = readStoredScroll(entry.id)
    restoredCurrentEntry = target !== null

    if (target === null) {
      applyInstant(0)
      transitionPending = false
      restoring = false
      return
    }

    restore(target, token)
  }, [path])
}
