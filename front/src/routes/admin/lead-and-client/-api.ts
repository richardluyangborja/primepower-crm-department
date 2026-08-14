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
        name: "Juan Dela Cruz",
        position: "Chief Executive Officer",
        email: "juan@abcmanufacturing.com",
        phone: "(+63) 021 812 4567",
      },
    ],
    lead: {
      status: "NEW",
      lastActivity: new Date(),
      createdAt: new Date(),
    },
  },
  {
    id: 2,
    company: "EFG Technology",
    industry: "IT Industry",
    address: "Makati, Metro Manila",
    phone: "(+63) 021 812 4567",
    email: "contact@efgtecnology.com",
    source: "Referral",
    website: "efgtech.com",
    salesRepresentative: "Daniel Balisi",
    contacts: [
      {
        name: "Juan Dela Cruz",
        position: "Chief Technology Officer",
        email: "juan@efgtechnology.com",
        phone: "(+63) 021 812 4567",
      },
      {
        name: "Juan Dela Cruz",
        position: "Chief Technology Officer",
        email: "juan@efgtechnology.com",
        phone: "(+63) 021 812 4567",
      },
    ],
    lead: {
      status: "CONVERTED",
      lastActivity: new Date(),
      createdAt: new Date(),
    },
    client: {
      status: "ACTIVE",
      lastActivity: new Date(),
      convertedAt: new Date(),
    },
  },
]
