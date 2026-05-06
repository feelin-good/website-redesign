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
    name: 'Kamal Kumar Kandpal',
    title: 'Director',
    department: 'Leadership',
    bio: 'A mechanical engineering specialist with over two decades of experience in bulk material handling EPC projects, Kamal co-founded Lepton Projects in 2008 with a mission to deliver reliable, cost-effective material handling infrastructure for India\'s core industries. He has led major conveyor, stacker/reclaimer, and coal handling plant projects for cement, power, and steel clients across India.',
    qualifications: ['B.E. (Mechanical Engineering)', 'Bulk Material Handling Specialist', '20+ Years Industry Experience'],
    isLeadership: true,
  },
  {
    id: 'tm2',
    name: 'Rajeev Kumar',
    title: 'Director',
    department: 'Leadership',
    bio: 'Rajeev brings deep expertise in project engineering and execution for heavy-industry material handling systems. He oversees technical delivery and vendor management for Lepton\'s EPC projects, ensuring that design intent translates precisely to on-site performance. His hands-on approach to site supervision has been central to Lepton\'s track record of on-time, within-budget project delivery.',
    qualifications: ['B.E. (Mechanical Engineering)', 'Structural & Mechanical Design', 'EPC Project Management'],
    isLeadership: true,
  },
  {
    id: 'tm3',
    name: 'Sanjay Kumar',
    title: 'Director',
    department: 'Leadership',
    bio: 'Sanjay leads Lepton\'s business development and client engagement practice. With an extensive network across India\'s cement, steel, and power sectors, he has been instrumental in building Lepton\'s client relationships with PSUs and large private-sector industrial groups. He focuses on understanding client project needs and structuring the right engineering and EPC solutions.',
    qualifications: ['B.E. (Electrical Engineering)', 'Business Development & Contracts', 'PSU & Industrial Sector Relations'],
    isLeadership: true,
  },
  {
    id: 'tm4',
    name: 'Amit Saxena',
    title: 'General Manager — Projects',
    department: 'Project Management',
    bio: 'Amit manages day-to-day project execution across Lepton\'s portfolio, coordinating engineering, procurement, and site teams to meet schedule and quality milestones. He has overseen the delivery of more than 40 bulk material handling projects over 15 years in the industry.',
    qualifications: ['B.Tech (Mechanical)', 'PMP Certified', '15+ Years Project Management'],
    isLeadership: false,
  },
  {
    id: 'tm5',
    name: 'Pradeep Mishra',
    title: 'Head — Design Engineering',
    department: 'Engineering',
    bio: 'Pradeep leads Lepton\'s design engineering team, responsible for conveyor system design, structural steel engineering, and equipment selection. He is proficient in IS, CEMA, and DIN design standards and oversees the use of AutoCAD, STAAD.Pro, and plant design software for detailed engineering.',
    qualifications: ['B.E. (Mechanical)', 'CEMA & DIN Standards', 'AutoCAD & STAAD.Pro'],
    isLeadership: false,
  },
  {
    id: 'tm6',
    name: 'Neha Gupta',
    title: 'Head — Electrical & Automation',
    department: 'Electrical',
    bio: 'Neha leads electrical design and PLC/SCADA automation for Lepton\'s material handling projects. She has designed control systems for coal handling plants, stacker/reclaimers, and conveyor networks, integrating with client DCS and safety systems. Her work ensures that all automation meets IEC and CEA standards.',
    qualifications: ['B.Tech (Electrical)', 'PLC/SCADA Systems', 'IEC & CEA Standards'],
    isLeadership: false,
  },
]

export function getLeadership(): TeamMember[] {
  return TEAM.filter(m => m.isLeadership)
}
