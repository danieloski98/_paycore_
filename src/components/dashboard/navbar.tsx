"use client"

import { BellIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname, useRouter } from "next/navigation"
import { employeeSidebarLinks, SidebarLinks } from "@/lib/constants"
import { getActiveSidebarItem } from "@/lib/utils"
import { useAtomValue } from "jotai"
import { userTypeAtom } from "@/states/user-type-state"
import { authUserAtom, employeeAtom } from "@/states/auth-user-state"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function DashboardNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const userType = useAtomValue(userTypeAtom);
  const employee = useAtomValue(employeeAtom);
  const companyUser = useAtomValue(authUserAtom);

  const activeItem = getActiveSidebarItem(pathname, [...SidebarLinks, ...employeeSidebarLinks]);

  // Determine current active user details
  const currentUser = userType === "EMPLOYEE" ? employee : companyUser;
  const userAvatar = currentUser?.picture;
  const userInitials = currentUser 
    ? `${currentUser.firstName?.[0] || ""}${currentUser.lastName?.[0] || ""}`.toUpperCase()
    : "U";

  const handleProfileClick = () => {
    if (userType === "EMPLOYEE") {
      router.push("/employee/settings");
    } else {
      router.push("/admin/settings/general");
    }
  };

  return (
    <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="md:hidden" />
          <div className="hidden min-w-0 md:block">
            <p className="text-2xl font-semibold">{activeItem?.label}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" className="relative h-11 w-11 rounded-full" aria-label="Notifications">
            <BellIcon size={24} className=" size-6.5 text-muted-foreground" />
            <span className="absolute right-2.5 top-2 h-2.5 w-2.5 rounded-full bg-rose-600" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full animate-in fade-in zoom-in duration-300" onClick={handleProfileClick} aria-label="Profile">
            <Avatar className="h-9 w-9 border">
              {userAvatar ? (
                <AvatarImage src={userAvatar} alt="Profile" />
              ) : null}
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                {userInitials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default DashboardNavbar
