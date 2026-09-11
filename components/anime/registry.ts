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
      { at: [900, 408], to: [846, 486], label: 'BUCKET WHEEL — 10 × CAST', side: 'right' },
      { at: [452, 150], to: [352, 110], label: 'A-FRAME HOIST MAST', side: 'left' },
      { at: [226, 288], to: [140, 232], label: 'COUNTERWEIGHT', side: 'left' },
      { at: [425, 372], to: [300, 420], label: 'SLEW RING', side: 'left' },
      { at: [425, 465], to: [660, 470], label: 'CRAWLER UNDERCARRIAGE', side: 'right' },
    ],
    Diagram: BucketWheelReclaimer,
  },

  'overland-conveyor': {
    code: 'OLC-2000',
    name: 'Overland Belt Conveyor & Transfer Tower',
    specs: ['2,000 TPH', '1,600 mm belt', 'Covered gallery', 'CEMA / IS 11592'],
    annotations: [
      { at: [420, 227], to: [330, 150], label: 'GALLERY TRUSS', side: 'left' },
      { at: [858, 220], to: [946, 150], label: 'TRANSFER TOWER', side: 'right' },
      { at: [922, 248], to: [946, 330], label: 'DUST FILTER', side: 'right' },
      { at: [310, 400], to: [200, 440], label: 'TRESTLE BENT', side: 'left' },
      { at: [500, 259], to: [560, 330], label: 'TROUGHED BELT', side: 'right' },
    ],
    Diagram: OverlandConveyor,
  },

  'wagon-tippler': {
    code: 'WT-1200',
    name: 'Rotary Wagon Tippler',
    specs: ['1,200 TPH', '145° rotation', '20 tips / hour', 'IS 3177'],
    annotations: [
      { at: [500, 154], to: [760, 160], label: 'TIPPLER CAGE — 145° ROLL', side: 'right' },
      { at: [500, 262], to: [250, 232], label: 'CLAMP BEAMS', side: 'left' },
      { at: [646, 300], to: [800, 300], label: 'RING GEAR DRIVE', side: 'right' },
      { at: [500, 470], to: [250, 470], label: 'RECEIVING HOPPER', side: 'left' },
      { at: [700, 542], to: [812, 508], label: 'APRON FEEDER', side: 'right' },
    ],
    Diagram: WagonTippler,
  },

  'crushing-plant': {
    code: 'JC-1000',
    name: 'Jaw Crushing & Screening Plant',
    specs: ['1,000 TPH', '1200 × 900 jaw', '2-deck screen', 'Modular'],
    annotations: [
      { at: [430, 96], to: [610, 74], label: 'FEED HOPPER & GRIZZLY', side: 'right' },
      { at: [435, 258], to: [640, 216], label: 'DOUBLE-DECK SCREEN', side: 'right' },
      { at: [430, 340], to: [230, 330], label: 'FLYWHEEL & ECCENTRIC', side: 'left' },
      { at: [430, 424], to: [230, 432], label: 'JAW — FIXED & SWING', side: 'left' },
      { at: [866, 400], to: [950, 340], label: 'STOCKPILE', side: 'right' },
    ],
    Diagram: CrushingPlant,
  },

  'circular-stacker': {
    code: 'CSR-600',
    name: 'Circular Stacker & Reclaimer',
    specs: ['600 TPH', '25,000 MT live', 'Ø 34 m yard', 'SCADA controlled'],
    annotations: [
      { at: [500, 130], to: [300, 96], label: 'CENTRAL SLEW COLUMN', side: 'left' },
      { at: [700, 222], to: [900, 176], label: 'STACKING BOOM', side: 'right' },
      { at: [320, 324], to: [130, 288], label: 'SCRAPER RECLAIMER', side: 'left' },
      { at: [760, 420], to: [820, 300], label: 'ANNULAR STOCKPILE', side: 'right' },
    ],
    Diagram: CircularStacker,
  },

  'baghouse-filter': {
    code: 'PJF-36',
    name: 'Pulse-Jet Baghouse Dust Collector',
    specs: ['36 filter units', '< 30 mg/Nm³', '4 compartments', 'CPCB compliant'],
    annotations: [
      { at: [430, 194], to: [180, 168], label: 'FILTER COMPARTMENTS', side: 'left' },
      { at: [430, 86], to: [640, 60], label: 'PULSE-JET HEADER', side: 'right' },
      { at: [390, 320], to: [170, 366], label: 'HOPPERS & AIRLOCKS', side: 'left' },
      { at: [686, 326], to: [760, 392], label: 'ID FAN', side: 'right' },
      { at: [867, 200], to: [930, 120], label: 'STACK', side: 'right' },
    ],
    Diagram: BaghouseFilter,
  },
} satisfies Record<string, DiagramSpec>

export type DiagramId = keyof typeof DIAGRAMS
