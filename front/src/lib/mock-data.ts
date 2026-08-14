export type Company = {
  id: number
  company: string
  industry: string
  address: string
  phone: string
  email: string
  website: string
  source: string
  salesRepresentative: string
  contacts: {
    name: string
    position: string
    email: string
    phone: string
  }[]
  lead: {
    status: string
    lastActivity: Date
    createdAt: Date
  }
  client?: {
    status: string
    lastActivity: Date
    convertedAt: Date
  }
}

export type Role = {
  id: number
  name: string
  description: string
  permissions: string[]
}

export type User = {
  id: number
  name: string
  email: string
  role: string
  status: "active" | "inactive"
  avatar?: string
}

export type OpportunityStage =
  | "NEW"
  | "INITIAL_CONTACT"
  | "DISCUSSION"
  | "PROPOSAL"
  | "NEGOTIATION"
  | "CONTRACT_PROCESSING"
  | "WON"
  | "LOST"

export type OpportunityStatus = "ACTIVE" | "WON" | "LOST"

export type Opportunity = {
  id: number
  companyId: number
  title: string
  stage: OpportunityStage
  status: OpportunityStatus
  priority: "Low" | "Medium" | "High"
  value?: number
  manpowerRequirement: string
  expectedClosingDate: Date
  nextAction: string
  assignedTo: string
  lostReason?: string
  createdAt: Date
  updatedAt: Date
}

export type CommunicationType = "Call" | "Email" | "Meeting" | "Message" | "Note"

export type Communication = {
  id: number
  companyId: number
  contactId: number
  type: CommunicationType
  subject: string
  summary: string
  dateTime: Date
  assignedTo: string
  relatedOpportunityId?: number
  relatedLeadClient: "Lead" | "Client"
}

export type FollowUpPriority = "Low" | "Medium" | "High"

export type FollowUpStatus = "Overdue" | "Pending" | "Completed"

export type FollowUp = {
  id: number
  title: string
  description: string
  companyId: number
  contactId: number
  relatedOpportunityId?: number
  assignedTo: string
  dueDate: Date
  priority: FollowUpPriority
  status: FollowUpStatus
}

export type Survey = {
  id: number
  companyId: number
  title: string
  status: "Draft" | "Sent" | "Completed"
  sentDate?: Date
  dueDate?: Date
  completedDate?: Date
}

export type SurveyResponse = {
  id: number
  surveyId: number
  companyId: number
  respondentName: string
  respondentPosition: string
  rating: number
  feedback: string
  submittedAt: Date
}

export type InsightType = "follow_up" | "opportunity" | "satisfaction" | "inactive"

export type AIRecommendation = {
  id: number
  priority: "High" | "Medium" | "Low"
  suggestedAction: string
  reason: string
  relatedEntity: string
  relatedType: InsightType
}

export const roles: Role[] = [
  {
    id: 1,
    name: "Administrator",
    description: "Full system access",
    permissions: ["manage_users", "manage_roles", "view_all", "edit_all", "delete_all"],
  },
  {
    id: 2,
    name: "CRM Manager",
    description: "Oversee CRM records and team activity",
    permissions: ["view_all", "edit_all", "manage_opportunities", "view_analytics"],
  },
  {
    id: 3,
    name: "Sales Representative",
    description: "Manage assigned leads, opportunities, and follow-ups",
    permissions: ["view_assigned", "edit_assigned", "manage_own_opportunities", "manage_own_follow_ups"],
  },
]

export const users: User[] = [
  {
    id: 1,
    name: "Daniel Balisi",
    email: "daniel.balisi@primepower.com",
    role: "Administrator",
    status: "active",
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria.santos@primepower.com",
    role: "CRM Manager",
    status: "active",
  },
  {
    id: 3,
    name: "Richard Santos",
    email: "richard.santos@primepower.com",
    role: "Sales Representative",
    status: "active",
  },
  {
    id: 4,
    name: "Ana Reyes",
    email: "ana.reyes@primepower.com",
    role: "Sales Representative",
    status: "inactive",
  },
]

export const opportunities: Opportunity[] = [
  {
    id: 1,
    companyId: 1,
    title: "Production Manpower Contract",
    stage: "NEGOTIATION",
    status: "ACTIVE",
    priority: "High",
    value: 850000,
    manpowerRequirement: "50 skilled workers",
    expectedClosingDate: new Date("2026-09-15"),
    nextAction: "Finalize contract terms",
    assignedTo: "Daniel Balisi",
    createdAt: new Date("2026-07-01"),
    updatedAt: new Date("2026-08-14"),
  },
  {
    id: 2,
    companyId: 3,
    title: "Warehouse Staffing Solution",
    stage: "DISCUSSION",
    status: "ACTIVE",
    priority: "Medium",
    value: 420000,
    manpowerRequirement: "30 general workers",
    expectedClosingDate: new Date("2026-10-01"),
    nextAction: "Schedule site visit",
    assignedTo: "Richard Santos",
    createdAt: new Date("2026-07-10"),
    updatedAt: new Date("2026-08-10"),
  },
  {
    id: 3,
    companyId: 4,
    title: "Seasonal Agricultural Workers",
    stage: "PROPOSAL",
    status: "ACTIVE",
    priority: "High",
    value: 320000,
    manpowerRequirement: "80 seasonal workers",
    expectedClosingDate: new Date("2026-09-01"),
    nextAction: "Send revised proposal",
    assignedTo: "Richard Santos",
    createdAt: new Date("2026-07-15"),
    updatedAt: new Date("2026-08-12"),
  },
  {
    id: 4,
    companyId: 6,
    title: "Construction Site Manpower",
    stage: "NEW",
    status: "ACTIVE",
    priority: "Medium",
    value: 600000,
    manpowerRequirement: "40 construction workers",
    expectedClosingDate: new Date("2026-11-01"),
    nextAction: "Initial discovery call",
    assignedTo: "Ana Reyes",
    createdAt: new Date("2026-08-01"),
    updatedAt: new Date("2026-08-01"),
  },
  {
    id: 5,
    companyId: 2,
    title: "IT Support Staffing",
    stage: "WON",
    status: "WON",
    priority: "High",
    value: 1200000,
    manpowerRequirement: "15 IT specialists",
    expectedClosingDate: new Date("2026-08-01"),
    nextAction: "Onboarding coordination",
    assignedTo: "Daniel Balisi",
    createdAt: new Date("2026-05-01"),
    updatedAt: new Date("2026-08-01"),
  },
  {
    id: 6,
    companyId: 5,
    title: "Hotel Housekeeping Staff",
    stage: "LOST",
    status: "LOST",
    priority: "Low",
    value: 280000,
    manpowerRequirement: "25 housekeeping staff",
    expectedClosingDate: new Date("2026-09-30"),
    nextAction: "",
    assignedTo: "Maria Santos",
    lostReason: "Selected competitor with lower rates",
    createdAt: new Date("2026-06-01"),
    updatedAt: new Date("2026-07-20"),
  },
  {
    id: 7,
    companyId: 1,
    title: "Office Administrative Support",
    stage: "INITIAL_CONTACT",
    status: "ACTIVE",
    priority: "Low",
    value: 180000,
    manpowerRequirement: "5 admin staff",
    expectedClosingDate: new Date("2026-10-15"),
    nextAction: "Send company profile",
    assignedTo: "Daniel Balisi",
    createdAt: new Date("2026-08-05"),
    updatedAt: new Date("2026-08-05"),
  },
]

export const communications: Communication[] = [
  {
    id: 1,
    companyId: 1,
    contactId: 1,
    type: "Call",
    subject: "Follow-up on production contract",
    summary: "Discussed manpower requirements and timeline. Client requested a detailed quote.",
    dateTime: new Date("2026-08-14T10:30:00"),
    assignedTo: "Daniel Balisi",
    relatedOpportunityId: 1,
    relatedLeadClient: "Lead",
  },
  {
    id: 2,
    companyId: 1,
    contactId: 1,
    type: "Email",
    subject: "Proposal requirements sent",
    summary: "Sent detailed proposal and rate sheet to Juan Dela Cruz.",
    dateTime: new Date("2026-08-12T14:00:00"),
    assignedTo: "Daniel Balisi",
    relatedOpportunityId: 1,
    relatedLeadClient: "Lead",
  },
  {
    id: 3,
    companyId: 3,
    contactId: 3,
    type: "Meeting",
    subject: "Warehouse staffing discussion",
    summary: "Initial meeting with operations manager to discuss staffing needs.",
    dateTime: new Date("2026-08-10T09:00:00"),
    assignedTo: "Richard Santos",
    relatedOpportunityId: 2,
    relatedLeadClient: "Lead",
  },
  {
    id: 4,
    companyId: 2,
    contactId: 5,
    type: "Call",
    subject: "Contract signing confirmation",
    summary: "Confirmed contract signing for IT support staffing.",
    dateTime: new Date("2026-08-01T11:00:00"),
    assignedTo: "Daniel Balisi",
    relatedOpportunityId: 5,
    relatedLeadClient: "Client",
  },
  {
    id: 5,
    companyId: 4,
    contactId: 7,
    type: "Email",
    subject: "Proposal follow-up",
    summary: "Followed up on the seasonal workers proposal. Client reviewing.",
    dateTime: new Date("2026-08-08T16:30:00"),
    assignedTo: "Richard Santos",
    relatedOpportunityId: 3,
    relatedLeadClient: "Lead",
  },
  {
    id: 6,
    companyId: 5,
    contactId: 9,
    type: "Note",
    subject: "Client feedback on rates",
    summary: "Client found our rates too high compared to competitor.",
    dateTime: new Date("2026-07-20T13:00:00"),
    assignedTo: "Maria Santos",
    relatedLeadClient: "Client",
  },
  {
    id: 7,
    companyId: 6,
    contactId: 11,
    type: "Message",
    subject: "Introduction call scheduled",
    summary: "Scheduled initial discovery call for construction staffing.",
    dateTime: new Date("2026-08-06T10:00:00"),
    assignedTo: "Ana Reyes",
    relatedOpportunityId: 4,
    relatedLeadClient: "Lead",
  },
  {
    id: 8,
    companyId: 2,
    contactId: 5,
    type: "Meeting",
    subject: "Quarterly review",
    summary: "Quarterly business review with EFG Technology. Discussed expansion plans.",
    dateTime: new Date("2026-07-15T15:00:00"),
    assignedTo: "Daniel Balisi",
    relatedLeadClient: "Client",
  },
]

export const followUps: FollowUp[] = [
  {
    id: 1,
    title: "Discuss contract requirements",
    description: "Review final contract terms with ABC Manufacturing.",
    companyId: 1,
    contactId: 1,
    relatedOpportunityId: 1,
    assignedTo: "Daniel Balisi",
    dueDate: new Date("2026-08-12"),
    priority: "High",
    status: "Overdue",
  },
  {
    id: 2,
    title: "Discuss manpower requirements",
    description: "Confirm manpower numbers with Global Logistics.",
    companyId: 3,
    contactId: 3,
    relatedOpportunityId: 2,
    assignedTo: "Richard Santos",
    dueDate: new Date("2026-08-18"),
    priority: "Medium",
    status: "Pending",
  },
  {
    id: 3,
    title: "Send revised proposal",
    description: "Send updated proposal for seasonal workers to Manila Fresh Produce.",
    companyId: 4,
    contactId: 7,
    relatedOpportunityId: 3,
    assignedTo: "Richard Santos",
    dueDate: new Date("2026-08-20"),
    priority: "High",
    status: "Pending",
  },
  {
    id: 4,
    title: "Initial discovery call",
    description: "Conduct discovery call with Pioneer Construction.",
    companyId: 6,
    contactId: 11,
    relatedOpportunityId: 4,
    assignedTo: "Ana Reyes",
    dueDate: new Date("2026-08-10"),
    priority: "Medium",
    status: "Completed",
  },
  {
    id: 5,
    title: "Onboarding coordination",
    description: "Coordinate onboarding for deployed IT staff at EFG Technology.",
    companyId: 2,
    contactId: 5,
    relatedOpportunityId: 5,
    assignedTo: "Daniel Balisi",
    dueDate: new Date("2026-08-25"),
    priority: "High",
    status: "Pending",
  },
  {
    id: 6,
    title: "Quarterly check-in",
    description: "Schedule quarterly check-in with Sunrise Hospitality.",
    companyId: 5,
    contactId: 9,
    assignedTo: "Maria Santos",
    dueDate: new Date("2026-08-05"),
    priority: "Low",
    status: "Overdue",
  },
]

export const surveys: Survey[] = [
  {
    id: 1,
    companyId: 5,
    title: "Q2 2026 Client Satisfaction Survey",
    status: "Completed",
    sentDate: new Date("2026-07-01"),
    dueDate: new Date("2026-07-15"),
    completedDate: new Date("2026-07-14"),
  },
  {
    id: 2,
    companyId: 2,
    title: "Onboarding Satisfaction Survey",
    status: "Completed",
    sentDate: new Date("2026-08-01"),
    dueDate: new Date("2026-08-10"),
    completedDate: new Date("2026-08-08"),
  },
  {
    id: 3,
    companyId: 5,
    title: "Q3 2026 Client Satisfaction Survey",
    status: "Sent",
    sentDate: new Date("2026-08-01"),
    dueDate: new Date("2026-08-20"),
  },
]

export const surveyResponses: SurveyResponse[] = [
  {
    id: 1,
    surveyId: 1,
    companyId: 5,
    respondentName: "Maria Lim",
    respondentPosition: "HR Director",
    rating: 5,
    feedback: "Excellent service. The deployed staff are highly skilled and professional.",
    submittedAt: new Date("2026-07-14"),
  },
  {
    id: 2,
    surveyId: 1,
    companyId: 5,
    respondentName: "James Tan",
    respondentPosition: "Operations Manager",
    rating: 4,
    feedback: "Good overall experience. Minor delays in initial deployment.",
    submittedAt: new Date("2026-07-13"),
  },
  {
    id: 3,
    surveyId: 2,
    companyId: 2,
    respondentName: "Elena Garcia",
    respondentPosition: "CTO",
    rating: 5,
    feedback: "The IT specialists provided have been outstanding. Very satisfied with the quality.",
    submittedAt: new Date("2026-08-08"),
  },
  {
    id: 4,
    surveyId: 2,
    companyId: 2,
    respondentName: "Carlos Mendoza",
    respondentPosition: "VP Operations",
    rating: 4,
    feedback: "Smooth onboarding process. Would appreciate more frequent progress updates.",
    submittedAt: new Date("2026-08-07"),
  },
  {
    id: 5,
    surveyId: 2,
    companyId: 2,
    respondentName: "Sofia Reyes",
    respondentPosition: "HR Manager",
    rating: 4,
    feedback: "Good communication throughout the process.",
    submittedAt: new Date("2026-08-06"),
  },
]

export const companies: Company[] = [
  {
    id: 1,
    company: "ABC Manufacturing",
    industry: "Manufacturing",
    address: "Quezon City, Metro Manila",
    phone: "(+63) 021 812 4567",
    email: "contact@abcmanufacturing.com",
    source: "Referral",
    website: "abcmanufacturing.com",
    salesRepresentative: "Daniel Balisi",
    contacts: [
      {
        name: "Juan Dela Cruz",
        position: "Chief Executive Officer",
        email: "juan@abcmanufacturing.com",
        phone: "(+63) 021 812 4567",
      },
      {
        name: "Maria Santos",
        position: "Operations Director",
        email: "maria@abcmanufacturing.com",
        phone: "(+63) 021 812 4568",
      },
    ],
    lead: {
      status: "NEW",
      lastActivity: new Date("2026-08-14"),
      createdAt: new Date("2026-06-01"),
    },
  },
  {
    id: 2,
    company: "EFG Technology",
    industry: "IT Industry",
    address: "Makati, Metro Manila",
    phone: "(+63) 021 812 4569",
    email: "contact@efgtecnology.com",
    source: "Referral",
    website: "efgtech.com",
    salesRepresentative: "Daniel Balisi",
    contacts: [
      {
        name: "Elena Garcia",
        position: "Chief Technology Officer",
        email: "elena@efgtechnology.com",
        phone: "(+63) 021 812 4569",
      },
      {
        name: "Carlos Mendoza",
        position: "VP Operations",
        email: "carlos@efgtechnology.com",
        phone: "(+63) 021 812 4570",
      },
    ],
    lead: {
      status: "CONVERTED",
      lastActivity: new Date("2026-08-01"),
      createdAt: new Date("2026-05-01"),
    },
    client: {
      status: "ACTIVE",
      lastActivity: new Date("2026-08-01"),
      convertedAt: new Date("2026-06-01"),
    },
  },
  {
    id: 3,
    company: "Global Logistics Corp",
    industry: "Logistics",
    address: "Pasig, Metro Manila",
    phone: "(+63) 021 812 4571",
    email: "contact@globallogistics.com",
    source: "Website",
    website: "globallogistics.com",
    salesRepresentative: "Richard Santos",
    contacts: [
      {
        name: "Robert Lim",
        position: "Operations Manager",
        email: "robert@globallogistics.com",
        phone: "(+63) 021 812 4571",
      },
      {
        name: "James Tan",
        position: "Warehouse Supervisor",
        email: "james@globallogistics.com",
        phone: "(+63) 021 812 4572",
      },
    ],
    lead: {
      status: "CONTACTED",
      lastActivity: new Date("2026-08-10"),
      createdAt: new Date("2026-07-01"),
    },
  },
  {
    id: 4,
    company: "Manila Fresh Produce",
    industry: "Agriculture",
    address: "Laguna, Philippines",
    phone: "(+63) 021 812 4573",
    email: "contact@manilafresh.com",
    source: "Referral",
    website: "manilafresh.com",
    salesRepresentative: "Richard Santos",
    contacts: [
      {
        name: "Sofia Reyes",
        position: "Procurement Head",
        email: "sofia@manilafresh.com",
        phone: "(+63) 021 812 4573",
      },
      {
        name: "Pedro Cruz",
        position: "Farm Manager",
        email: "pedro@manilafresh.com",
        phone: "(+63) 021 812 4574",
      },
    ],
    lead: {
      status: "QUALIFIED",
      lastActivity: new Date("2026-08-12"),
      createdAt: new Date("2026-07-10"),
    },
  },
  {
    id: 5,
    company: "Sunrise Hospitality Group",
    industry: "Hospitality",
    address: "Cebu City, Philippines",
    phone: "(+63) 021 812 4575",
    email: "contact@sunrisehospitality.com",
    source: "Trade Show",
    website: "sunrisehospitality.com",
    salesRepresentative: "Maria Santos",
    contacts: [
      {
        name: "Maria Lim",
        position: "HR Director",
        email: "maria.lim@sunrisehospitality.com",
        phone: "(+63) 021 812 4575",
      },
      {
        name: "James Tan",
        position: "Operations Manager",
        email: "james.tan@sunrisehospitality.com",
        phone: "(+63) 021 812 4576",
      },
    ],
    lead: {
      status: "CONVERTED",
      lastActivity: new Date("2026-07-20"),
      createdAt: new Date("2026-04-01"),
    },
    client: {
      status: "ACTIVE",
      lastActivity: new Date("2026-07-20"),
      convertedAt: new Date("2026-05-01"),
    },
  },
  {
    id: 6,
    company: "Pioneer Construction",
    industry: "Construction",
    address: "Davao City, Philippines",
    phone: "(+63) 021 812 4577",
    email: "contact@pioneerconstruction.com",
    source: "Cold Call",
    website: "pioneerconstruction.com",
    salesRepresentative: "Ana Reyes",
    contacts: [
      {
        name: "Antonio Reyes",
        position: "Project Director",
        email: "antonio@pioneerconstruction.com",
        phone: "(+63) 021 812 4577",
      },
      {
        name: "Liza Mendoza",
        position: "HR Manager",
        email: "liza@pioneerconstruction.com",
        phone: "(+63) 021 812 4578",
      },
    ],
    lead: {
      status: "NEW",
      lastActivity: new Date("2026-08-01"),
      createdAt: new Date("2026-08-01"),
    },
  },
]

export const aiRecommendations: AIRecommendation[] = [
  {
    id: 1,
    priority: "High",
    suggestedAction: "Follow up with ABC Manufacturing",
    reason: "No communication has been recorded for 14 days while the opportunity remains in the Negotiation stage.",
    relatedEntity: "ABC Manufacturing",
    relatedType: "follow_up",
  },
  {
    id: 2,
    priority: "Medium",
    suggestedAction: "Prioritize Manila Fresh Produce proposal",
    reason: "Opportunity is in Proposal stage with expected closing date of Sept 1, 2026.",
    relatedEntity: "Manila Fresh Produce",
    relatedType: "opportunity",
  },
  {
    id: 3,
    priority: "High",
    suggestedAction: "Contact Sunrise Hospitality Group",
    reason: "Last satisfaction survey showed declining ratings and quarterly check-in is overdue.",
    relatedEntity: "Sunrise Hospitality Group",
    relatedType: "satisfaction",
  },
  {
    id: 4,
    priority: "Medium",
    suggestedAction: "Re-engage Pioneer Construction",
    reason: "New lead with no recent activity beyond initial discovery call.",
    relatedEntity: "Pioneer Construction",
    relatedType: "inactive",
  },
  {
    id: 5,
    priority: "Low",
    suggestedAction: "Schedule meeting before expected closing date",
    reason: "Global Logistics opportunity expected to close on Oct 1, 2026. Schedule a progress review.",
    relatedEntity: "Global Logistics Corp",
    relatedType: "opportunity",
  },
]

export function getCompanyById(id: number): Company | undefined {
  return companies.find((c) => c.id === id)
}

export function getContactById(companyId: number, contactId: number) {
  const company = getCompanyById(companyId)
  return company?.contacts.find((c: { email: string }) => c.email === company.contacts[contactId]?.email)
}

export function getOpportunitiesByCompanyId(companyId: number) {
  return opportunities.filter((o) => o.companyId === companyId)
}

export function getCommunicationsByCompanyId(companyId: number) {
  return communications.filter((c) => c.companyId === companyId)
}

export function getFollowUpsByCompanyId(companyId: number) {
  return followUps.filter((f) => f.companyId === companyId)
}

export function getSurveysByCompanyId(companyId: number) {
  return surveys.filter((s) => s.companyId === companyId)
}

export function getSurveyResponsesBySurveyId(surveyId: number) {
  return surveyResponses.filter((r) => r.surveyId === surveyId)
}

export function getOpportunityById(id: number) {
  return opportunities.find((o) => o.id === id)
}

export function getCommunicationById(id: number) {
  return communications.find((c) => c.id === id)
}

export function getFollowUpById(id: number) {
  return followUps.find((f) => f.id === id)
}

export function getSurveyById(id: number) {
  return surveys.find((s) => s.id === id)
}

export function getSurveyResponseById(id: number) {
  return surveyResponses.find((r) => r.id === id)
}
