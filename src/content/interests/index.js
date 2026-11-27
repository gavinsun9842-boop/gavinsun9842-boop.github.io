// 兴趣专题总览：首页入口与三个专题页的互链共用这份信息。
// 图片与视频路径均指向 public/assets/interests；原始素材保留在本地素材库。

export const interestTopics = [
  {
    slug: 'music',
    number: '01',
    en: 'MUSIC',
    cn: '音乐制作',
    route: '/interests/music',
    cover: '/assets/interests/music/covers/music-entry-mwave-neon.jpg',
    coverAlt: '蓝红霓虹光下的 M-WAVE MIDI 键盘、打击垫与旋钮控制面板',
    blurb: '从现场演奏到编曲成片，让情绪先有声音。',
    detail: 'LIVE ROOM / SESSION NOTES',
    seoTitle: '音乐制作',
    description: '音乐制作专题：演奏记录、我的作品与音乐影像。',
  },
  {
    slug: 'photography',
    number: '02',
    en: 'PHOTOGRAPHY',
    cn: '摄影',
    route: '/interests/photography',
    cover: '/assets/interests/photography/covers/p16-orange-cavity.jpg',
    coverAlt: '橙色建筑内腔与台阶的摄影画面',
    blurb: '记录真实存在的光线、结构与瞬间。',
    detail: 'CONTACT SHEET / DARKROOM',
    seoTitle: '摄影',
    description: '摄影专题：建筑、夜色、乡村与 Photoshop 视觉研究。',
  },
  {
    slug: 'modeling',
    number: '03',
    en: '3D MODELING',
    cn: '建模',
    route: '/interests/modeling',
    cover: '/assets/interests/modeling/covers/modeling-entry-north-gate.jpg',
    coverAlt: 'Blender 制作的北门入口远景：石质牌楼、灯笼与向纵深延伸的场景',
    blurb: '把想象推向具体的形体与空间。',
    detail: 'WORKBENCH / INDEX',
    seoTitle: '3D 建模',
    description: '3D 建模专题：Blender 模型、开火动画与 UE5 实时场景的过程档案。',
  },
]

export function topicBySlug(slug) {
  return interestTopics.find((topic) => topic.slug === slug) || null
}
