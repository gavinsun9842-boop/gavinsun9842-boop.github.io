// 灵植双效舱（硬件本体）—— 独立项目数据
// 来源：原 lingzhi-cabin.js 的 HARDWARE 组；客户端内容已迁至 lingzhi-client.js。
// 素材包含草图、低分辨率组装记录、Blender 模型与用户提供的参赛现场实照。

import { awardsForProject } from '../awards'

export default {
  slug: 'lingzhi-cabin',
  order: 2,
  no: '02',
  kicker: 'IOT / AI VISION / HARDWARE',
  title: '灵植双效舱',
  subtitle: 'AI 视觉辅助型一体化自动无土栽培硬件系统。',
  role: '项目群成员',
  scene: '高中生物实验场景，延伸至家庭园艺、校园教育、科研监测',
  award: '国际发明展铜奖、省青少年科技创新大赛二等奖、市青少年科技创新大赛一等奖等 5 项',
  status: '硬件原型与 11 单元舱体已落地',
  links: [],
  stack: ['Arduino', '传感器', '蠕动泵', 'MQTT', '3D 建模', '激光切割'],
  heroVisual: 'organic',
  thumb: '/projects/lingzhi-cabin/model-blender.jpg',
  cover: {
    src: '/assets/lingzhi-hardware-hero.jpg',
    alt: '灵植双效舱硬件：手绘草图与 Blender 整机模型',
    tag: 'PRODUCT / HARDWARE SYSTEM',
    caption: '草图 / 三维模型 · 11 个栽培单元',
  },
  relatedSlug: 'lingzhi-client',
  relatedLabel: '配套客户端',
  highlights: [
    { value: '4', label: '培养舱', note: '2 侧室 / 11 储液室 / 1 硬件室' },
    { value: '4', label: '实验预设', note: '激素对照 · 光色对照 · 向光性 · 禾本科' },
    { value: '6', label: '环境维度', note: '温湿度 / 光照 / CO₂ / TDS / EC' },
    { value: '5', label: '竞赛奖项', note: '国际 / 省 / 市 ', size: 'text' },
  ],
  groups: [
    {
      tag: 'PROJECT 01 / HARDWARE SYSTEM',
      title: '本体 · 硬件栽培系统',
      sections: [
        {
          key: 'S', title: '项目背景与设计初衷',
          blocks: [
            { t: 'p', text: '项目的灵感源于一次**生物课堂学习与竞赛实践的交汇**。' },
            { t: 'p', text: '当时，生物课刚刚学习到植物生长激素相关知识，而生物学奥林匹克竞赛中又涉及对植物不同部位切片的观察与研究。在实际实验过程中，我逐渐发现，植物样本的培育对生长环境有着较高要求，需要人工持续把控各项条件，稍有偏差就可能影响植物的正常生长，甚至导致样本培育失败。与此同时，在探究植物生长规律时，人工定时观察和拍摄也难以做到长期、连续且规律，容易遗漏关键生长阶段，影响实验记录的完整性。' },
            { t: 'figure', variant: 'portrait', src: '/projects/lingzhi-cabin/biology-league-ticket.jpg', alt: '2026 年全国中学生生物学联赛（广西区）准考证', caption: '全国中学生生物学联赛 · 广西区准考证', meta: 'BIOLOGY LEAGUE / ENTRY PASS', ratio: '1920 / 1244' },
            { t: 'p', text: '这让我开始思考：能否将植物培育从依赖人工经验的过程，转变为一个能够**自主感知、分析并调节生长环境**的智能水培系统？' },
            { t: 'p', text: '基于这一想法，我萌生了设计「灵植双效舱」的构想。我希望利用 **ESP32 摄像头模组**对植物进行定时拍摄，将生长图像上传至云端，建立连续的植物生长档案；同时接入**百度 EasyDL 图像识别模型**，对植物的生长状态进行分析，通过识别抽芽数、生根数等可观测指标，并与预设生长预期进行比较，辅助判断植物是否存在生长异常。' },
            { t: 'p', text: '在此基础上，系统进一步构建自动调控机制：主控板根据植物生长状态，对培育环境中的生长素浓度、光照颜色及水体含氧量等参数进行调节，尝试实现从**生长监测、状态识别到环境干预**的自动化闭环（这种操作在水培环境下更易实现）。与此同时，各类生长数据与环境参数将同步传输至客户端，以图表等形式呈现植物的生长趋势，让原本依赖人工观察的培育过程变得更加连续、直观和可追踪。' },
            { t: 'p', text: '我希望通过这一项目，将**生物学实验需求与物联网、人工智能及自动控制技术**结合起来，让植物培育不仅能够被观察和记录，也能够被系统感知、分析与主动调节。' },
          ],
        },
        {
          key: 'T', title: '目标与任务',
          blocks: [
            {
              t: 'list',
              items: [
                '**实时检测**：营养液浓度（EC 电导率、TDS 总溶解固体）与舱内环境（温度、湿度、光照、CO₂ 等）。',
                '**自动补给**：依据浓度自动判断是否补给营养液，驱动蠕动泵完成闭环补给，联动补光等设备。',
                '**双维观测**：接入 AI 视觉模块采集植株冠层图像，形成「物理量 + 视觉」长势观测。',
                '**对照实验**：舱内设独立栽培单元（2 侧室、4 培养舱、11 储液室、1 硬件室、1 顶盖），支持单变量平行对照与分组数据对比。',
              ],
            },
          ],
        },
        {
          key: 'A', title: '实施与行动',
          stages: [
            {
              no: 'A.1', title: '硬件感知与执行层', layout: 'flow',
              blocks: [
                {
                  t: 'list',
                  items: [
                    '**主控**：舱体主控完成本地数据采集、阈值判断、设备驱动与联网通信；侧室由 Arduino 主控板控制灯带、温湿度监测与报警灯泡。',
                    '**传感**：EC 传感器与 TDS 检测模块测营养液电导率 / 总溶解固体；温湿度传感器测侧室温湿度；另支持光照强度、水位、CO₂ 浓度采集。',
                    '**视觉**：AI 视觉监测模块采集植株冠层图像，辅助观察长势与叶片状态。',
                    '**执行**：营养液蠕动泵按算法指令自动补给；可连接自动抽注水、智能补光与环境调控装置。',
                    '**结构**：培养舱、储液室、硬件室、顶盖、侧室；侧室配向光性实验灯带、温湿度传感器、过温过湿报警灯泡、外表面显示屏与 Arduino 主控板。',
                  ],
                },
              ],
            },
            {
              no: 'A.2', title: '结构建模与样机迭代', layout: 'flow',
              blocks: [
                { t: 'p', text: '结构从手绘草图起步，先确定培养舱、储液室、硬件室、顶盖与侧室的功能分区；再用 Blender 建立整机模型，校核培养舱、储液室与侧室的排布和装配关系；随后细化容器、培养槽等局部零件；接着用 LaserMaker 完成板材排版与激光切割；最后以纸板、接线与执行部件组装成可测试的实物样机。' },
                {
                  t: 'gallery', layout: 'trio',
                  items: [
                    { src: '/projects/lingzhi-cabin/sketch.jpg', alt: '灵植双效舱最初设计草图', caption: '手绘草图 · 结构与功能分区', meta: '01 / SKETCH' },
                    { src: '/projects/lingzhi-cabin/model-blender.jpg', alt: 'Blender 中的灵植双效舱整机模型', caption: '整机建模 · 舱体与单元排布', meta: '02 / BLENDER' },
                    { src: '/projects/lingzhi-cabin/modeling-parts.jpg', alt: 'Blender 中的容器与培养槽建模', caption: '局部建模 · 容器与培养槽', meta: '03 / PARTS' },
                  ],
                },
                { t: 'figure', src: '/projects/lingzhi-cabin/laser-cut-layout.png', alt: 'LaserMaker 绘制的灵植双效舱激光切割板材排版图', caption: '激光切割图纸 · 舱体板材排版', meta: '04 / LASERMAKER', ratio: '1919 / 1031' },
                { t: 'figure', variant: 'small', src: '/projects/lingzhi-cabin/assembly.jpg', alt: '灵植双效舱纸板样机的组装与接线记录', caption: '实物组装 · 纸板样机与接线', meta: '05 / ASSEMBLY', ratio: '356 / 359' },
              ],
            },
            {
              no: 'A.3', title: '核心算法与对照实验', layout: 'flow',
              blocks: [
                { t: 'p', text: '营养液调控依据 TDS（及 EC）读数判断浓度是否偏离设定区间：低于下限判定补给，蠕动泵补液，达标停止，形成闭环。' },
                {
                  t: 'code',
                  language: 'PYTHON',
                  title: '环境采样与灯色控制',
                  meta: 'SENSOR / CONTROL',
                  caption: ' ',
                  lines: [
                    'temp = sensor.temperature()',
                    'humi = sensor.humidity()',
                    'i=0',
                    "if light_color=='white':",
                    '    light_color_rgb=[255,255,255]',
                    "elif light_color=='blue':",
                    '    light_color_rgb=[0,0,255]',
                    "elif light_color=='red':",
                    '    light_color_rgb=[255,0,0]',
                    "elif light_color=='green':",
                    '    light_color_rgb=[0,255,0]',
                    'fill_color(light_color_rgb[0],light_color_rgb[1],light_color_rgb[2])',
                    '',
                    'tds_value = tds_sensor.update()',
                    'person=(670+2885*((tds_value/10)**1.428)-670)/(10**6) #TDS-浓度值拟合方程',
                    'long=measure()',
                    'tds_str=str("TDS: {}ppm".format(tds_value))',
                    'ec_str=str("EC: {}mS/cm".format(tds_value*2))',
                    "concentration_str=str('浓度: {} %'.format(person))",
                    "long_str=str('当前测距: {} cm'.format(long))",
                    'light_color_str=str("灯色: {}".format(light_color))',
                    'light_intensity_str=str("灯亮度: {}".format(light_intensity))',
                    'temp_str=str("温度: {}°C".format(temp/33.8))',
                    'humi_str=str("湿度: {}%".format(humi/100*3.3))',
                  ],
                },
                {
                  t: 'flow',
                  steps: [
                    { label: '传感读数', note: 'TDS / EC' },
                    { label: '阈值判断', note: '本地闭环' },
                    { label: '蠕动泵补给', note: '达标停止' },
                    { label: '客户端记录', note: '全过程可追溯' },
                  ],
                },
                { t: 'p', text: '舱体以独立栽培单元支持四类经典实验方案：不同浓度植物激素对植物生长之影响、光色对光合作用影响、植物向光性验证、禾本科植物生长周期（详情见“灵植双效舱客户端”）。' },
              ],
            },
          ],
        },
        {
          key: 'R', title: '成果与影响',
          blocks: [
            {
              t: 'list',
              items: [
                '完成 2 侧室、4 培养舱、11 储液室、1 硬件室的舱体结构与样机，打通「传感采集 → 本地闭环判断 → 蠕动泵补给」的硬件链路。',
                '实现物理量 + AI 视觉双维长势观测，环境数据（温度 / 湿度 / CO₂ / 光照 / TDS / EC）具备采集与上屏条件。',
                '以独立对照单元支持激素、光色、向光性、禾本科四类实验，为课堂分组观测与数据追溯提供硬件载体。',
              ],
            },
            {
              t: 'figure',
              variant: 'portrait',
              src: '/projects/lingzhi-cabin/competition-field.jpg',
              alt: '灵植双效舱参赛现场：两位参赛者在展台前操作设备',
              caption: '参赛现场 · 模型展示与现场操作',
              meta: 'COMPETITION / FIELD PHOTO',
              ratio: '1182 / 1093',
            },
            {
              t: 'certificate',
              title: '竞赛与创新奖项',
              items: awardsForProject('lingzhi-cabin'),
            },
          ],
        },
      ],
    },
  ],
}
