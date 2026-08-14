import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Filter, Search } from "lucide-react"
import { useState } from "react"
import { getRouteApi, useNavigate } from "@tanstack/react-router"
import { getCompanyById } from "@/lib/mock-data"

const stageOrder = [
  "NEW",
  "INITIAL_CONTACT",
  "DISCUSSION",
  "PROPOSAL",
  "NEGOTIATION",
  "CONTRACT_PROCESSING",
  "WON",
  "LOST",
]

const stageColors: Record<string, string> = {
  NEW: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  INITIAL_CONTACT: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  DISCUSSION: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  PROPOSAL: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  NEGOTIATION: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  CONTRACT_PROCESSING:
    "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  WON: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  LOST: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
}

export default function RouteComponent() {
  const routeApi = getRouteApi("/admin/opportunities/")
  const allOpportunities = routeApi.useLoaderData()
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [filterStage, setFilterStage] = useState<string>("ALL")

  const filtered = allOpportunities.filter((opp) => {
    const company = getCompanyById(opp.companyId)
    const matchesSearch =
      !search ||
      opp.title.toLowerCase().includes(search.toLowerCase()) ||
      company?.company.toLowerCase().includes(search.toLowerCase())
    const matchesStage = filterStage === "ALL" || opp.stage === filterStage
    return matchesSearch && matchesStage
  })

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search opportunities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setFilterStage("ALL")}>
              All Stages
            </DropdownMenuItem>
            {stageOrder.map((stage) => (
              <DropdownMenuItem key={stage} onClick={() => setFilterStage(stage)}>
                {stage.replace(/_/g, " ")}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-4">
          {stageOrder.map((stage) => {
            const stageOpps = filtered.filter((o) => o.stage === stage)
            return (
              <div
                key={stage}
                className="flex min-w-[280px] flex-col gap-2 rounded-xl border border-border bg-muted/30 p-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">
                    {stage.replace(/_/g, " ")}{" "}
                    <span className="text-muted-foreground">({stageOpps.length})</span>
                  </h3>
                </div>
                <div className="flex flex-col gap-2">
                  {stageOpps.map((opp) => {
                    const company = getCompanyById(opp.companyId)
                    return (
                      <Card
                        key={opp.id}
                        className="cursor-pointer"
                        onClick={() =>
                          navigate({
                            to: "/admin/lead-and-client/$companyId",
                            params: { companyId: opp.companyId.toString() },
                          })
                        }
                      >
                        <CardHeader className="p-3 pb-2">
                          <CardTitle className="text-sm">{opp.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 p-3 pt-0 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                              {company?.company}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            <Badge
                              variant="secondary"
                              className={cn("text-[10px]", stageColors[opp.stage])}
                            >
                              {opp.stage.replace(/_/g, " ")}
                            </Badge>
                            <Badge variant="outline" className="text-[10px]">
                              {opp.priority}
                            </Badge>
                          </div>
                          <div className="text-muted-foreground">
                            Close: {opp.expectedClosingDate.toLocaleDateString()}
                          </div>
                          <div className="text-muted-foreground">
                            {opp.assignedTo}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                  {stageOpps.length === 0 && (
                    <div className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                      No opportunities
                    </div>
                  )}
                </div>
              </div>
            )
          }          )}
        </div>
      </div>
    </div>
  )
}
