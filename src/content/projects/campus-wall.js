// NNEZ 校园墙 —— 项目叙事与证据。
// 四段 STAR：S 项目背景 / T 目标与任务 / A 工程实践与迭代 / R 成果与现实进展。
// 只写已确认的开发、备案、测试与协作事实；未形成的用户规模、收入、审核指标不补写。

export default {
  slug: 'campus-wall',
  order: 1,
  no: '01',
  kicker: ' ',
  title: 'NNEZ 校园墙',
  subtitle: '综合型校园数字平台',
  role: '项目发起人 / 主要技术负责人',
  scene: ' 在校学生、外界人士',
  status: '已备案部署，运营申请推进中，未开放正式站点',
  links: [
    { label: '部署站点', href: 'https://nnezxyq.cn' },
  ],
  stack: ['React', 'TypeScript', 'Node.js', 'MySQL'],
  thumb: null,
  heroBackground: true,
  cover: {
    src: '/projects/campus-wall/hero.jpg',
    alt: '南宁二中凤岭校区教学楼、旗杆与台阶，黄昏光线下的校园主视觉',
    ratio: '4 / 3',
    tag: '校园场景 / 南宁二中',
    caption: '南宁二中凤岭校区 · 项目场景',
  },
  sections: [
    {
      key: 'S',
      title: '项目背景',
      lead: '校园墙已运营多年，但信息、文创与社团资源仍缺少一个统一、可持续的承接方式。',
      blocks: [
        {
          t: 'problems',
          items: [
            {
              no: '01',
              title: '信息有积累，但难以沉淀',
              text: '学校原有“官方” QQ 校园墙已运营多年，累计浏览量约 8.8 万；内容主要以动态发布，分类、归档和审核仍依赖人工，工作量较大。',
            },
            {
              no: '02',
              title: '校园文创有外部市场需求',
              text: '外校学生和已经毕业的校友希望购买学校文创，却缺少便捷、稳定的购买渠道。',
            },
            {
              no: '03',
              title: '社团活动需要更可持续的资源',
              text: '学校经费有限，近期社团活动经费减少，引起学生广泛关注。项目希望探索校园文创、社团服务与活动体系之间的资源循环，让社团自给自足，提高社团活动质量的同时缓解校方压力。',
            },
          ],
        },
        {
          t: 'figure',
          src: '/projects/campus-wall/evidence/school-feedback.png',
          alt: '校园墙与社团公开发布记录：校外学生询问文创代购、学生与校友询问校园生活信息、社团发布文创展示内容',
          caption: ' ',
          ratio: '1495 / 585',
        },
        { t: 'p', text: '项目由此发起：用校园数字平台集中信息、传播校园文化，并为社团与文创服务提供稳定入口。' },
      ],
    },

    {
      key: 'T',
      title: '目标与任务',
      lead: '项目由我发起并担任技术负责人与领导者；两名队友与原校园墙团队共同参与协作。',
      blocks: [
        {
          t: 'rolemap',
          lead: {
            title: '项目发起人 / 技术负责人',
            summary: '提出项目构想，负责产品方向、技术框架与最终交付。',
            points: [
              '需求分析与产品方向',
              '系统架构、数据模型与核心业务流程',
              '工程任务拆解与关键技术决策',
              '代码审查、问题排查、质量验收与交付',
              '推动与原校园墙团队、学校相关人员协作',
            ],
          },
          team: [
            {
              tag: '队友 A',
              role: '服务器运维与网络安全',
              points: [
                '辅助服务器运维',
                '参与网络安全测试',
                '协助排查服务器及系统安全问题',
              ],
            },
            {
              tag: '队友 B',
              role: '财务与测试',
              points: [
                '财务统计与资金规划',
                '参与功能测试与搜集问题反馈',
              ],
            },
          ],
          ai: {
            tag: 'AI Agent / 协同开发',
            summary: '我制定技术框架、拆解任务并验收；Agent 协助完善代码、执行工程任务和服务器配置。',
            boundary: '关键技术决策与最终交付由我负责。',
          },
        },
        { t: 'p', text: '原校园墙团队从项目初期参与协作，目前承担网站运营；我们负责技术建设与维护。' },
        {
          t: 'figure',
          src: '/projects/campus-wall/evidence/project-group-full-redacted.png',
          alt: '飞书“校园墙项目”群全图，包含群公告、双休待办、内部方案与成本预估表；队友姓名和成本表数值已遮挡',
          caption: '项目群工作截图',
          ratio: '1313 / 1079',
        },
      ],
    },

    {
      key: 'A',
      title: '工程实践与迭代',
        lead: '从产品设计、系统开发到 AI 功能接入，我持续根据参与内测的学生的实际使用反馈调整和完善平台。',
      stages: [
        {
          no: 'A.1',
          title: '产品与系统工程',
          note: '界面 / 架构 / 业务 / 部署',
          blocks: [
            {
              t: 'gallery',
              layout: 'quad',
              items: [
                {
                  src: '/projects/campus-wall/home.jpg',
                  alt: 'NNEZ 校园墙首页，校园主视觉、发帖入口、内容分类与动态信息流',
                  caption: '首页 · 校园动态与内容分类',
                },
                {
                  src: '/projects/campus-wall/discover.jpg',
                  alt: 'NNEZ 校园墙发现页，校园热门内容与专题卡片',
                  caption: '发现 · 热门内容与校园专题',
                },
                {
                  src: '/projects/campus-wall/campus.jpg',
                  alt: 'NNEZ 校园墙校园页，校园八景、地图入口与社团活动入口',
                  caption: '校园 · 校园八景与活动入口',
                },
                {
                  src: '/projects/campus-wall/game.jpg',
                  alt: 'NNEZ 校园墙校史寻踪专题，百廿二中校园文化问答界面',
                  caption: '校史寻踪 · 校园文化专题',
                },
              ],
            },
            {
              t: 'architecture',
            },
            { t: 'p', text: '数据模型围绕用户、内容、社团、活动、订单与审核记录展开；身份、内容与交易共享同一套数据关系，使权限、审核和订单状态可以相互追溯。' },
            {
              t: 'list',
              items: [
                '**身份与权限**：学号认证区分普通用户与认证用户；管理后台按角色限制审核、举报和用户管理操作。',
                '**社团与成长**：社团由社长发起注册；社长毕业或退出时指定继任者并经平台确认；成员退出需社长审批；成长值按累计有效值记录。',
                '**社团服务与文创**：覆盖社团自主经营、用户下单、工作人员审核确认与订单履约；交易采用「基础服务费 + 订单抽成」的探索方案，并以交易单号、支付时间辅助核验。',
                '**环境与发布**：测试环境先行验证，正式环境承接访问；前端、后端与数据库版本分阶段同步。',
              ],
            },
            {
              t: 'flow',
              steps: [
                { label: '提交与构建', note: '前端 / 后端 · Vite' },
                { label: '测试环境', note: '功能与配置验证' },
                { label: '正式发布', note: '正式环境访问' },
              ],
            },
          ],
        },
        {
          no: 'A.2',
          title: 'AI 应用与自动化流程',
          note: '内容审核 / 付款凭证',
          blocks: [
            { t: 'sub', text: '内容安全审核' },
            { t: 'p', text: '帖子、评论、图片和视频先经阿里云安全护栏筛查，结果进入后台审核队列，由管理员复核后回写状态。' },
            {
              t: 'flow',
              steps: [
                { label: '用户发布', note: '帖子 / 评论 / 图片 / 视频' },
                { label: '安全护栏', note: '阿里云内容审核' },
                { label: '审核队列', note: '机器结果进入后台' },
                { label: '人工复核', note: '管理员确认 / 驳回' },
                { label: '状态回写', note: '公开 / 隐藏 / 处理举报' },
              ],
            },
            {
              t: 'figure',
              src: '/projects/campus-wall/evidence/video-review-test.png',
              alt: '校园墙测试站审核后台：伪 core 风险样本视频进入待审核队列，AI 建议拦截，人工复核入口保留',
              caption: '测试站实机审核 · 伪 core 风险样本（非真实暴力内容）',
              ratio: '1898 / 967',
            },
            { t: 'sub', text: '付款凭证识别' },
            { t: 'p', text: '付款凭证按顺序调用备用模型：GLM-4.6 首次识别，遇到限流或超时切换 DeepSeek API 1，再切换 API 2；三者均未完成时转人工审核。' },
            {
              t: 'flow',
              steps: [
                { label: '提交凭证', note: '微信付款截图' },
                { label: 'GLM-4.6', note: '首次识别' },
                { label: 'DeepSeek API 1', note: '限流 / 超时切换' },
                { label: 'DeepSeek API 2', note: '前一个不可用' },
                { label: '人工审核', note: '三者均未完成' },
              ],
            },
            { t: 'p', text: '顺序故障转移用于保持审核可用性，失败路径统一转入人工复核。' },
          ],
        },
        {
          no: 'A.3',
          title: '学生测试与持续迭代',
          note: '反馈 → 问题 → 改进',
          blocks: [
            {
              t: 'iterations',
              items: [
                {
                  no: '01',
                  title: '校园身份认证',
                  feedback: '学生建议完善学号认证机制。',
                  diagnosis: '普通注册身份不足以支撑校园场景，需要把学号与用户身份建立可核验的关联。',
                  change: '完善学号认证机制，并在认证页与个人身份展示中统一身份状态。',
                  verification: '在测试环境重新走通认证、身份展示与权限判断流程。',
                },
                {
                  no: '02',
                  title: '评论区图片上传安全',
                  feedback: '测试者发现评论区存在上传伪图片的问题。',
                  diagnosis: '排查上传校验逻辑，定位到异常文件可绕过预期校验的路径。',
                  change: '修复上传校验逻辑，限制不符合要求的文件进入展示流程。',
                  verification: '用异常文件复测上传与展示路径，并把该场景纳入后续回归测试。',
                },
                {
                  no: '03',
                  title: '移动端响应式布局',
                  feedback: '测试者发现部分页面在移动端存在布局适配问题。',
                  diagnosis: '窄屏下内容宽度、图片比例和信息层级需要重新排布。',
                  change: '调整响应式布局，优化移动端字号、间距与内容排布。',
                  verification: '在移动端视口复测核心页面，继续记录布局问题。',
                },
              ],
            },
          ],
        },
      ],
    },

    {
      key: 'R',
      title: '成果与现实进展',
      lead: '平台已完成主要功能、部署与备案；运营协作与审批仍在推进。',
      blocks: [
        {
          t: 'statusboard',
          columns: [
            {
              label: '已完成',
              items: [
                '主要功能开发并部署',
                'ICP 与公安联网备案',
                '项目主体登记',
                '学生测试与问题修复',
              ],
            },
            {
              label: '推进中',
              items: [
                '学校向教育局请示，拟在教育局指导下推进（尚未获批）',
                '正式运营准备（尚未最终确定）',
              ],
            },
            {
              label: '下一步',
              items: [
                '内容审核质量评估',
                '自动化与人工复核分工',
                '身份认证与隐私保护',
              ],
            },
          ],
        },
        {
          t: 'evidence',
          groups: [
            {
              label: '备案证明',
              note: 'ICP / 公安联网备案',
              items: [
                {
                  src: '/projects/campus-wall/evidence/icp-filing.png',
                  alt: 'NNEZ 校园墙 ICP 备案查询结果，备案号为桂ICP备2026027496号',
                  title: 'ICP 备案',
                  caption: '桂ICP备2026027496号 · 审核通过 2026-11-13',
                  meta: '工信部 ICP/IP 地址/域名信息备案管理系统',
                  ratio: '16 / 9',
                },
                {
                  src: '/projects/campus-wall/evidence/public-security-filing.png',
                  alt: 'NNEZ 校园墙公安联网备案查询结果，公安备案号为桂公网安备45010902000242号',
                  title: '公安联网备案',
                  caption: '桂公网安备45010902000242号 · 联网备案 2026-11-20',
                  meta: '备案地公安机关：邕宁区网安大队',
                  ratio: '16 / 6.4',
                },
              ],
            },
            {
              label: '项目主体',
              note: '营业执照 · 隐私遮挡副本',
              layout: 'single',
              items: [
                {
                  src: '/projects/campus-wall/evidence/business-license-redacted.png',
                  alt: '项目主体营业执照隐私遮挡副本，经营者姓名、地址、信用代码、二维码与数字签名已遮挡',
                  title: '主体登记',
                  caption: '南宁市邕宁区奇骥互联网工作室（个体工商户） ',
                  meta: ' ',
                  ratio: '215 / 152',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
