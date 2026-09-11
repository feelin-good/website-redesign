import type { MachineId } from './registry'

/**
 * Which 3D equipment model represents each project and service.
 * Keyed by the slugs in lib/data/projects.ts and lib/data/services.ts —
 * add an entry here when a new project or service is added.
 */
export const PROJECT_MACHINE: Record<string, MachineId> = {
  'jk-lakshmi-cement-stacker-reclaimer': 'circular-stacker',
  'ntpc-coal-handling-plant':            'wagon-tippler',
  'adani-ports-conveyor-system':         'overland-conveyor',
  'vedanta-aluminium-material-handling': 'bucket-wheel-reclaimer',
  'acc-cement-crusher-conveyor':         'crushing-plant',
  'steel-authority-wagon-tippler':       'wagon-tippler',
}

export const SERVICE_MACHINE: Record<string, MachineId> = {
  'belt-conveyor-systems':            'overland-conveyor',
  'stacker-reclaimer-systems':        'bucket-wheel-reclaimer',
  'coal-fuel-handling-plants':        'wagon-tippler',
  'wagon-tipplers-material-handling': 'wagon-tippler',
  'aggregate-crushing-screening':     'crushing-plant',
  'dust-management-systems':          'baghouse-filter',
}

/** Falls back to the conveyor, which every Lepton project involves. */
export function machineForProject(slug: string): MachineId {
  return PROJECT_MACHINE[slug] ?? 'overland-conveyor'
}

export function machineForService(slug: string): MachineId {
  return SERVICE_MACHINE[slug] ?? 'overland-conveyor'
}
