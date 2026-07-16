import { AppSheet } from '@/components/shared/app-sheet'
import { useModal } from '@/hooks/use-modal'
import React from 'react'

const PayslipModal = () => {
    const { isOpen, closeModal } = useModal()
    return (
        <AppSheet
            open={isOpen("payslip-details")}
            onOpenChange={(open) => !open && closeModal()}
            title="Payslip Details"
            description="View payslp information."
            size="lg"
        >
           <div>Payslip details</div>
        </AppSheet>
    )
}

export default PayslipModal