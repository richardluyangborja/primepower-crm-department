import { createFileRoute } from "@tanstack/react-router"
import RouteComponent from "./-RouteComponent"
import { companies } from "./-api"

export const Route = createFileRoute("/admin/lead-and-client/")({
  component: RouteComponent,
  loader: () => companies,
})
