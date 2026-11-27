// 鹅岛系统架构图：四层纵向结构 + SVG 细线连接 + 克制的数据流动。
// 仅服务 campus-wall 项目页；使用现有 React / CSS / SVG，不引入动画库。
// 动画由 CSS 驱动，React 只负责可见性、焦点态与节点展开。

import { useEffect, useId, useRef, useState } from 'react'
import './campus-architecture.css'

const LAYERS = [
  {
    id: 'access',
    no: '01',
    title: '接入层',
    note: '浏览器请求与身份校验从这里进入。',
    nodes: [
      {
        id: 'react',
        label: 'React + TypeScript',
        sub: '页面与交互',
        detail: '负责页面渲染、交互与类型约束。',
      },
      {
        id: 'rest',
        label: 'REST API',
        sub: '前后端接口',
        detail: '前端通过 REST 接口获取与提交数据。',
      },
      {
        id: 'auth',
        label: '用户登录 / 身份认证 / 权限校验',
        sub: '学号认证 · 角色',
        detail: '区分普通用户与认证用户，并按角色限制后台操作。',
      },
    ],
  },
  {
    id: 'business',
    no: '02',
    title: '业务层',
    note: '动态、社团、成长值与订单审核在此编排。',
    nodes: [
      {
        id: 'posts',
        label: '动态 / 评论',
        sub: '校园信息流',
        detail: '承载校园动态发布、评论互动与内容展示。',
      },
      {
        id: 'clubs',
        label: '社团 / 活动',
        sub: '注册 · 继任',
        detail: '覆盖社团注册、继任转移与活动发布。',
      },
      {
        id: 'growth',
        label: '成长值',
        sub: '累计有效值',
        detail: '按累计有效值记录用户成长。',
      },
      {
        id: 'orders',
        label: '订单 / 审核',
        sub: '文创 · 复核',
        detail: '连接社团服务、文创订单与人工审核状态。',
      },
    ],
  },
  {
    id: 'data',
    no: '03',
    title: '数据层',
    note: 'Prisma 统一读写，MySQL 持久化，Redis 缓存。',
    nodes: [
      {
        id: 'mysql',
        label: 'MySQL',
        sub: '持久化',
        detail: '保存用户、内容、社团与订单等业务数据。',
      },
      {
        id: 'prisma',
        label: 'Prisma',
        sub: '数据访问',
        detail: '以统一的数据模型承接业务查询与写入。',
      },
      {
        id: 'redis',
        label: 'Redis',
        sub: '缓存 / 会话',
        detail: '承担缓存与会话状态，降低重复读取。',
      },
    ],
  },
  {
    id: 'runtime',
    no: '04',
    title: '运行层',
    note: 'Ubuntu、Nginx 与 HTTPS 承载部署与访问。',
    nodes: [
      {
        id: 'ubuntu',
        label: 'Ubuntu',
        sub: '服务器',
        detail: '承载应用与数据库进程的服务器环境。',
      },
      {
        id: 'nginx',
        label: 'Nginx',
        sub: 'Web 服务',
        detail: '提供站点访问与前端资源服务。',
      },
      {
        id: 'https',
        label: 'HTTPS',
        sub: '加密访问',
        detail: '为站点访问提供加密传输。',
      },
      {
        id: 'env',
        label: '测试 / 正式环境',
        sub: '分阶段同步',
        detail: '先在测试环境验证，再同步到正式环境。',
      },
    ],
  },
]

const CONNECTORS = [
  { id: 'origin-access', layers: ['access'], delay: '0.18s' },
  { id: 'access-business', layers: ['access', 'business'], delay: '0.42s' },
  { id: 'business-data', layers: ['business', 'data'], delay: '0.66s' },
  { id: 'data-runtime', layers: ['data', 'runtime'], delay: '0.9s' },
]

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()

    if (query.addEventListener) query.addEventListener('change', update)
    else query.addListener(update)

    return () => {
      if (query.removeEventListener) query.removeEventListener('change', update)
      else query.removeListener(update)
    }
  }, [])

  return reduced
}

function Connector({ connector, focus }) {
  const isActive = Boolean(focus) && connector.layers.includes(focus)
  const isDim = Boolean(focus) && !isActive

  return (
    <div
      className={`arch-connector${isActive ? ' is-active' : ''}${isDim ? ' is-dim' : ''}`}
      style={{ '--delay': connector.delay }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 40 100" preserveAspectRatio="none" focusable="false">
        <line className="arch-link-base" x1="20" y1="0" x2="20" y2="100" pathLength="100" vectorEffect="non-scaling-stroke" />
        <line className="arch-link-down" x1="10" y1="0" x2="10" y2="100" vectorEffect="non-scaling-stroke" />
        <line className="arch-link-up" x1="30" y1="0" x2="30" y2="100" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  )
}

function Node({ node, layerId, expanded, onToggle }) {
  const isOpen = expanded === node.id
  const detailId = `arch-${layerId}-${node.id}-detail`

  const handleKeyDown = (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    onToggle(node.id)
  }

  return (
    <button
      type="button"
      className={`arch-node${isOpen ? ' is-open' : ''}`}
      aria-expanded={isOpen}
      aria-controls={detailId}
      onClick={() => onToggle(node.id)}
      onKeyDown={handleKeyDown}
    >
      <span className="arch-node-label">{node.label}</span>
      <small className="arch-node-sub">{node.sub}</small>
      <span
        className={`arch-node-detail${isOpen ? ' is-open' : ''}`}
        id={detailId}
        aria-hidden={!isOpen}
      >
        {node.detail}
      </span>
    </button>
  )
}

function Layer({ layer, index, focus, onFocus, onLeave, expanded, onToggle }) {
  const isFocus = focus === layer.id
  const isDim = Boolean(focus) && !isFocus

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) onLeave()
  }

  const handleMouseLeave = (event) => {
    const active = document.activeElement
    if (active && event.currentTarget.contains(active)) return
    onLeave()
  }

  return (
    <section
      className={`arch-layer arch-layer-${layer.id}${isFocus ? ' is-focus' : ''}${isDim ? ' is-dim' : ''}`}
      style={{ '--delay': `${0.26 + index * 0.24}s` }}
      aria-label={`${layer.no} ${layer.title}`}
      tabIndex={0}
      onMouseEnter={onFocus}
      onMouseLeave={handleMouseLeave}
      onFocus={onFocus}
      onBlur={handleBlur}
    >
      <div className="arch-layer-rail">
        <span className="arch-layer-no">{layer.no}</span>
        <span className="arch-layer-rule" />
      </div>

      <div className="arch-layer-body">
        <header className="arch-layer-head">
          <h3>{layer.title}</h3>
          <p>{layer.note}</p>
        </header>

        <div className="arch-nodes">
          {layer.nodes.map((node) => (
            <Node
              key={node.id}
              node={node}
              layerId={layer.id}
              expanded={expanded}
              onToggle={onToggle}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function CampusSystemArchitecture() {
  const headingId = useId()
  const rootRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [inView, setInView] = useState(false)
  const [focus, setFocus] = useState(null)
  const [expanded, setExpanded] = useState(null)
  const reduced = usePrefersReducedMotion()

  const toggleNode = (nodeId) => {
    setExpanded((current) => (current === nodeId ? null : nodeId))
  }

  const handleRootMouseLeave = (event) => {
    const active = document.activeElement
    if (active && event.currentTarget.contains(active)) return
    setFocus(null)
  }

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    if (reduced) {
      setVisible(true)
      setInView(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.18, rootMargin: '0px 0px -6% 0px' },
    )

    observer.observe(root)
    return () => observer.disconnect()
  }, [reduced])

  return (
    <section
      ref={rootRef}
      className={`arch${visible ? ' is-visible' : ''}${inView ? ' is-inview' : ' is-paused'}${reduced ? ' is-reduced' : ''}`}
      aria-labelledby={headingId}
      onMouseLeave={handleRootMouseLeave}
    >
      <header className="arch-head">
        <div className="arch-head-copy">
          <span className="arch-kicker">系统架构 / 调用关系</span>
          <h2 id={headingId}>从用户访问到数据运行</h2>
          <p>前端接入、业务处理、数据存储与服务器部署，共同支撑校园社区的核心业务。</p>
        </div>

        <div className="arch-legend" aria-label="数据流向图例">
          <span className="arch-legend-item is-request"><i />请求</span>
          <span className="arch-legend-item is-response"><i />响应</span>
        </div>
      </header>

      <div className="arch-board" role="group" aria-label="鹅岛四层系统架构">
        <div className="arch-origin">
          <span className="arch-origin-dot" aria-hidden="true" />
          <span className="arch-origin-label">用户访问</span>
          <small>浏览器 / 移动端</small>
        </div>

        <div className="arch-connector-wrap">
          <Connector connector={CONNECTORS[0]} focus={focus} />
          <span className="arch-connector-caption" aria-hidden="true">请求进入</span>
        </div>

        <Layer
          layer={LAYERS[0]}
          index={0}
          focus={focus}
          expanded={expanded}
          onToggle={toggleNode}
          onFocus={() => setFocus(LAYERS[0].id)}
          onLeave={() => setFocus(null)}
        />
        <div className="arch-connector-wrap">
          <Connector connector={CONNECTORS[1]} focus={focus} />
        </div>

        <Layer
          layer={LAYERS[1]}
          index={1}
          focus={focus}
          expanded={expanded}
          onToggle={toggleNode}
          onFocus={() => setFocus(LAYERS[1].id)}
          onLeave={() => setFocus(null)}
        />
        <div className="arch-connector-wrap">
          <Connector connector={CONNECTORS[2]} focus={focus} />
        </div>

        <Layer
          layer={LAYERS[2]}
          index={2}
          focus={focus}
          expanded={expanded}
          onToggle={toggleNode}
          onFocus={() => setFocus(LAYERS[2].id)}
          onLeave={() => setFocus(null)}
        />
        <div className="arch-connector-wrap">
          <Connector connector={CONNECTORS[3]} focus={focus} />
        </div>

        <Layer
          layer={LAYERS[3]}
          index={3}
          focus={focus}
          expanded={expanded}
          onToggle={toggleNode}
          onFocus={() => setFocus(LAYERS[3].id)}
          onLeave={() => setFocus(null)}
        />
      </div>

      <p className="arch-hint">悬停或聚焦查看层级 · 点击节点查看技术职责</p>
    </section>
  )
}
