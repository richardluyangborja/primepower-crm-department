import { createFileRoute } from "@tanstack/react-router"
import RouteComponent from "./-RouteComponent"
import { followUps } from "@/lib/mock-data"

export const Route = createFileRoute("/admin/reminders/")({
  component: RouteComponent,
  loader: () => followUps,
})
