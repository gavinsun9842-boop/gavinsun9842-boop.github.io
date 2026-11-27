// AI 智启油茶香 Hero：全幅油茶风味主视觉。
// 只由 ProjectHero 在 heroVisual === 'oiltea-photo' 时挂载；原 OilTeaHeroVisual 保留为可回退版本。

import { resolveAsset } from '../lib/media'
import './OilTeaHeroPhoto.css'

export default function OilTeaHeroPhoto() {
  return (
    <div className="oth-stage" aria-hidden="true">
      <img
        className="oth-photo"
        src={resolveAsset('/projects/oil-tea-ai/hero.jpg')}
        alt=""
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
      <div className="oth-scrim" />
      <div className="oth-vignette" />
      <span className="oth-label">HERITAGE / TEA CRAFT</span>
      <span className="oth-index">TRADITION, REIMAGINED</span>
    </div>
  )
}
