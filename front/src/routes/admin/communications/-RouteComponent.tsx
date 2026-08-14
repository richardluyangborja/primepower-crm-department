import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { getRouteApi } from "@tanstack/react-router"
import { getCompanyById, getContactById } from "@/lib/mock-data"

const typeColors: Record<string, string> = {
  Call: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  Email: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  Meeting: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  Message: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  Note: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
}

export default function RouteComponent() {
  const routeApi = getRouteApi("/admin/communications/")
  const allCommunications = routeApi.useLoaderData()
  const [search, setSearch] = useState("")
  const [filterType, setFilterType] = useState<string>("ALL")

  const filtered = allCommunications.filter((comm) => {
    const company = getCompanyById(comm.companyId)
    const matchesSearch =
      !search ||
      comm.subject.toLowerCase().includes(search.toLowerCase()) ||
      company?.company.toLowerCase().includes(search.toLowerCase())
    const matchesType = filterType === "ALL" || comm.type === filterType
    return matchesSearch && matchesType
  })

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search communications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="h-9 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
        >
          <option value="ALL">All Types</option>
          <option value="Call">Call</option>
          <option value="Email">Email</option>
          <option value="Meeting">Meeting</option>
          <option value="Message">Message</option>
          <option value="Note">Note</option>
        </select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Communication History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date / Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Assigned To</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((comm) => {
                const company = getCompanyById(comm.companyId)
                return (
                  <TableRow key={comm.id}>
                    <TableCell>
                      {comm.dateTime.toLocaleDateString()}{" "}
                      {comm.dateTime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={cn("", typeColors[comm.type])}
                      >
                        {comm.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {company?.company}
                    </TableCell>
                    <TableCell>
                      {getContactById(comm.companyId, comm.contactId)?.name}
                    </TableCell>
                    <TableCell>{comm.subject}</TableCell>
                    <TableCell>{comm.assignedTo}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
