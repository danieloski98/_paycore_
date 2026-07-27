// columns/payroll-columns.tsx

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { months } from "@/lib/constants";
import { PayrollItem } from "@/models/payroll-model";
import { PayrollActions } from "./payroll-action";
import { cn, getPayrollStatusStyle } from "@/lib/utils";


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
      const status = row.original?.status;
      const styles = getPayrollStatusStyle(status);


      return (
        <span
          className={cn("inline-flex items-center ml-4 rounded-lg px-3 py-1 text-xs font-medium", styles?.bgColor!, styles?.textColor!)}
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
          {months[data?.month]?.label} {data?.year}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      return (
        <PayrollActions payroll={row?.original} />
      )

    },
  },
];