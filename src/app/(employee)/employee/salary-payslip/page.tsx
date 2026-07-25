'use client'

import { useState, useEffect } from 'react'
import { Search, Eye, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

// Mock data types
interface Payslip {
  id: string
  status: 'PAID' | 'PENDING' | 'PROCESSING' | 'FAILED'
  basicSalary: string
  createdAt: string
}

interface DashboardAnalytics {
  totalLeaveRequests: number
  totalPaidPayslip: number
  netPay: {
    salary: string
  }
}

// Mock data
const mockAnalytics: DashboardAnalytics = {
  totalLeaveRequests: 12,
  totalPaidPayslip: 24,
  netPay: {
    salary: '₦450,000',
  },
}

const mockPayslips: Payslip[] = [
  { id: '#PY-0924-01', status: 'PAID', basicSalary: '₦450,000', createdAt: 'Sep 28, 2024' },
  { id: '#PY-0824-01', status: 'PAID', basicSalary: '₦450,000', createdAt: 'Aug 28, 2024' },
  { id: '#PY-0724-01', status: 'PAID', basicSalary: '₦450,000', createdAt: 'Jul 28, 2024' },
  { id: '#PY-0624-01', status: 'PAID', basicSalary: '₦450,000', createdAt: 'Jun 28, 2024' },
  { id: '#PY-0524-01', status: 'PENDING', basicSalary: '₦450,000', createdAt: 'May 28, 2024' },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'PAID':
      return 'bg-green-100 text-green-700'
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-700'
    case 'PROCESSING':
      return 'bg-blue-100 text-blue-700'
    case 'FAILED':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

const StatCard = ({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="p-2 rounded-lg bg-muted">{icon}</div>
      </div>
    </CardContent>
  </Card>
)

export default function EmployeePayslips() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const pageSize = 3

  // Mock data - in real app, would come from API
  const allPayslips = mockPayslips
  const analytics = mockAnalytics

  // Filter payslips based on search
  const filteredPayslips = allPayslips.filter((item) => {
    const q = searchTerm.trim().toLowerCase()
    if (!q) return true
    return (
      item.id.toLowerCase().includes(q) ||
      item.status.toLowerCase().includes(q) ||
      item.basicSalary.toLowerCase().includes(q)
    )
  })

  // Paginate
  const totalPages = Math.ceil(filteredPayslips.length / pageSize)
  const paginatedData = filteredPayslips.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  // Keep currentPage within bounds
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages)
    }
  }, [filteredPayslips.length, pageSize, totalPages, currentPage])

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      {/* Analytics Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard title="Total Leave Requests" value="12" icon="🔔" />
        <StatCard title="Total Paid Payslip" value="24" icon="💰" />
        <StatCard title="Net Pay" value={analytics.netPay.salary} icon="💵" />
      </div>

      {isMobile ? (
        // Mobile View
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Payslips</h2>
            <Button variant="outline" size="sm">Filter</Button>
          </div>

          {filteredPayslips.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <p className="text-muted-foreground">No payslips found</p>
              </CardContent>
            </Card>
          ) : (
            paginatedData.map((item) => (
              <Card key={item.id}>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1 space-y-2">
                      <div className="flex gap-1">
                        <span className="text-sm font-medium">ID:</span>
                        <span className="text-sm font-semibold">{item.id}</span>
                      </div>
                      <div className="flex gap-1 text-xs text-muted-foreground">
                        <span>Date:</span>
                        <span>{item.createdAt}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <p className="font-bold text-base">{item.basicSalary}</p>
                      <Badge variant="outline" className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                      <Button variant="ghost" size="sm" className="text-primary">
                        <Eye className="h-4 w-4 mr-1" />
                        View Slip
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}

          {filteredPayslips.length > 0 && (
            <div className="flex items-center justify-between gap-2 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      ) : (
        // Desktop View
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center justify-between gap-4">
              <div>
                <CardTitle>Recent Payslips</CardTitle>
                <CardDescription>Manage and view your payslip history</CardDescription>
              </div>
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search payslips..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="pl-10 rounded-full"
                />
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {filteredPayslips.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground">No payslips found matching your search</p>
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Payslip ID</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Date</TableHead>
                      <TableHead className="font-semibold">Amount</TableHead>
                      <TableHead className="text-center font-semibold">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.map((item) => (
                      <TableRow key={item.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.createdAt}</TableCell>
                        <TableCell className="font-medium">{item.basicSalary}</TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary hover:text-primary"
                          >
                            <Eye className="h-4 w-4" />
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Pagination */}
                {filteredPayslips.length > 0 && (
                  <div className="flex items-center justify-center gap-2 py-6 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <Button
                        key={i + 1}
                        variant={currentPage === i + 1 ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
