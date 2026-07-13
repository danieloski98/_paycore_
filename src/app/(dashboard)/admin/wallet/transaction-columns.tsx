"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  CircleDotIcon,
  WalletIcon,
} from "lucide-react"

export type Transaction = {
  companyId: string;
  amount: string;
  createdAt: string;
  deletedAt: string | null;
  id: string;
  isDeleted: boolean;
  status: 'COMPLETED' | 'PENDING' | 'FAILED' | string;
  updatedAt: string;
  walletId: string;
  reference: string;
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "status",
    header: () => <div className="px-4">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const isSuccess = status === "Success" || status === "COMPLETED"
      const isPending = status === "Processing" || status === "PENDING"
      return (
        <div className="px-4">
          <Badge
            variant="outline"
            className={cn(
              "gap-1.5 border-0 px-0 py-0 font-medium shadow-none",
              isSuccess && "text-green-700",
              isPending && "text-amber-700",
              (!isSuccess && !isPending) && "text-rose-700"
            )}
          >
            <CircleDotIcon
              data-icon="inline-start"
              className={cn(
                isSuccess && "fill-green-600 text-green-600",
                isPending && "fill-amber-500 text-amber-500",
                (!isSuccess && !isPending) && "fill-rose-500 text-rose-500"
              )}
            />
            {status}
          </Badge>
        </div>
      )
    },
  },
  {
    id: "detail",
    header: "Transaction Detail",
    cell: ({ row }) => {
      const status = row.original.status
      const isSuccess = status === "Success" || status === "COMPLETED"
      const isPending = status === "Processing" || status === "PENDING"

      return (
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "mt-0.5 flex size-9 items-center justify-center rounded-full",
              isSuccess && "bg-green-100 text-green-700",
              isPending && "bg-amber-100 text-amber-700",
              (!isSuccess && !isPending) && "bg-rose-100 text-rose-700"
            )}
          >
            {isSuccess ? (
              <ArrowDownLeftIcon />
            ) : isPending ? (
              <WalletIcon />
            ) : (
              <ArrowUpRightIcon />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold">Reference</p>
            <p className="text-sm text-muted-foreground">{row.original.reference}</p>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "reference",
    header: "Reference",
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground">
          {row.getValue("reference")}
        </div>
      )
    },
  },
  {
    id: "datetime",
    header: "Date & Time",
    cell: ({ row }) => {
      let date;
      let time;

      if (row.original.createdAt) {
        const dateObj = new Date(row.original.createdAt)
        date = dateObj.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
        time = dateObj.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      }

      return (
        <div className="flex flex-col gap-1 text-muted-foreground">
          <span>{date}</span>
          {time && <span>{time}</span>}
        </div>
      )
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="pr-4 text-right">Amount (₦)</div>,
    cell: ({ row }) => {
      const amount = row.getValue("amount") as string

      // // If it already has formatting (e.g. starts with "+" or "-"), render directly
      // if (amount && (amount.startsWith("+") || amount.startsWith("-"))) {
      //   return (
      //     <div
      //       className={cn(
      //         "pr-4 text-right text-xl font-semibold",
      //         amount.startsWith("+") ? "text-green-600" : "text-foreground"
      //       )}
      //     >
      //       {amount}
      //     </div>
      //   )
      // }

      // Otherwise, format as NGN currency
      const amountVal = Number(amount || 0)
      const formattedAmount = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amountVal)
      return (
        <div className="pr-4 text-right text-xl font-semibold text-green-600">
          +{formattedAmount}
        </div>
      )
    },
  },
]
