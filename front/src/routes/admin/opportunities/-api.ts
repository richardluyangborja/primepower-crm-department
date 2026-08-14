export { opportunities, getOpportunitiesByCompanyId, getOpportunityById } from "@/lib/mock-data"
export type { Opportunity, OpportunityStage, OpportunityStatus } from "@/lib/mock-data"

export const opportunityStages = [
  "NEW",
  "INITIAL_CONTACT",
  "DISCUSSION",
  "PROPOSAL",
  "NEGOTIATION",
  "CONTRACT_PROCESSING",
  "WON",
  "LOST",
] as const
