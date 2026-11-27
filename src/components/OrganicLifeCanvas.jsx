import { useEffect, useRef } from 'react'
import './OrganicLifeCanvas.css'

const TAU = Math.PI * 2
const PALETTE = {
  emerald: [38, 185, 154],
  deep: [11, 81, 61],
  cyan: [117, 220, 202],
  gold: [197, 163, 107],
}

function mulberry32(seed) {
  let value = seed >>> 0
  return () => {
    value += 0x6d2b79f5
    let t = value
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

function smoothstep(edge0, edge1, value) {
  const t = clamp((value - edge0) / (edge1 - edge0))
  return t * t * (3 - 2 * t)
}

function easeOutCubic(value) {
  return 1 - (1 - clamp(value)) ** 3
}

function makeGlowSprite(rgb) {
  const size = 64
  const sprite = document.createElement('canvas')
  sprite.width = size
  sprite.height = size
  const spriteCtx = sprite.getContext('2d')
  if (!spriteCtx) return sprite
  const gradient = spriteCtx.createRadialGradient(32, 32, 0, 32, 32, 32)
  gradient.addColorStop(0, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`)
  gradient.addColorStop(0.16, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.72)`)
  gradient.addColorStop(0.48, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.2)`)
  gradient.addColorStop(1, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0)`)
  spriteCtx.fillStyle = gradient
  spriteCtx.fillRect(0, 0, size, size)
  return sprite
}

function pointOnBranch(branch, progress) {
  const points = branch.points
  const end = points.length - 1
  const at = clamp(progress) * end
  const index = Math.min(end - 1, Math.floor(at))
  const local = at - index
  const a = points[index]
  const b = points[index + 1] || a
  return {
    x: a.x + (b.x - a.x) * local,
    y: a.y + (b.y - a.y) * local,
  }
}

export default function OrganicLifeCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const host = canvas.parentElement
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true })
    if (!ctx) return

    let width = 0
    let height = 0
    let dpr = 1
    let branches = []
    let particles = []
    let nodes = []
    let dust = []
    let forks = []
    let hairs = []
    let bridges = []
    let corePuffs = []
    let bgCanvas = null
    let layout = { cx: 0, cy: 0, radius: 0 }
    let raf = 0
    let running = false
    let inView = true
    let resizeRaf = 0
    let lastFrame = 0
    let elapsed = 0

    const pointer = {
      x: 0,
      y: 0,
      shiftX: 0,
      shiftY: 0,
      active: false,
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sprites = {
      emerald: makeGlowSprite(PALETTE.emerald),
      cyan: makeGlowSprite(PALETTE.cyan),
      gold: makeGlowSprite(PALETTE.gold),
    }

    function drawSprite(sprite, x, y, size, alpha) {
      if (alpha <= 0.002) return
      ctx.globalAlpha = clamp(alpha)
      ctx.drawImage(sprite, x - size / 2, y - size / 2, size, size)
    }

    function createBranch(origin, angle, length, start, level, maxLevel, autoSplit = true) {
      const compact = width < 720
      const steps = compact ? 14 : 22
      const rng = layout.rng
      const curve = (rng() * 2 - 1) * 1.2
      const phase = rng() * TAU
      const points = [{ x: origin.x, y: origin.y }]
      let x = origin.x
      let y = origin.y
      let a = angle

      for (let step = 1; step <= steps; step += 1) {
        const u = step / steps
        a += Math.sin(u * 3.8 + phase) * 0.04 + curve * 0.038
        x += Math.cos(a) * (length / steps)
        y += Math.sin(a) * (length / steps)
        points.push({ x, y })
      }

      const branch = {
        points,
        level,
        start,
        phase,
        width: 0.95 + level * 0.38,
        alpha: 0.11 + level * 0.032,
        maxLevel,
        growth: 0,
      }
      branches.push(branch)

      if (level >= 1) {
        for (let hairIndex = 0; hairIndex < 2; hairIndex += 1) {
          const pointIndex = Math.min(steps - 2, Math.max(1, Math.floor(steps * (0.36 + hairIndex * 0.28))))
          const point = points[pointIndex]
          const after = points[pointIndex + 1]
          const tangent = Math.atan2(after.y - point.y, after.x - point.x)
          const side = (hairIndex + Math.floor(phase * 10)) % 2 === 0 ? -1 : 1
          hairs.push({
            x: point.x,
            y: point.y,
            angle: tangent + side * (1.16 + rng() * 0.35),
            length: 10 + rng() * 20,
            start: start + 0.35 + rng() * 0.55,
            alpha: 0.034 + level * 0.01,
          })
        }
      }

      if (level > 0 && autoSplit) {
        const split = 0.56 + rng() * 0.22
        const index = Math.max(2, Math.floor((steps - 1) * split))
        const root = points[index]
        if (level >= (compact ? 1 : 2)) forks.push(root)
        const before = points[Math.max(0, index - 4)]
        const tangent = Math.atan2(root.y - before.y, root.x - before.x)
        const children = level >= 2 ? 2 : (rng() < 0.55 ? 2 : 1)

        for (let child = 0; child < children; child += 1) {
          const sign = children === 1 ? (rng() > 0.5 ? 1 : -1) : (child === 0 ? -1 : 1)
          const spread = 0.32 + rng() * 0.46
          const childAngle = tangent + sign * spread + (rng() - 0.5) * 0.12
          const childLength = length * (0.54 + rng() * 0.2)
          createBranch(
            { x: root.x, y: root.y },
            childAngle,
            childLength,
            start + 0.58 + rng() * 0.58,
            level - 1,
            maxLevel,
          )
        }
      }

      return branch
    }

    function buildNetwork() {
      branches = []
      particles = []
      nodes = []
      dust = []
      forks = []
      hairs = []
      bridges = []
      corePuffs = []
      const compact = width < 720
      const min = Math.min(width, height)
      const rng = mulberry32(0x51b9a7)
      layout = {
        rng,
        cx: width * (compact ? 0.58 : 0.645),
        cy: height * (compact ? 0.52 : 0.51),
        radius: min * (compact ? 0.39 : 0.3),
      }

      const maxLevel = compact ? 2 : 3
      const center = { x: layout.cx, y: layout.cy }

      for (let i = 0; i < 9; i += 1) {
        corePuffs.push({
          x: layout.cx + (rng() - 0.5) * min * 0.14,
          y: layout.cy + (rng() - 0.5) * min * 0.2,
          size: min * (0.032 + rng() * 0.062),
          alpha: 0.035 + rng() * 0.045,
          tone: i % 3 === 0 ? 'cyan' : 'emerald',
        })
      }

      const spines = compact
        ? [
            { angle: -0.9, length: min * 0.46, start: 0.2 },
            { angle: 1.05, length: min * 0.42, start: 0.28 },
            { angle: -1.62, length: min * 0.33, start: 0.34 },
          ]
        : [
            { angle: -0.58, length: min * 0.46, start: 0.22 },
            { angle: 0.84, length: min * 0.4, start: 0.3 },
            { angle: -1.54, length: min * 0.31, start: 0.34 },
          ]

      spines.forEach((spine, spineIndex) => {
        const trunk = createBranch(
          center,
          spine.angle + (rng() - 0.5) * 0.16,
          spine.length,
          spine.start,
          maxLevel,
          maxLevel,
          false,
        )

        const lateralCount = compact ? 3 : 5
        for (let lateral = 0; lateral < lateralCount; lateral += 1) {
          const u = 0.33 + lateral * (0.68 / Math.max(1, lateralCount - 1))
          const index = Math.min(trunk.points.length - 3, Math.floor((trunk.points.length - 1) * u))
          const point = trunk.points[index]
          const before = trunk.points[Math.max(0, index - 4)]
          const tangent = Math.atan2(point.y - before.y, point.x - before.x)
          const side = (lateral + spineIndex) % 2 === 0 ? -1 : 1
          createBranch(
            point,
            tangent + side * (0.58 + rng() * 0.34),
            spine.length * (0.32 + rng() * 0.18),
            spine.start + 0.55 + lateral * 0.34 + rng() * 0.24,
            maxLevel - 1,
            maxLevel,
            true,
          )
        }
      })

      const shortRoots = [
        { angle: -2.36, length: min * (compact ? 0.12 : 0.18), start: 0.38 },
        { angle: 2.42, length: min * (compact ? 0.11 : 0.16), start: 0.46 },
      ]

      shortRoots.forEach((root) => {
        createBranch(
          center,
          root.angle + (rng() - 0.5) * 0.24,
          root.length,
          root.start,
          1,
          maxLevel,
          false,
        )
      })

      for (let i = 0; i < 7; i += 1) {
        createBranch(
          center,
          -2.7 + i * 0.78 + (rng() - 0.5) * 0.3,
          min * (0.022 + rng() * 0.045),
          0.12 + rng() * 0.24,
          0,
          maxLevel,
          false,
        )
      }

      const bridgeAnchors = branches
        .filter((branch) => branch.level >= 1)
        .map((branch) => {
          const index = Math.floor((branch.points.length - 1) * (0.42 + rng() * 0.3))
          const point = branch.points[index]
          return { x: point.x, y: point.y, start: branch.start + 0.4 }
        })

      let bridgeAttempts = 0
      const bridgeCount = compact ? 4 : 7
      while (bridges.length < bridgeCount && bridgeAttempts < 60 && bridgeAnchors.length > 4) {
        bridgeAttempts += 1
        const from = bridgeAnchors[Math.floor(rng() * bridgeAnchors.length)]
        const to = bridgeAnchors[Math.floor(rng() * bridgeAnchors.length)]
        const distance = Math.hypot(to.x - from.x, to.y - from.y)
        if (distance < min * 0.07 || distance > min * 0.21) continue
        const midX = (from.x + to.x) * 0.5
        const midY = (from.y + to.y) * 0.5
        const normalX = -(to.y - from.y) / distance
        const normalY = (to.x - from.x) / distance
        const bend = (rng() - 0.5) * min * 0.055
        bridges.push({
          from,
          to,
          control: { x: midX + normalX * bend, y: midY + normalY * bend },
          start: Math.max(from.start, to.start) + 0.5,
        })
      }

      const flowCandidates = branches.filter((branch) => branch.level <= maxLevel)
      const particleCount = compact ? 8 : 14
      for (let i = 0; i < particleCount; i += 1) {
        const branch = flowCandidates[Math.floor(rng() * flowCandidates.length)]
        particles.push({
          branch,
          offset: rng(),
          speed: 0.055 + rng() * 0.055,
          size: 0.8 + rng() * 1.45,
          gold: rng() < 0.06,
        })
      }

      const forkCandidates = forks
        .map((point) => ({
          ...point,
          distance: Math.hypot(point.x - layout.cx, point.y - layout.cy),
        }))
        .filter((point) => point.distance > min * 0.065)
        .sort((a, b) => a.distance - b.distance)

      const nodeCount = compact ? 4 : 5
      const nodeCandidates = forkCandidates.filter(
        (point) => point.x > 48 && point.x < width - 48 && point.y > 44 && point.y < height - 44,
      )
      const pickedNodes = []
      for (let i = 0; i < nodeCount; i += 1) {
        const index = nodeCandidates.length > 1
          ? Math.round((i * (nodeCandidates.length - 1)) / (nodeCount - 1))
          : 0
        const point = nodeCandidates[index]
        if (point && !pickedNodes.includes(point)) pickedNodes.push(point)
      }

      nodes = pickedNodes.map((point, index, list) => ({
        x: point.x,
        y: point.y,
        kind: index === Math.floor(list.length * 0.55) ? 'gold' : (rng() < 0.5 ? 'cyan' : 'emerald'),
        delay: 6.05 + (index / Math.max(1, list.length - 1)) * 2.4,
        size: 0.58 + rng() * 0.3,
      }))

      const dustCount = compact ? 10 : 20
      for (let i = 0; i < dustCount; i += 1) {
        dust.push({
          x: 0.12 + rng() * 0.84,
          y: 0.08 + rng() * 0.84,
          phase: rng() * TAU,
          speed: 0.035 + rng() * 0.07,
          amplitude: 8 + rng() * 20,
          size: 0.5 + rng() * 1.1,
          gold: rng() < 0.16,
          alpha: 0.035 + rng() * 0.07,
        })
      }
    }

    function resize() {
      const rect = canvas.getBoundingClientRect()
      const nextWidth = rect.width
      const nextHeight = rect.height
      if (nextWidth < 2 || nextHeight < 2) return
      const nextDpr = Math.min(window.devicePixelRatio || 1, nextWidth < 720 ? 1.5 : 1.75)
      if (Math.abs(nextWidth - width) < 1 && Math.abs(nextHeight - height) < 1 && nextDpr === dpr) return

      width = nextWidth
      height = nextHeight
      dpr = nextDpr
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildNetwork()
      buildBackgroundCache()

      if (reducedMotion.matches) {
        drawStatic()
      } else if (running) {
        // 继续沿用原来循环的相位，避免 resize 时画面跳回起点。
        lastFrame = 0
      }
    }

    function scheduleResize() {
      window.cancelAnimationFrame(resizeRaf)
      resizeRaf = window.requestAnimationFrame(resize)
    }

    function paintBackground(target) {
      target.fillStyle = '#07090b'
      target.fillRect(0, 0, width, height)

      const ambient = target.createRadialGradient(
        layout.cx,
        layout.cy,
        0,
        layout.cx,
        layout.cy,
        layout.radius * 1.42,
      )
      ambient.addColorStop(0, 'rgba(11, 81, 61, 0.25)')
      ambient.addColorStop(0.38, 'rgba(11, 81, 61, 0.115)')
      ambient.addColorStop(0.74, 'rgba(11, 81, 61, 0.025)')
      ambient.addColorStop(1, 'rgba(7, 9, 11, 0)')
      target.fillStyle = ambient
      target.fillRect(0, 0, width, height)

      target.save()
      target.globalCompositeOperation = 'lighter'
      corePuffs.forEach((puff) => {
        const gradient = target.createRadialGradient(puff.x, puff.y, 0, puff.x, puff.y, puff.size)
        const color = puff.tone === 'cyan' ? '38, 185, 154' : '11, 81, 61'
        gradient.addColorStop(0, `rgba(${color}, ${puff.alpha})`)
        gradient.addColorStop(0.45, `rgba(${color}, ${puff.alpha * 0.34})`)
        gradient.addColorStop(1, `rgba(${color}, 0)`)
        target.fillStyle = gradient
        target.beginPath()
        target.arc(puff.x, puff.y, puff.size, 0, TAU)
        target.fill()
      })
      target.restore()

      const warm = target.createRadialGradient(
        width * 0.79,
        height * 0.23,
        0,
        width * 0.79,
        height * 0.23,
        Math.min(width, height) * 0.32,
      )
      warm.addColorStop(0, 'rgba(197, 163, 107, 0.035)')
      warm.addColorStop(1, 'rgba(197, 163, 107, 0)')
      target.fillStyle = warm
      target.fillRect(0, 0, width, height)
    }

    function buildBackgroundCache() {
      if (!width || !height) return
      const cache = document.createElement('canvas')
      cache.width = canvas.width
      cache.height = canvas.height
      const cacheCtx = cache.getContext('2d')
      if (!cacheCtx) return
      cacheCtx.setTransform(dpr, 0, 0, dpr, 0, 0)
      paintBackground(cacheCtx)
      bgCanvas = cache
    }

    function drawBackground(time, presence) {
      ctx.fillStyle = '#07090b'
      ctx.fillRect(0, 0, width, height)
      if (bgCanvas) {
        ctx.save()
        ctx.globalAlpha = clamp(presence)
        ctx.drawImage(bgCanvas, 0, 0, width, height)
        ctx.restore()
      }
      void time
    }

    function drawDust(time, presence) {
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      dust.forEach((item) => {
        const driftX = Math.sin(time * item.speed + item.phase) * item.amplitude
        const driftY = Math.cos(time * item.speed * 0.7 + item.phase * 1.4) * item.amplitude * 0.65
        const x = item.x * width + driftX
        const y = item.y * height + driftY
        const twinkle = 0.55 + 0.45 * Math.sin(time * 0.18 + item.phase * 2)
        const alpha = item.alpha * twinkle * (0.35 + presence * 0.65)
        const sprite = item.gold ? sprites.gold : sprites.cyan
        drawSprite(sprite, x, y, 10 + item.size * 8, alpha)
        ctx.globalAlpha = alpha * 0.55
        ctx.fillStyle = item.gold ? 'rgba(197, 163, 107, 0.7)' : 'rgba(117, 220, 202, 0.65)'
        ctx.beginPath()
        ctx.arc(x, y, item.size, 0, TAU)
        ctx.fill()
      })
      ctx.restore()
    }

    function drawSeeds(time, presence) {
      if (time > 4.1) return
      const appear = smoothstep(0.1, 1.15, time)
      const converge = easeOutCubic(clamp(time / 2.75))
      const vanish = 1 - smoothstep(2.4, 3.7, time)
      const alpha = appear * vanish * 0.42 * (0.5 + presence * 0.5)
      if (alpha <= 0.002) return

      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      for (let i = 0; i < 9; i += 1) {
        const angle = i * 2.399 + time * 0.18
        const radius = (1 - converge) * (28 + (i % 3) * 14)
        const x = layout.cx + Math.cos(angle) * radius
        const y = layout.cy + Math.sin(angle) * radius * 0.72
        const pulse = 0.5 + 0.5 * Math.sin(time * 1.4 + i)
        drawSprite(sprites.cyan, x, y, 22 + pulse * 8, alpha * (0.4 + pulse * 0.6))
      }
      ctx.restore()
    }

    function drawBranchShape(branch, count, lineWidth, strokeStyle) {
      const points = branch.points
      ctx.lineWidth = lineWidth
      ctx.strokeStyle = strokeStyle
      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)
      for (let i = 1; i < count; i += 1) {
        ctx.lineTo(points[i].x, points[i].y)
      }
      ctx.stroke()
    }

    function drawNetwork(cycleTime, presence, sense, shiftX, shiftY) {
      const breath = 0.985 + 0.015 * Math.sin((cycleTime / 12) * TAU)
      const sway = Math.sin((cycleTime / 12) * TAU) * 0.006 + Math.sin(cycleTime * 0.35) * 0.002
      ctx.save()
      ctx.translate(layout.cx + shiftX, layout.cy + shiftY)
      ctx.rotate(sway)
      ctx.scale(breath, breath)
      ctx.translate(-layout.cx, -layout.cy)
      ctx.lineJoin = 'round'
      ctx.lineCap = 'round'

      branches.forEach((branch) => {
        const growth = easeOutCubic(clamp((cycleTime - branch.start) / 2.75))
        branch.growth = growth
        if (growth < 0.025) return
        const endIndex = Math.max(2, Math.ceil((branch.points.length - 1) * growth) + 1)
        const endpoint = branch.points[Math.min(endIndex, branch.points.length) - 1]
        const alpha = branch.alpha * presence * (0.82 + 0.18 * Math.sin(cycleTime * 0.8 + branch.phase))
        const breathingAlpha = alpha * (1 + sense * 0.18)
        const haloWidth = branch.width * (3.2 + sense * 0.6)

        drawBranchShape(branch, endIndex, haloWidth, `rgba(11, 81, 61, ${breathingAlpha * 0.28})`)
        drawBranchShape(
          branch,
          endIndex,
          branch.width,
          branch.level >= 2
            ? `rgba(117, 220, 202, ${breathingAlpha * 0.9})`
            : `rgba(38, 185, 154, ${breathingAlpha})`,
        )

        if (growth < 0.985 && branch.level >= 2) {
          const tipAlpha = (1 - growth) * presence * 0.45
          drawSprite(sprites.cyan, endpoint.x, endpoint.y, 28, tipAlpha)
        }
      })

      hairs.forEach((hair) => {
        const growth = easeOutCubic(clamp((cycleTime - hair.start) / 1.8))
        if (growth <= 0.02) return
        const length = hair.length * growth
        const endX = hair.x + Math.cos(hair.angle) * length
        const endY = hair.y + Math.sin(hair.angle) * length
        const midX = hair.x + Math.cos(hair.angle - 0.18) * length * 0.52
        const midY = hair.y + Math.sin(hair.angle - 0.18) * length * 0.52
        ctx.beginPath()
        ctx.moveTo(hair.x, hair.y)
        ctx.quadraticCurveTo(midX, midY, endX, endY)
        ctx.lineWidth = 0.5
        ctx.strokeStyle = `rgba(38, 185, 154, ${hair.alpha * presence * (0.7 + 0.3 * Math.sin(cycleTime * 0.7 + hair.angle))})`
        ctx.stroke()
      })

      bridges.forEach((bridge) => {
        const growth = easeOutCubic(clamp((cycleTime - bridge.start) / 1.8))
        if (growth <= 0.02) return
        ctx.beginPath()
        ctx.moveTo(bridge.from.x, bridge.from.y)
        ctx.quadraticCurveTo(bridge.control.x, bridge.control.y, bridge.to.x, bridge.to.y)
        ctx.lineWidth = 0.68
        ctx.strokeStyle = `rgba(38, 185, 154, ${0.072 * growth * presence})`
        ctx.stroke()
      })

      nodes.forEach((node) => {
        const since = cycleTime - node.delay
        const pulse = since > -0.35 ? Math.exp(-(((since - 0.25) / 0.62) ** 2) * 2.2) : 0
        const base = 0.065 + sense * 0.035
        const alpha = (base + pulse * 0.34) * presence * node.size
        const sprite = node.kind === 'gold' ? sprites.gold : node.kind === 'cyan' ? sprites.cyan : sprites.emerald
        drawSprite(sprite, node.x, node.y, 34 + pulse * 28, alpha)
        ctx.globalAlpha = clamp(alpha * 2.1)
        ctx.fillStyle = node.kind === 'gold'
          ? 'rgba(197, 163, 107, 0.85)'
          : node.kind === 'cyan'
            ? 'rgba(117, 220, 202, 0.9)'
            : 'rgba(38, 185, 154, 0.82)'
        ctx.beginPath()
        ctx.arc(node.x, node.y, 0.65 + pulse * 0.9, 0, TAU)
        ctx.fill()
      })

      ctx.globalCompositeOperation = 'lighter'
      particles.forEach((particle) => {
        const branch = particle.branch
        if (!branch || branch.growth < 0.18) return
        const progress = ((particle.offset + elapsed * particle.speed) % 1)
        if (progress > branch.growth - 0.015) return
        const strength = presence * (0.22 + sense * 0.45)
        const baseAlpha = strength * (0.14 + 0.32 * Math.sin(Math.PI * clamp(progress)))
        const sprite = particle.gold ? sprites.gold : sprites.cyan
        const size = 12 + particle.size * 8

        const trailPoint = pointOnBranch(branch, clamp(progress - 0.085))
        ctx.beginPath()
        ctx.moveTo(trailPoint.x, trailPoint.y)
        const endPoint = pointOnBranch(branch, progress)
        ctx.lineTo(endPoint.x, endPoint.y)
        ctx.lineWidth = 1.6
        ctx.strokeStyle = `rgba(117, 220, 202, ${strength * 0.22})`
        ctx.stroke()

        for (let trail = 0; trail < 5; trail += 1) {
          const trailProgress = clamp(progress - trail * 0.013)
          const point = pointOnBranch(branch, trailProgress)
          drawSprite(sprite, point.x, point.y, size * (1 - trail * 0.1), baseAlpha * (1 - trail * 0.2))
        }
      })

      ctx.globalCompositeOperation = 'source-over'
      ctx.restore()
    }

    function drawPointer() {
      if (!pointer.active) return
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      drawSprite(sprites.cyan, pointer.x, pointer.y, 190, 0.035)
      ctx.restore()
    }

    function drawScene(time, staticMode = false) {
      const cycleTime = time % 12
      const presence = smoothstep(0, 2.7, cycleTime) * (1 - smoothstep(9.35, 12, cycleTime))
      const sense = smoothstep(5.9, 6.75, cycleTime) * (1 - smoothstep(9.25, 10.4, cycleTime))
      const targetShiftX = staticMode || !pointer.active
        ? 0
        : clamp((pointer.x - width * 0.5) * 0.014, -11, 11)
      const targetShiftY = staticMode || !pointer.active
        ? 0
        : clamp((pointer.y - height * 0.5) * 0.012, -8, 8)

      pointer.shiftX += (targetShiftX - pointer.shiftX) * (staticMode ? 1 : 0.065)
      pointer.shiftY += (targetShiftY - pointer.shiftY) * (staticMode ? 1 : 0.065)

      drawBackground(time, presence)
      drawDust(time, presence)

      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      drawSeeds(cycleTime, presence)
      ctx.restore()

      drawNetwork(cycleTime, presence, sense, pointer.shiftX, pointer.shiftY)
      drawPointer()
    }

    function drawStatic() {
      stop()
      pointer.active = false
      drawScene(6.45, true)
    }

    function frame(now) {
      if (!running) return
      if (!lastFrame) lastFrame = now
      const delta = Math.min(48, now - lastFrame)
      lastFrame = now
      elapsed += delta / 1000
      drawScene(elapsed)
      raf = window.requestAnimationFrame(frame)
    }

    function start() {
      if (reducedMotion.matches || document.hidden || !inView || running) return
      running = true
      lastFrame = 0
      raf = window.requestAnimationFrame(frame)
    }

    function stop() {
      running = false
      window.cancelAnimationFrame(raf)
      raf = 0
    }

    function onVisibilityChange() {
      if (document.hidden) stop()
      else start()
    }

    function onPointerMove(event) {
      if (reducedMotion.matches) return
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.active = true
    }

    function onPointerLeave() {
      pointer.active = false
    }

    function onMotionChange() {
      if (reducedMotion.matches) drawStatic()
      else start()
    }

    const resizeObserver = new ResizeObserver(scheduleResize)
    resizeObserver.observe(canvas)

    const intersectionObserver = new IntersectionObserver((entries) => {
      inView = entries[0]?.isIntersecting ?? true
      if (inView) start()
      else stop()
    }, { threshold: 0.01 })
    intersectionObserver.observe(canvas)

    host?.addEventListener('pointermove', onPointerMove, { passive: true })
    host?.addEventListener('pointerleave', onPointerLeave)
    document.addEventListener('visibilitychange', onVisibilityChange)
    reducedMotion.addEventListener('change', onMotionChange)

    resize()
    if (reducedMotion.matches) drawStatic()
    else start()

    return () => {
      stop()
      window.cancelAnimationFrame(resizeRaf)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      host?.removeEventListener('pointermove', onPointerMove)
      host?.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      reducedMotion.removeEventListener('change', onMotionChange)
      if (bgCanvas) {
        bgCanvas.width = 0
        bgCanvas.height = 0
        bgCanvas = null
      }
      canvas.width = 0
      canvas.height = 0
    }
  }, [])

  return <canvas ref={canvasRef} className="organic-life-canvas" aria-hidden="true" />
}
