"use client"

import React, { useState } from "react"
import { BellIcon, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname, useRouter } from "next/navigation"
import { employeeSidebarLinks, SidebarLinks } from "@/lib/constants"
import { cn, getActiveSidebarItem } from "@/lib/utils"
import { useAtomValue } from "jotai"
import { userTypeAtom } from "@/states/user-type-state"
import { authUserAtom, employeeAtom } from "@/states/auth-user-state"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  useGetNotifications,
  useGetUnreadNotificationsCount,
  useReadNotification,
  useDeleteNotification,
} from "@/hooks/use-notifications"
import { ViewMoreButton } from "@/components/shared/view-more-button"

function DashboardNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const userType = useAtomValue(userTypeAtom);
  const employee = useAtomValue(employeeAtom);
  const companyUser = useAtomValue(authUserAtom);

  const activeItem = getActiveSidebarItem(pathname, [...SidebarLinks, ...employeeSidebarLinks]);

  // Notifications logic
  const [limit, setLimit] = useState(10);
  const targetId = userType === "EMPLOYEE" ? employee?.id : companyUser?.companyId;
  const { notifications, isFetching } = useGetNotifications(targetId || "", userType === "EMPLOYEE" ? "EMPLOYEE" : "USER", limit);
  const { unreadCount } = useGetUnreadNotificationsCount(targetId || "", userType === "EMPLOYEE" ? "EMPLOYEE" : "USER");
  const { mutate: readNotification } = useReadNotification();
  const { mutate: deleteNotification } = useDeleteNotification();

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (target.scrollHeight - target.scrollTop <= target.clientHeight + 10) {
      if (notifications.length >= limit) {
        setLimit((prev) => prev + 10);
      }
    }
  };

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
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="relative h-11 w-11 rounded-full" aria-label="Notifications">
                <BellIcon size={24} className="size-6.5 text-muted-foreground" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white ring-2 ring-background">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-4">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="font-semibold text-sm">Notifications</span>
                {unreadCount > 0 && (
                  <Badge className="bg-rose-100 text-rose-700 border-0 text-[10px] font-bold px-1.5 py-0.5">
                    {unreadCount} Unread
                  </Badge>
                )}
              </div>
              <div 
                className="max-h-80 overflow-y-auto pt-2 pr-1 space-y-2"
                onScroll={handleScroll}
              >
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center py-8 text-muted-foreground">
                    <BellIcon className="size-8 stroke-1 mb-2 opacity-50" />
                    <p className="text-xs font-medium">No notifications yet</p>
                  </div>
                ) : (
                  <>
                    {notifications.map((item) => (
                      <div
                        key={item.id}
                        className={cn(
                          "relative group flex flex-col p-3 rounded-lg border text-xs cursor-pointer transition-all hover:bg-muted/30",
                          !item.isRead ? "bg-muted/15 border-rose-100/40" : "bg-background"
                        )}
                        onClick={() => {
                          if (!item.isRead) {
                            readNotification(item.id);
                          }
                        }}
                      >
                        <div className="flex items-start justify-between gap-2 pr-4">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              {!item.isRead && (
                                <span className="h-1.5 w-1.5 rounded-full bg-rose-600 shrink-0" />
                              )}
                              <span className="font-semibold text-foreground">{item.title}</span>
                            </div>
                            <p className="text-muted-foreground leading-normal mt-0.5">{item.message}</p>
                          </div>
                          <button
                            className="absolute right-2 top-2 p-1 text-muted-foreground hover:text-red-600 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(item.id);
                            }}
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                        <span className="text-[10px] text-muted-foreground mt-2 font-medium">
                          {new Date(item.createdAt).toLocaleDateString("en-NG", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    ))}
                    {notifications.length > 0 && (
                      <ViewMoreButton
                        onClick={() => setLimit((prev) => prev + 10)}
                        isLoading={isFetching}
                      />
                    )}
                  </>
                )}
              </div>
            </PopoverContent>
          </Popover>
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
