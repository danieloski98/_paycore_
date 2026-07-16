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

export type Payslip = {
  id: number;
  name: string;
  email: string;
  position: string;
  amount: string;
  paymentDate: string;
  avatar: string;
};

export const payslipColumns: ColumnDef<Payslip>[] = [
  {
    accessorKey: "name",
    header: "Employee",
    cell: ({ row }) => {
      const employee = row.original;

      return (
        <div className="flex items-center gap-3 pl-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={employee.avatar} />
            <AvatarFallback>
              {employee.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="font-medium">{employee.name}</p>

            <p className="text-xs text-muted-foreground">
              {employee.email}
            </p>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "position",
    header: "Position",

    cell: ({ row }) => (
      <span className="ml-4">
        {row.original.position}
      </span>
    ),
  },

  {
    accessorKey: "amount",
    header: "Net Pay",

    cell: ({ row }) => (
      <span className="ml-4 font-semibold">
        {row.original.amount}
      </span>
    ),
  },

  {
    accessorKey: "paymentDate",
    header: "Payment Date",

    cell: ({ row }) => (
      <span className="ml-4">
        {row.original.paymentDate}
      </span>
    ),
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
{/* 
              <DropdownMenuItem
                onClick={() =>
                  console.log("Download PDF")
                }
              >
                Download PDF
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() =>
                  console.log("Send Email")
                }
              >
                Send via Email
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];