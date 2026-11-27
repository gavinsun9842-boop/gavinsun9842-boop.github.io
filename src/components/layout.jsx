// 详情页版式组件：主视觉、信息面板、STAR 章节、项目分页器。

import { resolveAsset } from '../lib/media'
import { BlockList } from '../projectBlocks'
import OrganicLifeCanvas from './OrganicLifeCanvas'
import ClientHeroVisual from './ClientHeroVisual'
import ClientHeroPhoto from './ClientHeroPhoto'
import InnerSpaceHeroVisual from './InnerSpaceHeroVisual'
import OilTeaHeroVisual from './OilTeaHeroVisual'
import OilTeaHeroPhoto from './OilTeaHeroPhoto'

export function ProjectHero({ project }) {
  const organic = project.heroVisual === 'organic'
  const client = project.heroVisual === 'client'
  const clientPhoto = project.heroVisual === 'client-photo'
  const innerSpace = project.heroVisual === 'inner'
  const oilTea = project.heroVisual === 'oiltea'
  const oilTeaPhoto = project.heroVisual === 'oiltea-photo'
  const heroBackground = Boolean(project.heroBackground)

  return (
    <header className={`ph ${organic ? 'ph-organic' : ''} ${client ? 'ph-client' : ''} ${clientPhoto ? 'ph-client-photo' : ''} ${innerSpace ? 'ph-inner-space' : ''} ${oilTea ? 'ph-oiltea' : ''} ${oilTeaPhoto ? 'ph-oiltea-photo' : ''} ${heroBackground ? 'ph-has-bg' : ''}`}>
      {heroBackground && project.cover && (
        <div className="ph-bg" aria-hidden="true">
          <img
            src={resolveAsset(project.cover.src)}
            alt=""
            loading="eager"
            decoding="async"
          />
        </div>
      )}
      {organic && <OrganicLifeCanvas />}
      {clientPhoto && <ClientHeroPhoto />}
      {innerSpace && <InnerSpaceHeroVisual />}
      {oilTeaPhoto && <OilTeaHeroPhoto />}
      <div className="container ph-inner">
        <div className="ph-copy">
          <span className="ph-kicker">{project.kicker}</span>
          <h1 className="ph-title">
            {project.titleLines
              ? project.titleLines.map((line) => <span key={line}>{line}</span>)
              : project.title}
          </h1>
          <p className="ph-sub">{project.subtitle}</p>

          {project.stack && project.stack.length > 0 && (
            <div className="ph-stack">
              {project.stack.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          )}

          {project.links && project.links.length > 0 && (
            <div className="ph-links">
              {project.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                  {link.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          )}

        </div>

        {!heroBackground && !organic && !innerSpace && !clientPhoto && !oilTeaPhoto && (
          <div className="ph-visual">
            {oilTea ? (
              <OilTeaHeroVisual />
            ) : client ? (
              <ClientHeroVisual title={project.title} />
            ) : project.cover ? (
              <figure className={`ph-cover ${project.cover.fit === 'contain' ? 'is-contain' : ''}`}>
                <img
                  src={resolveAsset(project.cover.src)}
                  alt={project.cover.alt || `${project.title} 项目主视觉`}
                  style={project.cover.ratio ? { aspectRatio: project.cover.ratio } : undefined}
                  loading="eager"
                  decoding="async"
                />
                <figcaption>
                  {project.cover.caption && <span>{project.cover.caption}</span>}
                </figcaption>
              </figure>
            ) : null}
          </div>
        )}
      </div>

      <div className="container">
        <dl className="pm">
          {project.role && (
            <div className="pm-cell">
              <dt>角色</dt>
              <dd>{project.role}</dd>
            </div>
          )}
          {project.timeframe && (
            <div className="pm-cell">
              <dt>时间</dt>
              <dd>{project.timeframe}</dd>
            </div>
          )}
          {project.scene && (
            <div className="pm-cell pm-wide">
              <dt>场景 / 用户</dt>
              <dd>{project.scene}</dd>
            </div>
          )}
          {project.award && (
            <div className="pm-cell pm-accent">
              <dt>奖项</dt>
              <dd>{project.award}</dd>
            </div>
          )}
          {project.status && (
            <div className="pm-cell pm-wide">
              <dt>状态</dt>
              <dd>{project.status}</dd>
            </div>
          )}
        </dl>
      </div>
    </header>
  )
}

export function StarSection({ section }) {
  const hasChapterNo = Boolean(section.no)

  return (
    <section className={`star ${hasChapterNo ? 'star-chapter' : ''} star-${section.key.toLowerCase()} reveal`} data-key={section.key}>
      <div className="star-rail">
        <span className={`star-key ${hasChapterNo ? 'is-number' : ''}`} aria-hidden="true">{section.no || section.key}</span>
        <h2>{section.title}</h2>
        <span className="star-rule" aria-hidden="true" />
      </div>

      <div className="star-body">
        {section.lead && <p className="star-lead">{section.lead}</p>}
        {section.stages ? (
          <div className="stages">
            {section.stages.map((stage) => (
              <div className={`stage stage-${stage.layout || 'flow'} reveal`} key={stage.no}>
                <div className="stage-head">
                  <span className="stage-no">{stage.no}</span>
                  <h3>{stage.title}</h3>
                  {stage.note && <span className="stage-note">{stage.note}</span>}
                </div>
                <BlockList blocks={stage.blocks} />
              </div>
            ))}
          </div>
        ) : (
          <BlockList blocks={section.blocks} />
        )}
      </div>
    </section>
  )
}

export function RelatedProject({ project, label, onGo }) {
  if (!project) return null
  return (
    <section className="related-project" aria-label={label || '关联项目'}>
      <a
        className={`pager-card related-card ${project.thumb ? '' : 'no-thumb'}`}
        href={`#/projects/${project.slug}`}
        onClick={(e) => { e.preventDefault(); onGo(project.slug) }}
      >
        {project.thumb && <img src={resolveAsset(project.thumb)} alt="" loading="lazy" />}
        <span className="pager-body">
          <span className="pager-dir">{label || '关联项目'}</span>
          <span className="pager-title">{project.title}</span>
          {project.subtitle && <span className="related-card-note">{project.subtitle}</span>}
        </span>
      </a>
    </section>
  )
}

