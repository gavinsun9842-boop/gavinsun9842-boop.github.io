// AI 智启油茶香 —— 内容结构化数据（来源：AI智启油茶香_STAR项目整理 (1).md）
// 本人贡献为主线；模型精度、时延、试点规模等未记载指标列入待补，不杜撰。

import { awardsForProject } from '../awards'

export default {
  slug: 'oil-tea-ai',
  order: 5,
  no: '05',
  kicker: 'HARDWARE / HERITAGE TECH',
  title: 'AI 智启油茶香',
  subtitle: '用 AI 与机械造物，转译非遗油茶的「手上密码」。',
  role: '团队硬件原型设计师，负责「从 0 到 1」的机械造物与测试端 CNN 训练验证',
  award: '2025 世界职业院校技能大赛总决赛争夺赛银奖（人工智能赛道）',
  scene: '参赛单位：南宁市第二中学；面向非遗文化传承与校园教育',
  status: '智能油茶机原型已落地并完成现场展演；参赛获人工智能赛道银奖',
  links: [],
  stack: ['CNN', 'Python', '3D 打印', '激光切割', '仿生机械结构', '物联网'],
  heroVisual: 'oiltea-photo',
  thumb: '/assets/project-oiltea-3dprint.gif',
  cover: {
    src: '/projects/oil-tea-ai/hero.jpg',
    alt: 'AI 智启油茶香：油茶茶汤、茶叶与金属茶勺主视觉',
    tag: 'HERITAGE / TEA CRAFT',
    caption: '油茶风味 · 主视觉',
    ratio: '1456 / 816',
  },
  highlights: [
    { value: '30', label: 'CNN 验证样本', note: '去重后代理数据集' },
    { value: '100+', label: '建模—打印—测试迭代', note: '机械结构寻优' },
    { value: '72 / 36', label: '捶 · 擂 工艺参数', note: '仿手工力度与节奏' },
    { value: '银奖', label: '世界职业院校技能大赛', note: '人工智能赛道', size: 'text' },
  ],
  sections: [
    {
      key: 'S', title: '项目背景',
      blocks: [
        { t: 'p', text: '一堂非遗选修课让团队结缘瑶族油茶文化，随后深入瑶乡研学。油茶从乾隆御赐「爽神汤」到入选国家级、联合国人类非遗名录，茶香浓郁、食疗功效显著，是活着的文化史诗。' },
        { t: 'figure', src: '/projects/oil-tea-ai/campus-demo.gif', alt: '非遗油茶进校园活动现场，学生在教室内围观传承人制作油茶', caption: '非遗油茶进校园 · 现场演示', meta: 'CAMPUS / GIF', ratio: '662 / 372', variant: 'reference' },
        { t: 'p', text: '但油茶「好喝」却「难喝到」，不像奶茶、咖啡触手可及；核心风味又极度依赖传承人的个人经验——「72 捶 36 擂」的力度、「锅底微黄」时加水的时机，手艺难以广泛传播。速溶油茶膏冲泡方便，却因高温喷粉失去灵魂香气；普通破壁机省力，却暴力打碎、无法实现风味有序融合。' },
        { t: 'callout', text: '「序」是先捶打除湿、再翻炒出香、后加水熬煮的科学工序；「度」是击破植物细胞壁、释放养分的恰到好处的力道。', source: '项目核心洞察' },
      ],
    },
    {
      key: 'T', title: '我的任务',
      blocks: [
        { t: 'p', text: '作为硬件原型设计师，承担智能油茶机从数字图纸到物理实体的「从 0 到 1」落地；并在测试端负责 CNN 训练管线验证：' },
        { t: 'list', items: [
          '搭建并验证 CNN 图像分类训练流程：完成数据去重、分层划分、增强、训练与混淆矩阵评估；使用甲虫 / 苹果代理数据集做管线测试，为后续油茶加水帧训练做准备。',
          '完成投料机构、仿生捶打装置、核心油茶制作杯等机械结构的数字建模与实物制造。',
          '用 3D 打印与激光切割把设计变为可测试零件，反复迭代出可靠结构。',
          '配合团队实现自动投料、仿生捶打、AI 决策加水、过滤、清洗、出杯的全自动流程。',
          '现场展演中在 AI 加水决策等关键节点向评委说明机器工作过程。',
        ] },
        {
          t: 'callout',
          text: '测试端由我负责数据清洗、训练框架与评估验证；正式站部署由团队另一位同学完成。训练框架由我搭建，具体 Python 训练代码由 Agent 辅助生成，我在本地实际运行并核对日志与指标。',
          source: 'TEST SIDE / FRAMEWORK + AGENT',
        },
      ],
    },
    {
      key: 'A', title: '造物过程',
      stages: [
        {
          no: 'A.1', title: '数字蓝图与零件建模',
          note: 'CAD → PROTOTYPE',
          blocks: [
            { t: 'p', text: '为投料机构、捶打装置、油茶制作杯等每一个零件绘制数字蓝图，完成整机机械结构设计；按传统捶打工具的形状、材质与捶打效果设计仿手工捶打装置，使其模拟「72 捶 36 擂」的力度与节奏。' },
            { t: 'figure', src: '/projects/oil-tea-ai/hand-pounding.jpg', alt: '传承人手持木槌在铁锅中捶打油茶茶青', caption: '手工捶打参照 · 木槌与铁锅', meta: 'CRAFT / 72 POUNDS', ratio: '1080 / 810', variant: 'reference' },
            {
              t: 'gallery',
              layout: 'trio',
              items: [
                { src: '/projects/oil-tea-ai/model.gif', alt: '油茶机机械结构三维模型', caption: '整机结构建模', meta: '3D MODEL' },
                { src: '/assets/project-oiltea-3dprint.gif', alt: '3D 打印过程', caption: '3D 打印零件', meta: 'ADDITIVE' },
                { src: '/assets/project-oiltea-lasercut.gif', alt: '激光切割过程', caption: '激光切割结构件', meta: 'SUBTRACTIVE' },
              ],
            },
          ],
        },
        {
          no: 'A.2', title: '制造、装配与故障攻关',
          blocks: [
            { t: 'p', text: '建模完成后用 3D 打印机将仿生捶打装置等零件打印为实体，用激光切割机加工精密结构件，保证结构精度与稳定性。制造不是一次通过：逐一攻克料卡住、捶打无力、密封泄漏等机械问题，以「测试—失败—修改—再打印」循环上百次，最终找到更可靠的结构。' },
            {
              t: 'list',
              items: [
                '**卡料**：调整投料通道几何与落料角度，避免茶叶与姜块堆积。',
                '**捶打无力**：重做锤头形状与配重，让力度接近手工捶打。',
                '**密封泄漏**：改良制作杯密封结构，保证加水熬煮过程稳定。',
                '**联调**：与传感器信号、电机动作和控制程序对接，实现毫秒级协同。',
              ],
            },
          ],
        },
        {
          no: 'A.3', title: 'AI 加水决策',
          blocks: [
            {
              t: 'flow',
              steps: [
                { label: '图像采集', note: '传承人加水时刻' },
                { label: '数据标注', note: '锅底微黄状态' },
                { label: 'CNN 验证', note: 'Python / 训练管线' },
                { label: '状态判断', note: '是否到达加水点' },
                { label: '执行加水', note: '动态决策' },
              ],
            },
            { t: 'p', text: '在正式油茶加水数据完成标注前，先用甲虫 / 苹果二分类样本验证 CNN 训练管线：数据去重、分层划分、增强、训练和混淆矩阵评估。该阶段验证的是 Python 训练脚本与评估流程，不等同于油茶加水识别；真实加水帧的标注与训练属于后续工作。' },
            {
              t: 'list',
              items: [
                '**测试端数据**：原始包 226 张图像按 SHA-256 去重为 30 张唯一样本（甲虫 12 / 苹果 18），按类别分层划分 24 训练 / 6 验证，输入统一为 160×160。',
                '**模型与训练**：SmallCNN 含卷积、BN、ReLU、三次池化、全局平均池化、Dropout 与全连接分类头，287,714 个可训练参数；AdamW、余弦退火、类别权重与 Label Smoothing，CPU 训练 30 epoch。',
                '**评估记录**：最佳 epoch 8；验证集 Accuracy 1.0、Macro-F1 1.0；混淆矩阵 [[4,0],[0,2]]。验证集仅 6 张，指标只说明测试端训练管线跑通，不作为泛化性能结论。',
              ],
            },
            {
              t: 'figure',
              src: '/projects/oil-tea-ai/cnn/architecture.png',
              alt: '测试端 CNN 网络结构代码：SmallCNN 的卷积层与分类头',
              caption: 'CNN 网络结构 · SmallCNN · 2026-11-26 本地复现',
              meta: 'TEST SIDE / PYTORCH',
              ratio: '1920 / 1080',
              fit: 'contain',
            },
            {
              t: 'gallery',
              layout: 'duo',
              items: [
                { src: '/projects/oil-tea-ai/cnn/training-curve.png', alt: '测试端 30 epoch 训练曲线：train/val loss 与 accuracy', caption: '训练曲线 · 30 epoch', meta: 'TEST RUN / LOSS + ACC', fit: 'contain' },
                { src: '/projects/oil-tea-ai/cnn/confusion-matrix.png', alt: '测试端验证集混淆矩阵：甲虫与苹果样本全部分对', caption: '混淆矩阵 · 验证集 6 张', meta: 'VALIDATION / 4 + 2', fit: 'contain' },
              ],
            },
          ],
        },
        {
          no: 'A.4', title: '整机联调与现场展演',
          blocks: [
            { t: 'p', text: '配合团队打通自动投料、仿生捶打、AI 决策加水、过滤、清洗、出杯的完整流程；展演时在 AI 分析锅底状态、做出加水决策的关键节点向评委现场解说，并配合完成从扫码下单到出杯的全流程无人操作演示。' },
            {
              t: 'video',
              src: '/assets/hero-oil-tea.mp4',
              poster: '/assets/video-oil-tea-poster.jpg',
              title: '智能油茶机演示记录',
              duration: '0:38',
            },
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
            '由本人完成机械结构设计与制造的智能油茶机原型落地：具备自动捶打、AI 加水决策流程、物联网远程控制能力，5:2 茶叶姜投料、捶打、翻炒、加水、过滤、清洗、出杯全程无人操作。',
            '与团队共同交付点单 / 科普 / AI 问答微信小程序、AR「油茶娃娃」互动系统；建立 6 位传承人工艺数据库与标准化制作参数。',
            '获某城瑶族自治县文化馆负责人（非遗申报人之一）及 6 位传承人肯定。',
          ],
        },
        { t: 'sub', text: '三大创新' },
        {
          t: 'list',
          items: [
            '**技术创新**：在测试端完成 AI 加水决策的视觉方案与 CNN 训练管线验证，为后续真实油茶加水帧训练提供基础。',
            '**文化创新**：AR 数字人让非遗从静态展示转变为可互动的沉浸体验。',
            '**模式创新**：「设备 + 文化」一体两翼——景区茶馆租赁商业化、学校课程教育化、社交媒体 IP 流行化。',
          ],
        },
        { t: 'sub', text: '团队分工' },
        {
          t: 'list',
          items: [
            '**本人（硬件原型 / 测试端 CNN）**：机械结构设计与制造；测试端 CNN 数据清洗、训练框架与评估验证。',
            '**同学A（智联 AI 工程师）**：微信小程序、物联网平台、生产端AI 图像识别模型与订单调度。',
            '**同学B（硬件软件架构师）**：硬件布局架构、电路设计与布线、从投料到出杯的全套控制程序。',
            '**同学C（非遗数字传承官）**：非遗传承人访谈与研究日志、AI 品牌 Logo、AR 数字人「油茶娃娃」与动画短片。',
            '团队采用敏捷开发、快速试错的方式推进，四人跨职能分工。',
          ],
        },
        {
          t: 'certificate',
          ...awardsForProject('oil-tea-ai')[0],
        },
        {
          t: 'gallery',
          layout: 'single',
          items: [
            { src: '/projects/oil-tea-ai/group-large.jpg', alt: '2025 世界职业院校技能大赛参赛团队合照', caption: '参赛团队 · 世界职业院校技能大赛', meta: 'TEAM / 2025' },
          ],
        },
      ],
    },
  ],
}
