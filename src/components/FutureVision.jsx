import { resolveAsset } from '../lib/media'
import { GameVision } from './GameVision.jsx'

const chapters = [
  {
    id: 'future-ai',
    no: '01',
    title: '深入研究人工智能',
    paragraphs: [
      '持续关注大语言模型（LLM）、模型推理与部署、多模态学习、AI Agent、智能体协作及自主决策等方向，探索模型能力、系统架构与实际应用之间的联系。',
      '从模型选型、推理框架、ONNX Runtime，到异步任务调度、模型服务化与 Agent 工作流，我希望在真实工程实践中理解 AI 系统的运行机制，并进一步探索 RAG、工具调用、上下文工程及多智能体协作等技术。',
      '不止于调用模型，更希望理解模型、研究模型，并探索如何构建可靠、可扩展的智能系统。',
    ],
  },
  {
    id: 'future-game',
    no: '02',
    title: '深入研究游戏技术',
    paragraphs: [
      '游戏是我希望长期投入的创造性工程领域。',
      '持续探索实时渲染、3D 图形学、游戏引擎架构、物理模拟、动画系统、程序化内容生成（PCG）与游戏 AI 等方向，研究从底层技术到完整游戏产品的实现过程。',
      '从角色与场景建模，到玩法机制、交互系统、关卡设计和叙事表达，我希望逐步建立对现代 3D 游戏研发体系的完整理解，并通过独立项目不断验证技术与创意。',
    ],
  },
  {
    id: 'future-intersection',
    no: '03',
    title: '探索技术交叉的边界',
    paragraphs: [
      '我希望将人工智能领域的研究成果引入游戏研发，探索 AI 与实时交互、虚拟世界及数字角色的深度结合。',
      '从 LLM 驱动的智能 NPC、Agent 自主规划与工具调用，到多模态交互、动态叙事、程序化内容生成，以及面向游戏场景的模型推理与智能决策，探索传统游戏系统之外的新可能。',
      '我期待的不只是让 AI 提高游戏制作效率，而是让 AI 成为游戏世界的一部分，改变角色与玩家的交互方式，拓展游戏内容与体验的边界。',
    ],
  },
]

const researchMap = [
  { href: '#future-ai', no: '01', en: 'AI RESEARCH & ENGINEERING', cn: '人工智能' },
  { href: '#future-game', no: '02', en: 'GAME DEVELOPMENT & COMPUTING', cn: '游戏技术' },
  { href: '#future-intersection', no: '03', en: 'AI × GAME', cn: '技术交叉' },
]

export function FutureVision() {
  const heroImage = `url("${new URL(resolveAsset('/assets/future/hero-wave.jpg'), document.baseURI).href}")`
  return (
    <section className="future" id="future" aria-labelledby="future-title">
      <div className="container future-inner">
        <div
          className="future-hero"
          style={{ '--future-hero-image': heroImage }}
        >
          <div className="future-title-wrap reveal">
            <h2 id="future-title" className="future-display" aria-label="FUTURE VISION">
              <span className="future-word">FUTURE</span>
              <span className="future-word future-word--outline">VISION</span>
            </h2>
            <p className="future-cn-title">
              <span className="future-cn-line">探索智能的边界，</span><span className="future-cn-line">创造更大的可能。</span>
            </p>
          </div>

          <div className="future-thesis reveal">
            <span className="future-thesis-label">研究路径</span>
            <nav className="future-index" aria-label="FUTURE VISION 章节">
              {researchMap.map((item) => (
                <a className="future-index-item" href={item.href} key={item.no}>
                  <div>
                    <strong>{item.en}</strong>
                    <em>{item.cn}</em>
                  </div>
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="future-body">
          <div className="future-layers">
            {chapters.map((chapter) => (
              <article className="future-layer future-chapter reveal" id={chapter.id} key={chapter.no}>
                <div className="future-layer-copy">
                  <h3>{chapter.title}</h3>
                  {chapter.paragraphs.map((paragraph, index) => (
                    <p
                      className={chapter.no === '01' && index === chapter.paragraphs.length - 1 ? 'future-chapter-close' : undefined}
                      key={paragraph}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <figure className="future-visual reveal">
            <div className="future-image-wrap">
              <img
                src={resolveAsset('/assets/future/level-layout.jpg')}
                alt="游戏demo场景图：门庭、环形战斗区与前进路线"
                loading="lazy"
                decoding="async"
              />
              <span className="future-image-scrim" aria-hidden="true" />
            </div>
            <figcaption>
              <span className="future-visual-caption">游戏demo场景图</span>
            </figcaption>
          </figure>
        </div>

        <div className="future-outlook reveal">
          <header className="future-outlook-head">
            <span className="fv-eyebrow">BEYOND THE VISION</span>
            <h3 className="future-outlook-title">走向更大的创造</h3>
          </header>
          <div className="future-outlook-copy">
            <p>
              长期而言，我希望参与打造达到国际一线工业化制作水准的 3A 游戏，向育碧等成熟游戏团队学习制作流程、技术体系与团队协作，并以<span className="future-outlook-nowrap">《黑神话：悟空》</span>所展现的工业化制作能力与文化表达为参照。
            </p>
            <p>
              我希望未来能够参与创造真正具有国际影响力的游戏作品，让世界看到中国开发者的技术实力与创造力。
            </p>
          </div>
        </div>

        <GameVision />
      </div>
    </section>
  )
}
