import type { ComponentType } from 'react'
import {
  BucketWheelReclaimer, OverlandConveyor, WagonTippler,
  CrushingPlant, CircularStacker, BaghouseFilter,
} from './diagrams'

export interface Callout {
  /** Anchor point on the machine, in SVG user units */
  at: [number, number]
  /** Where the label sits */
  to: [number, number]
  label: string
  side?: 'left' | 'right'
}

export interface DiagramSpec {
  code: string
  name: string
  specs: string[]
  annotations: Callout[]
  Diagram: ComponentType
}

export const DIAGRAMS = {
  'bucket-wheel-reclaimer': {
    code: 'BWR-800',
    name: 'Bucket Wheel Stacker / Reclaimer',
    specs: ['800 TPH', 'Ø 4.3 m wheel', '10 buckets', 'Crawler mounted'],
    annotations: [
      { at: [178, 63],   to: [330, 116],  label: 'BUCKET WHEEL — 10 × CAST', side: 'right' },
      { at: [0, -152],   to: [-150, -212], label: 'A-FRAME HOIST MAST', side: 'left' },
      { at: [-89, -126], to: [-300, -150], label: 'COUNTERWEIGHT BOOM', side: 'left' },
      { at: [0, -26],    to: [200, -2],   label: 'SLEW RING — 360°', side: 'right' },
      { at: [0, -7],     to: [-280, 40],  label: 'CRAWLER UNDERCARRIAGE', side: 'left' },
    ],
    Diagram: BucketWheelReclaimer,
  },

  'overland-conveyor': {
    code: 'OLC-2000',
    name: 'Overland Belt Conveyor & Transfer Tower',
    specs: ['2,000 TPH', '1,600 mm belt', 'Covered gallery', 'CEMA / IS 11592'],
    annotations: [
      { at: [-52, -104], to: [-250, -180], label: 'GALLERY TRUSS', side: 'left' },
      { at: [145, -44],  to: [300, -150],  label: 'TRANSFER TOWER', side: 'right' },
      { at: [163, -9],   to: [330, -58],   label: 'DUST FILTER', side: 'right' },
      { at: [-78, -76],  to: [-300, -20],  label: 'TRESTLE BENT', side: 'left' },
      { at: [22, -70],   to: [210, 40],    label: 'TROUGHED BELT', side: 'right' },
    ],
    Diagram: OverlandConveyor,
  },

  'wagon-tippler': {
    code: 'WT-1200',
    name: 'Rotary Wagon Tippler',
    specs: ['1,200 TPH', '145° rotation', '20 tips / hour', 'IS 3177'],
    annotations: [
      { at: [0, -132],  to: [250, -210], label: 'TIPPLER CAGE — 145° ROLL', side: 'right' },
      { at: [0, -94],   to: [-260, -150], label: 'CLAMP BEAMS', side: 'left' },
      { at: [0, -72],   to: [-290, -70],  label: 'WAGON', side: 'left' },
      { at: [0, -17],   to: [-280, 20],   label: 'RECEIVING HOPPER', side: 'left' },
      { at: [56, 27],   to: [250, 80],    label: 'APRON FEEDER', side: 'right' },
    ],
    Diagram: WagonTippler,
  },

  'crushing-plant': {
    code: 'JC-1000',
    name: 'Jaw Crushing & Screening Plant',
    specs: ['1,000 TPH', '1200 × 900 jaw', '2-deck screen', 'Modular'],
    annotations: [
      { at: [0, -232],  to: [200, -280], label: 'FEED HOPPER & GRIZZLY', side: 'right' },
      { at: [-16, -125], to: [-260, -190], label: 'DOUBLE-DECK SCREEN', side: 'left' },
      { at: [-33, -61], to: [-300, -96],  label: 'FLYWHEEL & ECCENTRIC', side: 'left' },
      { at: [-5, -62],  to: [-280, -20],  label: 'JAW CRUSHER', side: 'left' },
      { at: [184, 80],  to: [300, 120],   label: 'STOCKPILE', side: 'right' },
    ],
    Diagram: CrushingPlant,
  },

  'circular-stacker': {
    code: 'CSR-600',
    name: 'Circular Stacker & Reclaimer',
    specs: ['600 TPH', '25,000 MT live', 'Ø 34 m yard', 'SCADA controlled'],
    annotations: [
      { at: [0, -168],  to: [-210, -250], label: 'CENTRAL SLEW COLUMN', side: 'left' },
      { at: [104, -70], to: [300, -150],  label: 'STACKING BOOM', side: 'right' },
      { at: [-95, -139], to: [-310, -110], label: 'SCRAPER RECLAIMER', side: 'left' },
      { at: [-130, 41], to: [-300, 96],   label: 'ANNULAR STOCKPILE', side: 'left' },
    ],
    Diagram: CircularStacker,
  },

  'baghouse-filter': {
    code: 'PJF-36',
    name: 'Pulse-Jet Baghouse Dust Collector',
    specs: ['36 filter units', '< 30 mg/Nm³', '4 compartments', 'CPCB compliant'],
    annotations: [
      { at: [0, -148],  to: [-250, -196], label: 'FILTER COMPARTMENTS', side: 'left' },
      { at: [7, -190],  to: [210, -250],  label: 'PULSE-JET HEADER', side: 'right' },
      { at: [0, -93],   to: [-270, -50],  label: 'HOPPERS & AIRLOCKS', side: 'left' },
      { at: [139, 4],   to: [300, 60],    label: 'ID FAN', side: 'right' },
      { at: [187, -92], to: [330, -150],  label: 'EMISSION STACK', side: 'right' },
    ],
    Diagram: BaghouseFilter,
  },
} satisfies Record<string, DiagramSpec>

export type DiagramId = keyof typeof DIAGRAMS
