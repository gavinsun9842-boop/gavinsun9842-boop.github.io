// 本地动效工具（零第三方依赖）
// 参照 React Bits Pro 对应组件的 Props 语义与交互思路做轻量复刻：
//  - 聚光跟随：Depth Card / Spotlight 思路，指针在卡片上移动时驱动 CSS 变量 --mx/--my，
//    由 CSS radial-gradient 渲染跟随光斑；不直接写 transform，避免与现有 .reveal 入场位移冲突。
// 降级：仅在精确指针（pointer: fine）且未开启 reduced-motion 时绑定；触屏与减弱动效偏好下不启用，
// 保留卡片原有 CSS hover 反馈。

import { useEffect, useRef } from 'react'

function supportsHoverMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  const finePointer = window.matchMedia('(pointer: fine)').matches
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return finePointer && !reducedMotion
}

/**
 * 给卡片绑定指针跟随聚光所需的 CSS 变量。
 * 返回 ref 挂到卡片元素上；光斑样式由 .card-glow 承担。
 */
export function useSpotlightCard() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !supportsHoverMotion()) return undefined

    let raf = 0

    const paint = (e) => {
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      el.style.setProperty('--mx', `${(px * 100).toFixed(2)}%`)
      el.style.setProperty('--my', `${(py * 100).toFixed(2)}%`)
    }

    const onMove = (e) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        paint(e)
      })
    }

    const onLeave = () => {
      if (raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
      el.style.setProperty('--mx', '50%')
      el.style.setProperty('--my', '50%')
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return ref
}
