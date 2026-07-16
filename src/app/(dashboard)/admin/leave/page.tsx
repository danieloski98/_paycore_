import React from "react"
import {
  CalendarDaysIcon,
  CheckCircle2Icon,
  DownloadIcon,
  Grid2x2Icon,
  PlusIcon,
  SearchIcon,
  ShieldAlertIcon,
  XCircleIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DataTable } from "@/components/data-table/data-table"
import { leaveRequests } from "@/models/leave-model"
import { leaveColumns } from "./leave-columns"

const stats = [
  {
    title: "On Leave Today",
    value: "42",
    note: "+3 from yesterday",
    accent: "text-green-600",
    icon: Grid2x2Icon,
  },
  {
    title: "Pending Requests",
    value: "12",
    note: "High Priority",
    accent: "text-orange-500",
    icon: ShieldAlertIcon,
  },
  {
    title: "Upcoming Next Week",
    value: "8",
    note: "Scheduled employees",
    accent: "text-muted-foreground",
    icon: CalendarDaysIcon,
  },
]

const legend = ["Annual Leave", "Sick Leave", "Maternity / Paternity"]

function LeavePage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
      <section className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight">Leave Management</h1>
          <p className="text-sm text-muted-foreground">
            Oversee employee absences, approvals, and policy compliance.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <DownloadIcon data-icon="inline-start" />
            Export Report
          </Button>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[repeat(3,minmax(0,1fr))_280px]">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <stat.icon className="text-muted-foreground" />
                <span className={`text-sm font-medium ${stat.accent}`}>{stat.note}</span>
              </div>
              <CardDescription className="text-xs uppercase tracking-[0.18em]">
                {stat.title}
              </CardDescription>
              <CardTitle className="text-4xl font-semibold">{stat.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}

        <Card className="bg-primary text-primary-foreground shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Grid2x2Icon className="text-primary-foreground/80" />
              <Badge variant="secondary">Holiday</Badge>
            </div>
            <CardDescription className="text-primary-foreground/70">
              Public Holidays
            </CardDescription>
            <CardTitle className="text-3xl">National Day</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl">Oct 1st, 2024</p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4">
        <div className="grid gap-4">
          <Card className="shadow-sm">
            <CardContent className="px-0">
              <DataTable
                columns={leaveColumns}
                data={leaveRequests}
                // isLoading={isLoading}
                searchColumn={[
                  "Status", "type", "totalDays"
                ]}
                searchPlaceholder="Search employees..."
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
