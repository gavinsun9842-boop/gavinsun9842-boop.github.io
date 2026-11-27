// 非图片类编辑型内容块：流程、分层架构、引言强调、代码节选。

// 只切分引号之外的 # 注释，避免字符串里的 # 被误判。
function splitCodeComment(line) {
  let quote = null
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i]
    if (quote) {
      if (ch === quote && line[i - 1] !== '\\') quote = null
    } else if (ch === "'" || ch === '"') {
      quote = ch
    } else if (ch === '#') {
      return [line.slice(0, i), line.slice(i)]
    }
  }
  return [line, '']
}

export function CodeBlock({ block }) {
  const lines = block.lines || String(block.code || '').replace(/\n$/, '').split('\n')

  return (
    <figure className="code-block">
      <header className="code-head">
        <span className="code-lang">{block.language || 'CODE'}</span>
        {block.title && <span className="code-title">{block.title}</span>}
        {block.meta && <span className="code-tag">{block.meta}</span>}
      </header>
      <div className="code-body" tabIndex={0} role="region" aria-label={block.title || '代码节选'}>
        {lines.map((line, i) => {
          const [code, comment] = splitCodeComment(line)
          return (
            <div className="code-line" key={i}>
              <span className="code-no" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <code className="code-text">
                {code || ' '}
                {comment && <span className="code-comment">{comment}</span>}
              </code>
            </div>
          )
        })}
      </div>
      {block.caption && block.caption.trim() && (
        <figcaption className="code-cap">
          <span>{block.caption}</span>
        </figcaption>
      )}
    </figure>
  )
}

export function FlowBlock({ block }) {
  return (
    <div className="flow">
      {block.steps.map((step, i) => (
        <div className="flow-step" key={`${step.label}-${i}`}>
          <span className="flow-no">{String(i + 1).padStart(2, '0')}</span>
          <span className="flow-label">{step.label}</span>
          {step.note && <small>{step.note}</small>}
          {i < block.steps.length - 1 && <span className="flow-arrow" aria-hidden="true">→</span>}
        </div>
      ))}
    </div>
  )
}

export function LayersBlock({ block }) {
  return (
    <div className="layers">
      {block.rows.map((row) => (
        <div className="layer-row" key={row.label}>
          <span className="layer-label">{row.label}</span>
          <div className="layer-items">
            {row.items.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      ))}
    </div>
  )
}

export function CalloutBlock({ block }) {
  return (
    <blockquote className="callout">
      <p>{block.text}</p>
      {block.source && <cite>{block.source}</cite>}
    </blockquote>
  )
}

// 三个真实问题：编号 + 短标题 + 事实说明，不做三张等宽卡片。
export function ProblemsBlock({ block }) {
  return (
    <div className="problems">
      {block.items.map((item) => (
        <article className="problem-row" key={item.no}>
          <span className="problem-no">{item.no}</span>
          <h4 className="problem-title">{item.title}</h4>
          <p className="problem-body">{item.text}</p>
        </article>
      ))}
    </div>
  )
}

// 发起人 → 两位队友 → AI Agent；用层级关系而不是公司组织架构图。
export function RoleMapBlock({ block }) {
  return (
    <div className="rolemap">
      <div className="rolemap-lead">
        <span className="rolemap-role">{block.lead.title}</span>
        <p>{block.lead.summary}</p>
        <ul>
          {block.lead.points.map((point) => <li key={point}>{point}</li>)}
        </ul>
      </div>

      <div className="rolemap-team">
        {block.team.map((member) => (
          <article className="rolemap-person" key={member.tag}>
            <span className="rolemap-tag">{member.tag}</span>
            <h4>{member.role}</h4>
            <ul>
              {member.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </article>
        ))}
      </div>

      <div className="rolemap-ai">
        <span className="rolemap-tag">{block.ai.tag}</span>
        <div>
          <p>{block.ai.summary}</p>
          <small>{block.ai.boundary}</small>
        </div>
      </div>
    </div>
  )
}

// 每条迭代固定四步：反馈 → 定位 → 修改 → 验证。
export function IterationsBlock({ block }) {
  const stages = [
    ['feedback', '学生反馈'],
    ['diagnosis', '问题定位'],
    ['change', '修改系统'],
    ['verification', '验证改进'],
  ]

  return (
    <div className="iterations">
      {block.items.map((item) => (
        <article className="iteration" key={item.no}>
          <header className="iteration-head">
            <span className="iteration-no">{item.no}</span>
            <h4>{item.title}</h4>
          </header>
          <div className="iteration-grid">
            {stages.map(([key, label]) => (
              <div className="iteration-cell" key={key}>
                <span>{label}</span>
                <p>{item[key]}</p>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  )
}

// 已验证 / 待验证 / 下一步：三联边界表，避免把计划写成结果。
export function StatusBoardBlock({ block }) {
  return (
    <div className="status-board">
      {block.columns.map((column, i) => (
        <section className="status-col" key={column.label}>
          <span className="status-index">{String(i + 1).padStart(2, '0')}</span>
          <h4>{column.label}</h4>
          <ul>
            {column.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>
      ))}
    </div>
  )
}
