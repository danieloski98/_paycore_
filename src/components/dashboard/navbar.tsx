import React from "react"

import { BellIcon, LayoutGridIcon, SearchIcon, UserCircle2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"

function DashboardNavbar() {
  return (
    <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex h-16 items-center justify-between gap-4 px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="md:hidden" />
          <div className="hidden min-w-0 md:block">
            <p className="text-sm font-semibold">Workspace</p>
          </div>
          <div className="relative hidden w-full max-w-xl min-w-sm md:block ml-6">
            <SearchIcon
              size={16}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              aria-label="Search dashboard"
              placeholder="Search employees or reports..."
              className="pl-9"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon-sm" aria-label="Notifications">
            <BellIcon />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Applications">
            <LayoutGridIcon />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Profile">
            <UserCircle2Icon />
          </Button>
        </div>
      </div>
    </header>
  )
}

export default DashboardNavbar
