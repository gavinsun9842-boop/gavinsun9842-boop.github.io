// 首页 03 / BEYOND THE PROJECTS：三个兴趣专题入口。
// 统一三列卡片的信息层级，让中文兴趣名称成为第一视觉；图片使用真实素材，不借用示意图。

import { interestTopics } from '../content/interests/index.js'
import { navigate } from '../router.js'
import { resolveAsset } from '../lib/media'

const presentation = {
  music: {
    en: 'MUSIC PRODUCTION',
    cn: '音乐制作',
    cover: '/assets/interests/music/covers/music-entry-mwave-neon.jpg',
    alt: '蓝红霓虹光下的 M-WAVE MIDI 键盘、打击垫与旋钮控制面板',
  },
  photography: {
    en: 'PHOTOGRAPHY',
    cn: '摄影',
    cover: '/assets/interests/photography/originals/p07-blue-facade-1600.jpg',
    alt: '蓝玻璃幕墙建筑仰视，冷色天空与柱子形成清晰的空间结构',
  },
  modeling: {
    en: '3D MODELING',
    cn: '三维建模',
    cover: '/assets/interests/modeling/covers/modeling-entry-north-gate.jpg',
    alt: 'Blender 制作的北门入口远景：石质牌楼、灯笼与向纵深延伸的场景',
    status: '制作中',
  },
}

const cards = interestTopics.map((topic) => ({
  ...topic,
  ...presentation[topic.slug],
}))

export function InterestsTeaser() {
  return (
    <section className="section beyond" id="beyond">
      <div className="container">
        <header className="beyond-head">
          <div className="beyond-kicker reveal">
            BEYOND THE PROJECTS
          </div>
          <h2 className="beyond-title reveal">
            <span>我的其它</span><span>兴趣爱好</span>
          </h2>
        </header>

        <div className="beyond-grid">
          {cards.map((card) => (
            <a
              className={`beyond-item beyond-item--${card.slug} reveal`}
              href={`#${card.route}`}
              key={card.slug}
              aria-label={`进入${card.cn}专题`}
              onClick={(event) => {
                event.preventDefault()
                navigate(card.route)
              }}
            >
              <figure className="beyond-media">
                <img src={resolveAsset(card.cover)} alt={card.alt} loading="lazy" decoding="async" />
                {card.status && <span className="beyond-status">{card.status}</span>}
              </figure>

              <div className="beyond-copy">
                <span className="beyond-label">{card.en}</span>
                <h3>{card.cn}</h3>
                <span className="beyond-open" aria-hidden="true">↗</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
