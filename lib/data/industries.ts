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
    id: 'pharma',
    slug: 'pharma',
    title: 'Pharmaceuticals & Life Sciences',
    shortDescription: 'GMP-compliant facility design, validation, and project management for API, formulation, and biotech plants.',
    description: 'Lepton has established a strong track record in designing and delivering GMP-compliant manufacturing facilities for leading Indian pharma companies. From API synthesis blocks to formulation suites and biotech labs, we understand the regulatory and quality demands of this sector.',
    icon: 'flask-conical',
    image: '/images/industries/pharma.jpg',
    services: ['mep-engineering', 'process-engineering', 'epc-turnkey', 'project-management'],
    highlights: [
      'USFDA and EU-GMP aligned facility design',
      'HVAC validation and qualification support',
      'Cleanroom design to ISO 5–ISO 8 classifications',
      'Cold chain and controlled-environment systems',
      'Effluent treatment plant (ETP) design',
    ],
  },
  {
    id: 'manufacturing',
    slug: 'manufacturing',
    title: 'Manufacturing & Industrial',
    shortDescription: 'Plant layout, utilities, and structural engineering for automotive, aerospace, FMCG, and heavy manufacturing.',
    description: 'We support India\'s manufacturing growth story by designing efficient, safe, and future-ready industrial facilities. From greenfield plants to brownfield expansions, our multi-discipline team delivers comprehensive engineering for the full manufacturing lifecycle.',
    icon: 'factory',
    image: '/images/industries/manufacturing.jpg',
    services: ['structural-engineering', 'mep-engineering', 'civil-infrastructure', 'epc-turnkey'],
    highlights: [
      'Production bay design and crane rail systems',
      'Compressed air, gas, and fluid systems',
      'EHS and fire protection systems',
      'Lean manufacturing layout consulting',
      'Energy management systems',
    ],
  },
  {
    id: 'data-centers',
    slug: 'data-centers',
    title: 'Data Centers & Technology',
    shortDescription: 'Tier III / IV data center design with Uptime Institute certified MEP systems and critical infrastructure.',
    description: 'The digital economy demands always-on infrastructure. Lepton designs and delivers mission-critical data centers with the redundancy, power efficiency (PUE), and cooling precision that hyperscale and enterprise operators require.',
    icon: 'server',
    image: '/images/industries/data-center.jpg',
    services: ['mep-engineering', 'structural-engineering', 'epc-turnkey'],
    highlights: [
      'Tier III and Tier IV redundancy design',
      'UPS, genset, and power distribution architecture',
      'Precision cooling — CRAC/CRAH and in-row cooling',
      'PUE optimisation to below 1.3',
      'Physical security and access control systems',
    ],
  },
  {
    id: 'healthcare',
    slug: 'healthcare',
    title: 'Healthcare & Hospitals',
    shortDescription: 'Infection-controlled, code-compliant engineering for hospitals, diagnostics centres, and medical colleges.',
    description: 'Healthcare environments demand exceptional precision in MEP design — from HEPA-filtered ventilation in OTs to reliable medical gas systems and power redundancy. Lepton delivers compliant, patient-safe engineering solutions for hospitals of all sizes.',
    icon: 'cross',
    image: '/images/industries/healthcare.jpg',
    services: ['mep-engineering', 'structural-engineering', 'project-management'],
    highlights: [
      'Operating theatre HVAC and laminar flow',
      'Medical gas systems (O₂, N₂O, vacuum, air)',
      'HT/LT electrical infrastructure and DG backup',
      'NABH and JCI compliance support',
      'ICU and critical care engineering',
    ],
  },
  {
    id: 'power-energy',
    slug: 'power-energy',
    title: 'Power & Energy',
    shortDescription: 'Electrical infrastructure, renewable energy integration, and substation design for power-intensive industries.',
    description: 'From substation design to solar EPC and captive power plant engineering, Lepton supports the energy transition and industrial power requirements with engineered solutions that maximise reliability and minimise cost.',
    icon: 'bolt',
    image: '/images/industries/power.jpg',
    services: ['mep-engineering', 'structural-engineering', 'civil-infrastructure', 'epc-turnkey'],
    highlights: [
      'HT/EHT substation design (33 kV to 220 kV)',
      'Captive power plant engineering',
      'Solar PV and rooftop solar EPC',
      'Power factor correction and harmonic mitigation',
      'Load flow and short-circuit studies',
    ],
  },
  {
    id: 'commercial-real-estate',
    slug: 'commercial-real-estate',
    title: 'Commercial & Mixed-Use',
    shortDescription: 'High-performance MEP and structural engineering for offices, hotels, malls, and mixed-use developments.',
    description: 'We partner with leading developers and architects to deliver technically excellent, energy-efficient commercial buildings. Our designs address aesthetics, sustainability, and occupant comfort while optimising lifecycle operating costs.',
    icon: 'building',
    image: '/images/industries/commercial.jpg',
    services: ['mep-engineering', 'structural-engineering', 'project-management'],
    highlights: [
      'LEED and IGBC green building design',
      'VRF/VRV and chiller plant design',
      'Smart building and IoT integration',
      'Fire life safety systems',
      'High-rise structural engineering',
    ],
  },
]

export function getIndustryBySlug(slug: string): Industry | undefined {
  return INDUSTRIES.find(i => i.slug === slug)
}
