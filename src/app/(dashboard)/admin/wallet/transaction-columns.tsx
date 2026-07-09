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
  status: string
  type: string
  title: string
  detail: string
  reference: string
  date: string
  time: string
  amount: string
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "status",
    header: () => <div className="px-4">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <div className="px-4">
          <Badge
            variant="outline"
            className={cn(
              "gap-1.5 border-0 px-0 py-0 font-medium shadow-none",
              status === "Success" ? "text-green-700" : "text-amber-700"
            )}
          >
            <CircleDotIcon
              data-icon="inline-start"
              className={cn(
                status === "Success"
                  ? "fill-green-600 text-green-600"
                  : "fill-amber-500 text-amber-500"
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
      const type = row.original.type
      const title = row.original.title
      const detail = row.original.detail
      return (
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "mt-0.5 flex size-9 items-center justify-center rounded-full",
              type === "credit" && "bg-green-100 text-green-700",
              type === "debit" && "bg-rose-100 text-rose-700",
              type === "transfer" && "bg-muted text-muted-foreground"
            )}
          >
            {type === "credit" ? (
              <ArrowDownLeftIcon />
            ) : type === "debit" ? (
              <ArrowUpRightIcon />
            ) : (
              <WalletIcon />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold">{title}</p>
            <p className="text-sm text-muted-foreground">{detail}</p>
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
      const date = row.original.date
      const time = row.original.time
      return (
        <div className="flex flex-col gap-1 text-muted-foreground">
          <span>{date}</span>
          <span>{time}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="pr-4 text-right">Amount (₦)</div>,
    cell: ({ row }) => {
      const amount = row.getValue("amount") as string
      return (
        <div
          className={cn(
            "pr-4 text-right text-xl font-semibold",
            amount.startsWith("+") ? "text-green-600" : "text-foreground"
          )}
        >
          {amount}
        </div>
      )
    },
  },
]
