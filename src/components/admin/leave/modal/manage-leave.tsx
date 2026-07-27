"use client"

import { AppSheet } from '@/components/shared/app-sheet'
import { Row } from '@/components/shared/row'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useUpdateLeaveStatus } from '@/hooks/use-leave'
import { useModal } from '@/hooks/use-modal'
import { formatDate, formatDateRangeInline, formatDays, getEmployeeFullname, getLeaveStatusStyle } from '@/lib/utils'
import { Loader } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

const ManageLeave = () => {
    const { isOpen, closeModal, data } = useModal()
    const leave = data;

    const { mutate, isPending } =
        useUpdateLeaveStatus();

    const updateStatus = (
        status: "ACCEPTED" | "REJECTED"
    ) => {
        mutate(
            {
                id: leave.id,
                status,
            },
            {
                onSuccess() {
                    toast.success(
                        "Leave updated successfully."
                    );

                    closeModal();
                },

                onError(error: any) {
                    toast.error(error.message);
                },
            }
        );
    };

    if (!leave) return null;
    const status = getLeaveStatusStyle(leave?.Status);

    return (
        <AppSheet
            open={isOpen("manage-leave")}
            onOpenChange={(open) => !open && closeModal()}
            title="Leave Details"
            description="View leave information."
            size="xl"
        >
            <div className='px-4 pb-10 h-full flex flex-1 flex-col justify-between'>
                <div className="h-fit rounded-xl border bg-muted/30">
                    <Row
                        label="Employee"
                        value={getEmployeeFullname(
                            leave?.Employee!
                        )}
                    />

                    <Row
                        label="Leave Type"
                        value={leave?.type}
                    />

                    <Row
                        label="Applied Date"
                        value={formatDate(
                            leave?.createdAt
                        )}
                    />

                    <Row
                        label="Start Date"
                        value={formatDate(
                            leave?.startDate
                        )}
                    />

                    <Row
                        label="End Date"
                        value={formatDate(
                            leave?.endDate
                        )}
                    />

                    <Row
                        label="Duration"
                        value={formatDateRangeInline(
                            leave?.startDate,
                            leave?.endDate
                        )}
                    />

                    <Row
                        label="Days"
                        value={formatDays(
                            leave?.totalDays
                        )}
                    />

                    <Row
                        label="Status"
                        value={
                            <Badge
                                className={status.className}
                            >
                                {leave?.Status}
                            </Badge>
                        }
                    />
                </div>
                {leave?.Status === "PENDING" && (
                    <div className=" flex gap-2 items-center">
                        <Button
                            variant="destructive"
                            className='flex-1'
                            disabled={isPending}
                            onClick={() =>
                                updateStatus("REJECTED")
                            }
                        >
                            {isPending && (
                                <Loader
                                    data-icon="inline-start"
                                />
                            )}

                            Reject
                        </Button>

                        <Button
                            className='flex-1'
                            disabled={isPending}
                            onClick={() =>
                                updateStatus("ACCEPTED")
                            }
                        >
                            {isPending && (
                                <Loader
                                    data-icon="inline-start"
                                />
                            )}

                            Approve
                        </Button>
                    </div>
                )}
            </div>
        </AppSheet>
    )
}

export default ManageLeave
