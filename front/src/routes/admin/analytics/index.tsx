import { createFileRoute } from "@tanstack/react-router"
import RouteComponent from "./-RouteComponent"
import { opportunities, communications, followUps, surveys, surveyResponses, companies } from "@/lib/mock-data"

export const Route = createFileRoute("/admin/analytics/")({
  component: RouteComponent,
  loader: () => ({ opportunities, communications, followUps, surveys, surveyResponses, companies }),
})
