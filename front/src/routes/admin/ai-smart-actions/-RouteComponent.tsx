import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lightbulb, AlertTriangle, Info } from "lucide-react"
import { getRouteApi } from "@tanstack/react-router"
import type { AIRecommendation } from "./-api"

const priorityIcon = {
  High: AlertTriangle,
  Medium: Lightbulb,
  Low: Info,
}

export default function RouteComponent() {
  const routeApi = getRouteApi("/admin/ai-smart-actions/")
  const recommendations = routeApi.useLoaderData() as AIRecommendation[]

  const high = recommendations.filter((r) => r.priority === "High")
  const medium = recommendations.filter((r) => r.priority === "Medium")
  const low = recommendations.filter((r) => r.priority === "Low")

  return (
    <div className="flex flex-col gap-4 p-4">
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="high">
            High Priority{" "}
            <span className="ml-1 rounded-full bg-destructive/10 px-1.5 py-0.5 text-[10px] text-destructive">
              {high.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="medium">
            Medium{" "}
            <span className="ml-1 rounded-full bg-secondary px-1.5 py-0.5 text-[10px]">
              {medium.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="low">Low</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4 flex flex-col gap-4">
          {recommendations.map((rec) => (
            <RecommendationCard key={rec.id} recommendation={rec} />
          ))}
        </TabsContent>
        <TabsContent value="high" className="mt-4 flex flex-col gap-4">
          {high.map((rec) => (
            <RecommendationCard key={rec.id} recommendation={rec} />
          ))}
        </TabsContent>
        <TabsContent value="medium" className="mt-4 flex flex-col gap-4">
          {medium.map((rec) => (
            <RecommendationCard key={rec.id} recommendation={rec} />
          ))}
        </TabsContent>
        <TabsContent value="low" className="mt-4 flex flex-col gap-4">
          {low.map((rec) => (
            <RecommendationCard key={rec.id} recommendation={rec} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function RecommendationCard({ recommendation }: { recommendation: AIRecommendation }) {
  const Icon = priorityIcon[recommendation.priority as keyof typeof priorityIcon] || Info

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">{recommendation.suggestedAction}</CardTitle>
          <Badge
            variant={
              recommendation.priority === "High"
                ? "destructive"
                : recommendation.priority === "Medium"
                  ? "secondary"
                  : "outline"
            }
          >
            {recommendation.priority}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-start gap-2">
          <Icon className="mt-0.5 size-4 shrink-0" />
          <p>{recommendation.reason}</p>
        </div>
        <p className="text-xs">
          Related:{" "}
          <span className="font-medium text-foreground">
            {recommendation.relatedEntity}
          </span>
        </p>
      </CardContent>
    </Card>
  )
}
