'use client';
import React, { useState } from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  LandmarkIcon,
  PlusCircleIcon,
  WalletIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { columns } from "./transaction-columns"
import { useAtomValue } from "jotai"
import { employeeAtom } from "@/states/auth-user-state"
import { useGetEmployeeBalance, useGetEmployeePaymentHistory } from "@/hooks/use-wallet"
import { Spinner } from "@/components/ui/spinner"
import { useModal } from "@/hooks/use-modal";
import { toast } from "sonner";
import { DataTable } from "@/components/customs/data-table";
import { EmptyView } from "@/components/customs/empty-view";
import { useEmployeeBanks } from "@/hooks/use-bank";
import { Bank } from "@/models/bank-model";


function WalletPage() {
  const user = useAtomValue(employeeAtom);
  const { openModal } = useModal();
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetEmployeeBalance(user?.id! as string);
  const { data: transactionsData, isLoading: transactionsLoading, isError: transactionsError } = useGetEmployeePaymentHistory(user?.id, page, 10)
  const {
    banks
  } = useEmployeeBanks();

  const transactionMeta = transactionsData?.data?.data;
  const limit = transactionMeta?.limit || 10;
  const total = transactionMeta?.total || 0;
  const totalPages = transactionMeta?.totalPages || 0;
  const currentPage = transactionMeta?.page || page;

  const startIndex = total > 0 ? (currentPage - 1) * limit + 1 : 0;
  const endIndex = Math.min(currentPage * limit, total);


  const withdraw = {
    employee: {
      id: user?.id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      position: user?.position,
    },
    availableBalance: Number(data?.data?.data?.balance || 0),
    banks: banks,
    defaultBankId: banks?.find((b: Bank) => b.isPrimary)?.id,
  }


  // const handleExport = () => {
  //   const dataToExport = transactionsData?.data?.data?.data || [];
  //   if (dataToExport.length === 0) {
  //     toast.error("No transaction data available to export.");
  //     return;
  //   }

  //   try {
  //     // Format headers and rows
  //     const headers = ["Reference", "Amount (₦)", "Status", "Date", "Time"];
  //     const rows = dataToExport.map((txn: any) => {
  //       const dateObj = txn.createdAt ? new Date(txn.createdAt) : null;
  //       const dateStr = dateObj
  //         ? dateObj.toLocaleDateString("en-US", {
  //           month: "short",
  //           day: "numeric",
  //           year: "numeric",
  //         })
  //         : "";
  //       const timeStr = dateObj
  //         ? dateObj.toLocaleTimeString("en-US", {
  //           hour: "2-digit",
  //           minute: "2-digit",
  //         })
  //         : "";

  //       const amountVal = Number(txn.amount || 0);

  //       return [
  //         txn.reference || "",
  //         amountVal,
  //         txn.status || "",
  //         dateStr,
  //         timeStr,
  //       ];
  //     });

  //     // Generate CSV string
  //     const csvContent = [
  //       headers.join(","),
  //       ...rows.map((row: any[]) =>
  //         row.map(val => {
  //           const strVal = String(val);
  //           if (strVal.includes(",") || strVal.includes('"') || strVal.includes('\n')) {
  //             return `"${strVal.replace(/"/g, '""')}"`;
  //           }
  //           return strVal;
  //         }).join(",")
  //       )
  //     ].join("\r\n");

  //     // Create a Blob and trigger a download
  //     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  //     const url = URL.createObjectURL(blob);
  //     const link = document.createElement("a");
  //     link.setAttribute("href", url);
  //     link.setAttribute("download", `transaction_ledger_${new Date().toISOString().split('T')[0]}.csv`);
  //     link.style.visibility = 'hidden';
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //     toast.success("Transaction ledger exported successfully.");
  //   } catch (error) {
  //     console.error("Export failed:", error);
  //     toast.error("Failed to export transaction ledger.");
  //   }
  // };

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
        <section>
          <div className="flex flex-col gap-1">
            {/* <h1 className="text-3xl font-semibold tracking-tight">Wallet</h1> */}
            <p className="text-sm text-muted-foreground">
              Manage funding, withdrawals, and payout history from one place.
            </p>
          </div>
        </section>

        <section className="w-full">
          <Card className="overflow-hidden border-0 bg-primary text-primary-foreground shadow-sm h-60">
            <CardHeader className="relative">
              <div className="absolute top-0 right-0 size-28 rounded-bl-[2rem] bg-primary-foreground/5" />
              <CardDescription className="text-xs uppercase tracking-[0.18em] text-primary-foreground/70">
                Available Balance
              </CardDescription>
              {isLoading && <Spinner />}
              {!isLoading && !isError && data && (
                <CardTitle className="text-4xl font-semibold md:text-5xl my-5">
                  {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(Number(data?.data?.data?.balance || 0))}
                </CardTitle>
              )}
              {!isLoading && isError && (
                <CardTitle>
                  An Error occured while getting your balance
                </CardTitle>
              )}
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                className="border-primary-foreground/20 text-primary hover:bg-primary-foreground hover:text-primary cursor-pointer"
                onClick={() => openModal("withdraw-balance", withdraw)}
              >
                <LandmarkIcon data-icon="inline-start" />
                Withdraw
              </Button>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card className="shadow-sm">
            <CardHeader>
              <CardAction className="flex gap-2">
              </CardAction>
              <CardTitle>Transaction Ledger</CardTitle>
              <CardDescription>
                Manage and track your funding and payout history.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0">
              {transactionsLoading && <Spinner />}
              {!transactionsLoading && !transactionsError && transactionsData?.data?.data?.data?.length < 1 && (
                <EmptyView
                  title='No Transactions Found'
                  description='Once you start managing payroll, you’ll see transaction history here.'
                  icon={<WalletIcon />}
                />
              )}
              {!transactionsLoading && !transactionsError && transactionsData?.data?.data?.data?.length > 0 && (
                <DataTable columns={columns} data={transactionsData?.data?.data?.data} />
              )}
            </CardContent>

            <div className="flex flex-col gap-3 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                {total > 0 ? `Showing ${startIndex}-${endIndex} of ${total} transactions` : 'No transactions to show'}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon-sm"
                  aria-label="Previous page"
                  disabled={currentPage <= 1 || transactionsLoading}
                  onClick={() => setPage(currentPage - 1)}
                >
                  <ChevronLeftIcon />
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(p => {
                    if (totalPages <= 5) return true;
                    return Math.abs(p - currentPage) <= 1 || p === 1 || p === totalPages;
                  })
                  .map((p, idx, arr) => {
                    const showEllipsis = idx > 0 && p - arr[idx - 1] > 1;
                    return (
                      <React.Fragment key={p}>
                        {showEllipsis && (
                          <span className="text-muted-foreground px-1 text-sm">...</span>
                        )}
                        <Button
                          size="icon-sm"
                          variant={p === currentPage ? "default" : "ghost"}
                          onClick={() => setPage(p)}
                          disabled={transactionsLoading}
                        >
                          {p}
                        </Button>
                      </React.Fragment>
                    );
                  })
                }

                <Button
                  variant="outline"
                  size="icon-sm"
                  aria-label="Next page"
                  disabled={currentPage >= totalPages || transactionsLoading}
                  onClick={() => setPage(currentPage + 1)}
                >
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
