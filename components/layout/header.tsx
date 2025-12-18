"use client"

import { Bell, ChevronDown, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { MobileSidebar } from "./mobile-sidebar"

const notifications = [
  {
    id: "1",
    engineer: "Rajesh Kumar",
    message: "Material delivery expected tomorrow for Block A foundation",
    time: "10 mins ago",
    type: "info",
  },
  {
    id: "2",
    engineer: "Priya Sharma",
    message: "Urgent: Steel rods shortage in Block C, need immediate PO approval",
    time: "1 hour ago",
    type: "warning",
  },
  {
    id: "3",
    engineer: "Amit Patel",
    message: "Invoice INV-2024-090 payment received and confirmed",
    time: "2 hours ago",
    type: "success",
  },
]

export function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 px-4 sm:px-6">
      <MobileSidebar />

      <div className="flex flex-1 items-center justify-between gap-4">
        <div className="flex-1 max-w-xs">
          <Select defaultValue="project-1">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="project-1">Residential Complex A</SelectItem>
              <SelectItem value="project-2">Commercial Tower B</SelectItem>
              <SelectItem value="project-3">Highway Bridge Project</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="size-5" />
                <span className="absolute top-1 right-1 size-2 bg-destructive rounded-full" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-sm">Engineer Notifications</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Latest updates from site engineers</p>
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-start gap-3 p-4 border-b last:border-0 hover:bg-muted/50 transition-colors"
                  >
                    <div
                      className={`size-2 rounded-full mt-2 flex-shrink-0 ${
                        notification.type === "warning"
                          ? "bg-warning"
                          : notification.type === "success"
                            ? "bg-success"
                            : "bg-primary"
                      }`}
                    />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{notification.engineer}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t">
                <Button variant="ghost" size="sm" className="w-full text-xs">
                  View All Notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="size-4 text-primary" />
                </div>
                <span className="hidden sm:inline text-sm font-medium">Manager</span>
                <ChevronDown className="size-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
