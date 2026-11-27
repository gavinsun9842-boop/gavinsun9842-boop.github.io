// 为详情页媒体块按阅读顺序编号：FIG / CERT / VID。
// 在数据归一化阶段一次性计算，保证同一次渲染中的编号稳定、可复现。

const pad = (n) => String(n).padStart(2, '0')

export function annotateMedia(project) {
  let fig = 0
  let cert = 0
  let vid = 0

  const walkBlocks = (blocks = []) =>
    blocks.map((b) => {
      if (b.t === 'figure') return { ...b, no: `FIG.${pad(++fig)}` }
      if (b.t === 'gallery') {
        return { ...b, items: (b.items || []).map((it) => ({ ...it, no: `FIG.${pad(++fig)}` })) }
      }
      if (b.t === 'certificate') {
        if (b.items && b.items.length) {
          return { ...b, items: b.items.map((it) => ({ ...it, no: `CERT.${pad(++cert)}` })) }
        }
        return { ...b, no: `CERT.${pad(++cert)}` }
      }
      if (b.t === 'video') return { ...b, no: `VID.${pad(++vid)}` }
      return b
    })

  const walkSection = (s) =>
    s.stages
      ? { ...s, stages: s.stages.map((st) => ({ ...st, blocks: walkBlocks(st.blocks) })) }
      : { ...s, blocks: walkBlocks(s.blocks) }

  if (project.groups) {
    return {
      ...project,
      groups: project.groups.map((g) => ({ ...g, sections: g.sections.map(walkSection) })),
    }
  }
  return { ...project, sections: project.sections.map(walkSection) }
}
