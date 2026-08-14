import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Outlet } from "@tanstack/react-router"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Bell, LogOut, Search, UserRound } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <header className="flex w-full items-center gap-2 border-b border-b-border p-4">
          <Button variant="outline" size="icon">
            <Search />
          </Button>
          <Input placeholder="Search..." className="mr-auto w-sm" />
          <Button variant="outline" size="icon">
            <Bell />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarFallback>DA</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
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
          </DropdownMenu>
        </header>
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
