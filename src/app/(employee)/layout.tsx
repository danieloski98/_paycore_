import DashboardLayout from '@/components/layouts/dashboard-layout'
import React from 'react'

function Dashboard({children}: {children: React.ReactNode}) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  )
}

export default Dashboard