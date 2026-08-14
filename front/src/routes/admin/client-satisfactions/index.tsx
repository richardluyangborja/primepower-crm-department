import { createFileRoute } from "@tanstack/react-router"
import RouteComponent from "./-RouteComponent"
import { surveys, surveyResponses } from "@/lib/mock-data"

export const Route = createFileRoute("/admin/client-satisfactions/")({
  component: RouteComponent,
  loader: () => ({ surveys, surveyResponses }),
})
