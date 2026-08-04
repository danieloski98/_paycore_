"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal";
import { format } from "date-fns";
import { LeaveRequest } from "@/models/leave-model";
import { cn } from "@/lib/utils";


export const leaveColumns: ColumnDef<LeaveRequest>[] = [
    {
        accessorKey: "employee",
        header: "Employee",
        cell: ({ row }) => {
            const employee = row.original.Employee;

            return (
                <div className="pl-4">
                    <p className="font-medium">
                        {employee.firstName} {employee.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {employee.email}
                    </p>
                </div>
            );
        }
    },
    {
        accessorKey: "type",
        header: "Leave Type",

        filterFn: (row, columnId, value) => {
            return row.getValue(columnId) === value;
        },

        cell: ({ row }) => (
            <span className="ml-4 font-medium">
                {row.original.type}
            </span>
        ),
    },
    {
        accessorKey: "duration",
        header: "Duration",

        cell: ({ row }) => {
            const leave = row.original;

            return (
                <div className="ml-4">
                    <p>
                        {format(new Date(leave.startDate), "dd MMM yyyy")}
                    </p>

                    <p className="text-xs text-muted-foreground">
                        {format(new Date(leave.endDate), "dd MMM yyyy")}
                    </p>
                </div>
            );
        },
    },
    {
        accessorKey: "totalDays",
        header: "Days",

        cell: ({ row }) => (
            <span className="ml-4">
                {row.original.totalDays}
            </span>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",

        filterFn: (row, columnId, value) => {
            return row.getValue(columnId) === value;
        },

        cell: ({ row }) => {
            const status = row.original.Status;
            console.log(status)

            const styles = {
                ACCEPTED:
                    "bg-green-100 text-green-700",

                PENDING:
                    "bg-yellow-100 text-yellow-700",

                REJECTED:
                    "bg-red-100 text-red-700",

                CANCELLED:
                    "bg-gray-100 text-gray-700",
            };

            return (
                <span
                    className={cn(
                        "ml-4 inline-flex rounded-full px-3 py-1 text-xs font-medium",
                        styles[status] ?? styles.PENDING
                    )}
                >
                    {status}
                </span>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: "Requested",

        cell: ({ row }) => (
            <span className="ml-4">
                {format(new Date(row.original.createdAt), "dd MMM yyyy")}
            </span>
        ),
    },
    {
        id: "actions",
        header: "Action",

        cell: ({ row }) => {
            const { openModal } = useModal();

            return (
                <div className="flex items-center ml-6">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                            >
                                <MoreHorizontal className="size-4" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">

                            <DropdownMenuItem
                                onClick={() =>
                                    openModal("manage-leave", row.original)
                                }
                            >
                                View
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
]