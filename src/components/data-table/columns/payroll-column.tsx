// columns/payroll-columns.tsx

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
import { Payroll } from "../sample-data/payroll-data";

export const payrollColumns: ColumnDef<Payroll>[] = [
  {
    accessorKey: "employee",
    header: "Employee",
  },
  {
    accessorKey: "amount",
    header: "Salary",
    cell: ({ row }) => {
      const amount = row.original.amount;

      return (
        <span className="font-medium">
          ₦{amount.toLocaleString()}
        </span>
      );
    },
  },
  {
    accessorKey: "month",
    header: "Payroll Month",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
            status === "Paid"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => console.log("View", row.original)}
          >
            View Payroll
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => console.log("Download Payslip", row.original)}
          >
            Download Payslip
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => console.log("Mark Paid", row.original)}
          >
            Mark as Paid
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];