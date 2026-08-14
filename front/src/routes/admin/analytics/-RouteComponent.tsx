import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getRouteApi } from "@tanstack/react-router"
import type {
  Opportunity,
  Communication,
  FollowUp,
  SurveyResponse,
  Company,
} from "@/lib/mock-data"

export default function RouteComponent() {
  const routeApi = getRouteApi("/admin/analytics/")
  const data = routeApi.useLoaderData() as {
    opportunities: Opportunity[]
    communications: Communication[]
    followUps: FollowUp[]
    surveyResponses: SurveyResponse[]
    companies: Company[]
  }

  const opportunities = data.opportunities
  const communications = data.communications
  const followUps = data.followUps
  const surveyResponses = data.surveyResponses
  const companies = data.companies

  const totalLeads = companies.filter((c) => c.lead.status !== "CONVERTED").length
  const totalClients = companies.filter((c) => c.lead.status === "CONVERTED").length
  const activeOpportunities = opportunities.filter((o) => o.status === "ACTIVE").length
  const wonOpportunities = opportunities.filter((o) => o.status === "WON").length
  const lostOpportunities = opportunities.filter((o) => o.status === "LOST").length
  const overdueFollowUps = followUps.filter((f) => f.status === "Overdue").length

  const stageCounts = [
    "NEW",
    "INITIAL_CONTACT",
    "DISCUSSION",
    "PROPOSAL",
    "NEGOTIATION",
    "CONTRACT_PROCESSING",
  ].map((stage) => ({
    stage,
    count: opportunities.filter((o) => o.stage === stage && o.status === "ACTIVE").length,
  }))

  const maxStageCount = Math.max(...stageCounts.map((s) => s.count), 1)

  const avgRating =
    surveyResponses.length > 0
      ? surveyResponses.reduce((sum, r) => sum + r.rating, 0) /
        surveyResponses.length
      : 0

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads}</div>
            <p className="text-xs text-muted-foreground">
              {companies.filter((c) => c.lead.status === "NEW").length} new
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Active Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeOpportunities}</div>
            <p className="text-xs text-muted-foreground">
              {wonOpportunities} won / {lostOpportunities} lost
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Active Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClients}</div>
            <p className="text-xs text-muted-foreground">
              {companies.filter((c) => c.client?.status === "ACTIVE").length}{" "}
              active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Overdue Follow-ups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {overdueFollowUps}
            </div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Pipeline Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {stageCounts.map(({ stage, count }) => (
              <div key={stage} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span>{stage.replace(/_/g, " ")}</span>
                  <span className="font-medium">{count}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-primary transition-all"
                    style={{
                      width: `${(count / maxStageCount) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Communication Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Interactions</span>
                <span className="font-bold">{communications.length}</span>
              </div>
              <div className="space-y-1">
                {["Call", "Email", "Meeting", "Message", "Note"].map((type) => {
                  const count = communications.filter((c) => c.type === type).length
                  return (
                    <div
                      key={type}
                      className="flex items-center justify-between text-xs text-muted-foreground"
                    >
                      <span>{type}</span>
                      <span>{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Satisfaction Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold">{avgRating.toFixed(1)} / 5</div>
            <div className="space-y-1">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = surveyResponses.filter(
                  (r) => r.rating === rating
                ).length
                const pct = surveyResponses.length > 0
                  ? (count / surveyResponses.length) * 100
                  : 0
                return (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-xs w-4">{rating}</span>
                    <div className="h-1.5 flex-1 rounded-full bg-muted">
                      <div
                        className="h-1.5 rounded-full bg-chart-1"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs w-6 text-right">{count}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Follow-up Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Total Follow-ups</span>
              <span className="font-bold">{followUps.length}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Overdue</span>
              <span className="text-destructive">{overdueFollowUps}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Pending</span>
              <span>{followUps.filter((f) => f.status === "Pending").length}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Completed</span>
              <span>{followUps.filter((f) => f.status === "Completed").length}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
