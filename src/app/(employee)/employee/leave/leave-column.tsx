"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Eye, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LeaveRequest } from "@/models/leave-model";
import { format } from "date-fns";


export const leaveColumns: ColumnDef<LeaveRequest>[] = [
    {
        accessorKey: "employee",

        header: "Employee",

        cell: ({ row }) => {
            const employee = row.original.Employee;

            return (
                <div className="flex items-center gap-3">
                    <img
                        src={
                            employee?.picture || "/images/empty_user.png"
                        }
                        className="h-10 w-10 rounded-full object-cover"
                    />

                    <div>
                        <p className="font-medium">
                            {employee?.firstName} {employee?.lastName}
                        </p>

                        <p className="text-xs text-muted-foreground">
                            {employee?.email}
                        </p>
                    </div>
                </div>
            );
        },
    },

    {
        accessorKey: "type",
        header: "Leave Type",
    },

    {
        accessorKey: "startDate",

        header: "Duration",

        cell: ({ row }) => (
            <span>
                {format(new Date(row.original?.startDate), "dd MMM yyyy")} - {format(new Date(row.original?.endDate), "dd MMM yyyy")}
            </span>
        ),
    },

    {
        accessorKey: "totalDays",

        header: "Days",

        cell: ({ row }) => (
            <span>{row.original?.totalDays} day(s)</span>
        ),
    },

    {
        accessorKey: "Status",

        header: "Status",

        cell: ({ row }) => {
            const status = row.original.Status;

            return (
                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${status === "ACCEPTED"
                        ? "bg-green-100 text-green-700"
                        : status === "PENDING"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                >
                    {status}
                </span>
            );
        },
    },

    {
        id: "actions",

        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                    >
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                    >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                    </DropdownMenuItem>

                    <DropdownMenuItem className="text-red-600"
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                    >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];