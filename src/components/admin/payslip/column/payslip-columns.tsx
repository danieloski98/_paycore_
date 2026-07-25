"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useModal } from "@/hooks/use-modal";
import { Payslip } from "@/models/payslip-model";
import { format, isValid } from "date-fns";
import { cn, getPayslipStatusStyle } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";


export const payslipColumns: ColumnDef<Payslip>[] = [
  {
    accessorKey: "name",
    header: "Employee",
    filterFn: "equals", // exact match for dropdown filter
    cell: ({ row }) => {
      const employee = row?.original.Employee;
      return (
        <div className="flex items-center gap-3 pl-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={employee?.picture ?? ""} />
            <AvatarFallback>
              {employee?.firstName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="font-medium">{employee?.firstName}</p>

            <p className="text-xs text-muted-foreground">
              {employee?.email}
            </p>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "position",
    header: "Position",
    filterFn: "equals", // exact match for dropdown filter
    cell: ({ row }) => (
      <span className="ml-4">
        {row?.original?.Employee?.position}
      </span>
    ),
  },

  {
    accessorKey: "amount",
    header: "Net Pay",
    filterFn: "equals", // exact match for dropdown filter
    cell: ({ row }) => (
      <span className="ml-4 font-semibold">
        ₦{row?.original?.basicSalary}
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
      const status = row.original.status;
      const styles = getPayslipStatusStyle(status ?? "");

      return (
        <Badge
          className={cn("ml-4", styles.bg, styles.text, styles.border)}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "paymentDate",
    header: "Payment Date",
    filterFn: "equals", // exact match for dropdown filter
    cell: ({ row }) => {
      const paymentDate = row.original.paymentDate
      const date = new Date(paymentDate)
      return (
        <span className="ml-4">
          {isValid(date) ? format(date, "dd MMM yyyy") : "--"}
        </span>
      )

    }
  },

  {
    id: "actions",
    header: "Action",

    cell: ({ row }) => {
      const { openModal } = useModal();

      return (
        <div className="flex justify-start pl-6">
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
                  openModal(
                    "payslip-details",
                    row.original
                  )
                }
              >
                View Payslip
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];