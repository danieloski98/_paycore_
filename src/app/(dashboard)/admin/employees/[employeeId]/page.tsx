"use client"

import React from "react"
import { useParams } from "next/navigation"
import {
  BadgeCheckIcon,
  BriefcaseBusinessIcon,
  CalendarDaysIcon,
  CreditCardIcon,
  MailIcon,
  PhoneIcon,
  ShieldCheckIcon,
  UserIcon,
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

const employeeDirectory = {
  "adesola-oni": {
    name: "Adesola Oni",
    role: "HR Manager",
    department: "Human Resources",
    email: "adesola.oni@techcorp.ng",
    phone: "+234 801 555 0102",
    status: "Active",
  },
  "ifeanyi-eze": {
    name: "Ifeanyi Eze",
    role: "Finance Lead",
    department: "Finance",
    email: "i.eze@techcorp.ng",
    phone: "+234 803 555 0104",
    status: "Active",
  },
  "amina-jibril": {
    name: "Amina Jibril",
    role: "UX Designer",
    department: "Product Design",
    email: "amina.j@techcorp.ng",
    phone: "+234 809 555 0107",
    status: "On Leave",
  },
  "tunde-balogun": {
    name: "Tunde Balogun",
    role: "HR Specialist",
    department: "Human Resources",
    email: "tunde.b@techcorp.ng",
    phone: "+234 810 555 0109",
    status: "Pending",
  },
} as const

function toTitleCase(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function EmployeeDetailsPage() {
  const params = useParams<{ employeeId: string }>()
  const employeeId = params.employeeId
  const employee =
    employeeDirectory[employeeId as keyof typeof employeeDirectory] ??
    {
      name: toTitleCase(employeeId),
      role: "Employee",
      department: "Operations",
      email: `${employeeId}@techcorp.ng`,
      phone: "+234 800 000 0000",
      status: "Active",
    }

  const summaryCards = [
    {
      title: "Employment Status",
      value: employee.status,
      description: "Eligible for payroll processing",
      icon: BadgeCheckIcon,
    },
    {
      title: "Department",
      value: employee.department,
      description: employee.role,
      icon: BriefcaseBusinessIcon,
    },
    {
      title: "Leave Balance",
      value: "18 Days",
      description: "Annual leave remaining",
      icon: CalendarDaysIcon,
    },
    {
      title: "Payroll Setup",
      value: "Complete",
      description: "Bank and tax profile verified",
      icon: CreditCardIcon,
    },
  ]

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
      <section className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-muted text-xl font-semibold text-muted-foreground">
            {employee.name
              .split(" ")
              .map((part) => part[0])
              .join("")}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-semibold tracking-tight">{employee.name}</h1>
              <Badge
                variant="outline"
                className={
                  employee.status === "Active"
                    ? "border-0 bg-green-100 text-green-700"
                    : employee.status === "On Leave"
                      ? "border-0 bg-amber-100 text-amber-800"
                      : "border-0 bg-muted text-muted-foreground"
                }
              >
                {employee.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {employee.role} · {employee.department}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline">Edit Profile</Button>
          <Button>Run Payroll Check</Button>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-4">
        {summaryCards.map((card) => (
          <Card key={card.title} className="shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2 text-muted-foreground">
                <card.icon />
                <CardDescription>{card.title}</CardDescription>
              </div>
              <CardTitle className="text-2xl font-semibold">{card.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Employee Overview</CardTitle>
            <CardDescription>
              Personal, compliance, and payroll information for this employee.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border p-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <UserIcon className="text-muted-foreground" />
                Identity
              </div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <p>Name: {employee.name}</p>
                <p>Role: {employee.role}</p>
                <p>Department: {employee.department}</p>
              </div>
            </div>
            <div className="rounded-xl border p-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <ShieldCheckIcon className="text-muted-foreground" />
                Compliance
              </div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <p>KYC: Verified</p>
                <p>Tax ID: Submitted</p>
                <p>Pension Setup: Active</p>
              </div>
            </div>
            <div className="rounded-xl border p-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <CreditCardIcon className="text-muted-foreground" />
                Payroll
              </div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <p>Salary Band: Grade 6</p>
                <p>Last Payout: ₦680,000.00</p>
                <p>Bank Account: Verified</p>
              </div>
            </div>
            <div className="rounded-xl border p-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <CalendarDaysIcon className="text-muted-foreground" />
                Leave
              </div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <p>Annual Leave Used: 12 days</p>
                <p>Pending Requests: 1</p>
                <p>Manager Approval: Required</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Contact Details</CardTitle>
            <CardDescription>Primary information used for employee communication.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="rounded-xl bg-muted/50 p-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <MailIcon className="text-muted-foreground" />
                Email
              </div>
              <p className="mt-2 text-sm">{employee.email}</p>
            </div>
            <div className="rounded-xl bg-muted/50 p-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <PhoneIcon className="text-muted-foreground" />
                Phone
              </div>
              <p className="mt-2 text-sm">{employee.phone}</p>
            </div>
            <Button variant="outline">Send Message</Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export default EmployeeDetailsPage
