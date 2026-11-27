import { useState } from 'react'
import { musicPage } from '../../content/interests/music.js'
import { resolveAsset } from '../../lib/media'
import { InterestShell } from '../../components/interests/InterestShell.jsx'
import { InterestVideo } from '../../components/interests/InterestVideo.jsx'
import { MusicTaste } from '../../components/interests/MusicTaste.jsx'
import { MusicWorks } from '../../components/interests/MusicWorks.jsx'

export default function MusicPage() {
  const page = musicPage
  const [activeId, setActiveId] = useState(null)
  const activate = (id) => setActiveId(id)

  return (
    <InterestShell slug="music">
      <section className="mu-hero">
        <div className="mu-hero-bg">
          <img src={resolveAsset(page.hero.image)} alt={page.hero.alt} />
          <span className="mu-hero-scrim" aria-hidden="true" />
        </div>

        <div className="ix-container mu-hero-grid">
          <div className="mu-hero-copy">
            <h1 className="mu-title">
              <span className="mu-title-main">MUSIC</span>
              <span className="mu-title-line">IS HOW I</span>
              <span className="mu-title-line">EXPRESS MYSELF</span>
            </h1>
            <div className="mu-hero-cn">{page.themeCn}</div>
            <p className="mu-hero-lead">{page.statement}</p>
          </div>
        </div>
      </section>

      <MusicTaste />

      <section className="mu-section mu-performance" id="performance">
        <div className="ix-container">
          <header className="mu-section-head">
            <div>
              <span className="ix-eyebrow">PERFORMANCE</span>
              <h2>演奏记录</h2>
            </div>
            <span className="mu-count">KEYBOARD · 03 TRACKS</span>
          </header>

          <div className="mu-perf-grid">
            <div className="mu-perf-main">
              <InterestVideo
                item={page.performance[2]}
                activeId={activeId}
                onActivate={activate}
                variant="feature"
                posterMode="fit"
              />
            </div>
            <div className="mu-perf-side">
              {page.performance.slice(0, 2).map((item) => (
                <InterestVideo
                  key={item.id}
                  item={item}
                  activeId={activeId}
                  onActivate={activate}
                  variant="compact"
                  posterMode="fit"
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      <MusicWorks
        items={page.arrangement}
        activeId={activeId}
        onActivate={activate}
      />

    </InterestShell>
  )
}
