/**
 * Technical side elevations of the equipment Lepton supplies.
 *
 * Parts are marked up declaratively so one animator can drive every diagram
 * without per-machine choreography (see MachineDiagram.tsx):
 *
 *   data-draw="<order>"   stroke draws itself on, low order first
 *   data-part="dx,dy"     starts offset by (dx,dy) and slides home — the
 *                         exploded-assembly reveal
 *   data-spin="<secs>"    rotates forever about its own centre
 *   data-flow="<secs>"    travels left-to-right along the run and repeats
 *   data-pulse           slow opacity breathing
 */

import { truss, tower, trestle, spokes, buckets, hopper, dimension, ticks } from './technical'

export const VIEWBOX = '0 0 1000 560'
const GROUND = 496

/** Shared ground line + drawing-sheet furniture. */
function Sheet({ label, span }: { label: string; span?: [number, number, string] }) {
  return (
    <g className="sheet">
      <path className="ln-faint" data-draw="0" d={`M40 ${GROUND}L960 ${GROUND}`} />
      <path className="ln-faint" data-draw="0" d={ticks(40, 960, GROUND, 46, 7)} />
      {span && (
        <>
          <path className="ln-dim" data-draw="9" d={dimension(span[0], span[1], GROUND + 34)} />
          <text className="tx-dim" x={(span[0] + span[1]) / 2} y={GROUND + 28} textAnchor="middle">
            {span[2]}
          </text>
        </>
      )}
      <text className="tx-sheet" x={960} y={GROUND + 52} textAnchor="end">{label}</text>
    </g>
  )
}

/* ------------------------------------------------------------------ */

export function BucketWheelReclaimer() {
  const boom = truss(470, 330, 880, 402, 42, 11)
  const cwBoom = truss(430, 300, 250, 286, 34, 5)
  const mast = tower(452, 320, 130, 96, 26, 6)

  return (
    <>
      <Sheet label="BWR-800 · SIDE ELEVATION" span={[150, 916, '58 400']} />

      {/* Crawler undercarriage */}
      <g data-part="0,70">
        <rect className="sh-dark" x="300" y={GROUND - 54} width="250" height="46" rx="23" />
        <path className="ln" data-draw="1" d={`M300 ${GROUND - 31}h250`} />
        <path className="ln-faint" data-draw="1" d={ticks(310, 540, GROUND - 10, 18, 8)} />
        {[340, 390, 440, 490].map(x => (
          <circle key={x} className="ln" data-draw="1" cx={x} cy={GROUND - 31} r="13" />
        ))}
        <circle className="ac-fill" data-spin="6" cx="318" cy={GROUND - 31} r="8" />
        <circle className="ac-fill" data-spin="6" cx="532" cy={GROUND - 31} r="8" />
        <rect className="ln-box" x="330" y={GROUND - 86} width="190" height="30" />
      </g>

      {/* Slew ring + machinery house */}
      <g data-part="0,-46">
        <path className="ln" data-draw="2" d="M370 410L480 410L500 372L350 372Z" />
        <ellipse className="ac-stroke" data-draw="2" cx="425" cy="372" rx="76" ry="14" />
        <rect className="ln-box" x="330" y="286" width="118" height="84" />
        <path className="ln-faint" data-draw="3" d={ticks(342, 436, 300, 7, 56)} />
        <rect className="sh-dark" x="452" y="262" width="52" height="40" />
        <path className="ac-stroke" data-draw="3" d="M458 270h40v20h-40Z" />
      </g>

      {/* A-frame mast */}
      <g data-part="0,-90">
        <path className="ln" data-draw="3" d={mast.legs} />
        <path className="ln-faint" data-draw="4" d={mast.web} />
      </g>

      {/* Counterweight boom */}
      <g data-part="-90,0">
        <path className="ln" data-draw="3" d={cwBoom.chords} />
        <path className="ln-faint" data-draw="4" d={cwBoom.web} />
        <rect className="sh-dark" x="196" y="262" width="62" height="52" />
        <path className="ac-stroke" data-draw="4" d="M196 262h62" />
      </g>

      {/* Hoist ropes */}
      <path className="ln-thin" data-draw="5" d="M452 132L760 372M452 132L282 288" />

      {/* Boom + belt + bucket wheel */}
      <g data-part="120,30">
        <path className="ln" data-draw="4" d={boom.chords} />
        <path className="ln-faint" data-draw="5" d={boom.web} />
        <path className="ln-thin" data-draw="5" d="M476 306L884 378" />
        <g className="flow-track">
          {[0, 1, 2, 3, 4, 5].map(i => (
            <rect key={i} className="ac-fill" data-flow="3.2" data-fx="68" data-fy="12"
                  x={480 + i * 68} y={296 + i * 12} width="14" height="7" rx="2" />
          ))}
        </g>
        <g data-spin="9" style={{ transformOrigin: '900px 408px' }}>
          <circle className="ln" data-draw="6" cx="900" cy="408" r="58" />
          <circle className="ln-faint" data-draw="6" cx="900" cy="408" r="40" />
          <path className="ln-faint" data-draw="7" d={spokes(900, 408, 12, 56, 10)} />
          <path className="ac-stroke" data-draw="7" d={buckets(900, 408, 58, 10, 17)} />
          <circle className="sh-dark" cx="900" cy="408" r="12" />
        </g>
      </g>
    </>
  )
}

/* ------------------------------------------------------------------ */

export function OverlandConveyor() {
  const gallery = truss(120, 250, 800, 250, 46, 18)

  return (
    <>
      <Sheet label="OLC-2000 · SIDE ELEVATION" span={[120, 880, '2 200 m OVERLAND']} />

      {/* Trestle bents */}
      <g data-part="0,60">
        {[190, 310, 430, 550, 670].map(x => (
          <path key={x} className="ln" data-draw="1" d={trestle(x, 274, GROUND, 34)} />
        ))}
        {[190, 310, 430, 550, 670].map(x => (
          <rect key={x} className="sh-dark" x={x - 40} y={GROUND - 12} width="80" height="12" />
        ))}
      </g>

      {/* Gallery truss */}
      <g data-part="0,-70">
        <path className="ln" data-draw="2" d={gallery.chords} />
        <path className="ln-faint" data-draw="3" d={gallery.web} />
        <path className="ln-faint" data-draw="4" d={ticks(126, 794, 218, 34, 8)} />
      </g>

      {/* Carrying belt + material stream */}
      <path className="ln-thin" data-draw="4" d="M126 250L794 250M126 268L794 268" />
      <g className="flow-track">
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} className="ac-fill" data-flow="2.4" data-fx="56" data-fy="0"
                x={130 + i * 56} y="240" width="18" height="8" rx="2" />
        ))}
      </g>
      {[126, 794].map(x => (
        <circle key={x} className="ln" data-spin="1.4" cx={x} cy="259" r="16" />
      ))}

      {/* Transfer tower */}
      <g data-part="90,0">
        {(() => { const t = tower(858, GROUND, 176, 96, 62, 7); return (
          <>
            <path className="ln" data-draw="3" d={t.legs} />
            <path className="ln-faint" data-draw="4" d={t.web} />
          </>
        )})()}
        <rect className="ln-box" x="812" y="176" width="92" height="18" />
        <path className="ln" data-draw="5" d={hopper(858, 262, 66, 22, 62)} />
        <circle className="ac-stroke" data-pulse cx="922" cy="248" r="20" />
        <path className="ln-thin" data-draw="6" d="M922 228v-46M910 182h24" />
      </g>
    </>
  )
}

/* ------------------------------------------------------------------ */

export function WagonTippler() {
  const house = tower(500, GROUND, 120, 470, 470, 1)

  return (
    <>
      <Sheet label="WT-1200 · SECTION" span={[265, 735, 'Ø 9.4 m CAGE']} />

      {/* Tippler house portal */}
      <g data-part="0,-60">
        <path className="ln" data-draw="1" d={house.legs} />
        <path className="ln" data-draw="1" d="M265 120h470" />
        <path className="ln-faint" data-draw="2" d={ticks(280, 720, 120, 14, 22)} />
      </g>

      {/* Approach track */}
      <path className="ln-thin" data-draw="2" d={`M60 ${GROUND - 96}h880`} />
      <path className="ln-faint" data-draw="2" d={ticks(60, 940, GROUND - 92, 40, 8)} />

      {/* Rotating cage with the wagon inside */}
      <g data-spin="14" style={{ transformOrigin: '500px 300px' }}>
        <circle className="ln" data-draw="3" cx="500" cy="300" r="146" />
        <circle className="ln-faint" data-draw="3" cx="500" cy="300" r="122" />
        <path className="ln-faint" data-draw="4" d={spokes(500, 300, 40, 144, 12)} />
        <rect className="sh-dark" x="392" y="248" width="216" height="86" rx="4" />
        <path className="ln-faint" data-draw="5" d={ticks(400, 600, 252, 9, 78)} />
        <path className="ac-stroke" data-draw="5" d="M388 242h224M388 340h224" />
        <rect className="ac-fill" x="400" y="256" width="200" height="12" rx="2" />
      </g>

      {/* Receiving hopper + apron feeder */}
      <g data-part="0,80">
        <path className="ln" data-draw="6" d={hopper(500, GROUND - 46, 260, 70, 92)} />
        <path className="ln-thin" data-draw="7" d={`M430 ${GROUND + 46}h420`} />
        <g className="flow-track">
          {Array.from({ length: 8 }, (_, i) => (
            <rect key={i} className="ac-fill" data-flow="2.8" data-fx="52" data-fy="0"
                  x={440 + i * 52} y={GROUND + 34} width="16" height="9" rx="2" />
          ))}
        </g>
      </g>

      {/* Ring gear drive */}
      <circle className="ac-stroke" data-spin="3" cx="646" cy="300" r="26" />
      <path className="ln-faint" data-draw="6" d={spokes(646, 300, 12, 25, 12)} />
    </>
  )
}

/* ------------------------------------------------------------------ */

export function CrushingPlant() {
  const frame = tower(430, GROUND, 210, 240, 200, 4)
  const belt = truss(470, 392, 852, 268, 30, 10)

  return (
    <>
      <Sheet label="JC-1000 · SIDE ELEVATION" span={[310, 972, '38 500']} />

      {/* Support structure */}
      <g data-part="0,50">
        <path className="ln" data-draw="1" d={frame.legs} />
        <path className="ln-faint" data-draw="2" d={frame.web} />
      </g>

      {/* Feed hopper + grizzly */}
      <g data-part="0,-90">
        <path className="ln" data-draw="2" d={hopper(430, 96, 210, 70, 92)} />
        <path className="ac-stroke" data-draw="3" d="M330 96h200" />
        {/* grizzly bars across the hopper mouth */}
        <path className="ac-stroke" data-draw="3" d={ticks(344, 516, 88, 6, 16)} />
      </g>

      {/* Double-deck vibrating screen */}
      <g data-part="-60,0">
        <g data-pulse>
          <path className="ln" data-draw="3" d="M330 250L540 230L540 268L330 288Z" />
          <path className="ln-faint" data-draw="4" d="M330 268L540 248" />
          <path className="ln-faint" data-draw="4" d={ticks(340, 530, 246, 12, 14)} />
        </g>
      </g>

      {/* Jaw crusher */}
      <g data-part="0,60">
        <rect className="ln-box" x="352" y="320" width="156" height="120" />
        <path className="ln" data-draw="5" d="M380 330L404 424M480 330L456 424" />
        <path className="ac-stroke" data-draw="5" d="M404 424h52" />
        <g data-spin="1.1" style={{ transformOrigin: '430px 340px' }}>
          <circle className="ln" data-draw="5" cx="430" cy="340" r="44" />
          <path className="ac-stroke" data-draw="6" d={spokes(430, 340, 10, 42, 6)} />
        </g>
      </g>

      {/* Product conveyor to stockpile */}
      <g data-part="90,0">
        <path className="ln" data-draw="6" d={belt.chords} />
        <path className="ln-faint" data-draw="7" d={belt.web} />
        <g className="flow-track">
          {Array.from({ length: 7 }, (_, i) => (
            <rect key={i} className="ac-fill" data-flow="2.6" data-fx="54" data-fy="-17"
                  x={480 + i * 54} y={380 - i * 17} width="14" height="8" rx="2" />
          ))}
        </g>
        <path className="ln" data-draw="7" d={`M766 ${GROUND}L866 300L966 ${GROUND}Z`} />
      </g>
    </>
  )
}

/* ------------------------------------------------------------------ */

export function CircularStacker() {
  const column = tower(500, GROUND, 108, 92, 44, 8)
  const boom = truss(528, 190, 858, 250, 34, 8)
  const bridge = truss(472, 300, 180, 344, 28, 7)

  return (
    <>
      <Sheet label="CSR-600 · SECTION" span={[120, 880, 'Ø 34 m YARD']} />

      {/* Annular stockpile section */}
      <g data-part="0,60">
        <path className="ln" data-draw="1"
              d={`M120 ${GROUND}L258 372L330 358L430 ${GROUND}Z`} />
        <path className="ln" data-draw="1"
              d={`M570 ${GROUND}L670 358L742 372L880 ${GROUND}Z`} />
        <path className="ln-faint" data-draw="2" d={ticks(140, 410, GROUND - 16, 12, 10)} />
        <path className="ln-faint" data-draw="2" d={ticks(590, 860, GROUND - 16, 12, 10)} />
      </g>

      {/* Central slew column */}
      <g data-part="0,-80">
        <path className="ln" data-draw="2" d={column.legs} />
        <path className="ln-faint" data-draw="3" d={column.web} />
        <rect className="ln-box" x="452" y="92" width="96" height="26" />
      </g>

      {/* Stacking boom */}
      <g data-part="80,-20">
        <path className="ln" data-draw="3" d={boom.chords} />
        <path className="ln-faint" data-draw="4" d={boom.web} />
        <g className="flow-track">
          {Array.from({ length: 5 }, (_, i) => (
            <rect key={i} className="ac-fill" data-flow="2.8" data-fx="62" data-fy="11"
                  x={540 + i * 62} y={178 + i * 11} width="14" height="8" rx="2" />
          ))}
        </g>
        <path className="ln-thin" data-draw="5" d="M500 112L800 226" />
        <path className="ac-stroke" data-draw="5" d="M852 262L866 300L838 300Z" />
      </g>

      {/* Scraper reclaimer bridge */}
      <g data-part="-80,20">
        <path className="ln" data-draw="4" d={bridge.chords} />
        <path className="ln-faint" data-draw="5" d={bridge.web} />
        <path className="ac-stroke" data-draw="6" d="M300 352L300 382M340 348L340 378M380 344L380 374M420 340L420 370" />
        <rect className="ln-box" x="150" y="352" width="44" height="28" />
      </g>

      {/* Slew arc */}
      <path className="ln-dim" data-draw="8" d="M300 462A230 120 0 0 0 700 462" />
      <path className="ac-stroke" data-draw="8" d="M700 462l-16-10 2 20Z" />
    </>
  )
}

/* ------------------------------------------------------------------ */

export function BaghouseFilter() {
  const legs = tower(430, GROUND, 348, 320, 320, 1)

  return (
    <>
      <Sheet label="PJF-36 · SIDE ELEVATION" span={[270, 590, '4 COMPARTMENTS']} />

      {/* Support legs */}
      <g data-part="0,50">
        <path className="ln" data-draw="1" d={legs.legs} />
        <path className="ln-faint" data-draw="2" d="M270 348L590 430M590 348L270 430" />
      </g>

      {/* Dust hoppers */}
      <g data-part="0,40">
        {[310, 390, 470, 550].map(x => (
          <g key={x}>
            <path className="ln" data-draw="3" d={hopper(x, 268, 78, 20, 80)} />
            <circle className="ac-stroke" data-spin="2.6" cx={x} cy="360" r="12" />
          </g>
        ))}
      </g>

      {/* Filter casing + compartments */}
      <g data-part="0,-70">
        <rect className="ln-box" x="270" y="120" width="320" height="148" />
        {[350, 430, 510].map(x => (
          <path key={x} className="ln-faint" data-draw="4" d={`M${x} 120v148`} />
        ))}
        <path className="ln-faint" data-draw="5" d={ticks(282, 578, 138, 24, 112)} />
        <rect className="sh-dark" x="270" y="96" width="320" height="26" />
        {/* pulse-jet valves fire in sequence */}
        {[310, 390, 470, 550].map(x => (
          <rect key={x} className="ac-fill" data-pulse x={x - 9} y="78" width="18" height="18" rx="3" />
        ))}
        <path className="ln-thin" data-draw="5" d="M290 78h280" />
      </g>

      {/* ID fan + stack */}
      <g data-part="90,0">
        <circle className="ln" data-draw="6" cx="686" cy="326" r="46" />
        <path className="ac-stroke" data-spin="0.9" d={spokes(686, 326, 10, 44, 8)}
              style={{ transformOrigin: '686px 326px' }} />
        <path className="ln-thin" data-draw="6" d="M590 326h50" />
        <path className="ln" data-draw="7" d={`M842 ${GROUND}L842 126L892 126L892 ${GROUND}`} />
        <path className="ac-stroke" data-draw="7" d="M842 156h50M842 178h50" />
        <path className="ln-thin" data-draw="7" d="M732 300L842 226" />
      </g>
    </>
  )
}
