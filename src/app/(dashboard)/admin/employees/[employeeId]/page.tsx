"use client"

import React, { useState } from "react"
import { useParams, usePathname, useRouter } from "next/navigation"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useDeleteEmployee, useGetEmployeeById } from "@/hooks/use-employees"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useModal } from "@/hooks/use-modal"
import { format } from "date-fns"
import { delete_employee } from "@/services/employees/employee-services"
import { toast } from "sonner"



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
  const { openModal } = useModal()
  const pathname = usePathname()
  const params = useParams<{ employeeId: string }>()
  const router = useRouter()

  const isEmployeePage =
    pathname.startsWith(`/admin/employee/${params.employeeId}`);

  const { mutate: deleteEmployee, isPending } = useDeleteEmployee();
  const { employee, isLoading } = useGetEmployeeById(params.employeeId);
  console.log(employee)

  const deactivateEmployee = () => {
    if (!employee?.id) return;

    deleteEmployee(employee.id, {
      onSuccess: () => {
        toast.success("Employee deleted");

        if (isEmployeePage) {
          router.replace("/admin/employees");
        }
      },

      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ??
          "Unable to delete employee"
        );
      },
    });
  };

  return (
    <div className="p-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Employee Card */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-6">
                <div className="relative">
                  <Avatar className="size-24">
                    <AvatarImage src={employee?.picture} />
                    <AvatarFallback className="font-semibold text-2xl">
                      {employee?.firstName[0]}
                      {employee?.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold">{employee?.firstName} {employee?.lastName}</h2>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">ACTIVE</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">{employee?.position} • {employee?.department}</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{employee?.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{employee?.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-lg">QUICK ACTIONS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="default" className="w-full justify-start" size="sm" onClick={() => openModal("edit-employee", employee)}>
              {/* open edit employee modal here */}
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
            {/* <Button variant="outline" className="w-full justify-start" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Generate Paystub
            </Button> */}
            <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive" size="sm" onClick={deactivateEmployee}>
              <Trash2 className="h-4 w-4 mr-2" />
              Deactivate Employee
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <Card className="mt-6">
          <CardHeader className="pb-0">
            <TabsList variant={"line"} className="bg-transparent flex justify-start w-full border-b border-border rounded-none p-0 h-auto">
              <div className="w-2/3 flex">
                <TabsTrigger value="personal" className="border-b-2 border-transparent">Personal Info</TabsTrigger>
                <TabsTrigger value="job" className="border-b-2 border-transparent">Job Details</TabsTrigger>
                {/* <TabsTrigger value="payroll" className="border-b-2 border-transparent">Payroll</TabsTrigger> */}
                <TabsTrigger value="leave" className="border-b-2 border-transparent">Leave History</TabsTrigger>
                <TabsTrigger value="documents" className="border-b-2 border-transparent">Documents</TabsTrigger>
              </div>
            </TabsList>
          </CardHeader>

          <CardContent className="pt-6">
            <TabsContent value="personal">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase">Full Legal Name</label>
                    <p className="text-sm font-medium mt-1">{employee?.firstName} {employee?.lastName}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase">Phone Number</label>
                    <p className="text-sm font-medium mt-1">{employee?.phone}</p>
                  </div>
                  {/* <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase">Gender</label>
                    <p className="text-sm font-medium mt-1">Female</p>
                  </div> */}
                  {/* <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase">Home Address</label>
                    <p className="text-sm font-medium mt-1">42 Bourdillon Rd, Ikoyi, Lagos, Nigeria</p>
                  </div> */}
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase">Email Address</label>
                    <p className="text-sm font-medium mt-1">{employee?.email}</p>
                  </div>
                  {/* <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase">Date of Birth</label>
                    <p className="text-sm font-medium mt-1">14th May 1994</p>
                  </div> */}
                  {/* <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase">Nationality</label>
                    <p className="text-sm font-medium mt-1">Nigerian</p>
                  </div> */}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="job">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase">Department</label>
                    <p className="text-sm font-medium mt-1">{employee?.department}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase">Date Joined</label>
                    <p className="text-sm font-medium mt-1">{employee?.startDate ? format(new Date(employee.startDate), "PPP") : "N/A"}</p>
                  </div>
                  {/* <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase">Work Mode</label>
                    <p className="text-sm font-medium mt-1">Remote</p>
                  </div> */}
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase">Employment Type</label>
                    <p className="text-sm font-medium mt-1">Full-time</p>
                  </div>
                  {/* <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase">Manager</label>
                    <p className="text-sm font-medium mt-1">Chidi Okafor</p>
                  </div> */}
                  {/* <div className="pt-2">
                    <label className="text-xs font-semibold text-muted-foreground uppercase">Probation Status</label>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-medium">Completed on April 10, 2022</span>
                      <div className="h-5 w-5 rounded-full bg-green-500"></div>
                    </div>
                  </div> */}
                </div>
              </div>
            </TabsContent>
            {/* <TabsContent value="payrol">
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
            </TabsContent> */}
            <TabsContent value="leave" className="leave">
              <div className="text-center py-8">
                <p className="text-muted-foreground">Leave history will be displayed here</p>
              </div>
            </TabsContent>
          </CardContent>

        </Card>
      </Tabs>

      {/* Recent Payroll Activity */}
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Change to paysip history TODO</CardTitle>
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
    </div >
  )
}

export default EmployeeDetailsPage
