/**
 * Geometry helpers for the technical elevations in components/anime/diagrams.
 *
 * Everything returns plain SVG path data so a whole lattice boom is one <path>,
 * which keeps the DOM small enough for anime.js to drive dozens of parts at once.
 */

export type Pt = [number, number]

/**
 * Warren truss between two points. Returns the two chords and the web
 * separately so they can be drawn on at different speeds.
 */
export function truss(
  x1: number, y1: number, x2: number, y2: number,
  depth: number, bays: number
): { chords: string; web: string } {
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.hypot(dx, dy) || 1
  const ux = dx / len
  const uy = dy / len
  // Normal, scaled to half the truss depth
  const nx = -uy * (depth / 2)
  const ny = ux * (depth / 2)

  const top = (t: number): Pt => [x1 + dx * t + nx, y1 + dy * t + ny]
  const bot = (t: number): Pt => [x1 + dx * t - nx, y1 + dy * t - ny]

  let web = ''
  for (let i = 0; i < bays; i++) {
    const a = i / bays
    const b = (i + 1) / bays
    const p1 = i % 2 === 0 ? top(a) : bot(a)
    const p2 = i % 2 === 0 ? bot(b) : top(b)
    web += `M${f(p1)}L${f(p2)}`
    const v1 = top(b)
    const v2 = bot(b)
    web += `M${f(v1)}L${f(v2)}`
  }

  const chords = `M${f(top(0))}L${f(top(1))}M${f(bot(0))}L${f(bot(1))}`
  return { chords, web }
}

/** Tapered lattice tower rising from (cx, yBase) to (cx, yTop). */
export function tower(
  cx: number, yBase: number, yTop: number,
  wBase: number, wTop: number, bays: number
): { legs: string; web: string } {
  const half = (t: number) => (wBase + (wTop - wBase) * t) / 2
  const y = (t: number) => yBase + (yTop - yBase) * t
  const L = (t: number): Pt => [cx - half(t), y(t)]
  const R = (t: number): Pt => [cx + half(t), y(t)]

  let web = ''
  for (let i = 0; i < bays; i++) {
    const a = i / bays
    const b = (i + 1) / bays
    web += i % 2 === 0 ? `M${f(L(a))}L${f(R(b))}` : `M${f(R(a))}L${f(L(b))}`
    web += `M${f(L(b))}L${f(R(b))}`
  }
  const legs = `M${f(L(0))}L${f(L(1))}M${f(R(0))}L${f(R(1))}`
  return { legs, web }
}

/** A-frame trestle bent standing on the ground line. */
export function trestle(cx: number, yTop: number, yBase: number, spread: number): string {
  const mid = yTop + (yBase - yTop) * 0.55
  return (
    `M${cx - spread * 0.3} ${yTop}L${cx - spread} ${yBase}` +
    `M${cx + spread * 0.3} ${yTop}L${cx + spread} ${yBase}` +
    `M${cx - spread * 0.66} ${mid}L${cx + spread * 0.66} ${mid}`
  )
}

/** Circle of radial spokes — cage rings, wheels, pulleys. */
export function spokes(cx: number, cy: number, rInner: number, rOuter: number, count: number): string {
  let d = ''
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2
    const c = Math.cos(a)
    const s = Math.sin(a)
    d += `M${r(cx + c * rInner)} ${r(cy + s * rInner)}L${r(cx + c * rOuter)} ${r(cy + s * rOuter)}`
  }
  return d
}

/** Buckets spaced around a wheel rim, each a small open box facing outward. */
export function buckets(cx: number, cy: number, radius: number, count: number, size: number): string {
  let d = ''
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2
    const c = Math.cos(a)
    const s = Math.sin(a)
    // Local frame: radial (c,s), tangential (-s,c)
    const px = cx + c * radius
    const py = cy + s * radius
    const h = size / 2
    const p = (u: number, v: number): Pt => [px + c * u - s * v, py + s * u + c * v]
    d += `M${f(p(-h, -h))}L${f(p(h, -h))}L${f(p(h, h))}L${f(p(-h, h))}Z`
  }
  return d
}

/** Row of hopper/silo outlines — square top tapering to a small outlet. */
export function hopper(x: number, y: number, wTop: number, wBottom: number, h: number): string {
  return (
    `M${r(x - wTop / 2)} ${r(y)}` +
    `L${r(x + wTop / 2)} ${r(y)}` +
    `L${r(x + wBottom / 2)} ${r(y + h)}` +
    `L${r(x - wBottom / 2)} ${r(y + h)}Z`
  )
}

/** Dimension line with tick ends, for the drawing-sheet feel. */
export function dimension(x1: number, x2: number, y: number, tick = 6): string {
  return (
    `M${r(x1)} ${r(y)}L${r(x2)} ${r(y)}` +
    `M${r(x1)} ${r(y - tick)}L${r(x1)} ${r(y + tick)}` +
    `M${r(x2)} ${r(y - tick)}L${r(x2)} ${r(y + tick)}`
  )
}

/** Evenly spaced ticks along a horizontal run — walkway grating, track shoes. */
export function ticks(x1: number, x2: number, y: number, count: number, len: number): string {
  let d = ''
  for (let i = 0; i <= count; i++) {
    const x = x1 + ((x2 - x1) * i) / count
    d += `M${r(x)} ${r(y)}L${r(x)} ${r(y + len)}`
  }
  return d
}

const r = (n: number) => Math.round(n * 100) / 100
const f = ([x, y]: Pt) => `${r(x)} ${r(y)}`
