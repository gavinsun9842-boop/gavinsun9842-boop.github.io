// Inner Space 详情页 Hero：静态有机艺术主视觉，全幅铺底，无动画。
// 只由 ProjectHero 在 heroVisual === 'inner' 时挂载。

import { resolveAsset } from '../lib/media'
import './InnerSpaceHeroVisual.css'

export default function InnerSpaceHeroVisual() {
  return (
    <div className="is-hero" aria-hidden="true">
      <img
        className="is-still"
        src={resolveAsset('/projects/inner-space/hero.png')}
        alt=""
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
      <div className="is-scrim" />
      <div className="is-vignette" />
    </div>
  )
}
