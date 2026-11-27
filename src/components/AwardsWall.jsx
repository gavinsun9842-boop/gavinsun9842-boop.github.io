// 首页荣誉展墙：数据来自 content/awards.js，与项目详情页共用同一份奖状数据。
// 所有已确认证书全部进入同一面错落展墙（9 个槽位），不另设分组，也不在 JSX 里散落奖状信息。

import { useEffect, useMemo, useRef, useState } from 'react'
import { useLightbox } from './Lightbox'
import { resolveAsset } from '../lib/media'

const SLOT_CLASSES = ['is-lead', 'slot-1', 'slot-2', 'slot-3', 'slot-4', 'slot-5', 'slot-6', 'slot-7', 'slot-8']

function wallOrder(awards) {
  // 顺序在 content/awards.js 中按项目交错编排；这里不再按 featured 重排，避免主视觉又落回灵植。
  return awards.slice()
}

function AwardCard({ award, index, activeId, onActivate, onDeactivate, onOpen }) {
  const active = activeId === award.id
  const projectName = award.wallProjectTitle || award.projectTitle
  const tall = Boolean(award.thumbWidth && award.thumbHeight && award.thumbHeight / award.thumbWidth > 1.15)

  return (
    <article
      className={`award-card ${SLOT_CLASSES[index] || ''} ${tall ? 'is-tall' : ''} ${active ? 'is-active' : ''}`}
      key={award.id}
      onPointerEnter={onActivate}
      onPointerLeave={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) onDeactivate()
      }}
      style={{ '--delay': `${index * 90}ms` }}
    >
      <div className="award-enter">
        <button
          type="button"
          className="award-hit"
          onClick={onOpen}
          onFocus={onActivate}
          onBlur={onDeactivate}
          aria-label={`高清预览：${award.award}，${projectName}`}
        >
          <img
            src={resolveAsset(award.thumb || award.src)}
            alt={award.alt}
            width={award.thumbWidth || undefined}
            height={award.thumbHeight || undefined}
            loading="lazy"
            decoding="async"
          />
          <span className="award-hit-line" aria-hidden="true" />
        </button>
        <div className="award-label">
          <span className="award-label-meta">
            {projectName}{award.year ? ` · ${award.year}` : ''}
          </span>
          <strong>{award.eventShort || award.event}</strong>
          <span className="award-label-level">{award.level}</span>
        </div>
      </div>
    </article>
  )
}

export default function AwardsWall({ awards = [] }) {
  const stageRef = useRef(null)
  const { open } = useLightbox()
  const [inView, setInView] = useState(false)
  const [activeId, setActiveId] = useState(null)

  const ordered = useMemo(() => wallOrder(awards), [awards])
  const density = ordered.length >= 7 ? 'is-rich' : ordered.length >= 4 ? 'is-medium' : 'is-sparse'
  const years = ordered.map((award) => Number(award.year)).filter((year) => Number.isFinite(year) && year > 0)
  const yearSpan = years.length ? `${Math.min(...years)}—${Math.max(...years)}` : 'ARCHIVE'

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true)
      return undefined
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.02, rootMargin: '0px 0px -20px 0px' },
    )
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  // 轻量视差：只改变一个舞台级变量，每张牌用自己的 --depth 决定幅度。
  useEffect(() => {
    const stage = stageRef.current
    if (!stage || !inView) return undefined
    if (!window.matchMedia('(pointer: fine)').matches) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    let raf = 0
    const onMove = (event) => {
      const clientX = event.clientX
      const clientY = event.clientY
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const rect = stage.getBoundingClientRect()
        const x = ((clientX - rect.left) / rect.width - 0.5) * 12
        const y = ((clientY - rect.top) / rect.height - 0.5) * 10
        stage.style.setProperty('--wall-x', `${x.toFixed(2)}px`)
        stage.style.setProperty('--wall-y', `${y.toFixed(2)}px`)
      })
    }
    const reset = () => {
      stage.style.setProperty('--wall-x', '0px')
      stage.style.setProperty('--wall-y', '0px')
    }

    stage.addEventListener('pointermove', onMove)
    stage.addEventListener('pointerleave', reset)
    return () => {
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerleave', reset)
      if (raf) cancelAnimationFrame(raf)
      reset()
    }
  }, [inView])

  if (!ordered.length) return null

  const openAt = (index) => {
    const items = ordered.map((award) => ({
      src: award.src,
      alt: award.alt,
      caption: award.award,
      meta: [award.wallProjectTitle || award.projectTitle, award.year].filter(Boolean).join(' · '),
      kind: 'certificate',
    }))
    open(items, index)
  }

  return (
    <section className="awards-wall" id="awards" aria-labelledby="awards-title">
      <div className="container">
        <header className="aw-head">
          <div className="aw-head-main">
            <div className="aw-kicker"><span>HONORS</span> / 荣誉档案</div>
            <h2 id="awards-title">一路走来的认可</h2>
          </div>
          <div className="aw-head-aside">
            <div className="aw-count">
              <span>{ordered.length} 项证书</span>
              <span>{yearSpan}</span>
            </div>
          </div>
        </header>

        <div
          ref={stageRef}
          className={`aw-stage ${density} ${inView ? 'is-in' : ''} ${activeId ? 'has-active' : ''}`}
          onPointerLeave={() => setActiveId(null)}
          aria-label={`奖状与证书展墙，共 ${ordered.length} 项`}
        >
          <div className="aw-atmosphere" aria-hidden="true" />
          <div className="aw-floor" aria-hidden="true" />
          <div className="aw-rule aw-rule--one" aria-hidden="true" />
          <div className="aw-rule aw-rule--two" aria-hidden="true" />

          {ordered.map((award, index) => (
            <AwardCard
              award={award}
              index={index}
              activeId={activeId}
              onActivate={() => setActiveId(award.id)}
              onDeactivate={() => setActiveId(null)}
              onOpen={() => openAt(index)}
              key={award.id}
            />
          ))}
        </div>

        <div className="aw-foot">
          <button
            type="button"
            className="aw-explore"
            onClick={() => openAt(0)}
            aria-label={`打开全部 ${ordered.length} 张奖状与证书的高清预览`}
          >
            <span className="aw-explore-arrow" aria-hidden="true">↗</span>
            <span>查看全部证书</span>
          </button>
        </div>
      </div>
    </section>
  )
}
