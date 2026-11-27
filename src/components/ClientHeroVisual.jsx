// 灵植双效舱客户端详情页 Hero 主视觉：真实 Flask 界面 + 植物影像 + 数据快照。
// 只在 heroVisual === 'client' 时挂载，不改变其他项目 Hero。

import { useEffect, useRef } from 'react'
import { resolveAsset } from '../lib/media'
import './ClientHeroVisual.css'

const READOUTS = [
  { label: 'TEMP', value: '12.4', unit: '°C' },
  { label: 'HUMIDITY', value: '58.5', unit: '%' },
  { label: 'LIGHT', value: '895.9', unit: 'lx' },
]

export default function ClientHeroVisual({ title }) {
  const stageRef = useRef(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return undefined
    const hero = stage.closest('.ph')
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const wide = window.matchMedia('(min-width: 1025px)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let nextX = 0
    let nextY = 0

    const paint = () => {
      frame = 0
      stage.style.setProperty('--pc-px', nextX.toFixed(3))
      stage.style.setProperty('--pc-py', nextY.toFixed(3))
    }

    const reset = () => {
      nextX = 0
      nextY = 0
      if (!frame) frame = requestAnimationFrame(paint)
    }

    const onMove = (event) => {
      if (!finePointer.matches || !wide.matches || reduced.matches) return
      const rect = stage.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      nextX = Math.max(-1, Math.min(1, (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)))
      nextY = Math.max(-1, Math.min(1, (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)))
      if (!frame) frame = requestAnimationFrame(paint)
    }

    hero?.addEventListener('pointermove', onMove)
    hero?.addEventListener('pointerleave', reset)
    finePointer.addEventListener?.('change', reset)
    wide.addEventListener?.('change', reset)
    reduced.addEventListener?.('change', reset)

    const observer = new IntersectionObserver(
      ([entry]) => stage.classList.toggle('is-paused', !entry.isIntersecting),
      { threshold: 0.12 },
    )
    observer.observe(stage)

    const onVisibility = () => stage.classList.toggle('is-page-hidden', document.hidden)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      hero?.removeEventListener('pointermove', onMove)
      hero?.removeEventListener('pointerleave', reset)
      finePointer.removeEventListener?.('change', reset)
      wide.removeEventListener?.('change', reset)
      reduced.removeEventListener?.('change', reset)
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div className="pc-stage" ref={stageRef} aria-label={`${title || '灵植双效舱客户端'} 真实界面与数据快照`}>
      <span className="pc-stage-index" aria-hidden="true">A DIGITAL WINDOW INTO PLANT GROWTH</span>
      <span className="pc-aura" aria-hidden="true" />

      <div className="pc-window">
        <div className="pc-window-bar">
          <span className="pc-window-id"><i aria-hidden="true" />FLASK WEB CLIENT</span>
          <span className="pc-window-state"><i aria-hidden="true" />DEVICE LINK / RECORDED</span>
        </div>

        <div className="pc-screen">
          <img
            src={resolveAsset('/projects/lingzhi-client/dashboard-clean.jpg')}
            alt="灵植双效舱 Flask 监控平台：核心环境数据与设备连接状态"
            width="1600"
            height="834"
            loading="eager"
            decoding="async"
          />
          <span className="pc-screen-scan" aria-hidden="true" />
        </div>

        <div className="pc-data">
          {READOUTS.map((item) => (
            <span className="pc-metric" key={item.label}>
              <span className="pc-metric-label">{item.label}</span>
              <span className="pc-metric-value">{item.value}<em>{item.unit}</em></span>
            </span>
          ))}
          <span className="pc-stamp">SNAPSHOT<br />2025.12.27 / 10:38</span>
        </div>
      </div>

      <div className="pc-lower">
        <figure className="pc-plant">
          <img
            src={resolveAsset('/projects/lingzhi-cabin/card-plants.png')}
            alt="水培植物幼苗与根系生长实拍"
            width="1000"
            height="1000"
            loading="eager"
            decoding="async"
          />
          <span className="pc-plant-focus" aria-hidden="true" />
          <span className="pc-plant-scan" aria-hidden="true" />
          <figcaption>
            <span>HYDROPONIC GROWTH</span>
            <span>PLANT OBJECT / 03</span>
          </figcaption>
        </figure>

        <figure className="pc-chart">
          <div className="pc-chart-head">
            <span>GROWTH RECORD</span>
            <span>2026.03.07</span>
          </div>
          <div className="pc-chart-img">
            <img
              src={resolveAsset('/projects/lingzhi-client/dashboard-growth.jpg')}
              alt="灵植双效舱 Flask 生长趋势图表：株高、叶片数与生长速率"
              width="1600"
              height="834"
              loading="eager"
              decoding="async"
            />
            <span className="pc-chart-scan" aria-hidden="true" />
          </div>
          <figcaption>EC / TIME SERIES · REAL UI</figcaption>
        </figure>
      </div>
    </div>
  )
}
