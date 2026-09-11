'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { OrbitControls, ContactShadows, Grid, Html } from '@react-three/drei'
import type { MachineSpec } from './registry'

/** Callout marker anchored to a point on the machine. */
function Callout({ at, label, side = 'right', index }: {
  at: [number, number, number]
  label: string
  side?: 'left' | 'right'
  index: number
}) {
  return (
    <Html position={at} center={false} zIndexRange={[10, 0]} occlude={false}>
      <div
        className="machine-callout"
        data-side={side}
        style={{ animationDelay: `${400 + index * 130}ms` }}
      >
        <span className="machine-callout__dot" />
        <span className="machine-callout__line" />
        <span className="machine-callout__label">{label}</span>
      </div>
    </Html>
  )
}

/**
 * Collects the corners of every mesh's world-space bounding box. InstancedMesh
 * bounds already account for each instance, so a lattice boom of 500 struts
 * contributes 8 points rather than 4,000.
 */
function samplePoints(model: THREE.Object3D): THREE.Vector3[] {
  const pts: THREE.Vector3[] = []
  model.updateWorldMatrix(true, true)

  model.traverse(obj => {
    const mesh = obj as THREE.Mesh & { isMesh?: boolean; isInstancedMesh?: boolean }
    if (!mesh.isMesh) return

    let box: THREE.Box3 | null
    if (mesh.isInstancedMesh) {
      const im = mesh as unknown as THREE.InstancedMesh
      if (!im.boundingBox) im.computeBoundingBox()
      box = im.boundingBox
    } else {
      if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox()
      box = mesh.geometry.boundingBox
    }
    if (!box) return

    for (let i = 0; i < 8; i++) {
      pts.push(
        new THREE.Vector3(
          i & 1 ? box.max.x : box.min.x,
          i & 2 ? box.max.y : box.min.y,
          i & 4 ? box.max.z : box.min.z
        ).applyMatrix4(mesh.matrixWorld)
      )
    }
  })
  return pts
}

const WORLD_UP = new THREE.Vector3(0, 1, 0)

/**
 * Solves for the camera distance that just contains every sample point, for a
 * given view direction. Exact rather than estimated: a point at view-depth vz
 * with lateral offset vx needs `dist >= vz + vx / tan(fov/2)`.
 */
function distanceToFit(
  pts: THREE.Vector3[],
  centre: THREE.Vector3,
  dir: THREE.Vector3,
  tanH: number,
  tanV: number
) {
  const zA = dir.clone().normalize()
  const xA = new THREE.Vector3().crossVectors(WORLD_UP, zA).normalize()
  const yA = new THREE.Vector3().crossVectors(zA, xA).normalize()

  const v = new THREE.Vector3()
  let dist = 0
  for (const p of pts) {
    v.subVectors(p, centre)
    const vz = v.dot(zA)
    dist = Math.max(
      dist,
      vz + Math.abs(v.dot(xA)) / tanH,
      vz + Math.abs(v.dot(yA)) / tanV
    )
  }
  return dist
}

/**
 * Frames the machine to fit whatever shape the canvas happens to be — a wide
 * hero, a 4:3 card or a phone — and holds that framing through a full
 * auto-orbit by fitting the worst azimuth, not just the opening one.
 * Runs until the dynamically-imported model has actually mounted.
 */
function AutoFrame({
  modelRef,
  controlsRef,
  direction,
  padding,
  onFramed,
}: {
  modelRef: React.RefObject<THREE.Group>
  controlsRef: React.MutableRefObject<any>
  direction: [number, number, number]
  padding: number
  onFramed: () => void
}) {
  const camera = useThree(s => s.camera) as THREE.PerspectiveCamera
  const size = useThree(s => s.size)
  const done = useRef(false)

  // Re-fit whenever the canvas is resized.
  useEffect(() => { done.current = false }, [size.width, size.height])

  useFrame(() => {
    if (done.current || !modelRef.current) return
    const pts = samplePoints(modelRef.current)
    if (pts.length === 0) return

    let yMin = Infinity
    let yMax = -Infinity
    for (const p of pts) {
      yMin = Math.min(yMin, p.y)
      yMax = Math.max(yMax, p.y)
    }
    if (!isFinite(yMin)) return

    // Orbit runs about the world Y axis, so the model is centred on it —
    // each machine's `offset` is what places it there.
    const centre = new THREE.Vector3(0, (yMax + yMin) / 2, 0)

    const vFov = (camera.fov * Math.PI) / 180
    const tanV = Math.tan(vFov / 2)
    const tanH = tanV * (size.width / size.height)

    const dir = new THREE.Vector3(...direction).normalize()
    const elevation = Math.asin(THREE.MathUtils.clamp(dir.y, -1, 1))
    const cosE = Math.cos(elevation)

    // Worst case across the orbit, so auto-rotation never clips the model.
    let dist = 0
    const probe = new THREE.Vector3()
    for (let k = 0; k < 24; k++) {
      const az = (k / 24) * Math.PI * 2
      probe.set(cosE * Math.cos(az), Math.sin(elevation), cosE * Math.sin(az))
      dist = Math.max(dist, distanceToFit(pts, centre, probe, tanH, tanV))
    }
    dist *= padding
    if (!(dist > 0)) return

    camera.position.copy(centre).addScaledVector(dir, dist)
    camera.near = Math.max(0.1, dist * 0.05)
    camera.far = dist * 4
    camera.updateProjectionMatrix()

    const controls = controlsRef.current
    if (controls) {
      controls.target.copy(centre)
      controls.minDistance = dist * 0.4
      controls.maxDistance = dist * 2.2
      controls.update()
    }
    done.current = true
    onFramed()
  })

  return null
}

/** Fires once, a few frames after the scene settles — the cue to grab a still. */
function ReadyAfter({ frames, onReady }: { frames: number; onReady: () => void }) {
  const count = useRef(0)
  const fired = useRef(false)
  useFrame(() => {
    if (fired.current) return
    if (++count.current < frames) return
    fired.current = true
    onReady()
  })
  return null
}

/**
 * Warm fresnel rim, patched into every material in the model.
 *
 * This is what gives the reference its look: parts read as dark matte volumes
 * whose silhouettes are picked out by a hot edge. Doing it in the shader rather
 * than with a back light means the highlight tracks the true curvature of each
 * strut, so a lattice boom reads as hundreds of lit edges instead of a glow.
 */
const RIM_COLOR = new THREE.Color('#ff5a22')

function applyRim(root: THREE.Object3D, strength: number) {
  root.traverse(obj => {
    const mesh = obj as THREE.Mesh
    if (!mesh.material) return
    const list = Array.isArray(mesh.material) ? mesh.material : [mesh.material]

    for (const mat of list) {
      const std = mat as THREE.MeshStandardMaterial
      if (std.userData?.rimPatched) continue
      std.userData = { ...std.userData, rimPatched: true }

      std.onBeforeCompile = shader => {
        shader.uniforms.uRimColor = { value: RIM_COLOR }
        shader.uniforms.uRimStrength = { value: strength }
        shader.uniforms.uRimPower = { value: 5.0 }
        shader.fragmentShader = shader.fragmentShader
          .replace(
            '#include <common>',
            `#include <common>
             uniform vec3 uRimColor;
             uniform float uRimStrength;
             uniform float uRimPower;`
          )
          .replace(
            '#include <dithering_fragment>',
            `#include <dithering_fragment>
             float facing = abs(dot(normalize(vNormal), normalize(vViewPosition)));
             float rim = pow(1.0 - facing, uRimPower);
             gl_FragColor.rgb += uRimColor * rim * uRimStrength;`
          )
      }
      std.needsUpdate = true
    }
  })
}

/**
 * Assembles the machine out of its own exploded parts on reveal. Part
 * directions are derived from each top-level group's position relative to the
 * whole, so no machine has to author an explode axis by hand.
 */
function AssembleRig({
  modelRef,
  duration = 1.7,
}: {
  modelRef: React.RefObject<THREE.Group>
  duration?: number
}) {
  const parts = useRef<
    { obj: THREE.Object3D; base: THREE.Vector3; offset: THREE.Vector3 }[]
  >([])
  const ready = useRef(false)
  const settled = useRef(false)
  const startedAt = useRef(0)

  useFrame(({ clock }) => {
    if (settled.current) return
    const root = modelRef.current
    if (!root) return

    if (!ready.current) {
      // modelRef wraps the machine component, which is itself one group.
      let host: THREE.Object3D = root
      while (host.children.length === 1 && host.children[0].children.length > 1) {
        host = host.children[0]
      }
      if (host.children.length < 2) return

      const whole = new THREE.Box3().setFromObject(host)
      if (whole.isEmpty()) return
      const centre = whole.getCenter(new THREE.Vector3())
      const spread = whole.getSize(new THREE.Vector3()).length() * 0.16

      parts.current = host.children.map(obj => {
        const box = new THREE.Box3().setFromObject(obj)
        const dir = box.isEmpty()
          ? new THREE.Vector3(0, 1, 0)
          : box.getCenter(new THREE.Vector3()).sub(centre)
        if (dir.lengthSq() < 1e-6) dir.set(0, 1, 0)
        return {
          obj,
          base: obj.position.clone(),
          offset: dir.normalize().multiplyScalar(spread),
        }
      })
      ready.current = true
      startedAt.current = clock.elapsedTime
    }

    const p = Math.min(1, (clock.elapsedTime - startedAt.current) / duration)
    const eased = 1 - Math.pow(1 - p, 4)
    const amount = 1 - eased

    for (const { obj, base, offset } of parts.current) {
      obj.position.copy(base).addScaledVector(offset, amount)
    }

    if (p >= 1) {
      // Stop writing so machines that animate their own top-level groups
      // (the vibrating screen, for one) get their positions back.
      for (const { obj, base } of parts.current) obj.position.copy(base)
      settled.current = true
    }
  })

  return null
}

/**
 * Image-based lighting from three's built-in RoomEnvironment. Without an
 * environment map every metallic surface renders near-black wherever it isn't
 * hit by a direct light; this is generated in-process, so no HDR is fetched.
 */
function StudioEnvironment() {
  const gl = useThree(s => s.gl)
  const scene = useThree(s => s.scene)

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    const room = new RoomEnvironment()
    const target = pmrem.fromScene(room, 0.04)
    scene.environment = target.texture
    // The room is a bright white box; at full strength it washes the models
    // out and flattens the key light, so the IBL is used only as fill.
    scene.environmentIntensity = 0.26
    return () => {
      scene.environment = null
      target.dispose()
      room.dispose?.()
      pmrem.dispose()
    }
  }, [gl, scene])

  return null
}

export function MachineScene({
  spec,
  speed,
  showAnnotations,
  interactive,
  quality = 'full',
  onReady,
  onContextLost,
}: {
  spec: MachineSpec
  speed: number
  showAnnotations: boolean
  interactive: boolean
  quality?: 'full' | 'card'
  /** Called once the model is framed and drawn — cue to capture a still */
  onReady?: () => void
  onContextLost?: () => void
}) {
  const { Component } = spec
  const full = quality === 'full'
  const modelRef = useRef<THREE.Group>(null)
  const controlsRef = useRef<any>(null)
  const [framed, setFramed] = useState(false)

  return (
    <Canvas
      shadows={full}
      dpr={full ? [1, 1.75] : [1, 1.25]}
      gl={{
        antialias: true,
        alpha: true,
        // Card canvases are read back with toDataURL to produce a still, which
        // needs the drawing buffer to survive the composite.
        preserveDrawingBuffer: !full,
      }}
      camera={{ position: spec.viewDirection, fov: 30, near: 0.5, far: 220 }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1.15

        const canvas = gl.domElement
        const lost = (e: Event) => {
          e.preventDefault()
          onContextLost?.()
        }
        canvas.addEventListener('webglcontextlost', lost)
      }}
    >
      {/* Key light — hard, high, casts the structural shadows */}
      <directionalLight
        position={[18, 26, 14]}
        intensity={1.35}
        castShadow={full}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-26}
        shadow-camera-right={26}
        shadow-camera-top={26}
        shadow-camera-bottom={-26}
        shadow-camera-far={80}
        shadow-bias={-0.0008}
      />
      {/* Cool fill from the opposite side keeps the shadow side readable */}
      <directionalLight position={[-16, 10, -12]} intensity={0.38} color="#b8c6d6" />
      {/* Warm kicker behind the machine, working with the shader rim */}
      <directionalLight position={[-14, 7, -16]} intensity={0.55} color="#ff6a33" />
      <hemisphereLight args={['#ffffff', '#141414', 0.16]} />
      <StudioEnvironment />

      <Suspense fallback={null}>
        <group position={spec.offset}>
          <group ref={modelRef}>
            <Component speed={speed} />
          </group>

          {showAnnotations &&
            spec.annotations.map((a, i) => (
              <Callout key={a.label} at={a.at} label={a.label} side={a.side} index={i} />
            ))}

          {full && (
            <ContactShadows
              position={[0, 0.01, 0]}
              opacity={0.62}
              scale={58}
              blur={2.1}
              far={16}
              resolution={1024}
              color="#000000"
            />
          )}
          {/* Blueprint ground plane */}
          <Grid
            position={[0, 0, 0]}
            args={[80, 80]}
            cellSize={1}
            cellThickness={0.5}
            cellColor="#6a6a6a"
            sectionSize={5}
            sectionThickness={1}
            sectionColor="#8a3a22"
            fadeDistance={full ? 62 : 46}
            fadeStrength={1.6}
            infiniteGrid
            followCamera={false}
          />
        </group>
      </Suspense>

      <AutoFrame
        modelRef={modelRef}
        controlsRef={controlsRef}
        direction={spec.viewDirection}
        // Callout labels sit outside the model, so leave them room.
        padding={showAnnotations ? 1.16 : 1.04}
        onFramed={() => {
          if (modelRef.current) applyRim(modelRef.current, full ? 1.35 : 1.0)
          setFramed(true)
        }}
      />
      {/* Cards are captured as stills, so they skip the reveal and sit assembled. */}
      {full && <AssembleRig modelRef={modelRef} />}
      {framed && onReady && <ReadyAfter frames={12} onReady={onReady} />}
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={interactive}
        enableRotate={interactive}
        autoRotate={speed > 0}
        autoRotateSpeed={0.45 * speed}
        minPolarAngle={0.25}
        maxPolarAngle={Math.PI / 2.12}
        enableDamping
        dampingFactor={0.06}
      />
    </Canvas>
  )
}
