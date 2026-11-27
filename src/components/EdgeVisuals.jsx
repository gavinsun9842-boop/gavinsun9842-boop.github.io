// 首页 EDGE 卡片的技术可视化层。
// 全部由 SVG 线条绘制，不依赖图片、图表库或动画库；橙色只用于关键节点。

function MarkerDefs({ id }) {
  return (
    <defs>
      <marker id={`${id}-arrow`} viewBox="0 0 6 6" refX="5" refY="3" markerWidth="4" markerHeight="4" orient="auto">
        <path d="M0 0 L6 3 L0 6" className="ev-arrow" />
      </marker>
      <marker id={`${id}-arrow-hot`} viewBox="0 0 6 6" refX="5" refY="3" markerWidth="4" markerHeight="4" orient="auto">
        <path d="M0 0 L6 3 L0 6" className="ev-arrow ev-arrow--hot" />
      </marker>
    </defs>
  )
}

function Node({ x, y, w, h, label, sub, accent = false }) {
  const nx = Number(x)
  const ny = Number(y)
  const nw = Number(w)
  const nh = Number(h)
  const cx = nx + nw / 2
  return (
    <g className={accent ? 'ev-node ev-node--hot' : 'ev-node'}>
      <rect className="ev-box" x={nx} y={ny} width={nw} height={nh} rx="2" />
      {accent && <rect className="ev-node-pulse" x={nx} y={ny} width={nw} height={nh} rx="2" />}
      <text
        className="ev-label"
        x={cx}
        y={sub ? ny + 18 : ny + nh / 2 + 3}
        textAnchor="middle"
      >
        {label}
      </text>
      {sub && (
        <text className="ev-micro" x={cx} y={ny + 31} textAnchor="middle">
          {sub}
        </text>
      )}
      {accent && <circle className="ev-dot-hot" cx={nx + nw - 8} cy={ny + 8} r="2" />}
    </g>
  )
}

function Trace({ d, delay = 0, className = '' }) {
  return (
    <path
      className={`ev-trace ${className}`.trim()}
      d={d}
      style={{ animationDelay: `${delay}s` }}
    />
  )
}

function FullStackVisual() {
  return (
    <svg className="ev-svg" viewBox="0 0 420 180" aria-hidden="true" focusable="false">
      <MarkerDefs id="ev-stack" />
      <g className="ev-rule">
        <path className="ev-line ev-line--faint" d="M4 160 H416" />
        <circle className="ev-dot" cx="4" cy="160" r="1.5" />
        <circle className="ev-dot" cx="416" cy="160" r="1.5" />
      </g>

      <Node x="2" y="72" w="78" h="44" label="REACT" sub="UI LAYER" />
      <Node x="104" y="46" w="98" h="48" label="NODE.JS" sub="API / RUNTIME" accent />
      <Node x="226" y="78" w="82" h="42" label="PRISMA" sub="DATA MODEL" />
      <Node x="334" y="50" w="82" h="46" label="MYSQL" sub="PERSISTENCE" />

      <path className="ev-connect" d="M80 94 L104 70" markerEnd="url(#ev-stack-arrow)" />
      <path className="ev-connect ev-connect--hot" d="M202 70 L226 98" markerEnd="url(#ev-stack-arrow-hot)" />
      <path className="ev-connect" d="M308 99 L334 73" markerEnd="url(#ev-stack-arrow)" />

      <path className="ev-line ev-line--faint" d="M80 94 V160" />
      <path className="ev-line ev-line--faint" d="M202 70 V160" />
      <path className="ev-line ev-line--faint" d="M308 99 V160" />

      <Trace d="M80 94 L104 70" delay={0.15} />
      <Trace d="M202 70 L226 98" delay={0.7} />
      <Trace d="M308 99 L334 73" delay={1.25} />
      <Trace className="ev-trace--rail" d="M4 160 H416" delay={0.55} />
    </svg>
  )
}

function AppliedAiVisual() {
  return (
    <svg className="ev-svg" viewBox="0 0 420 180" aria-hidden="true" focusable="false">
      <MarkerDefs id="ev-ai" />
      <g className="ev-rule">
        <path className="ev-line ev-line--faint" d="M4 24 H416" />
      </g>

      <Node x="2" y="70" w="72" h="42" label="QUERY" sub="USER INPUT" />
      <Node x="102" y="62" w="94" h="52" label="ROUTER" sub="MULTI-MODEL" accent />
      <Node x="226" y="26" w="72" h="34" label="GLM" />
      <Node x="226" y="120" w="72" h="34" label="DEEPSEEK" />
      <Node x="330" y="62" w="84" h="52" label="RAG" sub="KNOWLEDGE" />

      <path className="ev-connect" d="M74 90 L102 88" markerEnd="url(#ev-ai-arrow)" />
      <path className="ev-connect" d="M196 82 L226 43" markerEnd="url(#ev-ai-arrow)" />
      <path className="ev-connect" d="M196 100 L226 137" markerEnd="url(#ev-ai-arrow)" />
      <path className="ev-connect ev-connect--hot" d="M298 43 L330 78" markerEnd="url(#ev-ai-arrow-hot)" />
      <path className="ev-connect" d="M298 137 L330 100" markerEnd="url(#ev-ai-arrow)" />

      <path
        className="ev-flow"
        d="M330 108 C 300 164, 232 164, 196 110"
        markerEnd="url(#ev-ai-arrow-hot)"
      />

      <Trace d="M74 90 L102 88" delay={0.15} />
      <Trace d="M196 82 L226 43" delay={0.55} />
      <Trace d="M196 100 L226 137" delay={1.05} />
      <Trace d="M298 43 L330 78" delay={0.75} />
      <Trace d="M298 137 L330 100" delay={1.35} />
    </svg>
  )
}

function HardwareVisual() {
  return (
    <svg className="ev-svg" viewBox="0 0 420 180" aria-hidden="true" focusable="false">
      <MarkerDefs id="ev-hw" />
      <g className="ev-rule">
        <path className="ev-line ev-line--faint" d="M4 24 H416" />
      </g>

      <g className="ev-hardware">
        <path className="ev-line" d="M18 70 L128 38 L254 72 L144 104 Z" />
        <path className="ev-line" d="M18 70 L144 104 L144 158 L18 124 Z" />
        <path className="ev-line" d="M144 104 L254 72 L254 126 L144 158 Z" />
        <path className="ev-line ev-line--faint" d="M18 84 L144 118 M18 100 L144 134" />
        <path className="ev-line ev-line--faint" d="M52 62 L162 94 M95 48 L205 80" />
        <path className="ev-line ev-line--dashed" d="M28 116 L132 146" />
        <circle className="ev-dot" cx="70" cy="61" r="2.5" />
        <circle className="ev-dot" cx="112" cy="49" r="2.5" />
        <circle className="ev-dot-hot" cx="186" cy="69" r="2.5" />
        <text className="ev-micro" x="77" y="149" textAnchor="middle">ENCLOSURE</text>
        <text className="ev-micro" x="226" y="54" textAnchor="end">3D MODEL</text>
      </g>

      <Node x="286" y="38" w="112" h="50" label="ARDUINO" sub="MCU / SENSOR BUS" accent />
      <Node x="308" y="122" w="88" h="34" label="MQTT" />

      <path className="ev-connect ev-connect--hot" d="M254 82 L286 64" markerEnd="url(#ev-hw-arrow-hot)" />
      <path className="ev-connect" d="M342 88 L352 122" markerEnd="url(#ev-hw-arrow)" />
      <path className="ev-arc" d="M398 128 q 14 12 0 24" />
      <path className="ev-arc" d="M404 123 q 18 17 0 34" />

      <Trace d="M186 69 L254 82 L286 64" delay={0.2} />
      <Trace d="M342 88 L352 122" delay={0.95} />
    </svg>
  )
}

function GovernanceVisual() {
  return (
    <svg className="ev-svg" viewBox="0 0 420 180" aria-hidden="true" focusable="false">
      <MarkerDefs id="ev-gov" />
      <g className="ev-rule">
        <path className="ev-line ev-line--faint" d="M4 24 H416" />
      </g>

      <Node x="2" y="66" w="78" h="42" label="IDENTITY" sub="CLIENT" />
      <Node x="100" y="66" w="64" h="42" label="ROLE" sub="CLAIM" />
      <g className="ev-gate">
        <path className="ev-gate-line" d="M216 56 L246 86 L216 116 L186 86 Z" />
        <path className="ev-gate-pulse" d="M216 56 L246 86 L216 116 L186 86 Z" />
        <text className="ev-label" x="216" y="89" textAnchor="middle">GATE</text>
      </g>

      <Node x="294" y="34" w="112" h="38" label="CONTENT" sub="REVIEW" />
      <Node x="294" y="88" w="112" h="38" label="ORDER" sub="FLOW" />
      <Node x="294" y="142" w="112" h="26" label="DB / CONSISTENCY" />

      <path className="ev-connect" d="M80 87 L100 87" markerEnd="url(#ev-gov-arrow)" />
      <path className="ev-connect" d="M164 87 L186 86" markerEnd="url(#ev-gov-arrow)" />
      <path className="ev-connect ev-connect--hot" d="M246 86 L294 55" markerEnd="url(#ev-gov-arrow-hot)" />
      <path className="ev-connect" d="M246 86 L294 107" markerEnd="url(#ev-gov-arrow)" />
      <path className="ev-line ev-line--dashed ev-line--boundary" d="M180 30 V150" />
      <path className="ev-line ev-line--faint" d="M294 128 L406 128" />
      <text className="ev-index" x="180" y="24" textAnchor="middle">BOUNDARY</text>

      <Trace d="M80 87 L100 87" delay={0.15} />
      <Trace d="M164 87 L186 86" delay={0.55} />
      <Trace d="M246 86 L294 55" delay={0.85} />
      <Trace d="M246 86 L294 107" delay={1.3} />
    </svg>
  )
}

function LoopVisual() {
  return (
    <svg className="ev-svg" viewBox="0 0 420 180" aria-hidden="true" focusable="false">
      <MarkerDefs id="ev-loop" />
      <g className="ev-rule">
        <path className="ev-line ev-line--faint" d="M4 24 H416" />
      </g>

      <circle className="ev-loop-line" cx="210" cy="92" r="50" />
      <path className="ev-loop-seg ev-loop-seg--hot" d="M227.1 45 A 50 50 0 0 1 260 92" markerEnd="url(#ev-loop-arrow-hot)" />
      <path className="ev-loop-seg" d="M260 92 A 50 50 0 0 1 210 142" markerEnd="url(#ev-loop-arrow)" />
      <path className="ev-loop-seg" d="M210 142 A 50 50 0 0 1 160 92" markerEnd="url(#ev-loop-arrow)" />

      <Node x="174" y="24" w="76" h="28" label="DESIGN" />
      <Node x="244" y="116" w="58" h="28" label="TEST" accent />
      <Node x="116" y="116" w="68" h="28" label="ITERATE" />

      <g className="ev-checks">
        <path className="ev-check" d="M158 76 h8 M266 76 h8 M158 108 h8 M266 108 h8" />
        <circle className="ev-dot" cx="210" cy="92" r="2" />
        <path className="ev-line ev-line--faint" d="M210 92 V44" />
      </g>

      <Trace d="M252 60 C 278 76, 276 104, 258 122" delay={0.2} />
      <Trace d="M238 126 C 206 144, 176 144, 164 126" delay={0.75} />
      <Trace d="M158 60 C 132 78, 134 106, 156 122" delay={1.25} />
    </svg>
  )
}

const VISUALS = {
  stack: FullStackVisual,
  brain: AppliedAiVisual,
  cube: HardwareVisual,
  grid: GovernanceVisual,
  arrow: LoopVisual,
}

export function EdgeVisual({ type }) {
  const Component = VISUALS[type] || FullStackVisual
  return <Component />
}
