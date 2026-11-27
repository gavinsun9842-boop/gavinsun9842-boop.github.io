// 未知项目 slug 的统一 404 提示页，视觉与全站红黑体系一致。

import { navigate } from '../router'

export default function NotFound() {
  return (
    <div className="pd-page">
      <header className="nav pd-nav">
        <div className="nav-inner container">
          <a
            className="brand"
            href="/"
            onClick={(e) => {
              e.preventDefault()
              navigate('/')
            }}
            aria-label="回到首页"
          >
            <span className="brand-mark">GS</span>
            <span className="brand-text">GAVIN SUN<span> / PORTFOLIO</span></span>
          </a>
        </div>
      </header>

      <main className="pd-404 container">
        <div className="pd-404-kicker">404 / NOT FOUND</div>
        <h1>这个项目不存在</h1>
        <p>你访问的链接可能已失效，或项目尚未收录。</p>
        <a
          className="pd-404-action"
          href="/#work"
          onClick={(e) => {
            e.preventDefault()
            navigate('/#work')
          }}
        >
          返回精选项目 ↗
        </a>
      </main>
    </div>
  )
}
