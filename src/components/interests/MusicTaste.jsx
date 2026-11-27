// 我的创作曲风 — 音乐页的个人创作档案。
// 三张卡片分别以对应曲风的视觉图作为背景，文字与动效保持原有结构。

import { useEffect, useRef } from 'react'
import { resolveAsset } from '../../lib/media'
import './music-taste.css'

const tastes = [
  {
    id: 'synthwave',
    index: '01',
    name: 'SYNTHWAVE',
    description: '复古合成器、霓虹氛围与电子节奏',
    image: resolveAsset('/assets/interests/music/taste/synthwave.jpg'),
    imagePosition: 'center 52%',
  },
  {
    id: 'house',
    index: '02',
    name: 'HOUSE',
    description: '律动、重复节拍与持续推进的能量',
    image: resolveAsset('/assets/interests/music/taste/house.jpg'),
    imagePosition: 'center 55%',
  },
  {
    id: 'pop',
    index: '03',
    name: 'POP',
    description: '旋律性、流行表达与丰富的情绪层次',
    image: resolveAsset('/assets/interests/music/taste/pop.jpg'),
    imagePosition: 'center 48%',
  },
]

export function MusicTaste() {
  const gridRef = useRef(null)

  useEffect(() => {
    const node = gridRef.current
    if (!node) return undefined

    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible')
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return
        node.classList.add('is-visible')
        observer.disconnect()
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="mu-taste" aria-labelledby="music-taste-title">
      <div className="ix-container">
        <header className="mu-taste-head">
          <h2 id="music-taste-title">我的创作曲风</h2>
          <p>The sounds I gravitate towards.</p>
        </header>

        <div className="mu-taste-grid" ref={gridRef}>
          {tastes.map((taste) => (
            <article
              className={`mu-taste-card mu-taste-card--${taste.id}`}
              key={taste.id}
              tabIndex={0}
              aria-label={`${taste.name}：${taste.description}`}
            >
              <div className="mu-taste-art" aria-hidden="true">
                <img
                  src={taste.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: taste.imagePosition }}
                />
              </div>
              <span className="mu-taste-index" aria-hidden="true">{taste.index}</span>
              <div className="mu-taste-copy">
                <h3>{taste.name}</h3>
                <p>{taste.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
