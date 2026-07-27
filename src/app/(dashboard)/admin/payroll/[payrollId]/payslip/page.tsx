'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/data-table/data-table'
import { Card } from '@/components/ui/card'
import { useGetPayslipByPayrollId } from '@/hooks/use-payslip'
import { useParams } from 'next/navigation'
import { payslipColumns } from '@/components/admin/payslip/column/payslip-columns'
import { cn, getPayslipStatusStyle } from '@/lib/utils'


export default function PayslipPage() {
  const params = useParams<{ payrollId: string }>()

  const { payslip, isLoading } = useGetPayslipByPayrollId(params.payrollId)
  const payslipData = payslip ?? []


  if (!payslipData) return

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-8">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Earnings
          </Button>
        </div>

        <Card>
          <DataTable
            columns={payslipColumns}
            data={payslipData}
            isLoading={isLoading}
            // searchColumn={["Employee", "netSalary"]}
          />
        </Card>
      </div>
    </div>
  )
}
