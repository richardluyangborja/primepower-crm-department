import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, Info } from "lucide-react"
import { getRouteApi } from "@tanstack/react-router"
import { getCompanyById, getContactById } from "@/lib/mock-data"

export default function RouteComponent() {
  const routeApi = getRouteApi("/admin/reminders/")
  const allFollowUps = routeApi.useLoaderData()

  const overdue = allFollowUps.filter((f) => f.status === "Overdue")
  const pending = allFollowUps.filter((f) => f.status === "Pending")
  const completed = allFollowUps.filter((f) => f.status === "Completed")

  const priorityBadge = (priority: string) => {
    if (priority === "High")
      return <Badge variant="destructive">High</Badge>
    if (priority === "Medium")
      return <Badge variant="secondary">Medium</Badge>
    return <Badge variant="outline">Low</Badge>
  }

  const FollowUpItem = ({ followUp }: { followUp: typeof allFollowUps[0] }) => {
    const company = getCompanyById(followUp.companyId)
    return (
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <CardTitle className="text-sm">{followUp.title}</CardTitle>
            {priorityBadge(followUp.priority)}
          </div>
        </CardHeader>
        <CardContent className="space-y-1 text-xs text-muted-foreground">
          <p>{followUp.description}</p>
          <p>Company: {company?.company}</p>
          <p>
            Contact: {getContactById(followUp.companyId, followUp.contactId)?.name}
          </p>
          <p>Assigned to: {followUp.assignedTo}</p>
          <p>Due: {followUp.dueDate.toLocaleDateString()}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <Tabs defaultValue="overdue">
        <TabsList>
          <TabsTrigger value="overdue">
            Overdue{" "}
            <span className="ml-1 rounded-full bg-destructive/10 px-1.5 py-0.5 text-[10px] text-destructive">
              {overdue.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="overdue" className="mt-4 flex flex-col gap-4">
          {overdue.length === 0 ? (
            <Alert>
              <CheckCircle2 />
              <AlertTitle>All caught up!</AlertTitle>
              <AlertDescription>No overdue follow-ups.</AlertDescription>
            </Alert>
          ) : (
            overdue.map((f) => <FollowUpItem key={f.id} followUp={f} />)
          )}
        </TabsContent>
        <TabsContent value="today" className="mt-4 flex flex-col gap-4">
          {pending.filter((f) => f.dueDate.toDateString() === new Date().toDateString()).length === 0 ? (
            <Alert>
              <Info />
              <AlertTitle>No follow-ups due today</AlertTitle>
              <AlertDescription>
                You have no follow-ups scheduled for today.
              </AlertDescription>
            </Alert>
          ) : (
            pending
              .filter((f) => f.dueDate.toDateString() === new Date().toDateString())
              .map((f) => <FollowUpItem key={f.id} followUp={f} />)
          )}
        </TabsContent>
        <TabsContent value="upcoming" className="mt-4 flex flex-col gap-4">
          {pending
            .filter((f) => f.dueDate > new Date())
            .map((f) => (
              <FollowUpItem key={f.id} followUp={f} />
            ))}
        </TabsContent>
        <TabsContent value="completed" className="mt-4 flex flex-col gap-4">
          {completed.map((f) => (
            <FollowUpItem key={f.id} followUp={f} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
