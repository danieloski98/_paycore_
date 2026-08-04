"use client"

import { useState } from "react"
import { PaginationState } from "@tanstack/react-table"
import {
  BriefcaseBusinessIcon,
  PlusIcon,
  UsersIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useModal } from "@/hooks/use-modal"
import { DataTable } from "@/components/data-table/data-table"
import { useGetEmployees } from "@/hooks/use-employees"
import { employeeColumns } from "./employee-columns"
import { useGetDepartments } from "@/hooks/use-department"

function EmployeesPage() {
  const { openModal } = useModal()

  const { employees, isLoading: isEmployeesLoading } = useGetEmployees();
  const { departments, isLoading: isDepartmentsLoading } = useGetDepartments()

  const employeeStats = [
    {
      title: "Total Employees",
      value: employees.length ?? 0,
      description: `${employees.length} active`,
      icon: UsersIcon,
    },
    {
      title: "Departments",
      value: departments.length ?? 0,
      description: "HR, Finance, Engineering, Operations",
      icon: BriefcaseBusinessIcon,
    },
  ]

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
          {/* <Button variant="outline">
            <DownloadIcon data-icon="inline-start" />
            Export Directory
          </Button> */}
          <Button size="lg" onClick={() => openModal("new-employee")}>
            <PlusIcon data-icon="inline-start" />
            Add Employee
          </Button>
        </div>
      </section>

      {isEmployeesLoading || isDepartmentsLoading ? (
        <section className="grid gap-4 lg:grid-cols-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <Card key={i} className="shadow-sm">
              <CardHeader className="space-y-2">
                <CardAction>
                  <Skeleton className="size-5 rounded bg-muted/30" />
                </CardAction>
                <Skeleton className="h-3.5 w-28" />
                <Skeleton className="h-9 w-16" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-40" />
              </CardContent>
            </Card>
          ))}
        </section>
      ) : (
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
      )}

      <section className="grid gap-4">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Employees</CardTitle>
            {/* <CardDescription>
              Search and open employee profiles to manage payroll and leave data.
            </CardDescription> */}
          </CardHeader>
          <CardContent className="flex flex-col gap-4 px-0">
            <DataTable
              columns={employeeColumns}
              data={employees}
              isLoading={isEmployeesLoading}
              searchColumn={["firstName", "lastName", "email"]}
              searchPlaceholder="Search employees..."
              filters={[
                {
                  label: "Department",
                  column: "department",
                  options: [
                    { label: "Engineering", value: "Engineering" },
                    { label: "Finance", value: "Finance" },
                    { label: "Sales", value: "Sales" },
                    { label: "Operations", value: "Operations" },
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