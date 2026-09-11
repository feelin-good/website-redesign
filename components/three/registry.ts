import type { ComponentType } from 'react'
import dynamic from 'next/dynamic'
import type { V3 } from './primitives'

export interface Annotation {
  /** 3D anchor point on the machine (model space, before `offset`) */
  at: V3
  label: string
  /** Which side the callout label flies out to */
  side?: 'left' | 'right'
}

export interface MachineSpec {
  /** Drawing-style designation, e.g. "BWR-800" */
  code: string
  /** Full equipment name */
  name: string
  /** Short spec chips shown in the HUD */
  specs: string[]
  /**
   * Direction the camera looks from, as a vector from the model's centre.
   * Magnitude is irrelevant — MachineScene fits the distance to the canvas.
   */
  viewDirection: V3
  /** Translation applied to the model so it sits on the ground plane */
  offset: V3
  annotations: Annotation[]
  Component: ComponentType<{ speed?: number }>
}

/* Each model is its own dynamic chunk, so a page only ships the machine it shows. */
const BucketWheelReclaimer = dynamic(
  () => import('./machines/BucketWheelReclaimer').then(m => m.BucketWheelReclaimer), { ssr: false })
const OverlandConveyor = dynamic(
  () => import('./machines/OverlandConveyor').then(m => m.OverlandConveyor), { ssr: false })
const WagonTippler = dynamic(
  () => import('./machines/WagonTippler').then(m => m.WagonTippler), { ssr: false })
const CrushingPlant = dynamic(
  () => import('./machines/CrushingPlant').then(m => m.CrushingPlant), { ssr: false })
const CircularStacker = dynamic(
  () => import('./machines/CircularStacker').then(m => m.CircularStacker), { ssr: false })
const BaghouseFilter = dynamic(
  () => import('./machines/BaghouseFilter').then(m => m.BaghouseFilter), { ssr: false })

export const MACHINES = {
  'bucket-wheel-reclaimer': {
    code: 'BWR-800',
    name: 'Bucket Wheel Stacker / Reclaimer',
    specs: ['800 TPH', 'Ø 4.3 m wheel', '10 buckets', 'Crawler mounted'],
    viewDirection: [22, 12, 24],
    offset: [-4.4, -2.4, 0],
    annotations: [
      { at: [14.6, 3.2, 0], label: 'Bucket wheel — 10 × cast buckets', side: 'right' },
      { at: [-0.4, 9.0, 0], label: 'A-frame hoist mast', side: 'left' },
      { at: [-7.0, 5.2, 0], label: 'Counterweight boom', side: 'left' },
      { at: [0, 2.5, 2.4],  label: 'Slew ring — 360° continuous', side: 'right' },
      { at: [0, 0.6, 2.3],  label: 'Crawler undercarriage', side: 'right' },
    ],
    Component: BucketWheelReclaimer,
  },

  'overland-conveyor': {
    code: 'OLC-2000',
    name: 'Overland Belt Conveyor & Transfer Tower',
    specs: ['2,000 TPH', '1,600 mm belt', 'Covered gallery', 'CEMA / IS 11592'],
    viewDirection: [18, 17, 44],
    offset: [-1.0, -3.6, 0],
    annotations: [
      { at: [-6.0, 6.6, 0],  label: 'Conveyor gallery truss', side: 'left' },
      { at: [11.6, 11.6, 0], label: 'Transfer tower', side: 'right' },
      { at: [14.2, 8.0, 0],  label: 'Dust extraction & filter', side: 'right' },
      { at: [-6.3, 1.8, 0],  label: 'Trestle bent', side: 'left' },
      { at: [0.5, 5.2, 0],   label: '3-roll troughing idlers', side: 'right' },
    ],
    Component: OverlandConveyor,
  },

  'wagon-tippler': {
    code: 'WT-1200',
    name: 'Rotary Wagon Tippler',
    specs: ['1,200 TPH', '145° rotation', '20 tips / hour', 'IS 3177'],
    viewDirection: [28, 17, 31],
    offset: [0, -3.4, 0],
    annotations: [
      { at: [0, 8.8, 0],    label: 'Tippler cage — 145° roll', side: 'right' },
      { at: [0, 7.1, 1.3],  label: 'Hydraulic clamp beams', side: 'left' },
      { at: [5.6, 4.3, 3.2], label: 'Ring gear drive', side: 'right' },
      { at: [0, -2.4, 0],   label: 'Receiving hopper', side: 'left' },
      { at: [6.5, -4.4, 0], label: 'Apron feeder', side: 'right' },
    ],
    Component: WagonTippler,
  },

  'crushing-plant': {
    code: 'JC-1000',
    name: 'Jaw Crushing & Screening Plant',
    specs: ['1,000 TPH', '1200 × 900 jaw', '2-deck screen', 'Modular'],
    viewDirection: [26, 15, 28],
    offset: [-2.5, -3.4, 0],
    annotations: [
      { at: [0, 12.0, 0],   label: 'Feed hopper', side: 'left' },
      { at: [0, 6.2, 0],    label: 'Double-deck vibrating screen', side: 'right' },
      { at: [1.35, 3.5, 2], label: 'Eccentric shaft & flywheels', side: 'right' },
      { at: [-0.6, 2.1, 0], label: 'Jaw crusher — fixed & swing jaw', side: 'left' },
      { at: [14.2, 4.2, 0], label: 'Product stockpile', side: 'right' },
    ],
    Component: CrushingPlant,
  },

  'circular-stacker': {
    code: 'CSR-600',
    name: 'Circular Stacker & Reclaimer',
    specs: ['600 TPH', '25,000 MT live', 'Ø 34 m yard', 'SCADA controlled'],
    viewDirection: [33, 31, 40],
    offset: [0, -4.5, 0],
    annotations: [
      { at: [0, 18.6, 0],  label: 'Central slew column', side: 'left' },
      { at: [8, 12.2, 0],  label: 'Stacking boom', side: 'right' },
      { at: [-9, 6.2, 0],  label: 'Scraper reclaimer bridge', side: 'left' },
      { at: [7, 4.6, 8],   label: 'Annular stockpile — 25,000 MT', side: 'right' },
      { at: [-17.4, 12.2, 0], label: 'Yard feed conveyor', side: 'left' },
    ],
    Component: CircularStacker,
  },

  'baghouse-filter': {
    code: 'PJF-36',
    name: 'Pulse-Jet Baghouse Dust Collector',
    specs: ['36 filter units', '< 30 mg/Nm³', '4 compartments', 'CPCB compliant'],
    viewDirection: [24, 15, 27],
    offset: [-3.0, -5.0, 0],
    annotations: [
      { at: [0, 10.5, 0],    label: 'Filter compartments', side: 'left' },
      { at: [0, 11.0, 2.4],  label: 'Pulse-jet cleaning header', side: 'right' },
      { at: [0, 3.7, 0],     label: 'Dust hoppers & rotary airlocks', side: 'left' },
      { at: [10.2, 2.2, 1.8], label: 'ID fan', side: 'left' },
      { at: [14.6, 13.0, 0], label: 'Emission stack', side: 'right' },
    ],
    Component: BaghouseFilter,
  },
} satisfies Record<string, MachineSpec>

export type MachineId = keyof typeof MACHINES
