import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LeadTable from "./-LeadTable"
import ClientTable from "./-ClientTable"

export default function RouteComponent() {
  return (
    <div className="p-4">
      <Tabs defaultValue="lead">
        <TabsList>
          <TabsTrigger value="lead">Lead</TabsTrigger>
          <TabsTrigger value="client">Client</TabsTrigger>
        </TabsList>
        <TabsContent value="lead">
          <LeadTable />
        </TabsContent>
        <TabsContent value="client">
          <ClientTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}
