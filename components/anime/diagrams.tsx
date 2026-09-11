/**
 * Axonometric assemblies of the equipment Lepton supplies.
 *
 * Each machine is built from the solids in iso.tsx, so it reads as a lit
 * three-dimensional object rather than a flat elevation — matte faces in three
 * tones with a warm edge light, in the manner of the anime.js site's hero.
 *
 * Parts are marked up declaratively so one animator drives every diagram
 * (see MachineDiagram.tsx):
 *
 *   data-draw="<order>"   stroke draws itself on, low order first
 *   data-part="dx,dy"     starts offset by (dx,dy) and slides home — use
 *                         explode() so parts fly apart along the iso axes
 *   data-spin="<secs>"    rotates forever about its own centre
 *   data-flow="<secs>" + data-fx/data-fy   material travelling a belt
 *   data-pulse            slow opacity breathing
 */

import {
  Box3D, CylY, Hopper3D, WheelPlane,
  segPath, truss3, tower3, isoGrid, explode,
  type P3, type Seg3,
} from './iso'

/** Ground grid, drawn behind every assembly. MachineDiagram frames the rest. */
export function IsoGround() {
  return <path className="ln-grid" d={isoGrid(300, 26)} />
}

/** Bulk material as a small lit cube riding a belt. */
function Lump({ at, flow, fx, fy }: { at: P3; flow: number; fx: number; fy: number }) {
  return (
    <g data-flow={flow} data-fx={fx} data-fy={fy}>
      <Box3D at={at} size={[9, 6, 9]} tone="accent" lit={false} />
    </g>
  )
}

/* ------------------------------------------------------------------ */

export function BucketWheelReclaimer() {
  const boom = truss3([14, 64, 0], [186, 40, 0], 22, 9)
  const cwBoom = truss3([-12, 70, 0], [-92, 74, 0], 18, 4)
  const mast = tower3([0, 66, 0], 86, 34, 12, 5)

  return (
    <>

      {/* Crawler undercarriage */}
      <g data-part={explode([0, -1, 0], 40)}>
        <Box3D at={[-46, 0, -34]} size={[92, 14, 22]} />
        <Box3D at={[-46, 0, 12]} size={[92, 14, 22]} />
        <Box3D at={[-34, 14, -30]} size={[68, 12, 60]} tone="light" />
      </g>

      {/* Slew platform + machinery house */}
      <g data-part={explode([0, 1, 0], 26)}>
        <CylY at={[0, 26, 0]} radius={26} height={10} tone="light" />
        <Box3D at={[-40, 36, -22]} size={[44, 30, 44]} tone="light" />
        <Box3D at={[6, 52, -10]} size={[18, 14, 18]} tone="accent" />
      </g>

      {/* A-frame mast */}
      <g data-part={explode([0, 1, 0], 70)}>
        <path className="ln-strut" data-draw="3" d={segPath(mast)} />
      </g>

      {/* Counterweight boom */}
      <g data-part={explode([-1, 0, 0], 80)}>
        <path className="ln-strut" data-draw="3" d={segPath(cwBoom)} />
        <Box3D at={[-116, 62, -14]} size={[26, 24, 28]} tone="accent" />
      </g>

      {/* Hoist ropes */}
      <path className="ln-rope" data-draw="5"
            d={segPath([
              [[0, 152, 0], [150, 48, 0]],
              [[0, 152, 0], [-86, 76, 0]],
            ] as Seg3[])} />

      {/* Boom, belt and bucket wheel */}
      <g data-part={explode([1, 0, 0], 90)}>
        <path className="ln-strut" data-draw="4" d={segPath(boom)} />
        {[0, 1, 2, 3, 4].map(i => (
          <Lump key={i} at={[30 + i * 32, 66 - i * 4, -4]} flow={3} fx={27.7} fy={11.9} />
        ))}
        <Box3D at={[176, 28, -16]} size={[16, 26, 32]} tone="light" />

        <WheelPlane at={[206, 40, 0]} radius={40} spin="9">
          <circle className="wh-rim" r="1" />
          <circle className="wh-hub" r="0.18" />
          {Array.from({ length: 10 }, (_, i) => {
            const a = (i / 10) * Math.PI * 2
            return (
              <g key={i}>
                <line className="wh-spoke" x1={Math.cos(a) * 0.2} y1={Math.sin(a) * 0.2}
                      x2={Math.cos(a) * 0.92} y2={Math.sin(a) * 0.92} />
                <rect className="wh-bucket" x={-0.11} y={-0.11} width="0.22" height="0.22"
                      transform={`translate(${Math.cos(a)} ${Math.sin(a)}) rotate(${(a * 180) / Math.PI})`} />
              </g>
            )
          })}
        </WheelPlane>
      </g>
    </>
  )
}

/* ------------------------------------------------------------------ */

export function OverlandConveyor() {
  const gallery = truss3([-190, 74, 0], [130, 74, 0], 26, 16)

  return (
    <>

      {/* Trestle bents */}
      <g data-part={explode([0, -1, 0], 46)}>
        {[-150, -90, -30, 30, 90].map(x => (
          <g key={x}>
            <Box3D at={[x - 6, 0, -16]} size={[12, 62, 10]} tone="light" />
            <Box3D at={[x - 6, 0, 6]} size={[12, 62, 10]} tone="light" />
            <Box3D at={[x - 10, 0, -22]} size={[20, 6, 44]} />
          </g>
        ))}
      </g>

      {/* Gallery truss + belt */}
      <g data-part={explode([0, 1, 0], 56)}>
        <path className="ln-strut" data-draw="2" d={segPath(gallery)} />
        {Array.from({ length: 9 }, (_, i) => (
          <Lump key={i} at={[-180 + i * 36, 78, -5]} flow={2.4} fx={31.2} fy={18} />
        ))}
      </g>

      {/* Transfer tower */}
      <g data-part={explode([1, 0, 0], 74)}>
        <path className="ln-strut" data-draw="3"
              d={segPath(tower3([168, 0, 0], 128, 56, 38, 7))} />
        <Box3D at={[148, 128, -20]} size={[40, 26, 40]} tone="light" />
        <Hopper3D at={[152, 84, -16]} top={32} bottom={10} height={34} />
        <CylY at={[196, 96, 8]} radius={13} height={30} tone="accent" />
      </g>
    </>
  )
}

/* ------------------------------------------------------------------ */

export function WagonTippler() {
  return (
    <>
      {/* Foundation slab */}
      <g data-part={explode([0, -1, 0], 48)}>
        <Box3D at={[-124, 0, -74]} size={[248, 12, 148]} />
      </g>

      {/* Tippler house — solid columns and roof beams rather than a wireframe */}
      <g data-part={explode([0, 1, 0], 66)}>
        {([[-112, -62], [96, -62], [-112, 46], [96, 46]] as [number, number][]).map(([x, z]) => (
          <Box3D key={`${x}:${z}`} at={[x, 12, z]} size={[16, 152, 16]} tone="light" />
        ))}
        <Box3D at={[-112, 164, -62]} size={[224, 12, 16]} tone="light" />
        <Box3D at={[-112, 164, 46]} size={[224, 12, 16]} tone="light" />
        <Box3D at={[-112, 164, -62]} size={[16, 12, 124]} tone="light" />
        <Box3D at={[96, 164, -62]} size={[16, 12, 124]} tone="light" />
      </g>

      {/* Approach track running through the house */}
      <path className="ln-rail" data-draw="2"
            d={segPath([
              [[-250, 24, -12], [250, 24, -12]],
              [[-250, 24, 12], [250, 24, 12]],
            ] as Seg3[])} />

      {/* Cage rings. The wagon is drawn inside the ring's projection matrix as
          a cross-section, so it turns in the cage's real plane — rotating a
          projected box in 2D just spins the drawing and never re-shades it. */}
      <g>
        {[-62, 62].map(x => (
          <WheelPlane key={x} at={[x, 78, 0]} radius={66} spin="14">
            <circle className="wh-rim" r="1" />
            <circle className="wh-rim-inner" r="0.78" />
            {Array.from({ length: 12 }, (_, i) => {
              const a = (i / 12) * Math.PI * 2
              return (
                <line key={i} className="wh-spoke"
                      x1={Math.cos(a) * 0.28} y1={Math.sin(a) * 0.28}
                      x2={Math.cos(a) * 0.99} y2={Math.sin(a) * 0.99} />
              )
            })}
            {/* wagon body, in section */}
            <rect className="wagon-face" x={-0.6} y={-0.46} width={1.2} height={0.62} />
            {/* clamp beams across the top of the wagon */}
            <rect className="wagon-clamp" x={-0.64} y={-0.54} width={1.28} height={0.1} />
          </WheelPlane>
        ))}
      </g>

      {/* Receiving hopper + apron feeder below */}
      <g data-part={explode([0, -1, 0], 40)}>
        <Hopper3D at={[-50, 12, -50]} top={100} bottom={30} height={36} />
        {Array.from({ length: 6 }, (_, i) => (
          <Lump key={i} at={[-44 + i * 30, 4, -5]} flow={2.8} fx={26} fy={15} />
        ))}
      </g>
    </>
  )
}

/* ------------------------------------------------------------------ */

export function CrushingPlant() {
  const belt = truss3([22, 46, 0], [190, 104, 0], 18, 9)

  return (
    <>

      {/* Support structure */}
      <g data-part={explode([0, -1, 0], 40)}>
        <path className="ln-strut" data-draw="1"
              d={segPath(tower3([-40, 0, 0], 150, 82, 74, 4))} />
      </g>

      {/* Feed hopper */}
      <g data-part={explode([0, 1, 0], 84)}>
        <Hopper3D at={[-80, 150, -80]} top={80} bottom={26} height={42} />
        <path className="ln-grizzly" data-draw="3"
              d={segPath(Array.from({ length: 5 }, (_, i) => [
                [-80 + i * 20, 192, -80], [-80 + i * 20, 192, 0],
              ] as Seg3[][number]))} />
      </g>

      {/* Vibrating screen */}
      <g data-part={explode([0, 1, 0], 40)}>
        <g data-pulse>
          <Box3D at={[-66, 104, -34]} size={[96, 12, 68]} tone="light" />
          <Box3D at={[-66, 116, -34]} size={[96, 4, 68]} tone="accent" lit={false} />
        </g>
      </g>

      {/* Jaw crusher with its flywheel */}
      <g data-part={explode([0, -1, 0], 24)}>
        <Box3D at={[-44, 30, -30]} size={[76, 58, 60]} />
        <WheelPlane at={[-6, 74, 32]} radius={26} spin="1.1">
          <circle className="wh-rim" r="1" />
          {Array.from({ length: 6 }, (_, i) => {
            const a = (i / 6) * Math.PI
            return (
              <line key={i} className="wh-spoke-accent"
                    x1={-Math.cos(a) * 0.9} y1={-Math.sin(a) * 0.9}
                    x2={Math.cos(a) * 0.9} y2={Math.sin(a) * 0.9} />
            )
          })}
        </WheelPlane>
      </g>

      {/* Product conveyor to the stockpile */}
      <g data-part={explode([1, 0, 0], 80)}>
        <path className="ln-strut" data-draw="5" d={segPath(belt)} />
        {Array.from({ length: 6 }, (_, i) => (
          <Lump key={i} at={[34 + i * 28, 50 + i * 9.7, -4]} flow={2.6} fx={24.2} fy={2.5} />
        ))}
        <CylY at={[212, 0, 0]} radius={54} height={2} tone="light" lit={false} />
        <Hopper3D at={[176, 0, -36]} top={72} bottom={4} height={52} />
      </g>
    </>
  )
}

/* ------------------------------------------------------------------ */

export function CircularStacker() {
  const boom = truss3([16, 150, 0], [176, 118, 0], 20, 8)
  const bridge = truss3([-16, 96, 0], [-168, 76, 0], 18, 8)

  return (
    <>

      {/* Annular stockpile, as a ring of radial wedges */}
      <g data-part={explode([0, -1, 0], 40)}>
        {Array.from({ length: 28 }, (_, i) => {
          const a = (i / 28) * Math.PI * 2
          const rIn = 78, rOut = 176
          const mid = (rIn + rOut) / 2
          return (
            <Box3D key={i}
                   at={[Math.cos(a) * mid - 14, 0, Math.sin(a) * mid - 14]}
                   size={[28, 34 + Math.sin(i * 1.7) * 5, 28]}
                   lit={false} />
          )
        })}
      </g>

      {/* Central slew column */}
      <g data-part={explode([0, 1, 0], 80)}>
        <path className="ln-strut" data-draw="2"
              d={segPath(tower3([0, 0, 0], 168, 44, 22, 8))} />
        <Box3D at={[-18, 168, -18]} size={[36, 14, 36]} tone="light" />
      </g>

      {/* Stacking boom */}
      <g data-part={explode([1, 0, 0], 80)}>
        <path className="ln-strut" data-draw="3" d={segPath(boom)} />
        {Array.from({ length: 5 }, (_, i) => (
          <Lump key={i} at={[36 + i * 30, 150 - i * 6, -4]} flow={2.8} fx={26} fy={18} />
        ))}
      </g>

      {/* Scraper reclaimer bridge */}
      <g data-part={explode([-1, 0, 0], 80)}>
        <path className="ln-strut" data-draw="4" d={segPath(bridge)} />
        <path className="ln-harrow" data-draw="5"
              d={segPath(Array.from({ length: 7 }, (_, i) => [
                [-60 - i * 14, 74 - i * 2, 0], [-60 - i * 14, 48 - i * 2, 0],
              ] as Seg3[][number]))} />
      </g>
    </>
  )
}

/* ------------------------------------------------------------------ */

export function BaghouseFilter() {
  return (
    <>

      {/* Support legs */}
      <g data-part={explode([0, -1, 0], 40)}>
        {[[-72, -40], [56, -40], [-72, 24], [56, 24]].map(([x, z]) => (
          <Box3D key={`${x}:${z}`} at={[x, 0, z]} size={[16, 68, 16]} tone="light" />
        ))}
      </g>

      {/* Dust hoppers */}
      <g data-part={explode([0, -1, 0], 26)}>
        {[-72, -8, 56].map(x => (
          <Hopper3D key={x} at={[x, 68, -40]} top={64} bottom={18} height={34} />
        ))}
      </g>

      {/* Filter casing, one solid per compartment */}
      <g data-part={explode([0, 1, 0], 64)}>
        {[-72, -8, 56].map(x => (
          <Box3D key={x} at={[x, 102, -40]} size={[62, 76, 62]} />
        ))}
        <Box3D at={[-76, 178, -44]} size={[198, 10, 130]} tone="light" />
        {/* pulse-jet valves firing in sequence */}
        {[-56, 8, 72].map(x => (
          <g key={x} data-pulse>
            <Box3D at={[x, 188, -8]} size={[16, 12, 16]} tone="accent" />
          </g>
        ))}
      </g>

      {/* ID fan and stack */}
      <g data-part={explode([1, 0, 0], 70)}>
        <Box3D at={[150, 40, -24]} size={[20, 20, 48]} tone="light" />
        <WheelPlane at={[160, 76, 0]} radius={34} spin="0.9">
          <circle className="wh-rim" r="1" />
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i / 8) * Math.PI * 2
            return (
              <line key={i} className="wh-spoke"
                    x1={Math.cos(a) * 0.2} y1={Math.sin(a) * 0.2}
                    x2={Math.cos(a) * 0.94} y2={Math.sin(a) * 0.94} />
            )
          })}
        </WheelPlane>
        <CylY at={[216, 0, 0]} radius={20} height={214} tone="light" />
        <CylY at={[216, 176, 0]} radius={21} height={14} tone="accent" />
      </g>
    </>
  )
}
