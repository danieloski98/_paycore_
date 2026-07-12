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
import { useModal } from "@/hooks/use-modal";
import { months } from "@/lib/constants";
import { PayrollItem } from "@/models/payroll-model";


export const payrollColumns: ColumnDef<PayrollItem>[] = [
  {
    accessorKey: "payroll",
    header: "Payroll",
    cell: ({ row }) => {
      return (
        <div className="pl-4">{row.original.name}</div>
      )
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <span
          className={`inline-flex items-center ml-4 rounded-full px-3 py-1 text-xs font-medium ${status === "SUCCESSFULL"
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
    accessorKey: "year",
    header: () => null,
    cell: () => null,
    enableHiding: true,
  },
  {
    accessorKey: "month",
    header: "Date Processed",
    filterFn: (row, columnId, value) => {
      return row.getValue<number>(columnId) === Number(value);
    },
    cell: ({ row }) => {
      const data = row.original;

      return (
        <span className="font-medium ml-4">
          {months[data.month].label} {data.year}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const data = row.original;
      const { openModal } = useModal()
      return (
        <div className="w-full flex items-center justify-between pr-6">
          <Button>
            {data.status === "PENDING" ? (
              <>
                <span
                // onClick={() => handleStartProcessing(item.id)}
                >
                  Start Processing
                </span>
              </>
            ) : data.status === "PROCESSING" ? (
              <>
                <span
                >
                  Cancel Processing
                </span>
              </>
            ) : (
              <span>
                Payroll Done
              </span>
            )}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-4">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  openModal("payroll-details", row.original)
                }}
              >
                View
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => console.log("Download Payslip", row.original)}
              >
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => openModal("delete-payroll", row.original)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
];