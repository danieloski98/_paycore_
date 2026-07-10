
import {
  BellIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  EyeIcon,
  MoreVerticalIcon,
  Plus,
  PlusIcon,
  SearchIcon,
  TrendingUpIcon,
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
import { payrollData } from "@/components/data-table/sample-data/payroll-data"
import { payrollColumns } from "@/components/data-table/columns/payroll-column"
import { DataTable } from "@/components/data-table/data-table"

const summaryCards = [
  {
    title: "Total Payout (YTD)",
    value: "₦42,850,000.00",
    description: "+12% vs last year",
    accent: "text-green-600",
    icon: TrendingUpIcon,
  },
  {
    title: "Employees Paid",
    value: "124",
    description: "Across all active teams",
    avatars: ["AO", "IE", "KA", "+21"],
  },
  {
    title: "Next Remittance",
    value: "Oct 31",
    description: "4 days left",
    accent: "text-red-500",
    icon: BellIcon,
  },
]

const payrollRuns = [
  {
    month: "October 2024",
    meta: "Initiated Oct 24, 2024",
    payout: "₦8,450,200.00",
    employees: "124",
    status: "Paid",
    action: "download",
  },
  {
    month: "September 2024",
    meta: "Initiated Sep 26, 2024",
    payout: "₦7,920,000.00",
    employees: "122",
    status: "Processing",
    action: "menu",
  },
  {
    month: "August 2024 (Off-cycle)",
    meta: "Last edited 2 hours ago",
    payout: "₦1,200,000.00",
    employees: "12",
    status: "Draft",
    action: "continue",
  },
  {
    month: "August 2024",
    meta: "Initiated Aug 25, 2024",
    payout: "₦7,880,500.00",
    employees: "121",
    status: "Paid",
    action: "download",
  },
]


function PayrollPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
        <section className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight">Payroll Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage and track company-wide salary distributions.
          </p>
        </section>

        <section className="grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,0.7fr)_minmax(0,0.7fr)]">
          {summaryCards.map((item) => (
            <Card key={item.title} className="shadow-sm">
              <CardHeader>
                <CardAction>
                  {item.icon ? <item.icon className="text-muted-foreground" /> : null}
                </CardAction>
                <CardDescription>{item.title}</CardDescription>
                <CardTitle className="text-4xl font-semibold">{item.value}</CardTitle>
              </CardHeader>
              <CardContent>
                {item.avatars ? (
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {item.avatars.map((avatar) => (
                        <div
                          key={avatar}
                          className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-semibold text-muted-foreground"
                        >
                          {avatar}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className={`text-sm font-medium ${item.accent ?? "text-muted-foreground"}`}>
                    {item.description}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-4">
          <Card className="shadow-sm">
            <CardContent className="px-0">
              <DataTable
                data={payrollData}
                columns={payrollColumns}
                searchColumn="employee"
                searchPlaceholder="Search payroll..."
                yearFilter={{
                  column: "month",
                  startYear: 2020
                }}
                action={<Button>
                  <Plus /> Start New Payroll
                </Button>}
              />
            </CardContent>
          </Card>

        </section>
      </div>
    </div>
  )
}

export default PayrollPage
