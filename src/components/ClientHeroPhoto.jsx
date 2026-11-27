// 灵植双效舱客户端 Hero：全幅植物舱环境主视觉。
// 只由 ProjectHero 在 heroVisual === 'client-photo' 时挂载；原 ClientHeroVisual 保留为可回退版本。

import { resolveAsset } from '../lib/media'
import './ClientHeroPhoto.css'

export default function ClientHeroPhoto() {
  return (
    <div className="pch-stage" aria-hidden="true">
      <img
        className="pch-photo"
        src={resolveAsset('/projects/lingzhi-client/hero.jpg')}
        alt=""
        loading="eager"
        decoding="async"
        fetchpriority="high"
      />
      <div className="pch-scrim" />
      <div className="pch-vignette" />
      <span className="pch-label">CLIENT / ENVIRONMENT</span>
      <span className="pch-index">LINGZHI · DUAL-ACTION CABIN</span>
    </div>
  )
}
