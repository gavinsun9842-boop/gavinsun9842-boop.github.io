// 详情页媒体组件：FIG 编号、灯箱、图集、视频、奖状、成果数字、素材待补占位。
// 所有素材路径来自项目数据；组件不推断素材内容，说明文字一律由数据提供。

import { useState } from 'react'
import { resolveAsset } from '../lib/media'
import { useLightbox } from './Lightbox'

function FigureMedia({ item, ratio }) {
  const { open } = useLightbox()
  const [failed, setFailed] = useState(false)

  return (
    <div className="fig-media-wrap" style={ratio ? { aspectRatio: ratio } : undefined}>
      {failed ? (
        <div className="fig-fail">
          <span>图片加载失败</span>
          <small>{item.src}</small>
        </div>
      ) : (
        <button
          type="button"
          className="fig-open"
          onClick={() => open([item], 0)}
          aria-label={`放大查看：${item.caption || item.alt || '项目图片'}`}
        >
          <img
            src={resolveAsset(item.src)}
            alt={item.alt || ''}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
          />
          <span className="fig-hover">
            <span className="fig-zoom">↗</span>
          </span>
        </button>
      )}
    </div>
  )
}

export function FigureBlock({ block }) {
  return (
    <figure className={`fig fig-${block.variant || 'default'} ${block.fit === 'contain' ? 'is-contain' : ''}`}>
      <FigureMedia item={block} ratio={block.ratio} />
      {(block.caption) && (
        <figcaption className="fig-cap">
          {block.caption && <span className="fig-title">{block.caption}</span>}
        </figcaption>
      )}
    </figure>
  )
}

export function GalleryBlock({ block }) {
  const { open } = useLightbox()
  const items = block.items || []
  const layout = block.layout || 'duo'

  const openAt = (i) => open(items, i)

  return (
    <div className={`gallery gallery-${layout}`}>
      {items.map((item, i) => (
        <figure className={`g-item ${item.wide ? 'g-wide' : ''} ${item.fit === 'contain' ? 'is-contain' : ''}`} key={`${item.src}-${i}`}>
          <button
            type="button"
            className="g-open"
            onClick={() => openAt(i)}
            aria-label={`放大查看：${item.caption || item.alt || '项目图片'}`}
          >
            <img src={resolveAsset(item.src)} alt={item.alt || ''} loading="lazy" decoding="async" />
            <span className="fig-hover"><span className="fig-zoom">↗</span></span>
          </button>
          {item.caption && (
            <figcaption className="fig-cap">
              <span className="fig-title">{item.caption}</span>
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  )
}

export function CertificateBlock({ block }) {
  const { open } = useLightbox()
  const items = block.items && block.items.length ? block.items : [block]
  const lead = items[0]
  const rest = items.slice(1)

  const openAt = (index) => {
    const all = items.map((item) => ({
      ...item,
      caption: item.award || item.caption,
      meta: item.issuer || item.meta,
      kind: 'certificate',
    }))
    open(all, index)
  }

  const leadFigure = (
    <figure className={`cert ${items.length > 1 ? 'cert-lead' : ''}`}>
      <button
        type="button"
        className="cert-open"
        onClick={() => openAt(0)}
        aria-label={`高清预览：${lead.award || '获奖证书'}`}
      >
        <img src={resolveAsset(lead.src)} alt={lead.alt || ''} loading="lazy" decoding="async" />
        <span className="cert-zoom" aria-hidden="true">↗</span>
      </button>
      <figcaption className="cert-body">
        {lead.level && <span className="cert-level">{lead.level}</span>}
        {lead.award && <h4>{lead.award}</h4>}
      </figcaption>
    </figure>
  )

  if (items.length === 1) return leadFigure

  return (
    <div className="cert-archive">
      <header className="cert-archive-head">
        <span>{items.length} 项证书</span>
        <h3>{block.title || '竞赛与创新奖项'}</h3>
      </header>
      {leadFigure}
      <div className="cert-grid">
        {rest.map((item, i) => (
          <figure className={`cert-card ${item.wide ? 'is-wide' : ''}`} key={`${item.src}-${i}`}>
            <button
              type="button"
              className="cert-card-open"
              onClick={() => openAt(i + 1)}
              aria-label={`高清预览：${item.award || '获奖证书'}`}
            >
              <img src={resolveAsset(item.src)} alt={item.alt || ''} loading="lazy" decoding="async" />
              <span className="cert-zoom">↗</span>
            </button>
            <figcaption className="cert-card-body">
              {item.level && <span className="cert-level">{item.level}</span>}
              {item.award && <h4>{item.award}</h4>}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

function EvidenceCard({ item, index, items }) {
  const { open } = useLightbox()
  const [failed, setFailed] = useState(false)
  const previewItems = items.map((entry) => ({
    ...entry,
    caption: entry.caption || entry.title,
    meta: entry.meta,
    kind: 'certificate',
  }))

  return (
    <figure className="ev-card">
      <button
        type="button"
        className="ev-open"
        onClick={() => open(previewItems, index)}
        aria-label={`放大查看：${item.title || item.alt || '项目证明'}`}
      >
        <span className="ev-frame" style={item.ratio ? { aspectRatio: item.ratio } : undefined}>
          {failed ? (
            <span className="ev-fail">图片加载失败<small>{item.src}</small></span>
          ) : (
            <img
              src={resolveAsset(item.src)}
              alt={item.alt || ''}
              loading="lazy"
              decoding="async"
              onError={() => setFailed(true)}
            />
          )}
          <span className="ev-zoom" aria-hidden="true">↗</span>
        </span>
      </button>
      <figcaption className="ev-body">
        {item.title && <span className="ev-kicker">{item.title}</span>}
        {item.caption && <h4>{item.caption}</h4>}
        {item.meta && <p>{item.meta}</p>}
      </figcaption>
    </figure>
  )
}

export function EvidenceBlock({ block }) {
  return (
    <div className="evidence">
      {block.groups.map((group) => (
        <section className="ev-group" key={group.label}>
          <header className="ev-group-head">
            <span className="ev-group-label">{group.label}</span>
            {group.note && <p>{group.note}</p>}
          </header>
          <div className={`ev-grid ${group.layout === 'single' ? 'is-single' : ''}`}>
            {group.items.map((item, index) => (
              <EvidenceCard
                key={item.src}
                item={item}
                index={index}
                items={group.items}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export function VideoBlock({ block }) {
  const [active, setActive] = useState(false)
  const [failed, setFailed] = useState(false)

  return (
    <div className="vid">
      <div className="vid-frame">
        {!active && (
          <>
            {block.poster ? (
              <img className="vid-poster" src={resolveAsset(block.poster)} alt={block.posterAlt || ''} loading="lazy" />
            ) : (
              <div className="vid-poster vid-poster-empty" />
            )}
            <button type="button" className="vid-play" onClick={() => setActive(true)} aria-label={`播放：${block.title || '项目视频'}`}>
              <span className="vid-play-icon">▶</span>
            </button>
            {block.duration && <span className="vid-duration">{block.duration}</span>}
          </>
        )}

        {active && !failed && (
          <video
            className="vid-player"
            src={resolveAsset(block.src)}
            poster={block.poster ? resolveAsset(block.poster) : undefined}
            controls
            autoPlay
            playsInline
            preload="auto"
            onError={() => setFailed(true)}
          />
        )}

        {active && failed && (
          <div className="vid-fail">
            <p>视频加载失败，可尝试直接打开源文件。</p>
            <a href={resolveAsset(block.src)} target="_blank" rel="noreferrer">打开视频 ↗</a>
          </div>
        )}
      </div>

      {(block.title || block.note) && (
        <div className="vid-cap">
          {block.title && <span className="vid-title">{block.title}</span>}
          {block.note && <span className="vid-note">{block.note}</span>}
        </div>
      )}
    </div>
  )
}

export function HighlightStrip({ block }) {
  return (
    <div className="hl-strip">
      {block.items.map((item, i) => (
        <div className={`hl-item ${item.size === 'text' ? 'is-text' : item.size === 'lg' ? 'is-lg' : ''}`} key={`${item.label}-${i}`}>
          <span className="hl-value">{item.value}</span>
          <span className="hl-label">{item.label}</span>
          {item.note && <small>{item.note}</small>}
        </div>
      ))}
    </div>
  )
}
