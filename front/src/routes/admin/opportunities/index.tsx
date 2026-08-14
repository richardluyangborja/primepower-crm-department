import { createFileRoute } from "@tanstack/react-router"
import RouteComponent from "./-RouteComponent"
import { opportunities } from "@/lib/mock-data"

export const Route = createFileRoute("/admin/opportunities/")({
  component: RouteComponent,
  loader: () => opportunities,
})
