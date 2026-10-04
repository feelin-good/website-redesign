import Image from 'next/image'
import { ROUTE } from '@/lib/lepton'

/** A photograph mounted on the sheet as a numbered plate, with a dimension line and a callout. */
export function Plate({
  src, alt, plate, caption, date, dim, callout, ratio = '16 / 9', priority,
}: {
  src: string
  alt: string
  plate: string
  caption: string
  date?: string
  dim?: { label: string; left: string; right: string; top: string }
  callout?: { lines: string[]; right: string; bottom: string; leader?: number }
  ratio?: string
  priority?: boolean
}) {
  return (
    <figure className="plate">
      <div className="frame" style={{ aspectRatio: ratio }}>
        <Image src={src} alt={alt} fill sizes="(max-width: 900px) 100vw, 60vw" priority={priority} />
        {dim && (
          <div className="dim" style={{ left: dim.left, right: dim.right, top: dim.top }} aria-hidden>
            <span>{dim.label}</span>
          </div>
        )}
        {callout && (
          <div className="callout" style={{ right: callout.right, bottom: callout.bottom, ['--leader' as string]: `${callout.leader ?? 56}px` }} aria-hidden>
            {callout.lines.map((l) => <div key={l}>{l}</div>)}
          </div>
        )}
      </div>
      <figcaption className="ref">
        <span><b>{plate}</b> · {caption}</span>
        {date && <span>{date}</span>}
      </figcaption>
    </figure>
  )
}

/**
 * Section A–A: the material route, drawn as a flowsheet. Mine/rail → receive → crush →
 * convey → stack → ship, with ore moving along the belt line.
 */
export function RouteSchematic() {
  const belt = 'M60 214 H210 L250 214 H330 L380 214 L560 120 H640 L690 214 H860 L940 150 H1010 L1060 214 H1180'
  return (
    <div className="route">
      <div className="svgwrap" tabIndex={0} aria-label="Section A–A drawing, scrolls sideways">
      <svg viewBox="0 0 1240 300" role="img" aria-labelledby="route-t route-d">
        <title id="route-t">Section A–A: the material route</title>
        <desc id="route-d">Line drawing of a bulk handling plant from left to right: a wagon tippler over a receiving hopper, a crusher house, an inclined conveyor gallery, a stacker over a stockpile, and a ship loader at a berth.</desc>
        <line className="ground" x1="20" y1="230" x2="1220" y2="230" />

        {/* TT-1 wagon tippler + hopper */}
        <g className="ln">
          <rect x="70" y="150" width="110" height="48" />
          <circle cx="92" cy="206" r="8" /><circle cx="158" cy="206" r="8" />
          <circle cx="125" cy="174" r="62" className="thin" />
          <path d="M95 230 L110 262 H140 L155 230" />
        </g>
        {/* TT-2 crusher house */}
        <g className="ln">
          <path d="M260 230 V120 L300 96 L340 120 V230" />
          <path d="M282 150 L300 196 L318 150" className="thin" />
          <rect x="286" y="200" width="28" height="20" className="thin" />
        </g>
        {/* TT-3 conveyor gallery on trestles */}
        <g className="ln thin">
          <path d="M380 214 L560 120" />
          <path d="M420 193 V230 M470 167 V230 M520 141 V230 M420 230 L470 167 M470 230 L520 141" />
          <rect x="560" y="96" width="80" height="40" />
          <path d="M575 136 V230 M625 136 V230" />
        </g>
        {/* TT-4 stacker over pile */}
        <path className="pile" d="M700 230 Q760 168 820 168 Q880 168 900 230 Z" />
        <g className="ln">
          <path d="M690 214 H860" className="thin" />
          <rect x="740" y="196" width="40" height="18" />
          <path d="M760 196 V130 L860 168 M760 130 L740 150" />
        </g>
        {/* TT-5 ship loader + ship */}
        <g className="ln">
          <path d="M940 230 V150 H1010 V230 M940 190 H1010" className="thin" />
          <path d="M1010 150 L1110 172" />
          <path d="M1060 236 H1200 L1188 266 H1078 Z" />
          <path d="M1100 236 V218 H1150 V236" className="thin" />
        </g>
        <path d="M20 268 Q50 262 80 268 T140 268 M1040 280 Q1070 274 1100 280 T1160 280 T1220 280" className="ln thin" />

        {/* the belt line the ore travels along */}
        <path id="beltline" d={belt} className="belt draw" pathLength={1} />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect key={i} className="ore" x="-5" y="-12" width="10" height="9">
            <animateMotion dur="9s" repeatCount="indefinite" begin={`${-i * 1.3}s`} rotate="auto">
              <mpath href="#beltline" />
            </animateMotion>
          </rect>
        ))}

        {ROUTE.map((s, i) => (
          <g key={s.id}>
            <text className="tt" x={[100, 280, 480, 760, 1000][i]} y="40">{s.tt}</text>
            <text x={[100, 280, 480, 760, 1000][i]} y="62">{s.name.toUpperCase()}</text>
          </g>
        ))}
      </svg>
      </div>
      <p className="ref hint" aria-hidden>← Scroll the section →</p>
      <div className="stations">
        {ROUTE.map((s) => (
          <div key={s.id}>
            <span className="ref"><b>{s.tt}</b> · {s.name}</span>
            <ul>{s.items.map((it) => <li key={it}>{it}</li>)}</ul>
          </div>
        ))}
      </div>
    </div>
  )
}

/** A revision cloud drawn around text — the drafting way to say "look here". */
export function Cloud({ children }: { children: React.ReactNode }) {
  // scalloped path around a 0..100 × 0..40 box, stretched with preserveAspectRatio=none
  const arcs: string[] = []
  const r = 4
  let d = 'M0 0'
  for (let x = 0; x < 100; x += 2 * r) arcs.push(`a${r} ${r * 1.3} 0 0 1 ${2 * r} 0`)
  d += arcs.join(' ')
  const side = (n: number, dx: number, dy: number) => Array.from({ length: n }, () => `a${r * 1.3} ${r} 0 0 1 ${dx} ${dy}`).join(' ')
  d += side(5, 0, 8) + Array.from({ length: Math.ceil(100 / (2 * r)) }, () => `a${r} ${r * 1.3} 0 0 1 ${-2 * r} 0`).join(' ') + side(5, 0, -8)
  return (
    <span className="cloud">
      <svg viewBox="-4 -4 112 48" preserveAspectRatio="none" aria-hidden><path d={d} vectorEffect="non-scaling-stroke" /></svg>
      {children}
      <svg className="delta" viewBox="0 0 34 30" aria-hidden>
        <path d="M17 2 32 28H2Z" fill="#d83828" />
        <text x="17" y="24" textAnchor="middle" fontSize="13" fontFamily="monospace" fill="#fff">1</text>
      </svg>
    </span>
  )
}
