export interface Industry {
  id: string
  slug: string
  title: string
  shortDescription: string
  description: string
  icon: string
  image: string
  services: string[]
  highlights: string[]
}

export const INDUSTRIES: Industry[] = [
  {
    id: 'cement',
    slug: 'cement',
    title: 'Cement Plants',
    shortDescription: 'Complete bulk material handling solutions for limestone quarrying, raw material storage, clinker transport, and cement dispatch.',
    description: 'Cement manufacturing demands highly reliable, continuous-duty bulk material handling systems. Lepton Projects delivers integrated conveying, stacking, reclaiming, and dust management solutions that keep cement plants running at rated capacity — from limestone crusher to clinker cooler to finished-product dispatch.',
    icon: 'layers',
    image: '/images/industries/cement.jpg',
    services: ['belt-conveyor-systems', 'stacker-reclaimer-systems', 'aggregate-crushing-screening', 'dust-management-systems'],
    highlights: [
      'Limestone and clinker conveyor systems',
      'Circular and linear stacker/reclaimer systems',
      'Raw material crushing and screening plants',
      'Dust suppression at transfer points and stockyards',
      'Fly-ash and gypsum handling systems',
    ],
  },
  {
    id: 'steel',
    slug: 'steel',
    title: 'Steel Plants',
    shortDescription: 'Iron ore, coal, coke, and sinter handling systems engineered for the demanding throughput requirements of integrated steel plants.',
    description: 'Integrated steel plants operate some of the most demanding bulk material handling environments in industry. Lepton designs and executes conveyor systems, wagon tipplers, EOT cranes, and stockyard automation for raw material yards, sinter plants, blast furnace charging, and steel product dispatch — built to handle high tonnages and corrosive, abrasive materials.',
    icon: 'building-2',
    image: '/images/industries/steel.jpg',
    services: ['belt-conveyor-systems', 'stacker-reclaimer-systems', 'wagon-tipplers-material-handling', 'coal-fuel-handling-plants', 'dust-management-systems'],
    highlights: [
      'Iron ore and coal wagon tippling systems',
      'Sinter and coke handling conveyors',
      'Blast furnace raw material charging systems',
      'EOT cranes for steel bay operations',
      'Stockyard automation and SCADA integration',
    ],
  },
  {
    id: 'ports',
    slug: 'ports',
    title: 'Ports & Terminals',
    shortDescription: 'Ship-to-plant conveyor networks, mobile hoppers, and stockyard systems for coal, ore, fertilizer, and grain import terminals.',
    description: 'Port and bulk terminal operations require seamless integration between ship unloading, stockyard management, and inland rail/road despatch. Lepton delivers complete bulk material handling infrastructure — from jetty conveyors and mobile hoppers to radial stackers, bucket wheel reclaimers, and automated stockyard management systems — for both greenfield terminals and capacity-expansion projects.',
    icon: 'anchor',
    image: '/images/industries/ports.jpg',
    services: ['belt-conveyor-systems', 'stacker-reclaimer-systems', 'wagon-tipplers-material-handling', 'dust-management-systems'],
    highlights: [
      'Ship unloader to stockyard conveyor systems',
      'Mobile harbour cranes and hoppers',
      'Bucket wheel and side scraper reclaimers',
      'Train loading and wagon tippling systems',
      'Dust suppression for environmental compliance',
    ],
  },
  {
    id: 'power',
    slug: 'power',
    title: 'Power Plants',
    shortDescription: 'End-to-end coal handling plant (CHP) and biomass fuel handling systems for thermal and captive power stations.',
    description: 'Reliable fuel supply is the lifeblood of any thermal power station. Lepton Projects executes complete coal handling plants (CHP) for thermal power stations from 15 MW to 600 MW capacity — covering wagon tippling, primary and secondary crushing, screening, coal bunker feeding, and stockyard reclaiming. We also design and commission biomass fuel handling systems for green energy captive power plants.',
    icon: 'zap',
    image: '/images/industries/power.jpg',
    services: ['coal-fuel-handling-plants', 'belt-conveyor-systems', 'stacker-reclaimer-systems', 'wagon-tipplers-material-handling', 'dust-management-systems'],
    highlights: [
      'Coal handling plants for 15 MW to 600 MW stations',
      'Wagon tippler and track hopper systems',
      'Coal crushing, screening, and bunker feeding',
      'Biomass fuel handling for captive power',
      'CEA and MOEF/CPCB compliant systems',
    ],
  },
  {
    id: 'mining',
    slug: 'mining',
    title: 'Mining & Minerals',
    shortDescription: 'Overland conveyors, crushing and screening plants, and mineral beneficiation material handling for coal, iron ore, and aggregate mining operations.',
    description: 'Mining and mineral processing operations require robust, high-throughput material handling systems capable of operating continuously in harsh outdoor environments. Lepton provides overland conveyor systems, aggregate crushing and screening plants, skip hoists, and stockyard infrastructure for coal mines, iron ore mines, and stone quarries — designed to IS, CEMA, and DIN standards.',
    icon: 'map',
    image: '/images/industries/mining.jpg',
    services: ['belt-conveyor-systems', 'aggregate-crushing-screening', 'stacker-reclaimer-systems', 'dust-management-systems'],
    highlights: [
      'Overland conveyor systems for mine sites',
      'Primary jaw and secondary cone crusher plants',
      'Multi-deck vibrating screens for ore classification',
      'Skip hoists and bucket elevator systems',
      'ROM (run-of-mine) stockyard management',
    ],
  },
  {
    id: 'fertilizer',
    slug: 'fertilizer',
    title: 'Fertilizer Plants',
    shortDescription: 'Rock phosphate, coal, and finished fertilizer handling systems for urea, DAP, and complex fertilizer manufacturing plants.',
    description: 'Fertilizer manufacturing plants handle a wide range of bulk materials — from coal and rock phosphate as raw inputs to granular finished products requiring careful handling to avoid degradation. Lepton delivers conveying, storage, and dust control systems tailored to fertilizer plant requirements, including corrosion-resistant design for ammoniacal and acidic environments.',
    icon: 'factory',
    image: '/images/industries/fertilizer.jpg',
    services: ['belt-conveyor-systems', 'stacker-reclaimer-systems', 'coal-fuel-handling-plants', 'dust-management-systems'],
    highlights: [
      'Rock phosphate and coal conveying systems',
      'Finished fertilizer bagging and dispatch conveyors',
      'Circular storage and reclaiming systems',
      'Corrosion-resistant design for chemical environments',
      'Dust control and environmental compliance systems',
    ],
  },
]

export function getIndustryBySlug(slug: string): Industry | undefined {
  return INDUSTRIES.find(i => i.slug === slug)
}
