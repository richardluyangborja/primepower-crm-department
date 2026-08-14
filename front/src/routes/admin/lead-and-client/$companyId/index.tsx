import { createFileRoute } from "@tanstack/react-router"
import RouteComponent from "./-RouteComponent"
import { companies } from "../-api"

export const Route = createFileRoute("/admin/lead-and-client/$companyId/")({
  component: RouteComponent,
  loader: ({ params }) =>
    companies.find((company) => company.id === Number(params.companyId)),
})
