import { AppSheet } from '@/components/shared/app-sheet'
import { useModal } from '@/hooks/use-modal'
import React from 'react'

const LeaveModal = () => {
    const { isOpen, closeModal } = useModal()
    return (
        <AppSheet
            open={isOpen("leave-details")}
            onOpenChange={(open) => !open && closeModal()}
            title="Leave Details"
            description="View leave information."
            size="xl"
        >
            <div>Leave Info</div>
        </AppSheet>
    )
}

export default LeaveModal