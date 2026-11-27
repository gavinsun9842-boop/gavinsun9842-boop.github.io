// 详情页内容块分发器：按 block.t 渲染为编辑式排版组件。
// 新增内容类型时在此登记，组件与样式同步扩展；页面组件不感知内容细节。

import { FigureBlock, GalleryBlock, VideoBlock, CertificateBlock, HighlightStrip, EvidenceBlock } from './components/media'
import CampusSystemArchitecture from './components/CampusSystemArchitecture'
import {
  FlowBlock,
  LayersBlock,
  CalloutBlock,
  CodeBlock,
  ProblemsBlock,
  RoleMapBlock,
  IterationsBlock,
  StatusBoardBlock,
} from './components/contentBlocks'

export function RichText({ text }) {
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((seg, i) =>
        seg.startsWith('**') && seg.endsWith('**')
          ? <strong key={i}>{seg.slice(2, -2)}</strong>
          : <span key={i}>{seg}</span>,
      )}
    </>
  )
}

function Block({ block }) {
  switch (block.t) {
    case 'p':
      return <p className="bd-p"><RichText text={block.text} /></p>

    case 'sub':
      return <h4 className="bd-sub">{block.text}</h4>

    case 'list':
      return (
        <ul className="bd-list">
          {block.items.map((item, i) => <li key={i}><RichText text={item} /></li>)}
        </ul>
      )

    case 'figure':
      return <FigureBlock block={block} />

    case 'gallery':
      return <GalleryBlock block={block} />

    case 'video':
      return <VideoBlock block={block} />

    case 'certificate':
      return <CertificateBlock block={block} />

    case 'evidence':
      return <EvidenceBlock block={block} />

    case 'highlights':
      return <HighlightStrip block={block} />

    case 'flow':
      return <FlowBlock block={block} />

    case 'layers':
      return <LayersBlock block={block} />

    case 'architecture':
      return <CampusSystemArchitecture />

    case 'problems':
      return <ProblemsBlock block={block} />

    case 'rolemap':
      return <RoleMapBlock block={block} />

    case 'iterations':
      return <IterationsBlock block={block} />

    case 'statusboard':
      return <StatusBoardBlock block={block} />

    case 'callout':
      return <CalloutBlock block={block} />

    case 'code':
      return <CodeBlock block={block} />

    case 'table':
      return (
        <div className="tb-wrap">
          <table className="tb">
            <thead>
              <tr>{block.head.map((h, i) => <th key={i}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>{row.map((cell, j) => <td key={j}><RichText text={cell} /></td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'note':
      return (
        <aside className="nb">
          <span className="nb-label">{block.label || '待补 / 后续规划'}</span>
          <p><RichText text={block.text} /></p>
        </aside>
      )

    default:
      return null
  }
}

export function BlockList({ blocks }) {
  return (
    <>
      {blocks.map((block, i) => <Block key={`${block.t}-${i}`} block={block} />)}
    </>
  )
}
