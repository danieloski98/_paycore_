'use client';
import React, { useState } from "react"
import {
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleDotIcon,
  CopyIcon,
  DownloadIcon,
  FunnelIcon,
  InfoIcon,
  LandmarkIcon,
  PlusCircleIcon,
  WalletIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { DataTable } from "@/components/custom/data-table"
import { columns } from "./transaction-columns"
import { useAtomValue } from "jotai"
import { authUserAtom } from "@/states/auth-user-state"
import { useGetBalance, useGetPaymentHistory } from "@/hooks/use-wallet"
import { Spinner } from "@/components/ui/spinner"

const transactions = [
  {
    status: "Success",
    type: "credit",
    title: "Wallet Top-up",
    detail: "Bank transfer via Providus",
    reference: "TXN-8821045521",
    date: "Nov 24, 2024",
    time: "10:45 AM",
    amount: "+₦5,000,000.00",
  },
  {
    status: "Success",
    type: "debit",
    title: "November Salary Payout",
    detail: "142 employees processed",
    reference: "PYRL-2024-NOV",
    date: "Nov 22, 2024",
    time: "04:12 PM",
    amount: "-₦3,240,500.00",
  },
  {
    status: "Success",
    type: "debit",
    title: "LIRS Tax Remittance",
    detail: "Q4 statutory compliance",
    reference: "TAX-LAG-44102",
    date: "Nov 15, 2024",
    time: "09:00 AM",
    amount: "-₦1,120,000.00",
  },
  {
    status: "Processing",
    type: "transfer",
    title: "Withdrawal to GTBank",
    detail: "Transfer to operating account",
    reference: "WD-99210452",
    date: "Nov 28, 2024",
    time: "01:22 PM",
    amount: "-₦500,000.00",
  },
]

const footerLinks = {
  Product: ["Payroll", "Wallet", "Tax Compliance", "HR Tools"],
  Company: ["About Us", "Careers", "Contact", "Support"],
  Legal: ["Privacy Policy", "Terms of Service", "Security"],
}

function WalletPage() {
  const user = useAtomValue(authUserAtom);
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetBalance(user?.companyId as string);
  const { data: transactions, isLoading: transactionsLoading, isError: transactionsError } = useGetPaymentHistory(user?.companyId as string, page, 10)
  console.log('[WALLET BALANCE]', data?.data);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
        <section>
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-semibold tracking-tight">Wallet</h1>
            <p className="text-sm text-muted-foreground">
              Manage funding, withdrawals, and payout history from one place.
            </p>
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
          <Card className="overflow-hidden border-0 bg-primary text-primary-foreground shadow-sm h-60">
            <CardHeader className="relative">
              <div className="absolute top-0 right-0 size-28 rounded-bl-[2rem] bg-primary-foreground/5" />
              <CardDescription className="text-xs uppercase tracking-[0.18em] text-primary-foreground/70">
                Available Balance
              </CardDescription>
              {isLoading && <Spinner />}
              {!isLoading && !isError && data && (
                <CardTitle className="text-4xl font-semibold md:text-5xl">
                  ₦ {data?.data?.data?.balance}
                </CardTitle>
              )}
              {!isLoading && isError && (
                <CardTitle>
                  An Error occured while getting your balance
                </CardTitle>
              )}
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button variant="secondary">
                <PlusCircleIcon data-icon="inline-start" />
                Fund Wallet
              </Button>
              {/* <Button
                variant="outline"
                className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <LandmarkIcon data-icon="inline-start" />
                Withdraw
              </Button> */}
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardAction>
                <InfoIcon className="text-muted-foreground" />
              </CardAction>
              <CardTitle className="text-base">Virtual Account Details</CardTitle>
              <CardDescription>
                Instantly fund your wallet via bank transfer to this account.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="rounded-xl bg-muted/60 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Bank Name
                </p>
                <p className="mt-1 font-semibold">PayStream Microfinance / Providus</p>
              </div>

              <div className="rounded-xl bg-muted/60 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Account Number
                </p>
                <div className="mt-1 flex items-center justify-between gap-3">
                  <p className="text-3xl font-semibold tracking-wide">9022348512</p>
                  <Button variant="ghost" size="icon-sm" aria-label="Copy account number">
                    <CopyIcon />
                  </Button>
                </div>
              </div>

              <div className="rounded-xl bg-muted/60 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Account Name
                </p>
                <p className="mt-1 font-semibold">PayStream - Global Logistics Ltd</p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card className="shadow-sm">
            <CardHeader>
              <CardAction className="flex gap-2">
                <Button variant="outline" size="sm">
                  <FunnelIcon data-icon="inline-start" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <DownloadIcon data-icon="inline-start" />
                  Export
                </Button>
              </CardAction>
              <CardTitle>Transaction Ledger</CardTitle>
              <CardDescription>
                Manage and track your funding and payout history.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0">
              <DataTable columns={columns} data={transactions} />
            </CardContent>

            <div className="flex flex-col gap-3 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Showing 1-4 of 156 transactions
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon-sm" aria-label="Previous page">
                  <ChevronLeftIcon />
                </Button>
                <Button size="icon-sm">1</Button>
                <Button variant="ghost" size="icon-sm">
                  2
                </Button>
                <Button variant="ghost" size="icon-sm">
                  3
                </Button>
                <Button variant="outline" size="icon-sm" aria-label="Next page">
                  <ChevronRightIcon />
                </Button>
              </div>
            </div>
          </Card>
        </section>

      </div>
    </div>
  )
}

export default WalletPage
