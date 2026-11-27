import { resolveAsset } from '../lib/media'

const games = [
  {
    id: 'hardcore-realism',
    no: '01',
    title: 'BODYCAM / READY OR NOT',
    titleLines: ['BODYCAM /', 'READY OR NOT'],
    tag: '硬核真实感',
    cover: '/assets/future/games/bodycam-cover.jpg',
    coverAlt: 'Bodycam 游戏封面：佩戴夜视装备的战术人员',
    inset: '/assets/future/games/ready-or-not-cover.jpg',
    insetAlt: 'Ready or Not 游戏封面：SWAT 队员与武器特写',
    observation:
      '我关注这类作品对真实感、画面细节与硬核体验的追求。可信的环境、细腻的视觉表现与沉浸式体验，共同构建出一个让玩家身临其境的世界。',
  },
  {
    id: 'far-cry',
    no: '02',
    title: 'FAR CRY SERIES',
    tag: '开放世界叙事',
    cover: '/assets/future/games/far-cry-5-cover.jpg',
    coverAlt: 'Far Cry 5 游戏封面：角色群像、教堂与山谷',
    observation:
      '我喜欢它在开放探索中保持明确的故事主线，通过场景、任务与事件推动叙事。玩家可以自由探索，却始终在逐步经历一段完整的故事。这也是我希望未来作品能够具备的叙事特质。',
  },
  {
    id: 'the-last-of-us',
    no: '03',
    title: 'THE LAST OF US',
    tag: '关系与人性',
    cover: '/assets/future/games/the-last-of-us-cover.jpg',
    coverAlt: 'The Last of Us Part I 游戏封面：Ellie 与废墟中的 Joel',
    observation:
      '吸引我的不只是生存环境的残酷，更是人物关系、情感变化、牺牲与人性的表达。极端环境让人物关系经受考验，也让那些平日里容易被忽视的情感显得更加珍贵。',
  },
  {
    id: 'detroit',
    no: '04',
    title: 'DETROIT: BECOME HUMAN',
    titleLines: ['DETROIT:', 'BECOME HUMAN'],
    tag: '选择与后果',
    cover: '/assets/future/games/detroit-cover.jpg',
    coverAlt: 'Detroit: Become Human 游戏封面：Connor 的面部特写与城市',
    observation:
      '我尤其关注其中的选择与分支叙事。玩家的决定不仅改变故事走向，也体现不同的价值判断。选择带来的后果，让游戏成为探讨人性与道德困境的媒介。',
  },
]

const takeaways = [
  {
    no: '01',
    title: '可信的环境',
    copy: '真实感不只来自画面精度，更来自世界自身的一致性，以及它对玩家行动作出的真实回应。',
  },
  {
    no: '02',
    title: '可经历的故事',
    copy: '叙事不只发生在台词里，也藏在场景、任务与事件的推进中。让玩家通过探索与行动，亲身经历故事。',
  },
  {
    no: '03',
    title: '有重量的选择',
    copy: '选择之所以重要，是因为它会留下真实的后果，也会让玩家在利益、道德与他人命运之间，面对自己愿意作出的决定。',
  },
]

const visionPoints = [
  {
    no: '01 / WORLD',
    title: '让世界有重量',
    copy:
      '我希望创造真实、压抑而充满生存挑战的游戏世界。恶劣的环境、资源的匮乏与无法回避的困境，让玩家切身感受到生存的重量，也让每一次行动都面临现实的代价。',
  },
  {
    no: '02 / CHOICE',
    title: '让道德成为问题',
    copy:
      '但我真正想探讨的，不只是如何在这样的世界中活下去。当生存与道德发生冲突，当个人利益与他人的命运交织，玩家将不得不面对一次次关于人性的选择。每个决定都可能改变他人的命运，也映照出自己愿意成为什么样的人。',
  },
  {
    no: '03 / LIGHT',
    title: '让人性重新显影',
    copy:
      '我希望通过极端环境的反衬，让那些平日里容易被忽视的品质重新显现——善良、勇气、尊严、信任、责任、牺牲，以及身处绝境时依然不愿放弃的希望。',
  },
]

function GameCard({ game }) {
  return (
    <article className="fv-game-card reveal">
      <div className={`fv-game-media${game.inset ? ' has-inset' : ''}`}>
        <img
          className="fv-game-cover"
          src={resolveAsset(game.cover)}
          alt={game.coverAlt}
          loading="lazy"
          decoding="async"
        />
        {game.inset && (
          <img
            className="fv-game-inset"
            src={resolveAsset(game.inset)}
            alt={game.insetAlt}
            loading="lazy"
            decoding="async"
          />
        )}
        <span className="fv-game-no" aria-hidden="true">{game.no}</span>
      </div>

      <div className="fv-game-copy">
        <span className="fv-game-tag">{game.tag}</span>
        <h3>
          {game.titleLines
            ? game.titleLines.map((line) => <span key={line}>{line}</span>)
            : game.title}
        </h3>
        <p>{game.observation}</p>
      </div>
    </article>
  )
}

export function GameVision() {
  return (
    <>
      <section className="fv-games" id="game-aesthetics" aria-labelledby="fv-games-title">
        <header className="fv-games-head reveal">
          <div className="fv-games-heading">
            <span className="fv-eyebrow">GAME AESTHETICS / 游戏审美</span>
            <h2 className="fv-games-title" id="fv-games-title">
              <span>GAMES THAT</span>
              <span>SHAPE MY VISION</span>
            </h2>
          </div>
          <p className="fv-games-sub">
            The worlds I experience shape the worlds I want to create.
          </p>
        </header>

        <div className="fv-game-grid">
          {games.map((game) => <GameCard game={game} key={game.id} />)}
        </div>

        <p className="fv-games-credit">Game artwork © respective rights holders.</p>

        <div className="fv-takeaways reveal">
          <div className="fv-takeaways-head">
            <span>FROM EXPERIENCE TO DESIGN</span>
            <em>从审美到方法</em>
          </div>
          <div className="fv-takeaway-grid">
            {takeaways.map((item) => (
              <div className="fv-takeaway" key={item.no}>
                <span className="fv-takeaway-no">{item.no}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fv-vision" id="creative-vision" aria-labelledby="fv-vision-title">
        <header className="fv-vision-head reveal">
          <div>
            <span className="fv-eyebrow">MY CREATIVE VISION / 创作理念</span>
            <h2 className="fv-vision-title" id="fv-vision-title">MY CREATIVE VISION</h2>
          </div>
          <span className="fv-vision-side">A PERSONAL QUESTION / FUTURE WORK</span>
        </header>

        <div className="fv-vision-grid">
          <blockquote className="fv-vision-question reveal">
            <span className="fv-vision-label">THE QUESTION</span>
            <p>
              <span>当世界试图磨灭</span>
              <span>一个人身上珍贵的东西，</span>
              <span>他是否还能守住自己？</span>
            </p>
            <span className="fv-vision-en">
              WHEN THE WORLD TRIES TO STRIP AWAY WHAT MAKES US HUMAN, WHAT WILL WE CHOOSE TO HOLD ON TO?
            </span>
          </blockquote>

          <div className="fv-vision-points">
            {visionPoints.map((point) => (
              <div className="fv-vision-point" key={point.no}>
                <span className="fv-vision-no">{point.no}</span>
                <div>
                  <h3>{point.title}</h3>
                  <p>{point.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="fv-vision-close reveal">
          我想创造的，是一个让人在极端处境中，重新看见人性与精神力量的世界。
        </p>
      </section>
    </>
  )
}
