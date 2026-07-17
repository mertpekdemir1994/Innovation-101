// Shared mini SVG illustrations — works in server and client contexts (no hooks).

import React from 'react'

type P = { c: string } // c = rgba base, e.g. 'rgba(13,148,136,'

// ── Orbit helper ──────────────────────────────────────────────────────────────
function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function OrbitTick({ cx, cy, r, deg, c }: { cx: number; cy: number; r: number; deg: number; c: string }) {
  const { x, y } = polar(cx, cy, r, deg)
  const t = ((deg + 90) * Math.PI) / 180
  const tx = Math.cos(t) * 6, ty = Math.sin(t) * 6
  return <line x1={x - tx * 0.5} y1={y - ty * 0.5} x2={x + tx * 0.5} y2={y + ty * 0.5}
    stroke={`${c}0.40)`} strokeWidth={1.5} strokeLinecap="round" />
}

// ── Design Thinking ───────────────────────────────────────────────────────────
// Lemniscate / figure-eight — scaled mini version of DTStagesHero.
// Left loop: E (Empathize, upper-left) + D (Define, lower-left)
// Center crossing: T (Test — the hinge)
// Right loop: I (Ideate, upper-right) + P (Prototype, lower-right)
// Flow: E → D → crossing → I → P → crossing(T) → repeat
export function DesignThinkingMini({ c }: P) {
  // Geometry: center (110,52), left extreme (26,52), right extreme (194,52), cp=24
  // 5-segment path starting at Empathize (60,34):
  //   seg0: E(60,34) → left extreme(26,52)
  //   seg1: left extreme → center (Define at t=0.5 ≈ (60,70))
  //   seg2: center → right extreme (Ideate at t=0.5 ≈ (160,34))
  //   seg3: right extreme → center (Prototype at t=0.5 ≈ (160,70))
  //   seg4: center → E (closing; Test direction)

  type S = [[number,number],[number,number],[number,number],[number,number]]
  const segs: S[] = [
    [[60,34],[42,34],[26,40],[26,52]],
    [[26,52],[26,70],[88,70],[110,52]],
    [[110,52],[132,34],[194,34],[194,52]],
    [[194,52],[194,70],[132,70],[110,52]],
    [[110,52],[99,40],[78,34],[60,34]],
  ]

  const d = segs.map(([[x0,y0],[x1,y1],[x2,y2],[x3,y3]], i) =>
    i === 0
      ? `M ${x0} ${y0} C ${x1} ${y1},${x2} ${y2},${x3} ${y3}`
      : `C ${x1} ${y1},${x2} ${y2},${x3} ${y3}`
  ).join(' ') + ' Z'

  function bpt([[x0,y0],[x1,y1],[x2,y2],[x3,y3]]: S, t: number): [number,number] {
    const u = 1-t
    return [u*u*u*x0+3*u*u*t*x1+3*u*t*t*x2+t*t*t*x3, u*u*u*y0+3*u*u*t*y1+3*u*t*t*y2+t*t*t*y3]
  }
  function btan([[x0,y0],[x1,y1],[x2,y2],[x3,y3]]: S, t: number): [number,number] {
    const u = 1-t
    const dx = 3*(u*u*(x1-x0)+2*u*t*(x2-x1)+t*t*(x3-x2))
    const dy = 3*(u*u*(y1-y0)+2*u*t*(y2-y1)+t*t*(y3-y2))
    const len = Math.sqrt(dx*dx+dy*dy)||1
    return [dx/len, dy/len]
  }
  function arr(seg: S, t: number, sc=4, wg=2.5): string {
    const [x,y]=bpt(seg,t); const [tx,ty]=btan(seg,t); const px=-ty,py=tx
    return `${x+sc*tx},${y+sc*ty} ${x-sc*tx+wg*px},${y-sc*ty+wg*py} ${x-sc*tx-wg*px},${y-sc*ty-wg*py}`
  }

  // Nodes: Empathize, Define, Test, Ideate, Prototype
  const nodes = [
    { label:'E', x:60,  y:34 },
    { label:'D', x:60,  y:70 },
    { label:'T', x:110, y:52 },
    { label:'I', x:160, y:34 },
    { label:'P', x:160, y:70 },
  ]
  const nr = 8

  return (
    <svg viewBox="0 0 220 104" width="100%" aria-hidden focusable="false">
      {/* glow band */}
      <path d={d} fill="none" stroke={`${c}0.11)`} strokeWidth={12} strokeLinecap="round" />
      {/* edge line */}
      <path d={d} fill="none" stroke={`${c}0.45)`} strokeWidth={1.5} strokeLinecap="round" />
      {/* direction arrowheads along travel path */}
      <polygon points={arr(segs[0],0.35)} fill={`${c}0.55)`} />
      <polygon points={arr(segs[1],0.25)} fill={`${c}0.55)`} />
      <polygon points={arr(segs[2],0.25)} fill={`${c}0.55)`} />
      <polygon points={arr(segs[3],0.75)} fill={`${c}0.55)`} />
      {/* iterate / closing arc arrow */}
      <polygon points={arr(segs[4],0.5,3,2)} fill={`${c}0.40)`} />
      {/* stage nodes */}
      {nodes.map(({ label, x, y }, i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={nr} fill={`${c}0.12)`} stroke={`${c}0.55)`} strokeWidth={1.5} />
          <text x={x} y={y+4} textAnchor="middle" fontSize="8" fontWeight="700"
            fill={`${c}0.85)`} fontFamily="ui-monospace,monospace">{label}</text>
        </g>
      ))}
    </svg>
  )
}

// ── Double Diamond ────────────────────────────────────────────────────────────
export function DoubleDiamondMini({ c }: P) {
  return (
    <svg viewBox="0 0 200 82" width="100%" aria-hidden focusable="false">
      {/* left diamond */}
      <polygon points="6,41 52,8 98,41 52,74"
        fill={`${c}0.08)`} stroke={`${c}0.58)`} strokeWidth={1.5} />
      {/* right diamond */}
      <polygon points="102,41 148,8 194,41 148,74"
        fill={`${c}0.12)`} stroke={`${c}0.70)`} strokeWidth={1.5} />
      {/* midpoint dot */}
      <circle cx={100} cy={41} r={3.5} fill={`${c}0.60)`} />
      {/* endpoints */}
      <circle cx={6}   cy={41} r={3} fill={`${c}0.35)`} />
      <circle cx={194} cy={41} r={3} fill={`${c}0.35)`} />
    </svg>
  )
}

// ── Lean Startup ──────────────────────────────────────────────────────────────
// Build-Measure-Learn triangle orbit
export function LeanStartupMini({ c }: P) {
  const cx = 110, cy = 52, r = 38, nodeR = 11
  const nodes = [0, 120, 240].map(d => ({ ...polar(cx, cy, r, d), label: ['B','M','L'][([0,120,240]).indexOf(d)] }))
  const ticks  = [60, 180, 300]
  return (
    <svg viewBox="0 0 220 104" width="100%" aria-hidden focusable="false">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={`${c}0.20)`} strokeWidth={1.5} strokeDasharray="5 4" />
      {ticks.map((d, i) => <OrbitTick key={i} cx={cx} cy={cy} r={r} deg={d} c={c} />)}
      {nodes.map(({ x, y, label }, i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={nodeR} fill={`${c}0.12)`} stroke={`${c}0.55)`} strokeWidth={1.5} />
          <text x={x} y={y + 4} textAnchor="middle" fontSize="9" fontWeight="700"
            fill={`${c}0.85)`} fontFamily="ui-monospace,monospace">{label}</text>
        </g>
      ))}
    </svg>
  )
}

// ── Design Sprint ─────────────────────────────────────────────────────────────
// 5 day-blocks, purely linear (no return arc)
export function DesignSprintMini({ c }: P) {
  const xs  = [18, 57, 96, 135, 174]
  const y   = 28, hw = 14, hh = 13
  return (
    <svg viewBox="0 0 192 56" width="100%" aria-hidden focusable="false">
      {xs.slice(0, -1).map((x, i) => (
        <line key={i} x1={x + hw} y1={y} x2={xs[i + 1] - hw} y2={y}
          stroke={`${c}0.22)`} strokeWidth={1.2} />
      ))}
      {xs.map((x, i) => (
        <g key={i}>
          <rect x={x - hw} y={y - hh} width={hw * 2} height={hh * 2} rx={3}
            fill={`${c}0.10)`} stroke={`${c}0.55)`} strokeWidth={1.5} />
          <text x={x} y={y + 4} textAnchor="middle" fontSize="9" fontWeight="700"
            fill={`${c}0.80)`} fontFamily="ui-monospace,monospace">{i + 1}</text>
        </g>
      ))}
    </svg>
  )
}

// ── Agile Innovation ──────────────────────────────────────────────────────────
// 5-node continuous orbit
export function AgileInnovationMini({ c }: P) {
  const cx = 110, cy = 52, r = 38, nodeR = 11
  const stageDeg  = [0, 72, 144, 216, 288]
  const tickDeg   = [36, 108, 180, 252, 324]
  const labels    = ['D','B','S','R','R']
  return (
    <svg viewBox="0 0 220 104" width="100%" aria-hidden focusable="false">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={`${c}0.20)`} strokeWidth={1.5} strokeDasharray="5 4" />
      {tickDeg.map((d, i) => <OrbitTick key={i} cx={cx} cy={cy} r={r} deg={d} c={c} />)}
      {stageDeg.map((d, i) => {
        const { x, y } = polar(cx, cy, r, d)
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={nodeR} fill={`${c}0.12)`} stroke={`${c}0.55)`} strokeWidth={1.5} />
            <text x={x} y={y + 4} textAnchor="middle" fontSize="9" fontWeight="700"
              fill={`${c}0.85)`} fontFamily="ui-monospace,monospace">{labels[i]}</text>
          </g>
        )
      })}
    </svg>
  )
}

// ── FDE ───────────────────────────────────────────────────────────────────────
// 4-node continuous orbit (cardinal positions)
export function FDEMini({ c }: P) {
  const cx = 110, cy = 52, r = 38, nodeR = 11
  const stageDeg = [0, 90, 180, 270]
  const tickDeg  = [45, 135, 225, 315]
  const labels   = ['E','B','X','M']
  return (
    <svg viewBox="0 0 220 104" width="100%" aria-hidden focusable="false">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={`${c}0.20)`} strokeWidth={1.5} strokeDasharray="5 4" />
      {tickDeg.map((d, i) => <OrbitTick key={i} cx={cx} cy={cy} r={r} deg={d} c={c} />)}
      {stageDeg.map((d, i) => {
        const { x, y } = polar(cx, cy, r, d)
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={nodeR} fill={`${c}0.12)`} stroke={`${c}0.55)`} strokeWidth={1.5} />
            <text x={x} y={y + 4} textAnchor="middle" fontSize="8" fontWeight="700"
              fill={`${c}0.85)`} fontFamily="ui-monospace,monospace">{labels[i]}</text>
          </g>
        )
      })}
    </svg>
  )
}

// ── Lookup ────────────────────────────────────────────────────────────────────
const MAP: Record<string, React.ComponentType<P>> = {
  'design-thinking':  DesignThinkingMini,
  'double-diamond':   DoubleDiamondMini,
  'lean-startup':     LeanStartupMini,
  'design-sprint':    DesignSprintMini,
  'agile-innovation': AgileInnovationMini,
  'fde':              FDEMini,
}

export function MiniIllustration({ slug, color }: { slug: string; color: string }) {
  const Comp = MAP[slug]
  return Comp ? <Comp c={color} /> : null
}
