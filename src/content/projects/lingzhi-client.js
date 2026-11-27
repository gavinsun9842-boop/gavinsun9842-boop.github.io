// 灵植双效舱客户端小程序 —— 独立项目数据
// 来源：原 lingzhi-cabin.js 的 CLIENT 组 + 原 HARDWARE 组的通信 / Flask 后台内容。
// 仅迁移已有记录；个人分工、接口细节、量化指标保持待补，不补写。

import { awardsForProject } from '../awards'

export default {
  slug: 'lingzhi-client',
  order: 3,
  no: '03',
  kicker: 'IOT / CLIENT / MINI PROGRAM',
  title: '灵植双效舱客户端小程序',
  titleLines: ['灵植双效舱', '客户端小程序'],
  subtitle: '配套硬件的数据监测、AI 诊断与远程控制客户端（原生微信小程序 + Flask 网页端）。',
  role: '项目群成员',
  scene: '家庭园艺、校园教育、智能诊断、科学研究',
  award: '第四届微信小程序全球创新挑战赛“AI与生活”综合实践赛 二等奖',
  status: '小程序可扫码进入；因项目久远且未维护，网页端无法访问、AI 功能不可用',
  links: [],
  stack: ['微信小程序原生框架', 'Flask', 'MQTT', 'ECharts', 'GLM-5.1', '时序数据库'],
  thumb: '/projects/lingzhi-client/dashboard-clean.jpg',
  heroVisual: 'client-photo',
  cover: {
    src: '/projects/lingzhi-client/hero.jpg',
    alt: '灵植双效舱客户端：植物双效舱与玻璃温室环境主视觉',
    ratio: '3200 / 1745',
    tag: 'CLIENT / ENVIRONMENT',
    caption: '植物舱环境 · 客户端主视觉',
  },
  relatedSlug: 'lingzhi-cabin',
  relatedLabel: '关联硬件项目',
  highlights: [
    { value: '3', label: '核心入口', note: '生活应用 / 实验应用 / 仪器简介' },
    { value: '4', label: '应用场景', note: '家庭 / 校园 / 诊断 / 科研' },
    { value: '2', label: '客户端形态', note: '微信小程序 + Flask 网页端' },
    { value: '二等奖', label: '微信小程序全球创新挑战赛', note: '客户端单独参评', size: 'text' },
  ],
  sections: [
    {
      key: 'S', title: '项目背景',
      blocks: [
        { t: 'p', text: '灵植双效舱客户端是配套硬件系统的原生微信小程序与 Flask 网页端。' },
        { t: 'p', text: '以「AI 与生活深度融合」为核心理念，客户端把 AI 能力嵌入日常植物养护全流程，覆盖家庭园艺、校园教育、智能诊断、科学研究四类场景，让硬件采集的数据以直观、易用的方式服务普通用户。' },
        { t: 'p', text: '传统养护「浇水凭感觉、施肥靠经验」；植物病害识别依赖专业人士；课堂实验缺乏数字化记录；科研数据采集分散、不可视。而客户端可以很好地解决上述问题。' },
        {
          t: 'callout',
          text: '当前入口说明：微信小程序仍可扫码进入；但项目时间较久远且未持续维护，原云服务器已被释放、调用模型的 API 早已过期，Flask 网页端现已无法访问，AI 相关功能不可用。',
          source: 'ENTRY STATUS / 2026',
        },
        { t: 'figure', src: '/projects/lingzhi-client/qr-entry.png', alt: '灵植双效舱客户端微信小程序二维码', caption: '微信扫码进入小程序', meta: 'MINI PROGRAM / ENTRY', ratio: '894 / 1116', fit: 'contain', variant: 'small' },
      ],
    },
    {
      key: 'T', title: '目标与任务',
      blocks: [
        { t: 'p', text: '开发一套原生微信小程序 + Flask 网页端客户端，承接硬件系统的数据与控制，并补齐面向 C 端与教育端的 AI 能力：' },
        {
          t: 'list',
          items: [
            '**生活应用**：植物养护预设、家庭园艺 AI 技巧、植物健康检测。',
            '**实验应用**：实验简介库、实验数据查看、生长对比图。',
            '**仪器简介**：设备结构与操作科普。',
            '**AI 能力**：接入大模型在云端进行微调，做智能诊断与专业问答。',
            '**数据链路**：小程序跳转 Flask 网页端完成物联网数据可视化与设备控制。',
            '**通信关系**：通过 MQTT 承接硬件上报，Flask 落库后对外提供查询 / 控制接口。',
          ],
        },
      ],
    },
    {
      key: 'A', title: '实现过程',
      stages: [
        {
          no: 'A.1', title: '三大入口与四大场景', layout: 'flow',
          blocks: [
            {
              t: 'flow',
              steps: [
                { label: '生活应用', note: '养护技巧' },
                { label: '实验应用', note: '实验与数据' },
                { label: '仪器简介', note: '结构与操作' },
              ],
            },
            { t: 'p', text: '四大场景：家庭园艺（全生命周期智能养护方案）、校园教育（沉浸式植物科学实验平台）、智能诊断（植物健康守护）、科学研究（物联网实时采集 + 云端存储 + 可视化分析）。' },
            {
              t: 'gallery', layout: 'phones2',
              items: [
                { src: '/projects/lingzhi-client/app-chat.jpg', alt: '灵植双效舱小程序植物生活应用 AI 对话界面', caption: '小程序 · 植物生活应用', meta: 'REAL UI' },
                { src: '/projects/lingzhi-client/app-experiment.jpg', alt: '灵植双效舱小程序禾本科植物生长实验简介页', caption: '小程序 · 实验简介', meta: 'REAL UI' },
              ],
            },
          ],
        },
        {
          no: 'A.2', title: '核心功能模块', layout: 'split',
          blocks: [
            {
              t: 'list',
              items: [
                '**植物养护预设值**：基于植物学专业知识与大数据建立常见模型植物的生长需求数据库，创建个性化养护方案。',
                '**家庭园艺技巧**：进行日常园艺知识科普教学。',
                '**植物健康检测**：基于智谱 GLM-5.1 LLM，通过植物病理学知识数据进行微调，达到以下效果：选植物类型 → 勾选症状与生长环境 → AI 综合分析 → 输出问题判定、严重程度、置信度与解决建议。',
                '**质谱 AI 助手**：应用RAG技术+服务器知识库搭建，让质谱成为客户端客服，支持多轮对话专业问答（仪器故障排查、数据谱图解析、操作注意事项...）。',
                '**实验数据管理**：MQTT 设备—云端实时通信，时序数据库存储分析；小程序跳转 Flask 网页端做实时面板、趋势分析与对比分析。（之所以要跳转，是因为微信小程序的安全限制很严格。受限于当时经济与时间条件，我们无法进行域名购买、证书配置、备案，因此微信小程序拒绝与服务器建立直接的数据传输）',
                '**实验简介库**：收录植物激素、光色、向光性、禾本科生长发育阶段实验，每篇含实验原理、操作步骤与预期结果分析（如 IAA 浓度效应、空白对照、自变量 / 因变量设置与材料一致性控制）。',
                '**仪器简介**：图文讲解培养舱、储液室、硬件室、顶盖、侧室结构，含侧室灯带、温湿度传感器、报警灯泡、显示屏与 Arduino 主控板。',
              ],
            },
            {
              t: 'figure',
              src: '/projects/lingzhi-client/device.png',
              alt: '微信小程序开发者工具调试界面',
              caption: '开发者工具调试',
              meta: 'WECHAT DEVTOOLS',
              ratio: '1920 / 1078',
              fit: 'contain',
            },
          ],
        },
        {
          no: 'A.3', title: '软硬件通信与 Flask 后台', layout: 'flow',
          blocks: [
            { t: 'p', text: '**通信层**：采用 MQTT 发布 / 订阅模式做设备—云端低功耗、高可靠实时通信；上行定时 / 触发上报传感读数与视觉状态，下行接收控制指令（启停泵、补光、调整参数、启动 / 停止实验），设备与后端解耦。' },
            { t: 'p', text: '**后端服务层**：Flask 搭建服务器端网站，作为硬件客户端与前端沟通的桥梁——教育版小程序无直接 WebSocket 权限，故由服务器网站中转；接收 MQTT 上报数据、时序数据库存储，对外提供查询 / 控制 REST 接口。' },
            {
              t: 'gallery', layout: 'duo',
              items: [
                { src: '/projects/lingzhi-client/mqttx.jpg', alt: 'MQTTX 客户端主题订阅与消息收发界面', caption: 'MQTTX · 主题订阅', meta: 'MQTT CLIENT', fit: 'contain' },
                { src: '/projects/lingzhi-client/emqx.jpg', alt: 'EMQX Broker 控制台运行统计', caption: 'EMQX · Broker 控制台', meta: 'MQTT BROKER / 4.3.10', fit: 'contain' },
              ],
            },
            { t: 'figure', src: '/projects/lingzhi-client/dashboard-clean.jpg', alt: 'Flask 网页端核心环境数据面板', caption: 'Flask 数据面板 · 已连接', meta: 'ENV PANEL / LIVE DATA', ratio: '16 / 8.34' },
            { t: 'figure', src: '/projects/lingzhi-client/dashboard-growth.jpg', alt: 'Flask 网页端生长趋势图表', caption: '生长趋势与统计', meta: 'ECHARTS / TIME SERIES', ratio: '16 / 8.34' },
            { t: 'p', text: '网页端「实验选择预设」一键启动舱体控制，内置四类经典实验方案：不同浓度植物激素对植物生长之影响、光色对光合作用影响、植物向光性验证、禾本科植物生长周期；各单元独立控制单一变量，其余条件一致，各组数据 MQTT 上报、Flask 存储，网页 / 小程序分组查看对比。' },
            { t: 'figure', src: '/projects/lingzhi-client/experiment-presets.jpg', alt: 'Flask 网页端四类实验选择预设', caption: '实验选择预设 · 四类对照方案', meta: 'EXPERIMENT PRESETS', ratio: '16 / 8.34' },
          ],
        },
        {
          no: 'A.4', title: '技术栈与工程实现', layout: 'flow',
          blocks: [
            {
              t: 'layers',
              rows: [
                { label: 'AI 引擎', items: ['智谱 GLM-5.1', '植物病害识别模型', '植物病理知识图谱'] },
                { label: '前端', items: ['微信小程序原生框架', '原生页面 / 卡片式 UI'] },
                { label: '数据可视化', items: ['ECharts', '实时面板', '趋势 / 对比分析'] },
                { label: '物联网', items: ['MQTT', '多维环境采集', '远程控制'] },
                { label: '后端', items: ['Flask', '云原生 / 微服务', '混合云存储', '时序数据库'] },
              ],
            },
            { t: 'figure', src: '/projects/lingzhi-client/mouth-adjust.jpg', alt: '开发过程中编写小程序代码的实拍', caption: '开发过程记录', meta: 'IMPLEMENTATION', ratio: '4 / 5', variant: 'portrait' },
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
            '完成原生微信小程序客户端 + Flask 网页端双端产品，打通硬件采集—MQTT—时序库—可视化—远程控制链路。',
            '落地 GLM-5.1 智能诊断、植物病理知识图谱、AI 园艺推荐、质谱专业问答、实验简介库、生长对比图等模块。',
          ],
        },
        {
          t: 'certificate',
          ...awardsForProject('lingzhi-client')[0],
        },
      ],
    },
  ],
}
