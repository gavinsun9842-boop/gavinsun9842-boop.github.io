// 兴趣专题统一壳层：固定导航、返回首页、页脚。正文布局由三个 Page 各自负责。

import { navigate } from '../../router'
import { getCurrentEntryOrigin } from '../../scrollMemory.js'

function goHome(event, anchor = 'top') {
  event.preventDefault()
  // 首页进入专题时的“← WORK”按返回处理，才能恢复离开前的位置；
  // 品牌标识仍按原有设计回到首页顶部。
  if (anchor === 'work' && getCurrentEntryOrigin() === '/') {
    window.history.back()
    return
  }
  navigate(anchor === 'work' ? '/#work' : '/')
}

export function InterestShell({ slug, children }) {
  return (
    <div className={`ix-page ix-${slug}`}>
      <header className="ix-nav">
        <div className="ix-nav-inner">
          <a
            className="brand ix-brand"
            href="/"
            onClick={(event) => goHome(event, 'top')}
            aria-label="回到首页"
          >
            <span className="brand-mark">GS</span>
            <span className="brand-text">GAVIN SUN<span> / PORTFOLIO</span></span>
          </a>
          <div className="ix-nav-right">
            <a href="/#work" onClick={(event) => goHome(event, 'work')}>← WORK</a>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="ix-footer">
        <div className="ix-footer-inner">
          <span>© 2026 GAVIN SUN</span>
        </div>
      </footer>
    </div>
  )
}
