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
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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

const leaveRequests = [
  {
    employee: "Amina Jibril",
    role: "UX Designer",
    leaveType: "Annual Leave",
    duration: "Aug 12 - Aug 16",
    year: "2024",
    totalDays: "5",
  },
  {
    employee: "Emeka Okafor",
    role: "Backend Engineer",
    leaveType: "Sick Leave",
    duration: "Aug 05 - Aug 06",
    year: "2024",
    totalDays: "2",
  },
  {
    employee: "Tunde Balogun",
    role: "HR Specialist",
    leaveType: "Maternity",
    duration: "Sep 01 - Nov 30",
    year: "2024",
    totalDays: "90",
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
          <Button>
            <PlusIcon data-icon="inline-start" />
            Request Leave
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

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_220px]">
        <div className="grid gap-4">
          <div className="relative w-full max-w-lg">
            <SearchIcon
              size={16}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
            />
            <Input placeholder="Search employees or leave records..." className="pl-9" />
          </div>

          <Card className="shadow-sm">
            <CardHeader className="border-b">
              <div className="flex flex-wrap items-center gap-6">
                <Button variant="ghost" className="rounded-none border-b-2 border-primary px-0 pb-3 font-semibold">
                  Pending Requests
                </Button>
                <Button variant="ghost" className="rounded-none px-0 pb-3 text-muted-foreground">
                  Leave History
                </Button>
                <Button variant="ghost" className="rounded-none px-0 pb-3 text-muted-foreground">
                  Leave Policy
                </Button>
              </div>
            </CardHeader>

            <CardContent className="px-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-4">Employee</TableHead>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Total Days</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="pr-4 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveRequests.map((request) => (
                    <TableRow key={request.employee}>
                      <TableCell className="px-4">
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground">
                            {request.employee
                              .split(" ")
                              .map((part) => part[0])
                              .join("")}
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="font-semibold">{request.employee}</span>
                            <span className="text-sm text-muted-foreground">{request.role}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{request.leaveType}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <span>{request.duration}</span>
                          <span className="text-sm text-muted-foreground">{request.year}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">{request.totalDays}</TableCell>
                      <TableCell>
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                          Pending Approval
                        </Badge>
                      </TableCell>
                      <TableCell className="pr-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon-sm" aria-label={`Approve ${request.employee}`}>
                            <CheckCircle2Icon className="text-green-600" />
                          </Button>
                          <Button variant="ghost" size="icon-sm" aria-label={`Reject ${request.employee}`}>
                            <XCircleIcon className="text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>

            <div className="flex flex-col gap-3 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Showing 3 of 12 pending requests
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon-sm" aria-label="Previous page">
                  〈
                </Button>
                <Button variant="outline" size="icon-sm" aria-label="Next page">
                  〉
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid gap-4">
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
        </div>
      </section>
    </div>
  )
}

export default LeavePage
