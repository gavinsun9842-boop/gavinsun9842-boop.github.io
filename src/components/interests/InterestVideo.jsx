// 单条视频：默认只显示海报；点击后才创建 video，父级用 activeId 保证同一时间只有一条在播放。

import { useEffect, useState } from 'react'
import { resolveAsset } from '../../lib/media'

export function InterestVideo({ item, activeId, onActivate, variant = 'default', posterMode = 'cover' }) {
  const active = activeId === item.id
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!active) setFailed(false)
  }, [active])

  return (
    <article className={`ix-video ix-video--${variant} ${active ? 'is-playing' : ''}`}>
      <div className="ix-video-frame">
        {!active && (
          <button
            type="button"
            className={`ix-video-poster ${posterMode === 'fit' ? 'is-fit' : ''}`}
            onClick={() => onActivate(item.id)}
            aria-label={`播放：${item.title}`}
          >
            {posterMode === 'fit' && (
              <span
                className="ix-video-poster-bg"
                style={{ backgroundImage: `url(${resolveAsset(item.poster)})` }}
                aria-hidden="true"
              />
            )}
            <img src={resolveAsset(item.poster)} alt={item.alt || ''} loading="lazy" decoding="async" />
            <span className="ix-video-scrim" />
            <span className="ix-video-play" aria-hidden="true">
              <i />
            </span>
          </button>
        )}

        {active && !failed && (
          <>
            <video
              className="ix-video-player"
              src={resolveAsset(item.src)}
              poster={resolveAsset(item.poster)}
              controls
              autoPlay
              playsInline
              preload="auto"
              onError={() => setFailed(true)}
            />
            <button
              type="button"
              className="ix-video-close"
              onClick={() => onActivate(null)}
              aria-label={`停止播放：${item.title}`}
            >
              CLOSE ×
            </button>
          </>
        )}

        {active && failed && (
          <div className="ix-video-fail">
            <span>视频加载失败</span>
            <a href={resolveAsset(item.src)} target="_blank" rel="noreferrer">打开视频 ↗</a>
            <button type="button" onClick={() => onActivate(null)}>返回封面</button>
          </div>
        )}
      </div>

      <div className="ix-video-caption">
        <div>
          <h3>{item.title}</h3>
          {item.originalBy && <p className="ix-video-credit">{item.originalBy}</p>}
          {item.meta && <span>{item.meta}</span>}
        </div>
        <span className="ix-video-time">{item.duration}</span>
      </div>
      {item.note && <p className="ix-video-note">{item.note}</p>}
    </article>
  )
}
