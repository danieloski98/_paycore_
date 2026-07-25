'use client'

import { Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/data-table/data-table'
import { payslipColumns } from '@/components/data-table/columns/payslip-colums'
// import { payslipData } from '@/components/data-table/sample-data/payslip-data'
import { useGetEmployeeById } from '@/hooks/use-employees'
import { useAtom } from 'jotai'
import { employeeAtom } from '@/states/auth-user-state'
import { useModal } from '@/hooks/use-modal'
import { payslipData } from '@/components/data-table/sample-data/payslip-data'

export default function OverviewPage() {
  const [user] = useAtom(employeeAtom)
  const { openModal } = useModal()
  const { employee } = useGetEmployeeById(user?.id!)

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="p-6">
        {/* Welcome Banner */}
        <div className="mb-6 rounded-lg bg-foreground text-background px-8 py-16">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {employee?.lastName} {employee?.firstName}</h2>
          <p className="text-sm text-background/80">
            Your payroll for October 2024 is currently being processed by HR. You&apos;ll receive a notification once it&apos;s disbursed.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <Card className='col-span-2'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">TOTAL PAYMENTS RECEIVED (YTD)</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">₦8,450,000.00</span>
                  <span className="text-sm font-medium text-green-600">+12.5%</span>
                </div>
                <Separator />
                <div className="text-xs text-muted-foreground">
                  Base Salary <span className="float-right">₦{(employee?.salary)?.toLocaleString()} / mo</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Payment Date</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div>
                <p className="text-3xl font-bold">Oct 28, 2024</p>
                <p className="text-xs text-muted-foreground mt-2">In 6 days</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bank Account & Payment History */}
        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <Card className="md:col-span-2">
            <CardContent className='px-0'>
              {/* <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Payment ID</TableHead>
                    <TableHead className="text-xs">Date</TableHead>
                    <TableHead className="text-xs">Description</TableHead>
                    <TableHead className="text-xs text-right">Amount</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="text-sm">{payment.id}</TableCell>
                      <TableCell className="text-sm">{payment.date}</TableCell>
                      <TableCell className="text-sm">{payment.description}</TableCell>
                      <TableCell className="text-sm text-right font-medium">{payment.amount}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 capitalize">
                          {payment.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table> */}
              <CardHeader className='text-xl font-semibold mb-4'>Recent payment history</CardHeader>
              <DataTable
                columns={payslipColumns}
                data={payslipData}
                searchColumn={[

                ]}
                searchPlaceholder=""
                filters={[
                  {
                    label: "Status",
                    column: "status",
                    options: [
                      { label: "Successful", value: "SUCCESSFULL" },
                      { label: "Pending", value: "PENDING" },
                      { label: "Processing", value: "PROCESSING" },
                      { label: "Failed", value: "FAILED" },
                    ],
                  },
                ]}
              />
            </CardContent>
          </Card>

          <Card className='h-fit'>
            <CardHeader>
              <CardTitle className="text-base">Bank Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                  <span className="text-sm font-bold">AB</span>
                </div>
                <div>
                  <p className="font-medium">Access Bank PLC</p>
                  <p className="text-sm text-muted-foreground">Savings Account</p>
                </div>
              </div>
              <div className="bg-muted rounded p-3">
                <p className="text-xs text-muted-foreground font-medium mb-1">ACCOUNT NUMBER</p>
                <p className="font-mono text-sm">012 •••• 992</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-green-600 font-medium">
                <div className="h-2 w-2 rounded-full bg-green-600"></div>
                Verified for Payroll
              </div>
              <Button variant="outline" size="sm" className="w-full" onClick={() => openModal("add-bank")}>Edit</Button>
            </CardContent>
          </Card>

        </div>

        {/* Support Cards */}
        {/* <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-base">Tax Compliance</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                All statutory remittances (PAYE, NHF, Pension) for 2024 are up to date.
              </p>
              <Button variant="ghost" size="sm" className="text-primary">
                View Details →
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-base">Payroll Support</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Need to report an issue or change bank details? Chat with HR.
              </p>
              <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90">
                Message HR
              </Button>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </div>
  )
}
