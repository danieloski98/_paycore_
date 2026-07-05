import React from 'react'
import Sidebar from '../dashboard/sidebar'
import DashboardNavbar from '../dashboard/navbar'

function DashboardLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="w-full h-screen flex bg-gray-50">
        <Sidebar />
        <div className="flex-1">
            <DashboardNavbar />
            <main className="p-4">
                {children}
            </main>
        </div>
    </div>
  )
}

export default DashboardLayout