import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Ellipsis, FunnelPlus, Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import CreateLeadSheet from "./-CreateLeadSheet"
import { getRouteApi, useNavigate } from "@tanstack/react-router"

export default function ClientTable() {
  const routeApi = getRouteApi("/admin/lead-and-client/")
  const companies = routeApi.useLoaderData()
  const companyClients = companies.filter(
    (company) => company.lead.status === "CONVERTED"
  )
  const navigate = useNavigate()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Search />
          </Button>
          <Input placeholder="Search lead..." className="w-xs" />
          <Button variant="outline" size="icon">
            <FunnelPlus />
          </Button>
        </div>
        <CardAction>
          <CreateLeadSheet />
        </CardAction>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Primary Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sales Representative</TableHead>
              <TableHead>Last Activity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companyClients.map((companyClient) => (
              <TableRow
                key={companyClient.id}
                onClick={() =>
                  navigate({
                    to: "/admin/lead-and-client/$companyId",
                    params: { companyId: companyClient.id.toString() },
                  })
                }
              >
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span>{companyClient.company}</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      {companyClient.industry}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{companyClient.source}</TableCell>
                <TableCell className="flex flex-col">
                  <span>{companyClient.contacts.at(0)?.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {companyClient.contacts.at(0)?.position}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {companyClient.client!.status}
                  </Badge>
                </TableCell>
                <TableCell>{companyClient.salesRepresentative}</TableCell>
                <TableCell>
                  {companyClient.client!.lastActivity.toDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Ellipsis />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem variant="destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
