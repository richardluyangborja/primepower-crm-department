import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Plus } from "lucide-react"

export default function CreateLeadSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Plus />
          <span>Create lead</span>
        </Button>
      </SheetTrigger>
      <SheetContent showCloseButton={false} className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Create a new company lead</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-2 px-4">
          <h1 className="mb-4 text-center text-muted-foreground">
            Company Information
          </h1>
          <Label>Company Name</Label>
          <Input />
          <Label>Industry</Label>
          <Input />
          <Label>Business Address</Label>
          <Input />
          <Label>Company Phone</Label>
          <Input />
          <Label>Company Email</Label>
          <Input />
          <Label>Website</Label>
          <Input />
          <h1 className="my-4 text-center text-muted-foreground">
            Primary Contact Information
          </h1>
          <Label>First Name</Label>
          <Input />
          <Label>Last Name</Label>
          <Input />
          <Label>Position</Label>
          <Input />
          <Label>Email</Label>
          <Input />
          <Label>Phone</Label>
          <h1 className="my-4 text-center text-muted-foreground">
            Lead Information
          </h1>
          <Label>Sales Representative</Label>
          <Select>
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="">Daniel Balisi</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Label>Lead Source</Label>
          <Input />
          <Label>Additional Notes</Label>
          <Input />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button>Create lead</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
