// Aurora Blur（本地 WebGL 复刻）
// Props 对齐 pro.reactbits.dev 的 Aurora Blur 组件；默认参数取自自定义面板截图
// （暖橙余烬光帘自底部升起）。零第三方依赖；WebGL 不可用时回退到纯 CSS 光斑层。
// 如需替换为官方 Pro 组件，保持 <AuroraBlur /> 的挂载位置不变即可。

import { useEffect, useRef, useState } from 'react'

const MAX_LAYERS = 3
const MAX_SKY = 2

const DEFAULT_LAYERS = [
  { color: '#a82100', speed: 0.14, intensity: 0.5 },
  { color: '#9c3400', speed: 0.2, intensity: 0.35 },
  { color: '#ff4400', speed: 0.2, intensity: 0.1 },
]

const DEFAULT_SKY = [
  { color: '#000000', blend: 0.5 },
  { color: '#000000', blend: 0.5 },
]

const VERTEX_SHADER = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
precision highp float;

uniform vec2 uRes;
uniform float uTime;
uniform vec3 uLayerColor[${MAX_LAYERS}];
uniform vec3 uLayerData[${MAX_LAYERS}]; // speed, intensity, seed
uniform vec3 uSkyColor[${MAX_SKY}];
uniform vec2 uSkyBlend;
uniform float uSpeed;
uniform float uNoiseScale;
uniform float uMoveX;
uniform float uMoveY;
uniform float uFade;
uniform float uBloom;
uniform float uBrightness;
uniform float uSaturation;
uniform float uOpacity;
uniform int uLayerCount;
uniform int uSkyCount;

vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

// Ashima 3D simplex noise
float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 1.0 / 7.0;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  // 右半部分水平增益，填补右侧空旷感
  float rightBoost = smoothstep(0.28, 1.0, uv.x);

  // 天空背景：两层颜色沿垂直方向按 blend 混合
  vec3 sky = uSkyColor[0];
  if (uSkyCount > 1) {
    sky = mix(uSkyColor[0], uSkyColor[1], clamp(uSkyBlend.y * uv.y, 0.0, 1.0));
  }
  vec3 col = sky;

  float t = uTime;

  for (int k = 0; k < ${MAX_LAYERS}; k++) {
    if (k >= uLayerCount) break;
    float seed = uLayerData[k].z;
    float layerTime = t * uSpeed * uLayerData[k].x;

    vec3 np = vec3(
      p * uNoiseScale + vec2(uMoveX, uMoveY) * layerTime * 0.15,
      layerTime * 0.6 + seed
    );
    float n = snoise(np) * 0.5 + 0.5;
    n = n * 0.62 + 0.38 * (snoise(np * 2.1 + 17.0) * 0.5 + 0.5);

    // 噪声切成柔和光带
    float band = smoothstep(0.25, 0.8, n);
    // 光帘自底部升起
    float yMask = pow(1.0 - uv.y, 0.7);
    // 水平方向的明暗团块
    float lobe = 0.85 + 0.15 * snoise(vec3(p.x * 1.3, uv.y * 0.6, seed + layerTime));

    float a = band * yMask * lobe * uLayerData[k].y * 1.25 * (1.0 + rightBoost * 0.65);
    col = mix(col, uLayerColor[k], clamp(a, 0.0, 1.0));
  }

  // 右侧底部补一层基础暖光，避免右半空黑
  col += uLayerColor[2] * rightBoost * pow(1.0 - uv.y, 0.7) * 0.16;

  // 垂直渐隐：压暗顶部
  float topFade = smoothstep(1.0, 1.0 - uFade * 0.85, uv.y);
  col *= mix(1.0, topFade, clamp(uFade, 0.0, 1.0));

  // Bloom：抬高高光
  vec3 hi = max(col - 0.25, 0.0);
  col += hi * hi * uBloom * 0.55;

  // 饱和度
  float luma = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = mix(vec3(luma), col, uSaturation);

  // 整体亮度
  col *= uBrightness;

  gl_FragColor = vec4(col, uOpacity);
}
`

let probeCtx = null
function parseColor(value) {
  if (!probeCtx) {
    probeCtx = document.createElement('canvas').getContext('2d', { willReadFrequently: true })
  }
  probeCtx.clearRect(0, 0, 1, 1)
  probeCtx.fillStyle = '#000000'
  probeCtx.fillStyle = value
  probeCtx.fillRect(0, 0, 1, 1)
  const [r, g, b] = probeCtx.getImageData(0, 0, 1, 1).data
  return [r / 255, g / 255, b / 255]
}

function compileShader(gl, type, source) {
  const shader = gl.createShader(type)
  if (!shader) return { shader: null, log: 'createShader failed' }
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return { shader, log: null }
  const log = gl.getShaderInfoLog(shader)
  gl.deleteShader(shader)
  return { shader: null, log }
}

export default function AuroraBlur({
  width = '100%',
  height = '100%',
  speed = 2.25,
  layers = DEFAULT_LAYERS,
  noiseScale = 3.5,
  movementX = -2,
  movementY = -3,
  verticalFade = 0.75,
  bloomIntensity = 2,
  skyLayers = DEFAULT_SKY,
  brightness = 0.7,
  saturation = 1,
  opacity = 1,
  className = '',
  children,
}) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const [fallback, setFallback] = useState(false)

  // 最新 props 存入 ref，供渲染循环读取，避免 effect 反复重建
  const settingsRef = useRef({
    speed, layers, noiseScale, movementX, movementY,
    verticalFade, bloomIntensity, skyLayers,
    brightness, saturation, opacity,
  })
  settingsRef.current = {
    speed, layers, noiseScale, movementX, movementY,
    verticalFade, bloomIntensity, skyLayers,
    brightness, saturation, opacity,
  }

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return undefined

    const gl = canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
    }) || canvas.getContext('experimental-webgl')

    if (!gl) {
      setFallback(true)
      return undefined
    }

    const vertex = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
    const fragment = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    if (vertex.log) console.warn('[aurora] vertex shader:', vertex.log)
    if (fragment.log) console.warn('[aurora] fragment shader compile:', fragment.log)
    const program = gl.createProgram()
    if (!vertex.shader || !fragment.shader || !program) {
      setFallback(true)
      return undefined
    }
    gl.attachShader(program, vertex.shader)
    gl.attachShader(program, fragment.shader)
    gl.bindAttribLocation(program, 0, 'aPos')
    gl.linkProgram(program)
    gl.deleteShader(vertex.shader)
    gl.deleteShader(fragment.shader)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('[aurora] program link:', gl.getProgramInfoLog(program))
      gl.deleteProgram(program)
      setFallback(true)
      return undefined
    }

    const uniforms = {}
    const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS)
    for (let i = 0; i < uniformCount; i += 1) {
      const info = gl.getActiveUniform(program, i)
      if (info) uniforms[info.name.replace('[0]', '')] = gl.getUniformLocation(program, info.name)
    }

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    let raf = 0
    let visible = true
    let clock = 0
    let last = 0
    let acc = 0
    const FRAME_INTERVAL = 1 / 30

    const layerColor = new Float32Array(MAX_LAYERS * 3)
    const layerData = new Float32Array(MAX_LAYERS * 3)
    const skyColor = new Float32Array(MAX_SKY * 3)

    const render = () => {
      const s = settingsRef.current
      const activeLayers = (s.layers && s.layers.length ? s.layers : DEFAULT_LAYERS).slice(0, MAX_LAYERS)
      const activeSky = (s.skyLayers && s.skyLayers.length ? s.skyLayers : DEFAULT_SKY).slice(0, MAX_SKY)

      activeLayers.forEach((layer, i) => {
        const [r, g, b] = parseColor(layer.color)
        layerColor.set([r, g, b], i * 3)
        layerData.set([layer.speed ?? 1, layer.intensity ?? 1, i * 13.7], i * 3)
      })
      activeSky.forEach((sky, i) => {
        const [r, g, b] = parseColor(sky.color)
        skyColor.set([r, g, b], i * 3)
      })

      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.useProgram(program)
      gl.uniform2f(uniforms.uRes, canvas.width, canvas.height)
      gl.uniform1f(uniforms.uTime, clock)
      gl.uniform3fv(uniforms.uLayerColor, layerColor)
      gl.uniform3fv(uniforms.uLayerData, layerData)
      gl.uniform3fv(uniforms.uSkyColor, skyColor)
      gl.uniform2f(uniforms.uSkyBlend, activeSky[0]?.blend ?? 0.5, activeSky[1]?.blend ?? 0.5)
      gl.uniform1f(uniforms.uSpeed, s.speed)
      gl.uniform1f(uniforms.uNoiseScale, s.noiseScale)
      gl.uniform1f(uniforms.uMoveX, s.movementX)
      gl.uniform1f(uniforms.uMoveY, s.movementY)
      gl.uniform1f(uniforms.uFade, s.verticalFade)
      gl.uniform1f(uniforms.uBloom, s.bloomIntensity)
      gl.uniform1f(uniforms.uBrightness, s.brightness)
      gl.uniform1f(uniforms.uSaturation, s.saturation)
      gl.uniform1f(uniforms.uOpacity, s.opacity)
      gl.uniform1i(uniforms.uLayerCount, activeLayers.length)
      gl.uniform1i(uniforms.uSkyCount, activeSky.length)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const resize = () => {
      const width = Math.max(1, container.clientWidth)
      const height = Math.max(1, container.clientHeight)
      // 低分辨率渲染，由 CSS 拉伸 + 柔焦，极光本身模糊，细节损失不可见
      const maxSide = 320
      const scale = Math.min(1, maxSide / Math.max(width, height))
      canvas.width = Math.max(1, Math.round(width * scale))
      canvas.height = Math.max(1, Math.round(height * scale))
      render()
    }

    const frame = (now) => {
      raf = 0
      if (!visible || document.hidden) return
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 1 / 60
      last = now
      if (!reduceMotion) clock += dt
      acc += dt
      if (acc >= FRAME_INTERVAL || reduceMotion) {
        acc = 0
        render()
      }
      raf = requestAnimationFrame(frame)
    }

    const wake = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame)
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    const intersection = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting)
      if (visible) {
        last = 0
        wake()
      }
    })
    intersection.observe(container)
    const onVisibility = () => {
      last = 0
      wake()
    }
    document.addEventListener('visibilitychange', onVisibility)

    resize()
    wake()

    return () => {
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      intersection.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      gl.deleteProgram(program)
      gl.deleteBuffer(buffer)
      if (!canvas.isConnected) gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`aurora ${className}`}
      aria-hidden="true"
      style={{ width, height, opacity }}
    >
      {!fallback && <canvas ref={canvasRef} className="aurora-canvas" />}
      {fallback && (
        <div className="aurora-fallback">
          <div className="aurora-sky" />
          <span className="aurora-layer aurora-ember" />
          <span className="aurora-layer aurora-rust" />
          <span className="aurora-layer aurora-flare" />
          <div className="aurora-fade" />
        </div>
      )}
      {children}
    </div>
  )
}
