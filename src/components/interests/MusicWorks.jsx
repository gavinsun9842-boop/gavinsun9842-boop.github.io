// SELECTED WORKS — 四首作品恢复为 2×2 卡片排列。
// 媒体仍复用 InterestVideo 的海报 / 播放逻辑，不改变其他页面。

import { InterestVideo } from './InterestVideo.jsx'

function WorkCard({ item, activeId, onActivate }) {
  const videoItem = {
    ...item,
    meta: item.genre,
    note: item.description,
  }

  return (
    <div className="mu-arrange-item">
      <InterestVideo
        item={videoItem}
        activeId={activeId}
        onActivate={onActivate}
        variant="arrange"
      />
      {item.lyric && (
        <p className="mu-arrange-lyric">
          <span>LYRIC FRAGMENT</span>
          “{item.lyric}”
        </p>
      )}
      {item.source && <p className="mu-arrange-source">{item.source}</p>}
    </div>
  )
}

export function MusicWorks({ items, activeId, onActivate }) {
  return (
    <section className="mu-section mu-arrangement" id="works" aria-labelledby="music-works-title">
      <div className="ix-container">
        <header className="mu-section-head">
          <div>
            <span className="ix-eyebrow">SELECTED WORKS</span>
            <h2 id="music-works-title">我的作品</h2>
          </div>
          <span className="mu-count">{String(items.length).padStart(2, '0')} WORKS · MUSIC & IMAGE</span>
        </header>

        <div className="mu-arrange-grid">
          {items.map((item) => (
            <WorkCard
              key={item.id}
              item={item}
              activeId={activeId}
              onActivate={onActivate}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
