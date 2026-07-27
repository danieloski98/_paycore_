'use client'

import { useState } from 'react'
import { Calendar, Clock, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/data-table/data-table'
import { leaveColumns } from './leave-column'
import { useModal } from '@/hooks/use-modal'
import { useAtom } from 'jotai'
import { employeeAtom } from '@/states/auth-user-state'
import { useGetEmployeeLeave } from '@/hooks/use-leave'

export default function LeavePage() {
  const [user] = useAtom(employeeAtom)
  const { openModal } = useModal()


  const leaveStats = [
    { label: 'ANNUAL LEAVE', value: '18', sublabel: '/ 24 days left', icon: Calendar },
    { label: 'SICK LEAVE', value: '5', sublabel: '/ 10 days left', icon: Calendar },
    // { label: 'COMPASSIONATE', value: '3', sublabel: 'days used', icon: Heart },
    { label: 'PENDING APPROVAL', value: '2', sublabel: 'active requests', icon: Clock },
  ]


  const [pagination,] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    leave: data,
    isLoading,
    pagination: pageInfo,
  } = useGetEmployeeLeave(user?.id ?? "", pagination?.pageIndex, pagination?.pageSize);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card mt-4">
        <div className="flex flex-col items-start gap-2 md:gap-0 md:flex-row md:items-center justify-between px-6 py-4">
          <p className="text-sm text-muted-foreground mt-1">Track and manage your leave balances and upcoming requests in one place.</p>
          <div className="flex items-center gap-3">
            <Button className="bg-foreground text-background hover:bg-foreground/90" onClick={() => openModal("leave-request")}>
              <Plus className="h-4 w-4 mr-1" />
              Request Leave
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Leave Stats Cards */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-3 mb-8">
          {leaveStats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                      <div className="mt-2 flex items-baseline gap-2">
                        <p className="text-3xl font-bold">{stat.value}</p>
                        <span className="text-xs text-muted-foreground">{stat.sublabel}</span>
                      </div>
                      {stat.label === 'COMPASSIONATE' && (
                        <p className="text-xs text-muted-foreground mt-3">Fully utilized for Q3</p>
                      )}
                      {stat.label === 'PENDING APPROVAL' && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-3">
                          <Clock className="h-3 w-3" />
                          Processing...
                        </div>
                      )}
                    </div>
                    <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                  {stat.label !== 'PENDING APPROVAL' && stat.label !== 'COMPASSIONATE' && (
                    <div className="mt-4 w-full bg-muted rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-foreground h-full"
                        style={{
                          width: stat.label === 'ANNUAL LEAVE' ? '75%' : '50%'
                        }}
                      ></div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Leave Requests Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>My Leave Requests</CardTitle>
            </div>
          </CardHeader>
          <CardContent className='p-0'>
            <DataTable
              columns={leaveColumns}
              data={data}
              isLoading={isLoading}
              searchColumn="type"
              searchPlaceholder="Search leave..."
              getRowLink={(leave) => `/employee/leave/${leave.id}`}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
