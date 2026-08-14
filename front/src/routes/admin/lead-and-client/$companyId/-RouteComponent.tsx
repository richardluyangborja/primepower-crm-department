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
import { Link, getRouteApi, useNavigate } from "@tanstack/react-router"
import type { Company } from "../-api"
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
import {
  getOpportunitiesByCompanyId,
  getCommunicationsByCompanyId,
  getFollowUpsByCompanyId,
  getSurveysByCompanyId,
  getSurveyResponsesBySurveyId,
} from "@/lib/mock-data"

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
        <OpportunityCard company={company!} />
        <CommunicationsCard company={company!} />
        <Separator className="my-6" />
        <FollowUpSection company={company!} />
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
        <ClientSatisfactionCard company={company!} />
        <Separator className="my-6" />
        <ContactSection lead={company!} />
        <Separator className="my-6" />
        <OpportunityCard company={company!} />
        <CommunicationsCard company={company!} />
        <Separator className="my-6" />
        <FollowUpSection company={company!} />
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
        {lead.contacts.map((contact: { name: string; position: string; email: string; phone: string }, i: number) => (
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

function OpportunityCard({ company }: { company: Company }) {
  const companyOpps = getOpportunitiesByCompanyId(company!.id)

  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {companyOpps.slice(0, 2).map((opp) => (
              <div key={opp.id}>
                <p className="font-semibold">{opp.title}</p>
                <p>{opp.stage.replace(/_/g, " ")}</p>
                <p>{opp.priority} Priority</p>
                <p>Updated {opp.updatedAt.toDateString()}</p>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          {companyOpps.length > 2 && (
            <Badge variant="outline">
              <Plus size={18} />
              <span>{companyOpps.length - 2} more</span>
            </Badge>
          )}
          <Button variant="link" size="sm" asChild>
            <Link to="/admin/opportunities">
              <span>View Pipeline</span>
              <MoveUpRight />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  )
}

function CommunicationsCard({ company }: { company: Company }) {
  const companyComms = getCommunicationsByCompanyId(company!.id)

  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Recent Communications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {companyComms.slice(0, 2).map((comm) => (
              <div key={comm.id}>
                <p className="font-semibold">{comm.dateTime.toLocaleDateString()}</p>
                <p>{comm.type}</p>
                <p>{comm.subject}</p>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          {companyComms.length > 2 && (
            <Badge variant="outline">
              <Plus size={18} />
              <span>{companyComms.length - 2} more</span>
            </Badge>
          )}
          <Button variant="link" size="sm" asChild>
            <Link to="/admin/communications">
              <span>View Communication History</span>
              <MoveUpRight />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  )
}

function FollowUpSection({ company }: { company: Company }) {
  const companyFollowUps = getFollowUpsByCompanyId(company!.id)

  return (
    <section>
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Reminders</h1>
        <Button variant="link" asChild>
          <Link to="/admin/reminders">
            <span>Go to Follow-up Reminders</span>
            <MoveUpRight />
          </Link>
        </Button>
      </header>
      <div className="flex flex-col gap-4">
        {companyFollowUps
          .filter((f) => f.status === "Overdue")
          .map((followUp) => (
            <Alert key={followUp.id} variant="destructive">
              <CircleAlert />
              <AlertTitle>{followUp.title}</AlertTitle>
              <AlertDescription>
                Due {followUp.dueDate.toLocaleDateString()}
              </AlertDescription>
            </Alert>
          ))}
        {companyFollowUps
          .filter((f) => f.status === "Pending")
          .map((followUp) => (
            <Alert key={followUp.id}>
              <Info />
              <AlertTitle>{followUp.title}</AlertTitle>
              <AlertDescription>
                Due {followUp.dueDate.toLocaleDateString()}
              </AlertDescription>
            </Alert>
          ))}
        {companyFollowUps.length === 0 && (
          <Alert>
            <Info />
            <AlertTitle>No follow-ups</AlertTitle>
            <AlertDescription>
              There are no follow-ups for this company yet.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </section>
  )
}

function ClientSatisfactionCard({ company }: { company: Company }) {
  const companySurveys = getSurveysByCompanyId(company!.id)
  const latestSurvey = companySurveys.find((s) => s.status === "Completed")
  const responses = latestSurvey
    ? getSurveyResponsesBySurveyId(latestSurvey.id)
    : []
  const avgRating =
    responses.length > 0
      ? responses.reduce((sum, r) => sum + r.rating, 0) / responses.length
      : 0

  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Client Satisfaction</CardTitle>
          <CardDescription>
            {latestSurvey
              ? `Last conducted survey: ${latestSurvey.completedDate?.toLocaleDateString()}`
              : "No surveys yet"}
          </CardDescription>
          <CardAction>
            <Button variant="link" asChild>
              <Link to="/admin/client-satisfactions">
                <span>Go to Client Survey</span>
                <MoveUpRight />
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Latest Rating</p>
          <h1 className="text-2xl font-semibold">
            {avgRating > 0 ? `${avgRating.toFixed(1)} / 5` : "N/A"}
          </h1>
        </CardContent>
      </Card>
    </section>
  )
}
