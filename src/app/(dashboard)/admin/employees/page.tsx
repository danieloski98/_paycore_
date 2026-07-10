"use client"

import Link from "next/link"
import React from "react"
import {
  BriefcaseBusinessIcon,
  DownloadIcon,
  FilterIcon,
  MailIcon,
  PlusIcon,
  SearchIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
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
import { useModal } from "@/hooks/useModal"
import { DataTable } from "@/components/data-table/data-table"
import { employeeColumns } from "@/components/data-table/columns/employee-columns"
import { employees } from "@/components/data-table/sample-data/employee-data"

const employeeStats = [
  {
    title: "Total Employees",
    value: "124",
    description: "112 active, 12 pending onboarding",
    icon: UsersIcon,
  },
  {
    title: "Departments",
    value: "08",
    description: "HR, Finance, Engineering, Operations",
    icon: BriefcaseBusinessIcon,
  },
  {
    title: "Compliance Coverage",
    value: "98%",
    description: "KYC and payroll profile completion",
    icon: ShieldCheckIcon,
  },
]


function EmployeesPage() {
  const { openModal } = useModal()
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
      <section className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight">Employees</h1>
          <p className="text-sm text-muted-foreground">
            View employee records, onboarding state, and payroll readiness.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <DownloadIcon data-icon="inline-start" />
            Export Directory
          </Button>
          <Button onClick={() => openModal("new-employee")}>
            <PlusIcon data-icon="inline-start" />
            Add Employee
          </Button>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {employeeStats.map((stat) => (
          <Card key={stat.title} className="shadow-sm">
            <CardHeader>
              <CardAction>
                <stat.icon className="text-muted-foreground" />
              </CardAction>
              <CardDescription className="text-xs uppercase tracking-[0.18em]">
                {stat.title}
              </CardDescription>
              <CardTitle className="text-4xl font-semibold">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Employee Directory</CardTitle>
            <CardDescription>
              Search and open employee profiles to manage payroll and leave data.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 px-0">
            <DataTable
              data={employees}                     // ensure this array has status and department
              columns={employeeColumns}            // no cast
              searchColumn="name"
              searchPlaceholder="Search employees..."
              filters={[
                {
                  label: "Department",
                  column: "department",
                  options: [
                    { label: "Engineering", value: "Engineering" },
                    { label: "Finance", value: "Finance" },
                    { label: "Sales", value: "Sales" },      // match your actual data
                    { label: "Operations", value: "Operations" },
                  ],
                },
                {
                  label: "Status",
                  column: "status",
                  options: [
                    { label: "Active", value: "Active" },
                    { label: "Inactive", value: "Inactive" },
                    { label: "On Leave", value: "On Leave" },
                  ],
                },
              ]}
            />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export default EmployeesPage
