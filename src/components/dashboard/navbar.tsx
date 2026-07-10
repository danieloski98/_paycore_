"use client"

import { BellIcon, UserCircle2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { SidebarLinks } from "@/lib/constants"
import { getActiveSidebarItem } from "@/lib/utils"


function DashboardNavbar() {
  const pathname = usePathname();

  const activeItem = getActiveSidebarItem(pathname, SidebarLinks);

  return (
    <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="md:hidden" />
          <div className="hidden min-w-0 md:block">
            <p className="text-2xl font-semibold">{activeItem?.label}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon-sm" aria-label="Notifications">
            <BellIcon />
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
