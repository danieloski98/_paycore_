"use client"

import {
  CalendarCheck,
  CalendarX,
  Clock,
  ClipboardList,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { DataTable } from "@/components/data-table/data-table"
import { leaveColumns } from "./leave-columns"
import { useGetCompanyLeaves } from "@/hooks/use-leave"
import { cn, getLeaveStatusStyle } from "@/lib/utils"

import { useAuthUser } from "@/hooks/use-auth-user"
import { useGetCompanyLeaveAnalytics } from "@/hooks/use-analytics"

function LeavePage() {
  const { leaves, isLoading } = useGetCompanyLeaves()
  const user = useAuthUser();
  const companyId = user?.companyId || "";
  const { analytics, isLoading: isLeaveAnalyticsLoading } = useGetCompanyLeaveAnalytics(companyId);

  const stats = [
    {
      title: "On Leave Today (Approved)",
      value: String(analytics?.approvedLeaveRequests ?? 0),
      note: "Approved requests",
      accent: "text-green-600",
      icon: CalendarCheck,
      status: "ACCEPTED",
    },
    {
      title: "Pending Requests",
      value: String(analytics?.pendingLeaveRequests ?? 0),
      note: (analytics?.pendingLeaveRequests ?? 0) > 0 ? "Needs Review" : "No pending requests",
      accent: "text-orange-500",
      icon: Clock,
      status: "PENDING",
    },
    {
      title: "Total Leave Requests",
      value: String(analytics?.totalLeaveRequests ?? 0),
      note: "All requests submitted",
      accent: "text-muted-foreground",
      icon: ClipboardList,
      status: null,
    },
    {
      title: "Total Rejected Requests",
      value: String(analytics?.rejectedLeaveRequests ?? 0),
      note: "Rejected requests",
      accent: "text-red-500",
      icon: CalendarX,
      status: "REJECTED",
    },
  ];

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
      <section className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight">Leave Management</h1>
          <p className="text-sm text-muted-foreground">
            Oversee employee absences, approvals, and policy compliance.
          </p>
        </div>
      </section>

      {isLeaveAnalyticsLoading ? (
        <section className="grid gap-4 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="shadow-sm">
              <CardHeader className="space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="size-5 rounded bg-muted/30" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-10 w-16" />
              </CardHeader>
            </Card>
          ))}
        </section>
      ) : (
        <section className="grid gap-4 xl:grid-cols-4">
          {stats.map((stat) => {
            const statusStyle = stat.status ? getLeaveStatusStyle(stat.status) : null;
            return (
              <Card key={stat.title} className="shadow-sm">
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div className="space-y-1">
                    <CardDescription className="text-xs uppercase tracking-[0.18em]">
                      {stat.title}
                    </CardDescription>
                    <CardTitle className="text-4xl font-semibold">{stat.value}</CardTitle>
                    <p className={`text-xs ${stat.accent}`}>{stat.note}</p>
                  </div>
                  <div className={cn(
                    "h-10 w-10 rounded flex items-center justify-center border",
                    statusStyle?.className || "bg-muted text-muted-foreground border-transparent"
                  )}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </CardHeader>
              </Card>
            )
          })}
        </section>
      )}

      <section className="grid gap-4">
        <div className="grid gap-4">
          <Card className="shadow-sm">
            <CardContent className="px-0">
              <DataTable
                columns={leaveColumns}
                data={leaves}
                isLoading={isLoading}
                searchColumn={[
                  "Status", "type", "totalDays", "Employee"
                ]}
                searchPlaceholder="Search leaves..."
                filters={[
                  {
                    label: "Leave Type",
                    column: "type",
                    options: [
                      {
                        label: "Vacation",
                        value: "VACATION",
                      },
                      {
                        label: "Sick",
                        value: "SICK",
                      },
                      {
                        label: "Personal",
                        value: "PERSONAL",
                      },
                      {
                        label: "Maternity",
                        value: "MATERNITY",
                      },
                      {
                        label: "Paternity",
                        value: "PATERNITY",
                      },
                      {
                        label: "Bereavement",
                        value: "BEREAVEMENT",
                      },
                      {
                        label: "Other",
                        value: "OTHER",
                      },
                    ],
                  },
                  {
                    label: "Status",
                    column: "Status",
                    options: [
                      {
                        label: "Pending",
                        value: "PENDING",
                      },
                      {
                        label: "Approved",
                        value: "APPROVED",
                      },
                      {
                        label: "Rejected",
                        value: "REJECTED",
                      },
                      {
                        label: "Cancelled",
                        value: "CANCELLED",
                      },
                    ],
                  },
                ]}
              />
            </CardContent>
          </Card>
        </div>

        {/* <div className="grid gap-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Who&apos;s Out</CardTitle>
              <CardDescription>August 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="rounded-xl bg-muted/50 p-4">
                <div className="grid grid-cols-7 gap-2 text-center text-xs text-muted-foreground">
                  {["M", "T", "W", "T", "F", "S", "S"].map((day) => (
                    <span key={day}>{day}</span>
                  ))}
                  {Array.from({ length: 14 }).map((_, index) => (
                    <span
                      key={index}
                      className={
                        index === 9
                          ? "rounded-full bg-primary text-primary-foreground"
                          : ""
                      }
                    >
                      {index + 1}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  Absence Type Legend
                </p>
                {legend.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <span className="size-2 rounded-full bg-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Quick Insights</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm">
              <div className="rounded-xl bg-muted/50 p-4">
                <p className="font-semibold">Policy Alert</p>
                <p className="mt-1 text-muted-foreground">
                  3 employees exceed annual leave threshold this quarter.
                </p>
              </div>
            </CardContent>
          </Card>
        </div> */}
      </section>
    </div>
  )
}

export default LeavePage
