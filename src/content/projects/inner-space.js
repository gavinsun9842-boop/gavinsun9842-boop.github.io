// 心界 Inner Space —— 内容结构化数据（来源：心界InnerSpace_STAR项目整理 (1).md）
// 仅整理已有记录；API 细节、常模、仓库、量化指标列入待补，不杜撰。
// 素材包含一等奖证书、产品入口二维码，以及 AI 陪聊 / 心理知识 / 音乐疗愈等真实界面截屏。
// 测评结果含个人分数，不在公开页面展示；页面不虚构界面。

import { awardsForProject } from '../awards'

export default {
  slug: 'inner-space',
  order: 4,
  no: '04',
  kicker: 'AI / MENTAL HEALTH / MINI PROGRAM',
  title: '心界 （Inner Space）',
  titleLines: ['心界', '（Inner Space）'],
  subtitle: '面向青少年的心理健康支持微信小程序',
  role: '项目成员',
  award: '第四届微信小程序全球创新挑战赛“AI与生活”综合实践赛 一等奖',
  scene: '13–18 岁中学生；学校心理教师为次要用户',
  status: '已交付 17 个页面、8 个核心功能模块的小程序；获大赛一等奖',
  links: [],
  stack: ['微信小程序', 'GLM-4-Flash', 'GLM-4.6V-Flash', 'Spark Lite', 'SCL-90', 'InnerAudioContext'],
  thumb: '/assets/qr-inner-space.png',
  heroVisual: 'inner',
  cover: {
    src: '/assets/inner-space-screens.jpg',
    alt: '心界小程序真实界面：AI 陪聊与音乐疗愈',
    tag: 'PRODUCT / REAL SCREENS',
    caption: '真实界面 · AI 陪聊 / 音乐疗愈',
  },
  highlights: [
    { value: '17', label: '页面', note: '原生小程序' },
    { value: '8', label: '核心模块', note: '减压 · 测评 · 陪伴' },
    { value: '6+', label: '响应式断点', note: '320px – 1200px+' },
    { value: '一等奖', label: '微信小程序全球创新挑战赛', note: '独立参评项目', size: 'text' },
  ],
  sections: [
    {
      key: 'S', title: '项目背景',
          lead: '在日常学习和生活中，我时常能感受到学习环境给同学们带来的压力。',
      blocks: [
        { t: 'p', text: '当学业负担、人际关系或其他生活问题使情绪难以调节时，学校心理咨询室本应成为同学们寻求帮助的重要渠道。但在与同学们的接触中，我逐渐注意到：部分学生**并非没有求助意愿**，而是顾虑求助过程中的**隐私问题**——线下前往咨询室、主动预约老师，可能意味着自己的行为被他人注意，甚至担心被贴上“有心理问题”的标签。' },
        { t: 'p', text: '我认为，心理健康服务不仅需要专业性，也需要让学生感到**安全、私密且容易触达**。因此，我尝试开发一款面向本校学生的微信小程序，将**心理咨询预约、心理健康知识科普和自我调节**整合到线上平台，减少线下预约可能带来的尴尬与顾虑。' },
        { t: 'p', text: '我希望通过数字化方式，为同学们提供一个**更便捷、更具隐私感**的心理健康支持入口，让心理求助**不再是一件需要反复犹豫的事**，也让心理健康教育融入日常校园生活。' },
        { t: 'callout', text: '当前入口说明：微信小程序仍可扫码进入；但和灵植双效舱客户端一样，调用模型的 API 已过期，AI 相关功能不可用。', source: '隐私与门槛设计原则' },
        { t: 'figure', src: '/assets/qr-inner-space.png', alt: '心界小程序二维码', caption: '小程序入口（扫码体验）', meta: 'PRODUCT ENTRY', ratio: '4 / 5', fit: 'contain', variant: 'small' },
      ],
    },
    {
      key: 'T', title: '目标与任务',
      blocks: [
        {
          t: 'list',
          items: [
            '搭建微信小程序原生应用，实现「学校疏导 / 自我调节 / 智能陪伴」三大功能导航。',
            '开发心理减压游戏（呼吸训练、压力爆破、AI 情绪画板）、音乐疗愈、AI 心灵陪伴、心理测评、知识库、情绪日记与 AI 解梦等模块。',
            '接入大模型提供 24 小时在线陪伴、解梦与情绪日记回复。',
            '基于 SCL-90 专业量表完成测评并叠加 AI 心理分析。',
            '完成多设备响应式适配、音频播放控制与 AI 响应容错，保障稳定运行。',
          ],
        },
      ],
    },
    {
      key: 'A', title: '实现过程',
      stages: [
        {
          no: 'A.1', title: '功能模块与页面结构',
          blocks: [
            { t: 'p', text: '按「主页框架 → 游戏模块 → 音频模块 → AI 对话 → 测评 → 知识库」的优先级推进，核心体验优先可用。' },
            {
              t: 'list',
              items: [
                '**心理减压游戏**：呼吸训练用引导式呼吸球动画，设简单 / 中等 / 困难三档，记录本次与今日训练时长、次数；压力爆破以彩色气泡释放压力；AI 情绪画板接入 GLM-4.6V-Flash 分析画面线条与色彩反映的情绪状态。',
                '**音乐疗愈**：雨声、溪流、风声、鸟鸣等自然音效，配合专业呼吸引导。',
                '**AI 心灵陪伴与解梦**：GLM-4-Flash 与 Spark Lite 双模型冗余驱动，24 小时在线；通过系统提示词设定温暖、友善的陪伴角色。',
                '**心理健康测评**：SCL-90 共 90 题，输出总分、阳性项目数、均分 / 阳性均分，以及分维度条形得分与分级，附基础建议与 AI 综合分析。',
                '**知识库与情绪日记**：常见心理疾病科普（抑郁、PTSD、OCD）与视频内容；日记支持六类情绪标签、双模型回复、评论与删除；「学校疏导」提供专业心理辅导与支持入口。',
              ],
            },
            {
              t: 'gallery', layout: 'phones3',
              items: [
                { src: '/projects/inner-space/02-ai-chat.jpg', alt: '心界 AI 陪聊「心灵之伴」对话界面', caption: 'AI 陪聊 · 心灵之伴', meta: 'REAL SCREEN' },
                { src: '/projects/inner-space/04-knowledge.jpg', alt: '心界心理知识入口页', caption: '心理知识 · 科普入口', meta: 'REAL SCREEN' },
                { src: '/projects/inner-space/05-music.jpg', alt: '心界音乐疗愈播放界面', caption: '音乐疗愈 · 自然音效', meta: 'REAL SCREEN' },
              ],
            },
          ],
        },
        {
          no: 'A.2', title: '双模型与 AI 响应容错',
          blocks: [
            {
              t: 'flow',
              steps: [
                { label: '用户输入', note: '对话 / 日记 / 画板' },
                { label: '主模型', note: 'GLM-4-Flash' },
                { label: '异常降级', note: 'Spark Lite 兜底' },
                { label: '容错解析', note: '兼容多版本数据结构' },
                { label: '回复呈现', note: '统一的陪伴语气' },
              ],
            },
            { t: 'p', text: '双模型互为备份，任一模型异常时仍可保障服务；解析层做了多层容错与多路径兜底，避免版本差异直接中断对话。' },
          ],
        },
        {
          no: 'A.3', title: '音频状态与多端适配',
          blocks: [
            { t: 'p', text: '音频模块使用微信 InnerAudioContext API，监听 onPlay / onPause 等事件驱动状态变量更新，保证界面显示与实际播放状态同步，解决初期暂停后 UI 与声音不一致的问题。' },
            { t: 'p', text: '响应式布局从最初 2 个媒体查询断点扩展为 6 个，覆盖 320px–1200px+ 的手机、平板与桌面；卡片间距、图标尺寸与字号按断点梯度调整。' },
            {
              t: 'table',
              head: ['问题', '处理方式'],
              rows: [
                ['音频状态不同步', '事件驱动：监听 onPlay / onPause 实时更新状态变量'],
                ['AI 响应格式差异', '多层容错、多解析路径兜底'],
                ['多设备适配不足', '2 个断点扩展为 6 个，细化间距 / 图标 / 字号'],
                ['开发者工具缓存报错', '清除 miniprogram_npm 后重新编译，纳入开发规范'],
              ],
            },
          ],
        },
        {
          no: 'A.4', title: '从原型到上线',
          blocks: [
            { t: 'p', text: '先通过问卷与访谈确认真实需求，完成 UI 方案、交互规范与组件库；再搭建小程序框架、页面路由与公共样式；功能开发完成后进行兼容性、性能与稳定性测试，修复问题后上线。' },
          ],
        },
      ],
    },
    {
      key: 'R', title: '成果',
      blocks: [
        {
          t: 'list',
          items: [
            '交付含 **17 个页面、8 个核心功能模块**的原生微信小程序，覆盖 6+ 响应式断点。',
            '落地双大模型冗余陪伴、AI 情绪画板图像理解、SCL-90 量表 + AI 分析、情绪日记、AI 解梦、音乐疗愈与游戏化减压能力。',
          ],
        },
        {
          t: 'certificate',
          ...awardsForProject('inner-space')[0],
        },
      ],
    },
  ],
}
