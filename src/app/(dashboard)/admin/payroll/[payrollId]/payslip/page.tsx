'use client'

import { useState } from 'react'
import { Search, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { DataTable } from '@/components/data-table/data-table'
import { payslipColumns } from './payslip-columns'
import { Card } from '@/components/ui/card'

const payslipData = [
  {
    id: 1,
    name: 'Adebayo Ogunlesi',
    email: 'adebayo.ogunlesi@company.com',
    position: 'Senior Software Engineer',
    amount: '₦850,000',
    paymentDate: 'Apr 30, 2025',
    avatar: 'https://i.pravatar.cc/100?img=1',
  },
  {
    id: 2,
    name: 'Chiamaka Nwosu',
    email: 'chiamaka.nwosu@company.com',
    position: 'Product Manager',
    amount: '₦720,000',
    paymentDate: 'Apr 29, 2025',
    avatar: 'https://i.pravatar.cc/100?img=2',
  },
  {
    id: 3,
    name: 'Emeka Obi',
    email: 'emeka.obi@company.com',
    position: 'Backend Developer',
    amount: '₦610,000',
    paymentDate: 'Apr 28, 2025',
    avatar: 'https://i.pravatar.cc/100?img=3',
  },
  {
    id: 4,
    name: 'Folake Adeyemi',
    email: 'folake.adeyemi@company.com',
    position: 'UI/UX Designer',
    amount: '₦540,000',
    paymentDate: 'Apr 27, 2025',
    avatar: 'https://i.pravatar.cc/100?img=4',
  },
  {
    id: 5,
    name: 'Tunde Bakare',
    email: 'tunde.bakare@company.com',
    position: 'DevOps Engineer',
    amount: '₦780,000',
    paymentDate: 'Apr 26, 2025',
    avatar: 'https://i.pravatar.cc/100?img=5',
  },
  {
    id: 6,
    name: 'Ngozi Eze',
    email: 'ngozi.eze@company.com',
    position: 'HR Manager',
    amount: '₦490,000',
    paymentDate: 'Apr 25, 2025',
    avatar: 'https://i.pravatar.cc/100?img=6',
  },
  {
    id: 7,
    name: 'Oluwaseun Ajayi',
    email: 'oluwaseun.ajayi@company.com',
    position: 'Data Analyst',
    amount: '₦520,000',
    paymentDate: 'Apr 24, 2025',
    avatar: 'https://i.pravatar.cc/100?img=7',
  },
  {
    id: 8,
    name: 'Ifeanyi Okonkwo',
    email: 'ifeanyi.okonkwo@company.com',
    position: 'Frontend Developer',
    amount: '₦580,000',
    paymentDate: 'Apr 23, 2025',
    avatar: 'https://i.pravatar.cc/100?img=8',
  },
  {
    id: 9,
    name: 'Zainab Bello',
    email: 'zainab.bello@company.com',
    position: 'Marketing Lead',
    amount: '₦660,000',
    paymentDate: 'Apr 22, 2025',
    avatar: 'https://i.pravatar.cc/100?img=9',
  },
  {
    id: 10,
    name: 'Yemi Ogunbiyi',
    email: 'yemi.ogunbiyi@company.com',
    position: 'Systems Analyst',
    amount: '₦470,000',
    paymentDate: 'Apr 21, 2025',
    avatar: 'https://i.pravatar.cc/100?img=10',
  },
  {
    id: 11,
    name: 'Kemi Adeleke',
    email: 'kemi.adeleke@company.com',
    position: 'Finance Controller',
    amount: '₦820,000',
    paymentDate: 'Apr 20, 2025',
    avatar: 'https://i.pravatar.cc/100?img=11',
  },
  {
    id: 12,
    name: 'Ola Ogunlade',
    email: 'ola.ogunlade@company.com',
    position: 'Mobile Developer',
    amount: '₦550,000',
    paymentDate: 'Apr 19, 2025',
    avatar: 'https://i.pravatar.cc/100?img=12',
  },
  {
    id: 13,
    name: 'Bola Obasanjo',
    email: 'bola.obasanjo@company.com',
    position: 'QA Engineer',
    amount: '₦430,000',
    paymentDate: 'Apr 18, 2025',
    avatar: 'https://i.pravatar.cc/100?img=13',
  },
  {
    id: 14,
    name: 'Tolu Akinlade',
    email: 'tolu.akinlade@company.com',
    position: 'Scrum Master',
    amount: '₦600,000',
    paymentDate: 'Apr 17, 2025',
    avatar: 'https://i.pravatar.cc/100?img=14',
  },
  {
    id: 15,
    name: 'Ruth Okafor',
    email: 'ruth.okafor@company.com',
    position: 'Legal Counsel',
    amount: '₦700,000',
    paymentDate: 'Apr 16, 2025',
    avatar: 'https://i.pravatar.cc/100?img=15',
  },
  {
    id: 16,
    name: 'Bayo Sanya',
    email: 'bayo.sanya@company.com',
    position: 'Cloud Architect',
    amount: '₦900,000',
    paymentDate: 'Apr 15, 2025',
    avatar: 'https://i.pravatar.cc/100?img=16',
  },
  {
    id: 17,
    name: 'Moyo Adegbite',
    email: 'moyo.adegbite@company.com',
    position: 'Business Analyst',
    amount: '₦480,000',
    paymentDate: 'Apr 14, 2025',
    avatar: 'https://i.pravatar.cc/100?img=17',
  },
  {
    id: 18,
    name: 'Chinonso Okafor',
    email: 'chinonso.okafor@company.com',
    position: 'Security Engineer',
    amount: '₦630,000',
    paymentDate: 'Apr 13, 2025',
    avatar: 'https://i.pravatar.cc/100?img=18',
  },
  {
    id: 19,
    name: 'Simi Adebayo',
    email: 'simi.adebayo@company.com',
    position: 'Operations Manager',
    amount: '₦560,000',
    paymentDate: 'Apr 12, 2025',
    avatar: 'https://i.pravatar.cc/100?img=19',
  },
];

export default function PayslipPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [paymentStatus, setPaymentStatus] = useState('PAID')

  const itemsPerPage = 8
  const filteredData = payslipData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-8">
          <Badge variant="outline" color="red" className="px-5.5 py-3 text-sm">
            {paymentStatus}
          </Badge>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Earnings
          </Button>
        </div>

        <Card>
          <DataTable
            columns={payslipColumns}
            data={payslipData}
            searchColumn={["name", "email", "position"]}
          />
        </Card>
      </div>
    </div>
  )
}
