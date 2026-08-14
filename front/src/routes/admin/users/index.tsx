import { createFileRoute } from "@tanstack/react-router"
import RouteComponent from "./-RouteComponent"
import { users, roles } from "@/lib/mock-data"

export const Route = createFileRoute("/admin/users/")({
  component: RouteComponent,
  loader: () => ({ users, roles }),
})
