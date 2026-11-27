import { useState } from 'react'
import { photographyPage } from '../../content/interests/photography.js'
import { useLightbox } from '../../components/Lightbox.jsx'
import { resolveAsset } from '../../lib/media'
import { InterestShell } from '../../components/interests/InterestShell.jsx'

const PHOTO_ROOT = '/assets/interests/photography/'

function responsiveSrcSet(src) {
  const value = String(src)
  if (!value.startsWith(PHOTO_ROOT)) return undefined
  const relative = value.slice(PHOTO_ROOT.length).replace(/\.(jpe?g|png)$/i, '')
  const small = resolveAsset(`${PHOTO_ROOT}preview/${relative}-720.webp`)
  const large = resolveAsset(`${PHOTO_ROOT}preview/${relative}-1440.webp`)
  return `${small} 720w, ${large} 1440w`
}

function PhotoImage({ src, alt, loading = 'lazy', className = '', sizes = '(max-width: 820px) 50vw, 33vw' }) {
  const [failed, setFailed] = useState(false)
  const srcSet = responsiveSrcSet(src)

  if (failed) {
    return (
      <span className={`pg-img-error ${className}`.trim()} role="alert">
        IMAGE FAILED · {String(src).split('/').pop()}
      </span>
    )
  }

  return (
    <img
      src={resolveAsset(src)}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      fetchPriority={loading === 'eager' ? 'high' : 'auto'}
      onError={() => setFailed(true)}
    />
  )
}

export default function PhotographyPage() {
  const page = photographyPage
  const { open } = useLightbox()

  const groupById = Object.fromEntries(page.workGroups.map((group) => [group.id, group]))
  const groupCaption = (groupId) => {
    const group = groupById[groupId]
    return group ? `${group.en} / ${group.cn}` : ''
  }
  const groupItems = (groupId) => page.wall.filter((item) => item.group === groupId)

  const interludeGroup = groupById[page.interlude.group]
  const interludeItem = {
    src: page.interlude.full,
    alt: page.interlude.alt,
    kind: 'photo',
    caption: groupCaption(page.interlude.group),
    meta: page.interlude.meta,
  }

  const photoItems = [
    {
      src: page.hero.full,
      alt: page.hero.alt,
      kind: 'photo',
      caption: groupCaption(page.hero.group),
      meta: page.hero.meta,
    },
    ...page.workGroups.flatMap((group) => {
      const wallItems = groupItems(group.id).map((item) => ({
        src: item.full,
        alt: item.alt,
        kind: 'photo',
        caption: groupCaption(group.id),
        meta: item.meta,
      }))

      return group.id === page.interlude.group
        ? [interludeItem, ...wallItems]
        : wallItems
    }),
  ]

  const posterItems = page.posters.items.map((item) => ({
    src: item.full,
    alt: item.alt,
    kind: 'graphic',
    caption: item.label,
    meta: item.meta,
  }))

  const aiItems = page.aiNote.items.map((item) => ({
    src: item.full,
    alt: item.alt,
    kind: 'ai',
    caption: item.label,
    meta: item.meta,
  }))

  const openPhoto = (item) => {
    const index = photoItems.findIndex((entry) => entry.src === item.full)
    if (index >= 0) open(photoItems, index)
  }

  return (
    <InterestShell slug="photography">
      <section className="pg-hero">
        <button
          type="button"
          className="pg-hero-image"
          onClick={() => open(photoItems, 0)}
          aria-label="放大查看摄影主视觉"
        >
          <PhotoImage src={page.hero.image} alt={page.hero.alt} loading="eager" sizes="100vw" />
          <span className="pg-hero-scrim" />
        </button>

        <div className="ix-container pg-hero-content">
          <h1>
            <span>BEYOND</span>
            <span className="pg-title-outline">THE LENS</span>
          </h1>
          <h2>{page.themeCn}</h2>
        </div>
      </section>

      <section className="pg-wall" id="selected">
        <div className="ix-container">
          <header className="pg-section-head">
            <div>
              <span className="ix-eyebrow">SELECTED WORKS</span>
              <h2>我的作品</h2>
            </div>
            <span className="pg-count">{page.archive.label}</span>
          </header>

          <div className="pg-collections">
            {page.workGroups.map((group) => {
              const items = groupItems(group.id)

              return (
                <section
                  className={`pg-collection pg-collection--${group.id}`}
                  key={group.id}
                  aria-labelledby={`pg-collection-${group.id}`}
                >
                  <div className="ix-container">
                    <header className="pg-collection-head">
                      <span className="pg-collection-index">{group.no}</span>
                      <div className="pg-collection-title">
                        <h3 id={`pg-collection-${group.id}`}>{group.en}</h3>
                        <p>{group.cn}</p>
                      </div>
                    </header>
                  </div>

                  {group.id === page.interlude.group && (
                    <button
                      type="button"
                      className="pg-collection-feature"
                      onClick={() => openPhoto(page.interlude)}
                      aria-label={`放大查看${interludeGroup.cn}作品：${page.interlude.alt}`}
                    >
                      <PhotoImage src={page.interlude.image} alt={page.interlude.alt} sizes="(max-width: 820px) 100vw, 1440px" />
                    </button>
                  )}

                  <div className="ix-container">
                    <div
                      className="pg-collection-grid"
                      style={{
                        '--pg-offset-b': group.offsetB,
                        '--pg-offset-c': group.offsetC,
                      }}
                    >
                      {['a', 'b', 'c'].map((column) => (
                        <div className={`pg-column pg-column--${column}`} key={column}>
                          {items.filter((item) => item.col === column).map((item) => (
                            <button
                              type="button"
                              className="pg-photo"
                              key={item.id}
                              style={{ width: item.width, marginTop: item.offset }}
                              onClick={() => openPhoto(item)}
                              aria-label={`放大查看${group.cn}作品：${item.alt}`}
                            >
                              <PhotoImage src={item.thumb} alt={item.alt} />
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )
            })}
          </div>
        </div>
      </section>

      <section className="pg-posters" id="photoshop">
        <div className="ix-container">
          <header className="pg-section-head pg-poster-head">
            <div>
              <span className="ix-eyebrow">{page.posters.kicker}</span>
              <h2>{page.posters.title}</h2>
            </div>
            <span className="pg-count">{page.posters.note}</span>
          </header>

          <div className="pg-poster-grid">
            {page.posters.items.map((item, index) => (
              <button
                type="button"
                className={`pg-poster pg-poster--${index + 1}`}
                key={item.id}
                onClick={() => open(posterItems, index)}
                aria-label={`放大查看：${item.label}`}
              >
                <PhotoImage src={item.thumb} alt={item.alt} />
                <span className="pg-poster-caption">
                  <span>{item.label}</span>
                  <span className="pg-poster-meta">{item.meta}</span>
                </span>
              </button>
            ))}
          </div>

        </div>
      </section>

      <section className="pg-ai" id="ai-optimized">
        <div className="ix-container pg-ai-grid">
          <div className="pg-ai-mark">
            <span className="ix-eyebrow">{page.aiNote.kicker}</span>
          </div>
          <div className="pg-ai-copy">
            <h2>{page.aiNote.title}</h2>
            <p>{page.aiNote.body}</p>
          </div>
        </div>

        <div className="ix-container pg-ai-gallery">
          {page.aiNote.items.map((item, index) => (
            <button
              type="button"
              className={`pg-ai-card pg-ai-card--${index + 1}`}
              key={item.id}
              onClick={() => open(aiItems, index)}
              aria-label={`放大查看：${item.label}`}
            >
              <span className="pg-ai-image">
                <PhotoImage src={item.thumb} alt={item.alt} sizes="(max-width: 820px) 50vw, 25vw" />
              </span>
              <span className="pg-ai-caption">
                <h3>{item.cn}</h3>
              </span>
            </button>
          ))}
        </div>
      </section>
    </InterestShell>
  )
}
