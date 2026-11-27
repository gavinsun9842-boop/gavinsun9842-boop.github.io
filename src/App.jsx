import { useEffect, useRef, useState } from 'react'
import AuroraBlur from './AuroraBlur.jsx'
import { useSpotlightCard } from './effects.jsx'
import { useRoute, matchProjectSlug, matchInterestSlug, navigate, projectUrl } from './router.js'
import { useScrollRestoration, hasRestoredCurrentEntry } from './scrollMemory.js'
import { projectBySlug } from './content/projects/index.js'
import { wallAwards } from './content/awards.js'
import { LightboxProvider } from './components/Lightbox.jsx'
import AwardsWall from './components/AwardsWall.jsx'
import { InterestsTeaser } from './components/InterestsTeaser.jsx'
import { FutureVision } from './components/FutureVision.jsx'
import { EdgeVisual } from './components/EdgeVisuals.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import InterestDetail from './pages/InterestDetail.jsx'
import NotFound from './pages/NotFound.jsx'

// 联系方式占位：后续替换这里即可，页面会自动更新。
const profile = {
  nameCN: '孙国轩',
  nameEN: 'Gavin Sun',
  role: 'AI 应用开发 / 全栈工程 / 智能硬件原型/结构设计',
  location: 'China',
  school: '南宁市第二中学',
    email: 'xuanguosun@foxmail.com',
    github:'github.com/gavinsun9842-boop'
}

const asset = (file) => `${import.meta.env.BASE_URL}assets/${file}`
const media = (file) => `${import.meta.env.BASE_URL}${file.replace(/^\//, '')}`

const navItems = [
  { id: 'overview', label: 'OVERVIEW' },
  { id: 'edge', label: 'EDGE' },
  { id: 'work', label: 'WORK' },
  { id: 'beyond', label: 'BEYOND' },
  { id: 'future', label: 'FUTURE' },
]

const overviewEducation = [
  {
    title: '南宁市第二中学',
    meta: 'HIGH SCHOOL · NANNING',
    desc: '高中在读，持续实践 AI 应用、全栈工程与智能硬件项目。',
  },
  {
    title: '犀牛鸟中学科学人才培养计划',
    meta: 'RESEARCH FOUNDATION · 2025',
    desc: '完成 31 课时科研基础课程，通过考核，成绩优秀。',
  },
  {
    title: '清华大学-腾讯互联网创新技术联合实验室',
    meta: 'CERTIFICATION · 2025',
    desc: '中学科学人才培养计划认证。',
  },
]

const overviewTech = [
  {
    title: 'AI 辅助全栈开发',
    meta: 'React / TypeScript / Node.js / Express / Prisma / MySQL / Redis / AI Agent 协作开发',
  },
  {
    title: '人工智能与应用开发',
    meta: 'Python / CNN / RAG / 计算机视觉 / 大语言模型应用开发',
  },
  {
    title: '物联网与智能硬件',
    meta: 'ESP32 / Arduino / MQTT / 传感器应用 / 3D 打印',
  },
  {
    title: '数字设计与三维创作',
    meta: 'Blender / Unreal Engine 5 / Photoshop / Premiere',
  },
]

const projects = [
  {
    id: '01',
    slug: 'campus-wall',
    kicker: 'FULL-STACK / CAMPUS COMMUNITY',
    title: '鹅岛',
    subtitle: '从真实校园需求出发，完成产品设计、系统开发、部署备案，并在校方指导下推进整改。',
    image: media('projects/campus-wall/cover.jpg'),
    wide: true,
    tags: ['React', 'TypeScript', 'Node.js', 'Prisma', 'MySQL'],
    meta: ['测试 / 正式双环境', 'ICP + 公安备案'],
    href: 'https://nnezxyq.cn',
  },
  {
    id: '02',
    slug: 'lingzhi-cabin',
    kicker: 'IOT / AI VISION / HARDWARE',
    title: '灵植双效舱',
    subtitle: 'AI 视觉辅助的一体化自动化无土栽培硬件系统。',
    image: media('projects/lingzhi-cabin/card-plants.png'),
    imagePosition: '50% 35%',
    wide: true,
    tags: ['Arduino', 'MQTT', '3D 建模'],
    meta: ['11 单元舱体', '5 项竞赛奖项'],
  },
  {
    id: '03',
    slug: 'lingzhi-client',
    kicker: 'IOT / CLIENT / MINI PROGRAM',
    title: '灵植双效舱客户端小程序',
    subtitle: '配套硬件的原生微信小程序 + Flask 网页端。',
    image: media('projects/lingzhi-client/card-dashboard.jpg'),
    tags: ['微信小程序', 'Flask', 'MQTT', 'GLM'],
    meta: ['小程序 + Flask 网页端', '大赛二等奖'],
  },
  {
    id: '04',
    slug: 'inner-space',
    kicker: 'AI / MENTAL HEALTH',
    title: '心界 Inner Space',
    subtitle: '面向青少年的心理健康支持微信小程序。',
    image: media('projects/inner-space/card-cover.png'),
    tags: ['微信小程序', 'GLM', 'SCL-90'],
    meta: ['17 页面 / 8 模块', '大赛一等奖'],
  },
  {
    id: '05',
    slug: 'oil-tea-ai',
    kicker: 'HARDWARE / HERITAGE TECH',
    title: 'AI 智启油茶香',
    subtitle: '用 AI 与机械造物，转译非遗油茶的“手上密码”。',
    image: media('projects/oil-tea-ai/card-cover.png'),
    imagePosition: '50% 40%',
    wide: true,
    tags: ['CNN', 'Python', '3D 打印', '仿生结构'],
    meta: ['30 样本 CNN 验证', '世校赛银奖'],
  },
]

const advantages = [
  {
    title: '01 / 全栈工程交付',
    desc: 'React / TypeScript 前端、Node.js 服务端、Prisma 数据建模与 MySQL 数据持久化，具备从需求拆解、架构设计到部署交付的完整工程实践。借助 AI Agent 协同完成代码开发与工程任务，由我负责技术方案决策、任务拆解、代码审查、问题排查和质量验证，将想法转化为可访问、可迭代的真实系统。',
    glyph: 'stack',
  },
  {
    title: '02 / AI 应用落地',
    desc: '接入 GLM、DeepSeek 及多模态模型，探索多模型路由与协作机制；借助 AI Agent 协同开展模型微调，训练面向植物长势诊断的领域专家模型；通过 RAG 构建小程序专属知识库，为用户提供基于领域知识的智能问答服务，并探索其在心理陪伴场景中的应用。',
    glyph: 'brain',
  },
  {
    title: '03 / 软硬件一体',
    desc: '具备从数字建模到实体原型制作的实践经验，涉及传感器数据采集、Arduino 控制、MQTT 设备通信、3D 建模与激光切割，能够将结构设计、硬件控制与软件逻辑结合，完成可运行、可交互的实体装置。',
    glyph: 'cube',
  },
  {
    title: '04 / 产品与治理',
    desc: '从真实业务场景抽象客户端身份、角色权限与业务边界，将最小权限原则落实到后端权限校验、内容审核和订单流程中，关注数据一致性、权限隔离、测试与生产环境分离，以及系统的长期可维护性。',
    glyph: 'grid',
  },
  {
    title: '05 / 开发习惯',
    desc: '习惯在「设计—实现—测试—迭代」的循环中快速验证方案。使用 AI Agent 时，先明确任务目标、修改范围与验收标准，再审查执行结果、验证功能并排查问题；对关键变更制定回滚方案，在提高开发效率的同时控制工程风险。',
    glyph: 'arrow',
  },
]

function SectionHeading({ en, cn, desc }) {
  return (
    <div className="section-heading reveal">
      <div className="section-kicker">{en}</div>
      <h2>{cn}</h2>
      {desc && <p>{desc}</p>}
    </div>
  )
}

function ProjectCard({ project }) {
  const spotRef = useSpotlightCard()
  const detailUrl = projectUrl(project.slug)
  return (
    <article
      ref={spotRef}
      data-slug={project.slug}
      className={`project-card reveal ${project.wide ? 'wide' : ''} ${project.slug === 'campus-wall' ? 'is-campus-wall' : ''}`}
      style={{ transitionDelay: `${Number(project.id) * 60}ms` }}
    >
      {project.image && (
        <div className="project-media">
          <img
            src={project.image}
            alt={`${project.title} 项目视觉图`}
            loading="lazy"
            className={project.imageFit === 'contain' ? 'is-contain' : ''}
            style={project.imagePosition ? { objectPosition: project.imagePosition } : undefined}
          />
        </div>
      )}
      <div className="project-shade" />
      <div className="card-glow" aria-hidden="true" />
      <div className="project-content">
        <div className="project-top">
          <span className="project-kicker">{project.kicker}</span>
          {project.href && (
            <a
              className="project-link"
              href={project.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`访问 ${project.title} 正式站点`}
              onClick={(e) => e.stopPropagation()}
            >
              ↗
            </a>
          )}
        </div>
        <div className="project-bottom">
          <h3>{project.title}</h3>
          <p>{project.subtitle}</p>
          <div className="project-meta">
            {project.meta.map((item) => <span key={item}>{item}</span>)}
          </div>
          <div className="project-tags">
            {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </div>
      </div>
      <a
        className="card-detail-link"
        href={`#${detailUrl}`}
        aria-label={`查看 ${project.title} 项目详情`}
        onClick={(e) => {
          e.preventDefault()
          navigate(detailUrl)
        }}
      />
    </article>
  )
}

function EdgeCard({ item, index }) {
  return (
    <article
      className="edge-card reveal"
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="edge-visual" aria-hidden="true">
        <EdgeVisual type={item.glyph} />
      </div>
      <div className="edge-copy">
        <h3>{item.title}</h3>
        <p className="edge-desc">{item.desc}</p>
      </div>
    </article>
  )
}

function useScrollEffects() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setScrolled(doc.scrollTop > 32)
      setProgress(max > 0 ? doc.scrollTop / max : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const hash = window.location.hash
    if (!hash || hasRestoredCurrentEntry()) return
    const timer = window.setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant', block: 'start' })
    }, 120)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal, .stagger')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px' },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return { scrolled, progress }
}

function attachParallax(el, varX, varY, max) {
  if (!el) return () => {}

  let raf = 0

  const onMove = (e) => {
    if (raf) return
    raf = requestAnimationFrame(() => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      el.style.setProperty(varX, `${(px * max * 2).toFixed(1)}px`)
      el.style.setProperty(varY, `${(py * max * 2).toFixed(1)}px`)
    })
  }

  const onLeave = () => {
    el.style.setProperty(varX, '0px')
    el.style.setProperty(varY, '0px')
  }

  el.addEventListener('pointermove', onMove)
  el.addEventListener('pointerleave', onLeave)
  return () => {
    el.removeEventListener('pointermove', onMove)
    el.removeEventListener('pointerleave', onLeave)
    if (raf) cancelAnimationFrame(raf)
  }
}

function HomePage() {
  const { scrolled, progress } = useScrollEffects()
  const edgeRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  // 移动导航是非模态下拉层：支持 Esc、点外关闭，回到桌面断点时自动收起。
  useEffect(() => {
    if (!menuOpen) return undefined

    const desktop = window.matchMedia('(min-width: 1025px)')
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      document.querySelector('.nav-toggle')?.focus()
    }
    const onPointerDown = (event) => {
      if (!event.target.closest('[data-mobile-nav]')) setMenuOpen(false)
    }
    const onDesktop = (event) => {
      if (event.matches) setMenuOpen(false)
    }
    const focusTimer = window.setTimeout(() => {
      document.querySelector('.nav-mobile-panel a')?.focus()
    }, 0)

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    desktop.addEventListener('change', onDesktop)
    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
      desktop.removeEventListener('change', onDesktop)
    }
  }, [menuOpen])

  // 轻量指针视差：仅精确指针且未开启减弱动效时启用。
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined
    if (!window.matchMedia('(pointer: fine)').matches) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const cleanHero = attachParallax(document.querySelector('.hero'), '--hx', '--hy', 9)

    return () => {
      cleanHero()
    }
  }, [])

  // Personal Edge 区域离屏时暂停 SVG 流程动画，避免首页长时间空转。
  useEffect(() => {
    const section = edgeRef.current
    if (!section) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => section.classList.toggle('is-edge-live', entry.isIntersecting),
      { threshold: 0.05 },
    )
    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <LightboxProvider>
    <div className="site">
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />

      <header className={`nav ${scrolled ? 'scrolled' : ''}`} data-mobile-nav>
        <div className="nav-inner container">
          <a href="#top" className="brand" aria-label="回到首页">
            <span className="brand-mark">GS</span>
            <span className="brand-text">GAVIN SUN<span> / PORTFOLIO</span></span>
          </a>
          <nav className="nav-links" aria-label="主导航">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`}>
                {item.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            className="nav-toggle"
            aria-label={menuOpen ? '关闭导航菜单' : '打开导航菜单'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
        {menuOpen && (
          <nav className="nav-mobile-panel" id="mobile-navigation" aria-label="移动端主导航">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section className="hero" id="top">
          <AuroraBlur />
          <div className="hero-overlay" />
          <div className="hero-ghost" aria-hidden="true">GAVIN</div>

          <div className="hero-inner container">
            <div className="hero-topline reveal">
              <span>PORTFOLIO / 2026</span>
              <span className="hero-line" />
              <span>{profile.location}</span>
            </div>

            <div className="hero-copy">
              <h1 className="stagger" style={{ transitionDelay: '80ms' }}>
                <span className="st-line" style={{ '--i': 0 }}>把想法</span><br />
                <span className="st-line outline" style={{ '--i': 1 }}>做成现实</span>
              </h1>
            </div>

            <div className="hero-bottom reveal" style={{ transitionDelay: '280ms' }}>
              <a href="#overview" className="scroll-cue">
                <span className="scroll-line" /> SCROLL
              </a>
            </div>
          </div>
        </section>

        <section className="overview" id="overview">
          <div className="container">
            <div className="overview-card reveal">
              <div className="overview-topbar">
                <div className="overview-top-label">
                  <span>RESUME</span><i /><span>2026</span>
                </div>
                <div className="overview-top-actions">
                  <a className="overview-round" href={`mailto:${profile.email}`} aria-label="发送邮件">↗</a>
                </div>
              </div>

              <div className="overview-main">
                <div className="overview-portrait-wrap">
                  <div className="overview-portrait">
                    <img src={asset('portrait-studio.jpg')} alt="孙国轩" />
                  </div>
                </div>

                <div className="overview-intro">
                  <h2>{profile.nameEN.toUpperCase()}<br /><span>{profile.nameCN}</span></h2>
                  <div className="overview-summary reveal">
                    <div className="overview-statement">
                      <p>
                        我习惯从真实问题出发，将想法拆解为可执行的工程方案，并通过自主学习不断补充所需的知识与技能。在团队协作中，我乐于承担组织与推动者的角色，明确目标、协调资源、推动成员发挥各自优势，将想法一步步转化为能够落地的产品或装置。我重视实践验证与持续迭代。对我来说，一个项目不仅要能被打开、被使用，更要<mark className="hl">经得起真实场景的检验</mark>，并在解决问题的过程中带来新的思考。
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overview-divider" />

              <div className="overview-lower">
                <div className="overview-block">
                  <div className="overview-block-head">
                    <h3>EDUCATION</h3>
                  </div>
                  <div className="overview-timeline">
                    {overviewEducation.map((item) => (
                      <div className="overview-timeline-item" key={item.title}>
                        <strong>{item.title}</strong>
                        <span>{item.meta}</span>
                        <p>{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="overview-block">
                  <div className="overview-block-head">
                    <h3>TECHNICAL SKILLS</h3>
                  </div>
                  <div className="overview-timeline">
                    {overviewTech.map((item) => (
                      <div className="overview-timeline-item" key={item.title}>
                        <strong>{item.title}</strong>
                        <span>{item.meta}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="overview-contact reveal">
                <a href={`mailto:${profile.email}`}><span>EMAIL</span>{profile.email}</a>
                <a href={`https://${profile.github}`} target="_blank" rel="noreferrer"><span>GITHUB</span>{profile.github}</a>
              </div>
            </div>
          </div>
        </section>

        <section ref={edgeRef} className="section edge" id="edge">
          <div className="container">
            <SectionHeading
              en="WHAT I BRING"
              cn="个人优势"
            />
            <div className="edge-grid">
              {advantages.map((item, i) => (
                <EdgeCard key={item.title} item={item} index={i} />
              ))}
            </div>
          </div>
        </section>

        <AwardsWall awards={wallAwards} />

        <section className="section work" id="work">
          <div className="container">
            <SectionHeading
              en="SELECTED WORK"
              cn="精选项目"
              desc="五个不同尺度的项目：一个面向真实校园场景的数字平台，两台智能硬件，两款获奖小程序。"
            />
            <div className="projects-grid">
              {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
            </div>
          </div>
        </section>

        <InterestsTeaser />

        <FutureVision />
      </main>
    </div>
    </LightboxProvider>
  )
}

export default function App() {
  const path = useRoute()
  useScrollRestoration(path)
  const slug = matchProjectSlug(path)

  if (slug) {
    const project = projectBySlug(slug)
    return project ? <ProjectDetail project={project} /> : <NotFound />
  }

  const interestSlug = matchInterestSlug(path)
  if (interestSlug) return <InterestDetail slug={interestSlug} />

  if (path === '/') return <HomePage />
  return <NotFound />
}
