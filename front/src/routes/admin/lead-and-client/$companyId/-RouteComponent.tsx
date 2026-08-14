import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getRouteApi, useNavigate } from "@tanstack/react-router"
import {
  ChevronLeft,
  CircleAlert,
  CircleCheckBig,
  Info,
  Mail,
  MoveUpRight,
  Pencil,
  Phone,
  Plus,
  Trash,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { Company } from "../-api"

export default function RouteComponent() {
  const routeApi = getRouteApi("/admin/lead-and-client/$companyId/")
  const company = routeApi.useLoaderData()
  const navigate = useNavigate()

  if (company?.lead.status !== "CONVERTED") {
    return (
      <div className="flex flex-col gap-4 overflow-y-scroll p-4 pb-12">
        <header>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate({ to: "/admin/lead-and-client" })}
          >
            <ChevronLeft />
            Back
          </Button>
        </header>
        <section>
          <div className="flex items-start gap-2">
            <h1 className="text-2xl font-semibold">{company?.company}</h1>
            <Badge variant="secondary">{company?.lead.status}</Badge>
          </div>
          <span className="block text-muted-foreground">
            Assigned to <span>{company?.salesRepresentative}</span>
          </span>
          <div className="mt-4 flex items-center gap-2">
            <Button>
              <span>Convert to client</span>
              <CircleCheckBig />
            </Button>
            <Button variant="destructive" size="icon">
              <Trash />
            </Button>
          </div>
        </section>
        <CompanyInfoCard company={company!} />
        <LeadInfoCard company={company!} />
        <Separator className="my-6" />
        <ContactSection lead={company!} />
        <Separator className="my-6" />
        <OpportunityCard />
        <CommunicationsCard />
        <Separator className="my-6" />
        <FollowUpSection />
      </div>
    )
  }

  if (company.lead.status === "CONVERTED") {
    return (
      <div className="flex flex-col gap-4 overflow-y-scroll p-4 pb-12">
        <header>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate({ to: "/admin/lead-and-client" })}
          >
            <ChevronLeft />
            Back
          </Button>
        </header>
        <section>
          <div className="flex items-start gap-2">
            <h1 className="text-2xl font-semibold">{company?.company}</h1>
            <Badge variant="secondary">{company?.client?.status}</Badge>
          </div>
          <span className="block text-muted-foreground">
            Assigned to <span>{company?.salesRepresentative}</span>
          </span>
          <Button variant="destructive" size="sm" className="mt-4">
            <Trash />
            <span>Delete Company</span>
          </Button>
        </section>
        <CompanyInfoCard company={company!} />
        <LeadInfoCard company={company!} isClient />
        <ClientSatisfactionCard />
        <Separator className="my-6" />
        <ContactSection lead={company!} />
        <Separator className="my-6" />
        <OpportunityCard />
        <CommunicationsCard />
        <Separator className="my-6" />
        <FollowUpSection />
      </div>
    )
  }
}

function CompanyInfoCard({ company }: { company: Company }) {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>{company.company}</CardDescription>
          <CardAction>
            <Button variant="outline" size="icon">
              <Pencil />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <span className="block text-sm text-muted-foreground">
              Industry
            </span>
            <span>{company.industry}</span>
          </div>
          <div>
            <span className="block text-sm text-muted-foreground">Address</span>
            <span>{company.address}</span>
          </div>
          <div>
            <span className="block text-sm text-muted-foreground">Phone</span>
            <span>{company.phone}</span>
          </div>
          <div>
            <span className="block text-sm text-muted-foreground">Email</span>
            <span>{company.email}</span>
          </div>
          <div>
            <span className="block text-sm text-muted-foreground">Website</span>
            <Button variant="link" asChild>
              <a href={company.website}>
                <span>{company.website}</span>
                <MoveUpRight />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

function LeadInfoCard({
  company,
  isClient,
}: {
  company: Company
  isClient?: true
}) {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>
            {isClient ? "Client Information" : "Lead Information"}
          </CardTitle>
          <CardAction>
            <Button variant="outline" size="icon">
              <Pencil />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <span className="block text-sm text-muted-foreground">Status</span>
            <Badge variant="secondary">
              {isClient ? company.client?.status : company.lead.status}
            </Badge>
          </div>
          <div>
            <span className="block text-sm text-muted-foreground">Source</span>
            <span>{company.source}</span>
          </div>
          <div>
            <span className="block text-sm text-muted-foreground">
              Sales Representative
            </span>
            <span>{company.salesRepresentative}</span>
          </div>
          {isClient ? (
            <>
              <div>
                <span className="block text-sm text-muted-foreground">
                  Converted At
                </span>
                <span>{company.client?.convertedAt.toDateString()}</span>
              </div>
              <div>
                <span className="block text-sm text-muted-foreground">
                  Last Activity
                </span>
                <span>{company.client?.lastActivity.toDateString()}</span>
              </div>
            </>
          ) : (
            <>
              <div>
                <span className="block text-sm text-muted-foreground">
                  Created
                </span>
                <span>{company.lead.createdAt.toDateString()}</span>
              </div>
              <div>
                <span className="block text-sm text-muted-foreground">
                  Last Activity
                </span>
                <span>{company.lead.lastActivity.toDateString()}</span>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </section>
  )
}

function ContactSection({ lead }: { lead: Company }) {
  return (
    <section>
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Contacts</h1>
        <Button>
          <Plus />
          <span>New Contact</span>
        </Button>
      </header>
      <div className="grid grid-cols-2 gap-4">
        {lead.contacts.map((contact, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>{contact.name}</CardTitle>
              <CardDescription>{contact.position}</CardDescription>
              <CardAction>
                <Button variant="outline" size="icon">
                  <Pencil />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Mail size={18} className="text-muted-foreground" />
                <span>{contact.email}</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone size={18} className="text-muted-foreground" />
                <span>{contact.phone}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function OpportunityCard() {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p className="font-semibold">Production Manpower Contract</p>
            <p>Negotiation</p>
            <p>High Priority</p>
            <p>Updated 2 hours ago</p>
          </div>
          <Separator className="my-2" />
          <div>
            <p className="font-semibold">Production Manpower Contract</p>
            <p>Negotiation</p>
            <p>High Priority</p>
            <p>Updated 2 hours ago</p>
          </div>
        </CardContent>
        <CardFooter>
          <Badge variant="outline">
            <Plus size={18} />
            <span>1 more</span>
          </Badge>
          <Button variant="link" size="sm">
            <span>View Pipeline</span>
            <MoveUpRight />
          </Button>
        </CardFooter>
      </Card>
    </section>
  )
}

function CommunicationsCard() {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Recent Communications</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p className="font-semibold">Aug 14</p>
            <p>Call</p>
            <p>Richard Santos called Juan Dela Cruz</p>
          </div>
          <Separator className="my-2" />
          <div>
            <p className="font-semibold">Aug 12</p>
            <p>Email</p>
            <p>Proposal requirements sent to client contact.</p>
          </div>
        </CardContent>
        <CardFooter>
          <Badge variant="outline">
            <Plus size={18} />
            <span>1 more</span>
          </Badge>
          <Button variant="link" size="sm">
            <span>View Communication History</span>
            <MoveUpRight />
          </Button>
        </CardFooter>
      </Card>
    </section>
  )
}

function FollowUpSection() {
  return (
    <section>
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Reminders</h1>
        <Button variant="link">
          <span>Go to Follow-up Reminders</span>
          <MoveUpRight />
        </Button>
      </header>
      <div className="flex flex-col gap-4">
        <Alert variant="destructive">
          <CircleAlert />
          <AlertTitle>Discuss contract requirements</AlertTitle>
          <AlertDescription>Due Aug 12, 2026</AlertDescription>
        </Alert>
        <Separator className="my-4" />
        <Alert>
          <Info />
          <AlertTitle>Discuss manpower requirements</AlertTitle>
          <AlertDescription>Due August 18, 2026</AlertDescription>
        </Alert>
        <Alert>
          <Info />
          <AlertTitle>Discuss manpower requirements</AlertTitle>
          <AlertDescription>Due August 18, 2026</AlertDescription>
        </Alert>
      </div>
    </section>
  )
}

function ClientSatisfactionCard() {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Client Satisfaction</CardTitle>
          <CardDescription>
            Last conducted survey: August 5, 2026
          </CardDescription>
          <CardAction>
            <Button variant="link">
              <span>Go to Client Survey</span>
              <MoveUpRight />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Latest Rating</p>
          <h1 className="text-2xl font-semibold">4.5 / 5</h1>
        </CardContent>
      </Card>
    </section>
  )
}
