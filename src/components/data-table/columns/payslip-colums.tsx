"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import { Payslip } from "@/models/payslip-model";


export const payslipColumns: ColumnDef<Payslip>[] = [
    {
        accessorKey: "payslipId",
        header: "Payslip ID",
        cell: ({ row }) => (
            <span className="ml-4">{row.original.id}</span>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        filterFn: (row, columnId, value) => {
            return row.getValue(columnId) === value;
        },
        cell: ({ row }) => {
            const status = row.original.status as string;

            return (
                <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${status === "SUCCESSFULL" || status === "PAID"
                            ? "bg-green-100 text-green-700"
                            : status === "PENDING"
                                ? "bg-yellow-100 text-yellow-700"
                                : status === "PROCESSING"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-red-100 text-red-700"
                        }`}
                >
                    {status}
                </span>
            );
        },
    },

    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => (
            <span>
                {row.original.createdAt
                    ? new Date(row.original.createdAt).toLocaleDateString("en-NG", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                      })
                    : "—"}
            </span>
        ),
    },

    {
        accessorKey: "basicSalary",
        header: "Basic Salary",
        cell: ({ row }) => (
            <span className="font-semibold ml-4">
                ₦{row.original?.basicSalary?.toLocaleString()}
            </span>
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
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary flex items-center gap-1.5"
                    onClick={() =>
                        openModal(
                            "employee-payslip-details",
                            row.original
                        )
                    }
                >
                    <Eye className="h-4 w-4" />
                    View Details
                </Button>
            );
        },
    },
];