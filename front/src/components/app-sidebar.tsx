import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "@tanstack/react-router"
import {
  Bell,
  ChartSpline,
  Handshake,
  LayoutGrid,
  LogOut,
  Mail,
  Star,
  UserRound,
  UserRoundCog,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "./ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

const sidebarConfig = [
  {
    group: "Overview",
    items: [
      {
        path: "/admin/dashboard",
        label: "Dashboard",
        icon: LayoutGrid,
      },
      {
        path: "/admin/account",
        label: "Account",
        icon: UserRound,
      },
    ],
  },
  {
    group: "Department",
    items: [
      {
        path: "/admin/lead-and-client",
        label: "Lead and Client Tracking",
        icon: Handshake,
      },
      {
        path: "/admin/communications",
        label: "Communications History",
        icon: Mail,
      },
      {
        path: "/admin/client-satisfactions",
        label: "Client Satisfaction and Surveys",
        icon: Star,
        tooltip: "Client Satisfaction and Surveys",
      },
      {
        path: "/admin/reminders",
        label: "Follow-up Reminders",
        icon: Bell,
      },
      {
        path: "/admin/opportunities",
        label: "Opportunity Pipeline Visualization",
        icon: ChartSpline,
        tooltip: "Opportunity Pipeline Visualization",
      },
    ],
  },
  {
    group: "Administration",
    items: [
      {
        path: "/admin/users",
        label: "User Management",
        icon: UserRoundCog,
      },
    ],
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-4">
          <img
            src="/crm-logo.png"
            alt="Logo"
            className="h-auto w-20 object-cover"
          />
          <div className="flex flex-col">
            <h1 className="text-sm font-bold">Primepower Manpower Services</h1>
            <span className="text-xs text-muted-foreground">
              Customer Relationship Management
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {sidebarConfig.map((group) => (
          <SidebarGroup key={group.group}>
            <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    {item.tooltip ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton asChild>
                            <Link to={item.path}>
                              {item.icon && <item.icon className="size-4" />}
                              <span>{item.label}</span>
                            </Link>
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          {item.tooltip}
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <SidebarMenuButton asChild>
                        <Link to={item.path}>
                          {item.icon && <item.icon className="size-4" />}
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <DropdownMenu>
          <Card>
            <CardContent>
              <div className="flex items-center gap-4">
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                      <AvatarFallback>DA</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <div className="flex flex-col">
                  <span className="font-semibold">Daniel Balisi</span>
                  <span className="text-xs text-muted-foreground">
                    Administrator
                  </span>
                </div>
              </div>
              <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <UserRound />
                    Account
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </CardContent>
          </Card>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
