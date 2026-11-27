import { modelingPage } from '../../content/interests/modeling.js'
import { resolveAsset } from '../../lib/media'
import { InterestShell } from '../../components/interests/InterestShell.jsx'

export default function ModelingPage() {
  const page = modelingPage

  return (
    <InterestShell slug="modeling">
      <section className="md-hero">
        <div className="ix-container md-hero-grid">
          <div className="md-hero-copy">
            <h1>
              <span>3D</span>
              <span>MODELING</span>
            </h1>
            <h2>{page.themeEn}</h2>
            <p className="md-hero-cn">{page.themeCn}</p>
            <p className="md-hero-lead">{page.intro.lead}</p>
            <p className="md-hero-note">{page.intro.note}</p>
          </div>

          <figure className="md-hero-viewport">
            <img src={resolveAsset(page.hero.image)} alt={page.hero.alt} />
            <span className="md-viewport-grain" aria-hidden="true" />
            <div className="md-viewport-top">
              <span>{page.hero.top}</span>
            </div>
            <div className="md-viewport-bottom">
              <span>{page.hero.label}</span>
            </div>
          </figure>
        </div>
      </section>

      <section className="md-arc">
        <div className="ix-container">
          <header className="md-arc-head">
            <div>
              <span className="ix-eyebrow">{page.manifesto.kicker}</span>
              <h2>
                {page.manifesto.titleLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h2>
            </div>
            <p>{page.manifesto.body}</p>
          </header>

          <div className="md-arc-flow" aria-label="从想象到探索的过程">
            {page.manifesto.flow.map((step) => (
              <div className="md-arc-flow-item" key={step.no}>
                <span className="md-arc-flow-no">{step.no}</span>
                <span className="md-arc-flow-en">{step.en}</span>
                <span className="md-arc-flow-cn">{step.cn}</span>
              </div>
            ))}
          </div>

          <div className="md-arc-directions">
            {page.manifesto.directions.map((direction) => (
              <article className="md-arc-row" key={direction.no}>
                <span className="md-arc-row-no">{direction.no}</span>
                <div className="md-arc-row-name">
                  <h3>{direction.en}</h3>
                  <span>{direction.cn}</span>
                </div>
                <p>{direction.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="md-subjects">
        <div className="ix-container">
          <header className="md-section-head">
            <div>
              <span className="ix-eyebrow">SELECTED WORK</span>
              <h2>我的建模作品</h2>
            </div>
            <span className="md-count">03 CATEGORIES / IN PROGRESS</span>
          </header>

          <p className="md-works-lead">{page.worksIntro}</p>

          <div className="md-category-head">
            <span className="md-category-no">{page.assets.no}</span>
            <div className="md-category-name">
              <h3>{page.assets.en}</h3>
              <span>{page.assets.cn}</span>
            </div>
            <p className="md-category-note">{page.assets.note}</p>
          </div>

          <div className="md-subject-grid">
            {page.subjects.map((item, index) => (
              <article className={`md-subject md-subject--${index + 1}`} key={item.id}>
                <figure className="md-subject-media">
                  <img src={resolveAsset(index === 0 ? item.image : item.thumb)} alt={item.alt} loading="lazy" />
                </figure>
                <div className="md-subject-copy">
                  <h3>{item.title}<small>{item.en}</small></h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="md-rig">
        <div className="ix-container md-rig-grid">
          <figure className="md-rig-media">
            <img src={resolveAsset(page.rig.thumb)} alt={page.rig.alt} loading="lazy" />
          </figure>
          <div className="md-rig-copy">
            <span className="ix-eyebrow">{page.rig.no} / {page.rig.en} / {page.rig.cn}</span>
            <h2>{page.rig.title}</h2>
            <p>{page.rig.body}</p>
          </div>
        </div>
      </section>

      <section className="md-env">
        <div className="ix-container md-env-grid">
          <div className="md-env-copy">
            <span className="ix-eyebrow">{page.environment.no} / {page.environment.en} / {page.environment.cn}</span>
            <h2>{page.environment.title}</h2>
            <p>{page.environment.body}</p>
          </div>
          <figure className="md-env-media">
            <img src={resolveAsset(page.environment.image)} alt={page.environment.alt} loading="lazy" />
            <figcaption>
              <span>{page.environment.meta}</span>
              <span>{page.environment.caption}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="md-scene">
        <div className="ix-container">
          <header className="md-scene-head">
            <div>
              <span className="ix-eyebrow">{page.game.kicker}</span>
              <h2>
                {page.game.titleLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h2>
            </div>
            <p>{page.game.body}</p>
          </header>

          <figure className="md-scene-media">
            <img src={resolveAsset(page.game.image)} alt={page.game.alt} />
            <figcaption>
              <span>{page.game.meta}</span>
              <span>{page.game.caption}</span>
            </figcaption>
          </figure>

          <p className="md-game-coda">{page.game.coda}</p>
        </div>
      </section>

    </InterestShell>
  )
}
