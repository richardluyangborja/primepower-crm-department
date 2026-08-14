import { createFileRoute } from "@tanstack/react-router"
import RouteComponent from "./-RouteComponent"
import { communications } from "@/lib/mock-data"

export const Route = createFileRoute("/admin/communications/")({
  component: RouteComponent,
  loader: () => communications,
})
