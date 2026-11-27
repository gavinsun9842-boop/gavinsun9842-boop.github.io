// 灯箱：图片 / 奖状高清预览。支持 Esc 关闭、左右方向键切换、移动端按钮、点击遮罩关闭。
// 打开时锁定页面滚动，关闭后恢复；监听器在卸载时全部清理。

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { resolveAsset } from '../lib/media'

const LightboxContext = createContext(null)

export function useLightbox() {
  return useContext(LightboxContext)
}

export function LightboxProvider({ children }) {
  const [state, setState] = useState(null)
  const [zoom, setZoom] = useState(null)
  const [natural, setNatural] = useState({ width: 0, height: 0 })
  const [imageError, setImageError] = useState(false)
  const stageRef = useRef(null)
  const pinchRef = useRef(null)
  const panRef = useRef(null)

  const open = useCallback((items, index = 0) => {
    if (!items || !items.length) return
    setState({ items, index })
  }, [])

  const close = useCallback(() => setState(null), [])

  const step = useCallback((delta) => {
    setState((s) => {
      if (!s) return s
      const len = s.items.length
      return { ...s, index: (s.index + delta + len) % len }
    })
  }, [])

  const touchStart = useRef(null)

  const current = state ? state.items[state.index] : null
  const isPhoto = current?.kind === 'photo'

  useEffect(() => {
    setZoom(null)
    setNatural({ width: 0, height: 0 })
    setImageError(false)
    pinchRef.current = null
    panRef.current = null
    touchStart.current = null
  }, [state?.index, state?.items])

  const getFitScale = () => {
    const stage = stageRef.current
    if (!stage || !natural.width || !natural.height) return 1
    return Math.min(stage.clientWidth / natural.width, stage.clientHeight / natural.height)
  }

  const centerStage = () => {
    const stage = stageRef.current
    if (!stage) return
    stage.scrollLeft = Math.max(0, (stage.scrollWidth - stage.clientWidth) / 2)
    stage.scrollTop = Math.max(0, (stage.scrollHeight - stage.clientHeight) / 2)
  }

  const setActual = () => {
    if (!isPhoto || !natural.width) return
    setZoom(1)
    window.setTimeout(centerStage, 40)
  }

  const zoomBy = (factor) => {
    if (!isPhoto || !natural.width) return
    const base = zoom ?? getFitScale()
    const next = Math.min(4, Math.max(0.25, base * factor))
    setZoom(next)
    window.setTimeout(centerStage, 40)
  }

  const onPhotoLoad = (event) => {
    const img = event.currentTarget
    setNatural({ width: img.naturalWidth, height: img.naturalHeight })
    setImageError(false)
  }

  const onPhotoTouchStart = (event) => {
    if (!isPhoto) return false
    const touches = event.touches
    if (touches.length === 2) {
      const distance = Math.hypot(
        touches[0].clientX - touches[1].clientX,
        touches[0].clientY - touches[1].clientY,
      )
      pinchRef.current = { distance, baseScale: zoom ?? getFitScale() }
      panRef.current = null
      touchStart.current = null
      event.preventDefault()
      return true
    }
    if (touches.length === 1 && zoom !== null) {
      const stage = stageRef.current
      panRef.current = {
        x: touches[0].clientX,
        y: touches[0].clientY,
        left: stage?.scrollLeft ?? 0,
        top: stage?.scrollTop ?? 0,
      }
      pinchRef.current = null
      touchStart.current = null
      return true
    }
    return false
  }

  const onPhotoTouchMove = (event) => {
    if (!isPhoto) return
    if (pinchRef.current && event.touches.length >= 2) {
      const distance = Math.hypot(
        event.touches[0].clientX - event.touches[1].clientX,
        event.touches[0].clientY - event.touches[1].clientY,
      )
      const next = Math.min(4, Math.max(0.25, pinchRef.current.baseScale * (distance / pinchRef.current.distance)))
      setZoom(next)
      event.preventDefault()
      return
    }
    if (panRef.current && event.touches.length === 1 && stageRef.current) {
      const touch = event.touches[0]
      const stage = stageRef.current
      stage.scrollLeft = panRef.current.left - (touch.clientX - panRef.current.x)
      stage.scrollTop = panRef.current.top - (touch.clientY - panRef.current.y)
      event.preventDefault()
    }
  }

  const onPhotoTouchEnd = (event) => {
    if (!isPhoto) return false
    if (pinchRef.current || panRef.current) {
      pinchRef.current = null
      panRef.current = null
      return true
    }
    return false
  }

  const onTouchStart = (event) => {
    if (onPhotoTouchStart(event)) return
    touchStart.current = {
      x: event.touches[0]?.clientX ?? null,
      y: event.touches[0]?.clientY ?? null,
    }
  }

  const onTouchMove = (event) => {
    if (isPhoto) onPhotoTouchMove(event)
  }

  const onTouchEnd = (event) => {
    if (onPhotoTouchEnd(event)) return
    const start = touchStart.current
    touchStart.current = null
    if (!start || start.x == null) return
    const endX = event.changedTouches[0]?.clientX ?? start.x
    const endY = event.changedTouches[0]?.clientY ?? start.y
    const dx = endX - start.x
    const dy = endY - start.y
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.2) step(dx < 0 ? 1 : -1)
  }

  useEffect(() => {
    if (!state) return undefined
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [state, close, step])

  const zoomLabel = zoom === null ? 'FIT' : `${Math.round(zoom * 100)}%`
  const imageStyle = isPhoto && zoom !== null && natural.width
    ? { width: `${Math.round(natural.width * zoom)}px`, height: 'auto' }
    : undefined

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      {state && (
        <div className="lb" role="dialog" aria-modal="true" aria-label="图片预览" onClick={close}>
          <div className="lb-bar">
            <span className="lb-count">{String(state.index + 1).padStart(2, '0')} / {String(state.items.length).padStart(2, '0')}</span>
            <button type="button" className="lb-close" onClick={close} aria-label="关闭预览">✕</button>
          </div>

          <div
            ref={stageRef}
            className={`lb-stage ${current.kind === 'certificate' ? 'is-certificate' : ''} ${isPhoto ? 'is-photo' : ''} ${isPhoto && zoom !== null ? 'is-zoomed' : ''}`.trim()}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onTouchCancel={() => {
              touchStart.current = null
              pinchRef.current = null
              panRef.current = null
            }}
          >
            {imageError ? (
              <div className="lb-error" role="alert">
                <span>IMAGE LOAD FAILED</span>
                <small>{current.src}</small>
              </div>
            ) : (
              <img
                key={`${state.index}-${current.src}`}
                src={resolveAsset(current.src)}
                alt={current.alt || ''}
                style={imageStyle}
                onLoad={isPhoto ? onPhotoLoad : undefined}
                onError={() => setImageError(true)}
              />
            )}
          </div>

          <div className="lb-foot" onClick={(e) => e.stopPropagation()}>
            <div className="lb-caption">
              <p>{current.caption || current.alt || ''}</p>
              {current.meta && <small>{current.meta}</small>}
            </div>
            {isPhoto && (
              <div className="lb-zoom" aria-label="图片缩放控制">
                <span className="lb-zoom-current">{zoomLabel}</span>
                <button type="button" onClick={() => zoomBy(0.75)} aria-label="缩小图片" disabled={zoom === null}>−</button>
                <button type="button" onClick={setActual} aria-label="缩放到 100% 原始像素" disabled={!natural.width}>100%</button>
                <button type="button" onClick={() => zoomBy(1.5)} aria-label="放大图片" disabled={!natural.width}>+</button>
                <button type="button" onClick={() => setZoom(null)} disabled={zoom === null}>FIT</button>
              </div>
            )}
            {state.items.length > 1 && (
              <div className="lb-nav">
                <button type="button" onClick={() => step(-1)} aria-label="上一张">←</button>
                <button type="button" onClick={() => step(1)} aria-label="下一张">→</button>
              </div>
            )}
          </div>
        </div>
      )}
    </LightboxContext.Provider>
  )
}
