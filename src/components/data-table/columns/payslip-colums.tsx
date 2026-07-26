"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Download, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useModal } from "@/hooks/use-modal";
import { months } from "@/lib/constants";
import { Payslip } from "@/models/payslip-model";

export const payslipColumns: ColumnDef<Payslip>[] = [
    {
        accessorKey: "payslipId",
        header: "Payslip ID",
        cell: ({ row }) => (
            <span className="ml-4">{row.original.id}</span>
        ),
    },
    // {
    //     accessorKey: "status",
    //     header: "Status",
    //     filterFn: (row, columnId, value) => {
    //         return row.getValue(columnId) === value;
    //     },
    //     cell: ({ row }) => {
    //         const status = row.original.status;

    //         return (
    //             <span
    //                 className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${status === "SUCCESSFULL"
    //                         ? "bg-green-100 text-green-700"
    //                         : status === "PENDING"
    //                             ? "bg-yellow-100 text-yellow-700"
    //                             : status === "PROCESSING"
    //                                 ? "bg-blue-100 text-blue-700"
    //                                 : "bg-red-100 text-red-700"
    //                     }`}
    //             >
    //                 {status}
    //             </span>
    //         );
    //     },
    // },

    // {
    //     accessorKey: "position",
    //     header: "Position",
    //     cell: ({ row }) => (
    //         <span>{row.original.employee.position}</span>
    //     ),
    // },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => (
            <span>{row.original.createdAt}</span>
        ),
    },

    {
        accessorKey: "netSalary",
        header: "Net Salary",
        cell: ({ row }) => (
            <span className="font-semibold ml-4">
                ₦{row.original?.netSalary?.toLocaleString()}
            </span>
        ),
    },

    {
        id: "actions",
        header: "Action",
        cell: ({ row }) => {
            const { openModal } = useModal();

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="ml-4"
                        >
                            <MoreHorizontal className="size-4" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                        //   onClick={() =>
                        //     openModal(
                        //       "view-payslip",
                        //       row.original
                        //     )
                        //   }
                        >
                            <Eye className="mr-2 h-4 w-4" />
                            View Payslip
                        </DropdownMenuItem>

                        <DropdownMenuItem
                        //   onClick={() =>
                        //     openModal(
                        //       "download-payslip",
                        //       row.original
                        //     )
                        //   }
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];