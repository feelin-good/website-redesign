export interface TeamMember {
  id: string
  name: string
  title: string
  department: string
  bio: string
  qualifications: string[]
  linkedIn?: string
  avatar?: string
  isLeadership: boolean
}

export const TEAM: TeamMember[] = [
  {
    id: 'tm1',
    name: 'Arvind Joshi',
    title: 'Managing Director & Founder',
    department: 'Leadership',
    bio: 'With over 30 years of experience in engineering consultancy, Arvind founded Lepton in 2003 with a vision to bring global engineering standards to Indian industrial and infrastructure projects. He has led major projects across pharma, manufacturing, and infrastructure sectors.',
    qualifications: ['B.Tech (Civil), IIT Bombay', 'MBA, IIM Ahmedabad', 'PMP Certified'],
    isLeadership: true,
  },
  {
    id: 'tm2',
    name: 'Priya Sharma',
    title: 'Director — MEP Engineering',
    department: 'MEP',
    bio: 'Priya leads the MEP practice with 22 years of specialised expertise in data center and pharma facility engineering. She has overseen the design of over 150 complex MEP projects across India and Southeast Asia.',
    qualifications: ['M.Tech (HVAC), NIT Nagpur', 'LEED AP', 'ASHRAE Member'],
    isLeadership: true,
  },
  {
    id: 'tm3',
    name: 'Sunil Kulkarni',
    title: 'Director — Structural Engineering',
    department: 'Structural',
    bio: 'Sunil heads our structural engineering group with deep expertise in industrial structures, pre-engineered buildings, and seismic design. His team has delivered over 200 structural projects across India.',
    qualifications: ['B.E. (Civil), VNIT Nagpur', 'M.S. (Structural), IIT Madras', 'IE(I) Member'],
    isLeadership: true,
  },
  {
    id: 'tm4',
    name: 'Kavita Iyer',
    title: 'Director — Projects & Operations',
    department: 'Project Management',
    bio: 'Kavita oversees project delivery across all verticals, ensuring schedule, cost, and quality targets are met. A certified PMP with RICS qualification, she brings rigour and transparency to every project she manages.',
    qualifications: ['B.E. (Civil), MIT Pune', 'PMP Certified', 'MRICS — Quantity Surveying'],
    isLeadership: true,
  },
  {
    id: 'tm5',
    name: 'Rahul Verma',
    title: 'Head — Process Engineering',
    department: 'Process',
    bio: 'Rahul leads the pharma and chemical process engineering practice with 18 years in FDA-compliant facility design, HAZOP facilitation, and process validation.',
    qualifications: ['B.Tech (Chemical), IIT Kanpur', 'Certified HAZOP Leader'],
    isLeadership: false,
  },
  {
    id: 'tm6',
    name: 'Deepa Nair',
    title: 'Head — Business Development',
    department: 'Sales',
    bio: 'Deepa drives strategic client relationships and new business across key verticals. She has built Lepton\'s client base in data centers, healthcare, and large-scale commercial real estate.',
    qualifications: ['MBA (Marketing), Symbiosis Pune'],
    isLeadership: false,
  },
]

export function getLeadership(): TeamMember[] {
  return TEAM.filter(m => m.isLeadership)
}
