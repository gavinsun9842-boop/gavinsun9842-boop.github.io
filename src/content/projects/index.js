// 项目内容汇总：按 slug 索引。后续新增项目只需在此登记对应内容模块。
import campusWall from './campus-wall'
import lingzhiCabin from './lingzhi-cabin'
import lingzhiClient from './lingzhi-client'
import innerSpace from './inner-space'
import oilTeaAi from './oil-tea-ai'

export const projects = [campusWall, lingzhiCabin, lingzhiClient, innerSpace, oilTeaAi]

export function projectBySlug(slug) {
  return projects.find((p) => p.slug === slug) || null
}

// 上一个 / 下一个项目（按 order 排序后环绕）
export function adjacentProjects(slug) {
  const sorted = [...projects].sort((a, b) => a.order - b.order)
  const i = sorted.findIndex((p) => p.slug === slug)
  if (i < 0) return { prev: null, next: null }
  const prev = sorted[i - 1] || sorted[sorted.length - 1]
  const next = sorted[i + 1] || sorted[0]
  return { prev, next }
}
