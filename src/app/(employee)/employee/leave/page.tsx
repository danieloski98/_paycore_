'use client'

import { useState } from 'react'
import { Calendar, Clock, Plus, CalendarCheck, CalendarX, ClipboardList } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { DataTable } from '@/components/data-table/data-table'
import { leaveColumns } from './leave-column'
import { useModal } from '@/hooks/use-modal'
import { useAtom } from 'jotai'
import { employeeAtom } from '@/states/auth-user-state'
import { useGetEmployeeLeave } from '@/hooks/use-leave'
import { useGetEmployeeLeaveAnalytics } from '@/hooks/use-analytics'
import { cn, getLeaveStatusStyle } from '@/lib/utils'

export default function LeavePage() {
  const [user] = useAtom(employeeAtom)
  const { openModal } = useModal()
  const { analytics, isLoading: isLeaveAnalyticsLoading } = useGetEmployeeLeaveAnalytics(user?.id ?? "");

  const leaveStats = [
    { label: 'APPROVED LEAVE', value: String(analytics?.approvedLeaveRequests ?? 0), sublabel: 'Approved absences', icon: CalendarCheck, status: 'ACCEPTED' },
    { label: 'PENDING APPROVAL', value: String(analytics?.pendingLeaveRequests ?? 0), sublabel: 'Awaiting HR review', icon: Clock, status: 'PENDING' },
    { label: 'REJECTED LEAVE', value: String(analytics?.rejectedLeaveRequests ?? 0), sublabel: 'Rejected Requests', icon: CalendarX, status: 'REJECTED' },
    { label: 'TOTAL REQUESTS', value: String(analytics?.totalLeaveRequests ?? 0), sublabel: 'Total requests submitted', icon: ClipboardList, status: null },
  ];

  const [pagination,] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    leave: data,
    isLoading,
  } = useGetEmployeeLeave(user?.id ?? "", pagination?.pageIndex, pagination?.pageSize);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card mt-4">
        <div className="flex flex-col items-start gap-2 md:gap-0 md:flex-row md:items-center justify-between px-6 py-4">
          <p className="text-sm text-muted-foreground mt-1">Track and manage your leave balances and upcoming requests in one place.</p>
          <div className="flex items-center gap-3">
            <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90" onClick={() => openModal("leave-request")}>
              <Plus className="h-4 w-4 mr-1" />
              Request Leave
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Leave Stats Cards */}
        {isLeaveAnalyticsLoading ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24 bg-muted/40 animate-pulse" />
                      <div className="flex items-baseline gap-2">
                        <Skeleton className="h-8 w-16 bg-muted/40 animate-pulse" />
                        <Skeleton className="h-4 w-12 bg-muted/40 animate-pulse" />
                      </div>
                    </div>
                    <Skeleton className="size-10 rounded bg-muted/30" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {leaveStats.map((stat, idx) => {
              const Icon = stat.icon;
              const statusStyle = stat.status ? getLeaveStatusStyle(stat.status) : null;
              return (
                <Card key={idx}>
                  <CardContent className="py-6 px-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                        <div className="mt-2 flex items-baseline gap-2">
                          <p className="text-3xl font-bold">{stat.value}</p>
                          <span className="text-xs text-muted-foreground">{stat.sublabel}</span>
                        </div>
                      </div>
                      <div className={cn(
                        "h-10 w-10 rounded flex items-center justify-center border",
                        statusStyle?.className || "bg-muted text-muted-foreground border-transparent"
                      )}>
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

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
