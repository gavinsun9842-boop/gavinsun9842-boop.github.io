// 项目独立详情页：编辑式主视觉 + STAR 叙事 + 媒体图集 + 灯箱。
// 所有事实内容来自 src/content/projects，组件不补写经历、数据或素材说明。

import { useEffect, useMemo } from 'react'
import { projectBySlug } from '../content/projects'
import { navigate } from '../router'
import { getCurrentEntryOrigin } from '../scrollMemory.js'
import { annotateMedia } from '../lib/figures'
import { resolveAsset } from '../lib/media'
import { LightboxProvider } from '../components/Lightbox'
import { ProjectHero, StarSection, RelatedProject } from '../components/layout'
import { HighlightStrip } from '../components/media'

export default function ProjectDetail({ project }) {
  const data = useMemo(() => annotateMedia(project), [project])
  const related = data.relatedSlug ? projectBySlug(data.relatedSlug) : null

  // 独立页面标题 / description；离开时还原为首页默认值。
  useEffect(() => {
    const prevTitle = document.title
    const meta = document.querySelector('meta[name="description"]')
    const prevDesc = meta ? meta.content : undefined
    document.title = `${project.title} — Gavin Sun`
    if (meta) meta.content = project.subtitle

    return () => {
      document.title = prevTitle
      if (meta && prevDesc !== undefined) meta.content = prevDesc
    }
  }, [project])

  // 详情页视口渐显；章节、阶段、图片进入视口时揭示。
  useEffect(() => {
    const nodes = document.querySelectorAll('.pd-page .reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [project])

  const go = (target) => {
    if (target === '#work') {
      // 从首页进入时回到原历史记录，恢复原滚动位置；直接打开详情时仍落到精选项目。
      if (getCurrentEntryOrigin() === '/') {
        window.history.back()
        return
      }
      navigate('/#work')
      return
    }
    navigate(`/projects/${target}`)
  }

  const goHome = (event) => {
    event.preventDefault()
    navigate('/')
  }

  return (
    <LightboxProvider>
      <div className="pd-page">
        <header className="nav pd-nav">
          <div className="nav-inner container">
            <a
              className="brand"
              href="/"
              onClick={goHome}
              aria-label="回到首页"
            >
              <span className="brand-mark">GS</span>
              <span className="brand-text">GAVIN SUN<span> / PORTFOLIO</span></span>
            </a>
            <nav className="pd-nav-right" aria-label="详情页导航">
              <a href="/#work" onClick={(e) => { e.preventDefault(); go('#work') }}>← 精选项目</a>
            </nav>
          </div>
        </header>

        <main>
          <ProjectHero project={data} />

          <div className="container pd-body">
            {data.highlights && data.highlights.length > 0 && (
              <section className="pd-hl reveal" aria-label="项目关键成果">
                <HighlightStrip block={{ items: data.highlights }} />
              </section>
            )}

            {data.groups
              ? data.groups.map((group) => (
                  <section className="pd-group" key={group.title}>
                    <header className={`pd-group-head reveal ${group.cover ? '' : 'no-cover'}`}>
                      <div className="pd-group-text">
                        <span className="pd-group-tag">{group.tag}</span>
                        <h2>{group.title}</h2>
                        {group.subtitle && <p>{group.subtitle}</p>}
                      </div>
                      {group.cover && (
                        <figure className="pd-group-cover">
                          <img src={resolveAsset(group.cover.src)} alt={group.cover.alt || ''} loading="lazy" />
                          {group.cover.caption && <figcaption>{group.cover.caption}</figcaption>}
                        </figure>
                      )}
                    </header>
                    {group.sections.map((section) => <StarSection key={section.key} section={section} />)}
                  </section>
                ))
              : data.sections.map((section) => <StarSection key={section.key} section={section} />)}
          </div>

          {related && (
            <div className="container pd-related-wrap">
              <RelatedProject
                project={related}
                label={data.relatedLabel}
                onGo={go}
              />
            </div>
          )}
        </main>
      </div>
    </LightboxProvider>
  )
}
