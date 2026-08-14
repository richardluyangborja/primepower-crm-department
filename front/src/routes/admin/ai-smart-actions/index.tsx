import { createFileRoute } from "@tanstack/react-router"
import RouteComponent from "./-RouteComponent"
import { aiRecommendations } from "@/lib/mock-data"

export const Route = createFileRoute("/admin/ai-smart-actions/")({
  component: RouteComponent,
  loader: () => aiRecommendations,
})
