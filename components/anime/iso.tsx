/**
 * A tiny axonometric renderer for SVG.
 *
 * The anime.js site fakes a lit, exploded 3D assembly in about 24 KB — no
 * WebGL. This does the same: project 3D points to 2D, draw each solid as its
 * three visible faces in three tones, and run a warm edge light along the top
 * edges. The result reads as a dimensional object while staying pure SVG, so
 * anime.js can drive every part of it.
 */

import type { ReactNode } from 'react'

const C = Math.cos(Math.PI / 6) // 0.8660 — horizontal run per unit of x/z
const S = Math.sin(Math.PI / 6) // 0.5    — vertical rise per unit of x/z

export type P3 = [number, number, number]

/** Project a 3D point. +x goes right-and-down, +z left-and-down, +y up. */
export function P(x: number, y: number, z: number): [number, number] {
  return [(x - z) * C, (x + z) * S - y]
}

const r = (n: number) => Math.round(n * 100) / 100
const pt = (p: [number, number]) => `${r(p[0])} ${r(p[1])}`
const poly = (pts: [number, number][]) => `M${pts.map(pt).join('L')}Z`

/* ------------------------------------------------------------------ *
 * Solids
 * ------------------------------------------------------------------ */

interface BoxProps {
  /** Near-bottom-left corner */
  at: P3
  /** Extent along x, y (up) and z */
  size: P3
  /** Tone family — 'body' is matte dark, 'accent' picks up the brand orange */
  tone?: 'body' | 'light' | 'accent'
  /** Draw the warm highlight along the top edges */
  lit?: boolean
  children?: ReactNode
}

/**
 * Cuboid drawn as its three visible faces. Splitting the faces rather than
 * shading a single silhouette is what makes the form read three-dimensionally.
 */
export function Box3D({ at: [x, y, z], size: [w, h, d], tone = 'body', lit = true }: BoxProps) {
  const v = (dx: number, dy: number, dz: number) => P(x + dx, y + dy, z + dz)

  // Visible faces for this camera: the top, the +x side and the +z side.
  const top = poly([v(0, h, 0), v(w, h, 0), v(w, h, d), v(0, h, d)])
  const right = poly([v(w, h, 0), v(w, 0, 0), v(w, 0, d), v(w, h, d)])
  const left = poly([v(0, h, d), v(w, h, d), v(w, 0, d), v(0, 0, d)])

  // Warm rim along the top edges, the way a low key light would catch them.
  const rim =
    `M${pt(v(0, h, 0))}L${pt(v(w, h, 0))}L${pt(v(w, h, d))}` +
    `M${pt(v(w, h, d))}L${pt(v(0, h, d))}`

  return (
    <g>
      <path className={`fc-${tone}-top`} d={top} />
      <path className={`fc-${tone}-right`} d={right} />
      <path className={`fc-${tone}-left`} d={left} />
      {lit && <path className="edge-lit" d={rim} />}
    </g>
  )
}

/** Vertical cylinder — silos, drums, stacks, hoppers' outlets. */
export function CylY({
  at: [x, y, z], radius, height, tone = 'body', lit = true,
}: {
  at: P3; radius: number; height: number; tone?: 'body' | 'light' | 'accent'; lit?: boolean
}) {
  const rx = radius * C * Math.SQRT2
  const ry = radius * S * Math.SQRT2
  const base = P(x, y, z)
  const top = P(x, y + height, z)

  // Body as a capsule between the two ellipse centres.
  const body =
    `M${r(base[0] - rx)} ${r(base[1])}` +
    `L${r(top[0] - rx)} ${r(top[1])}` +
    `A${r(rx)} ${r(ry)} 0 0 1 ${r(top[0] + rx)} ${r(top[1])}` +
    `L${r(base[0] + rx)} ${r(base[1])}` +
    `A${r(rx)} ${r(ry)} 0 0 1 ${r(base[0] - rx)} ${r(base[1])}Z`

  return (
    <g>
      <path className={`fc-${tone}-right`} d={body} />
      <ellipse className={`fc-${tone}-top`} cx={r(top[0])} cy={r(top[1])} rx={r(rx)} ry={r(ry)} />
      {lit && (
        <ellipse className="edge-lit" cx={r(top[0])} cy={r(top[1])} rx={r(rx)} ry={r(ry)}
                 fill="none" />
      )}
    </g>
  )
}

/** Square-to-round hopper: a tapered shell, drawn as two lit faces. */
export function Hopper3D({
  at: [x, y, z], top: wTop, bottom: wBot, height,
}: {
  at: P3; top: number; bottom: number; height: number
}) {
  const o = (wTop - wBot) / 2
  const v = (dx: number, dy: number, dz: number) => P(x + dx, y + dy, z + dz)

  const right = poly([v(wTop, height, 0), v(wTop, height, wTop),
                      v(o + wBot, 0, o + wBot), v(o + wBot, 0, o)])
  const left = poly([v(0, height, wTop), v(wTop, height, wTop),
                     v(o + wBot, 0, o + wBot), v(o, 0, o + wBot)])
  const rim = `M${pt(v(0, height, 0))}L${pt(v(wTop, height, 0))}L${pt(v(wTop, height, wTop))}L${pt(v(0, height, wTop))}Z`

  return (
    <g>
      <path className="fc-body-right" d={right} />
      <path className="fc-body-left" d={left} />
      <path className="edge-lit" d={rim} />
    </g>
  )
}

/**
 * Wheel standing in a vertical plane (bucket wheels, flywheels, tippler
 * rings). Returns a group whose local space is a unit circle, so children can
 * be drawn — and spun — in plain circle coordinates while the matrix handles
 * the projection.
 */
export function WheelPlane({
  at: [x, y, z], radius, spin, children,
}: {
  at: P3; radius: number; spin?: string; children: ReactNode
}) {
  const [cx, cy] = P(x, y, z)
  // Maps (cosθ, sinθ) to the projection of a circle in the XY plane.
  const m = `matrix(${r(C * radius)} ${r(S * radius)} 0 ${r(-radius)} ${r(cx)} ${r(cy)})`
  return (
    <g transform={m}>
      <g data-spin={spin} style={{ transformOrigin: '0px 0px' }}>
        {children}
      </g>
    </g>
  )
}

/* ------------------------------------------------------------------ *
 * Lattice
 * ------------------------------------------------------------------ */

export type Seg3 = [P3, P3]

/** Project a list of 3D segments into one path — a whole boom in one element. */
export function segPath(segs: Seg3[]): string {
  return segs
    .map(([a, b]) => `M${pt(P(...a))}L${pt(P(...b))}`)
    .join('')
}

/**
 * Four-chord box truss running from a to b, square in section. Returns the 3D
 * segments so the caller can project or explode them.
 */
export function truss3(a: P3, b: P3, side: number, bays: number): Seg3[] {
  const [ax, ay, az] = a
  const dx = b[0] - ax, dy = b[1] - ay, dz = b[2] - az
  const h = side / 2

  // Section offsets: vertical, and horizontal perpendicular to the run in XZ.
  const len = Math.hypot(dx, dz) || 1
  const px = -dz / len, pz = dx / len

  const corners: [number, number][] = [[-1, -1], [1, -1], [1, 1], [-1, 1]]
  const node = (t: number, c: number): P3 => {
    const [sv, sh] = corners[c]
    return [
      ax + dx * t + px * h * sh,
      ay + dy * t + h * sv,
      az + dz * t + pz * h * sh,
    ]
  }

  const segs: Seg3[] = []
  for (let i = 0; i < bays; i++) {
    const t0 = i / bays
    const t1 = (i + 1) / bays
    for (let c = 0; c < 4; c++) {
      segs.push([node(t0, c), node(t1, c)])              // chords
      segs.push([node(t0, c), node(t0, (c + 1) % 4)])    // frame
      const c2 = (c + 1) % 4
      segs.push(i % 2 === 0                               // alternating web
        ? [node(t0, c), node(t1, c2)]
        : [node(t0, c2), node(t1, c)])
    }
  }
  for (let c = 0; c < 4; c++) segs.push([node(1, c), node(1, (c + 1) % 4)])
  return segs
}

/** Tapered lattice tower rising along +y. */
export function tower3(base: P3, height: number, wBase: number, wTop: number, bays: number): Seg3[] {
  const [x, y, z] = base
  const half = (t: number) => (wBase + (wTop - wBase) * t) / 2
  const corners: [number, number][] = [[-1, -1], [1, -1], [1, 1], [-1, 1]]
  const node = (t: number, c: number): P3 => {
    const [sx, sz] = corners[c]
    return [x + sx * half(t), y + height * t, z + sz * half(t)]
  }

  const segs: Seg3[] = []
  for (let i = 0; i < bays; i++) {
    const t0 = i / bays
    const t1 = (i + 1) / bays
    for (let c = 0; c < 4; c++) {
      segs.push([node(t0, c), node(t1, c)])
      segs.push([node(t0, c), node(t0, (c + 1) % 4)])
      const c2 = (c + 1) % 4
      segs.push(i % 2 === 0 ? [node(t0, c), node(t1, c2)] : [node(t0, c2), node(t1, c)])
    }
  }
  for (let c = 0; c < 4; c++) segs.push([node(1, c), node(1, (c + 1) % 4)])
  return segs
}

/** Ground plane grid, drawn in projection so the solids sit on something. */
export function isoGrid(size: number, step: number): string {
  let d = ''
  for (let i = -size; i <= size; i += step) {
    d += `M${pt(P(i, 0, -size))}L${pt(P(i, 0, size))}`
    d += `M${pt(P(-size, 0, i))}L${pt(P(size, 0, i))}`
  }
  return d
}

/** Screen-space offset for an exploded part, along an axonometric direction. */
export function explode(dir: P3, amount: number): string {
  const [sx, sy] = P(dir[0] * amount, dir[1] * amount, dir[2] * amount)
  return `${r(sx)},${r(sy)}`
}
