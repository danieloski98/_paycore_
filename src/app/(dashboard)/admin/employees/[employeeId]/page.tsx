"use client"

import React, { useState } from "react"
import { useParams } from "next/navigation"
import {
  BadgeCheckIcon,
  BriefcaseBusinessIcon,
  CalendarDaysIcon,
  CreditCardIcon,
  Download,
  Edit2,
  Mail,
  MailIcon,
  MapPin,
  Phone,
  PhoneIcon,
  ShieldCheckIcon,
  Trash2,
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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"



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
  const [activeTab, setActiveTab] = useState('personal')

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
    // <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
    //   <section className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
    //     <div className="flex items-start gap-4">
    //       <div className="flex size-16 items-center justify-center rounded-2xl bg-muted text-xl font-semibold text-muted-foreground">
    //         {employee.name
    //           .split(" ")
    //           .map((part) => part[0])
    //           .join("")}
    //       </div>
    //       <div className="flex flex-col gap-2">
    //         <div className="flex flex-wrap items-center gap-2">
    //           <h1 className="text-3xl font-semibold tracking-tight">{employee.name}</h1>
    //           <Badge
    //             variant="outline"
    //             className={
    //               employee.status === "Active"
    //                 ? "border-0 bg-green-100 text-green-700"
    //                 : employee.status === "On Leave"
    //                   ? "border-0 bg-amber-100 text-amber-800"
    //                   : "border-0 bg-muted text-muted-foreground"
    //             }
    //           >
    //             {employee.status}
    //           </Badge>
    //         </div>
    //         <p className="text-sm text-muted-foreground">
    //           {employee.role} · {employee.department}
    //         </p>
    //       </div>
    //     </div>

    //     <div className="flex flex-wrap gap-2">
    //       <Button variant="outline">Edit Profile</Button>
    //       <Button>Run Payroll Check</Button>
    //     </div>
    //   </section>

    //   <section className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-4">
    //     {summaryCards.map((card) => (
    //       <Card key={card.title} className="shadow-sm">
    //         <CardHeader>
    //           <div className="flex items-center gap-2 text-muted-foreground">
    //             <card.icon />
    //             <CardDescription>{card.title}</CardDescription>
    //           </div>
    //           <CardTitle className="text-2xl font-semibold">{card.value}</CardTitle>
    //         </CardHeader>
    //         <CardContent>
    //           <p className="text-sm text-muted-foreground">{card.description}</p>
    //         </CardContent>
    //       </Card>
    //     ))}
    //   </section>

    //   <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
    //     <Card className="shadow-sm">
    //       <CardHeader>
    //         <CardTitle>Employee Overview</CardTitle>
    //         <CardDescription>
    //           Personal, compliance, and payroll information for this employee.
    //         </CardDescription>
    //       </CardHeader>
    //       <CardContent className="grid gap-4 md:grid-cols-2">
    //         <div className="rounded-xl border p-4">
    //           <div className="flex items-center gap-2 text-sm font-medium">
    //             <UserIcon className="text-muted-foreground" />
    //             Identity
    //           </div>
    //           <div className="mt-3 flex flex-col gap-2 text-sm">
    //             <p>Name: {employee.name}</p>
    //             <p>Role: {employee.role}</p>
    //             <p>Department: {employee.department}</p>
    //           </div>
    //         </div>
    //         <div className="rounded-xl border p-4">
    //           <div className="flex items-center gap-2 text-sm font-medium">
    //             <ShieldCheckIcon className="text-muted-foreground" />
    //             Compliance
    //           </div>
    //           <div className="mt-3 flex flex-col gap-2 text-sm">
    //             <p>KYC: Verified</p>
    //             <p>Tax ID: Submitted</p>
    //             <p>Pension Setup: Active</p>
    //           </div>
    //         </div>
    //         <div className="rounded-xl border p-4">
    //           <div className="flex items-center gap-2 text-sm font-medium">
    //             <CreditCardIcon className="text-muted-foreground" />
    //             Payroll
    //           </div>
    //           <div className="mt-3 flex flex-col gap-2 text-sm">
    //             <p>Salary Band: Grade 6</p>
    //             <p>Last Payout: ₦680,000.00</p>
    //             <p>Bank Account: Verified</p>
    //           </div>
    //         </div>
    //         <div className="rounded-xl border p-4">
    //           <div className="flex items-center gap-2 text-sm font-medium">
    //             <CalendarDaysIcon className="text-muted-foreground" />
    //             Leave
    //           </div>
    //           <div className="mt-3 flex flex-col gap-2 text-sm">
    //             <p>Annual Leave Used: 12 days</p>
    //             <p>Pending Requests: 1</p>
    //             <p>Manager Approval: Required</p>
    //           </div>
    //         </div>
    //       </CardContent>
    //     </Card>

    //     <Card className="shadow-sm">
    //       <CardHeader>
    //         <CardTitle>Contact Details</CardTitle>
    //         <CardDescription>Primary information used for employee communication.</CardDescription>
    //       </CardHeader>
    //       <CardContent className="flex flex-col gap-4">
    //         <div className="rounded-xl bg-muted/50 p-4">
    //           <div className="flex items-center gap-2 text-sm font-medium">
    //             <MailIcon className="text-muted-foreground" />
    //             Email
    //           </div>
    //           <p className="mt-2 text-sm">{employee.email}</p>
    //         </div>
    //         <div className="rounded-xl bg-muted/50 p-4">
    //           <div className="flex items-center gap-2 text-sm font-medium">
    //             <PhoneIcon className="text-muted-foreground" />
    //             Phone
    //           </div>
    //           <p className="mt-2 text-sm">{employee.phone}</p>
    //         </div>
    //         <Button variant="outline">Send Message</Button>
    //       </CardContent>
    //     </Card>
    //   </section>
    // </div>
    <div className="p-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Employee Card */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-6">
                <div className="relative">
                  <div className="h-24 w-24 rounded-lg bg-gradient-to-br from-slate-400 to-slate-500"></div>
                  <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-green-500 border-2 border-white"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-bold">Amina Jibril</h2>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">ACTIVE</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">Lead Backend Developer • Engineering</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>amina.j@paystream.ng</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>+234 812 345 6789</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>Lagos, Nigeria</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">QUICK ACTIONS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="default" className="w-full justify-start" size="sm">
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Generate Paystub
            </Button>
            <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              Deactivate Employee
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Card className="mt-6">
        <CardHeader className="pb-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-transparent border-b border-border rounded-none p-0 h-auto">
              <TabsTrigger value="personal" className="border-b-2 border-transparent data-[state=active]:border-primary rounded-none">Personal Info</TabsTrigger>
              <TabsTrigger value="job" className="border-b-2 border-transparent data-[state=active]:border-primary rounded-none">Job Details</TabsTrigger>
              <TabsTrigger value="payroll" className="border-b-2 border-transparent data-[state=active]:border-primary rounded-none">Payroll</TabsTrigger>
              <TabsTrigger value="leave" className="border-b-2 border-transparent data-[state=active]:border-primary rounded-none">Leave History</TabsTrigger>
              <TabsTrigger value="documents" className="border-b-2 border-transparent data-[state=active]:border-primary rounded-none">Documents</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>

        <CardContent className="pt-6">
          {activeTab === 'personal' && (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Full Legal Name</label>
                  <p className="text-sm font-medium mt-1">Amina Jibril</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Phone Number</label>
                  <p className="text-sm font-medium mt-1">+234 812 345 6789</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Gender</label>
                  <p className="text-sm font-medium mt-1">Female</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Home Address</label>
                  <p className="text-sm font-medium mt-1">42 Bourdillon Rd, Ikoyi, Lagos, Nigeria</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Email Address</label>
                  <p className="text-sm font-medium mt-1">amina.j@paystream.ng</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Date of Birth</label>
                  <p className="text-sm font-medium mt-1">14th May 1994</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Nationality</label>
                  <p className="text-sm font-medium mt-1">Nigerian</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'job' && (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Department</label>
                  <p className="text-sm font-medium mt-1">Engineering</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Date Joined</label>
                  <p className="text-sm font-medium mt-1">January 10, 2022</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Work Mode</label>
                  <p className="text-sm font-medium mt-1">Remote</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Employment Type</label>
                  <p className="text-sm font-medium mt-1">Full-time</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Manager</label>
                  <p className="text-sm font-medium mt-1">Chidi Okafor</p>
                </div>
                <div className="pt-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Probation Status</label>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-medium">Completed on April 10, 2022</span>
                    <div className="h-5 w-5 rounded-full bg-green-500"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payroll' && (
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pay Period</TableHead>
                    <TableHead>Net Salary</TableHead>
                    <TableHead>Tax (PAYE)</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">June 2024</TableCell>
                    <TableCell>₦850,000</TableCell>
                    <TableCell>₦42,500</TableCell>
                    <TableCell><Badge variant="outline">Paid</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">May 2024</TableCell>
                    <TableCell>₦850,000</TableCell>
                    <TableCell>₦42,500</TableCell>
                    <TableCell><Badge variant="outline">Paid</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">April 2024</TableCell>
                    <TableCell>₦850,000</TableCell>
                    <TableCell>₦42,500</TableCell>
                    <TableCell><Badge variant="outline">Paid</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}

          {activeTab === 'leave' && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Leave history will be displayed here</p>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Documents will be displayed here</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Payroll Activity */}
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Recent Payroll Activity</CardTitle>
            <CardDescription>Latest payment transactions</CardDescription>
          </div>
          <Button variant="link" size="sm">View History</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pay Period</TableHead>
                <TableHead>Net Salary</TableHead>
                <TableHead>Tax (PAYE)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">June 2024</TableCell>
                <TableCell>₦850,000</TableCell>
                <TableCell>₦42,500</TableCell>
                <TableCell><Badge variant="outline" className="bg-green-50">Paid</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">May 2024</TableCell>
                <TableCell>₦850,000</TableCell>
                <TableCell>₦42,500</TableCell>
                <TableCell><Badge variant="outline" className="bg-green-50">Paid</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">April 2024</TableCell>
                <TableCell>₦850,000</TableCell>
                <TableCell>₦42,500</TableCell>
                <TableCell><Badge variant="outline" className="bg-green-50">Paid</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default EmployeeDetailsPage
