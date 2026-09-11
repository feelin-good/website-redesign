import type { DiagramId } from './registry'

/**
 * Which technical elevation represents each project and service.
 * Keyed by the slugs in lib/data/projects.ts and lib/data/services.ts.
 */
export const PROJECT_DIAGRAM: Record<string, DiagramId> = {
  'jk-lakshmi-cement-stacker-reclaimer': 'circular-stacker',
  'ntpc-coal-handling-plant':            'wagon-tippler',
  'adani-ports-conveyor-system':         'overland-conveyor',
  'vedanta-aluminium-material-handling': 'bucket-wheel-reclaimer',
  'acc-cement-crusher-conveyor':         'crushing-plant',
  'steel-authority-wagon-tippler':       'wagon-tippler',
}

export const SERVICE_DIAGRAM: Record<string, DiagramId> = {
  'belt-conveyor-systems':            'overland-conveyor',
  'stacker-reclaimer-systems':        'bucket-wheel-reclaimer',
  'coal-fuel-handling-plants':        'wagon-tippler',
  'wagon-tipplers-material-handling': 'wagon-tippler',
  'aggregate-crushing-screening':     'crushing-plant',
  'dust-management-systems':          'baghouse-filter',
}

/** Falls back to the conveyor, which every Lepton project involves. */
export function diagramForProject(slug: string): DiagramId {
  return PROJECT_DIAGRAM[slug] ?? 'overland-conveyor'
}

export function diagramForService(slug: string): DiagramId {
  return SERVICE_DIAGRAM[slug] ?? 'overland-conveyor'
}
