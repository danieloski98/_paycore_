"use client"

import EmployeeSetupPage from '@/components/auth/employee-setup'
import { Suspense } from 'react'

function EmployeeSetup() {

  return (
    <Suspense fallback={<></>}>
      <EmployeeSetupPage />
    </Suspense>
  )
}

export default EmployeeSetup