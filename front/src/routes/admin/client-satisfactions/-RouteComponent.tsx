import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getRouteApi } from "@tanstack/react-router"
import { getCompanyById } from "@/lib/mock-data"

export default function RouteComponent() {
  const routeApi = getRouteApi("/admin/client-satisfactions/")
  const { surveys, surveyResponses } = routeApi.useLoaderData()

  const completedSurveys = surveys.filter((s) => s.status === "Completed")
  const activeResponses = surveyResponses.filter((r) =>
    completedSurveys.some((s) => s.id === r.surveyId)
  )
  const avgRating =
    activeResponses.length > 0
      ? activeResponses.reduce((sum, r) => sum + r.rating, 0) /
        activeResponses.length
      : 0

  const totalResponses = surveyResponses.length
  const satisfied = surveyResponses.filter((r) => r.rating >= 4).length
  const neutral = surveyResponses.filter((r) => r.rating === 3).length
  const unsatisfied = surveyResponses.filter((r) => r.rating <= 2).length

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {avgRating.toFixed(1)} / 5
            </div>
            <p className="text-xs text-muted-foreground">
              Based on {totalResponses} responses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Satisfaction Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span>Satisfied (4-5)</span>
              <span className="font-medium">
                {totalResponses > 0 ? Math.round((satisfied / totalResponses) * 100) : 0}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-green-500 transition-all"
                style={{ width: `${totalResponses > 0 ? (satisfied / totalResponses) * 100 : 0}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span>Neutral (3)</span>
              <span className="font-medium">
                {totalResponses > 0 ? Math.round((neutral / totalResponses) * 100) : 0}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-yellow-500 transition-all"
                style={{ width: `${totalResponses > 0 ? (neutral / totalResponses) * 100 : 0}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span>Unsatisfied (1-2)</span>
              <span className="font-medium">
                {totalResponses > 0 ? Math.round((unsatisfied / totalResponses) * 100) : 0}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-red-500 transition-all"
                style={{ width: `${totalResponses > 0 ? (unsatisfied / totalResponses) * 100 : 0}%` }}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Surveys</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-xs text-muted-foreground">
            <p>Total: {surveys.length}</p>
            <p>Completed: {completedSurveys.length}</p>
            <p>Sent: {surveys.filter((s) => s.status === "Sent").length}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="surveys">
        <TabsList>
          <TabsTrigger value="surveys">Surveys</TabsTrigger>
          <TabsTrigger value="responses">Responses</TabsTrigger>
        </TabsList>
        <TabsContent value="surveys" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {surveys.map((survey) => {
              const company = getCompanyById(survey.companyId)
              return (
                <Card key={survey.id}>
                  <CardHeader>
                    <CardTitle className="text-sm">{survey.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1 text-xs text-muted-foreground">
                    <p>Company: {company?.company}</p>
                    <p>Status: {survey.status}</p>
                    {survey.sentDate && (
                      <p>Sent: {survey.sentDate.toLocaleDateString()}</p>
                    )}
                    {survey.completedDate && (
                      <p>Completed: {survey.completedDate.toLocaleDateString()}</p>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
        <TabsContent value="responses" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Survey Responses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {surveyResponses.map((response) => {
                  const company = getCompanyById(response.companyId)
                  return (
                    <div
                      key={response.id}
                      className="rounded-lg border border-border p-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">
                          {response.respondentName}
                        </span>
                        <Badge variant="secondary">{response.rating}/5</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {response.respondentPosition} at {company?.company}
                      </p>
                      <p className="mt-2 text-sm">{response.feedback}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {response.submittedAt.toLocaleDateString()}
                      </p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
