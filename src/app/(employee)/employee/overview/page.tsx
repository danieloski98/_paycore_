"use client";

import React, { useEffect, useState } from 'react'
import { Calendar, ChevronLeftIcon, ChevronRightIcon, WalletIcon, Landmark, Trash2, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/data-table/data-table'
import { useGetEmployeeById } from '@/hooks/use-employees'
import { useAtom } from 'jotai'
import { employeeAtom } from '@/states/auth-user-state'
import { useModal } from '@/hooks/use-modal'
import { columns } from '../wallet/transaction-columns'
import { useGetEmployeePaymentHistory } from '@/hooks/use-wallet'
import { Spinner } from '@/components/ui/spinner'
import { EmptyView } from '@/components/customs/empty-view'
import { useEmployeeBanks, useSetPrimaryBank, useDeleteBank } from '@/hooks/use-bank'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function OverviewPage() {
  const [user] = useAtom(employeeAtom)
  const { openModal } = useModal()
  const { employee } = useGetEmployeeById(user?.id!)
  const [page, setPage] = useState(1);
  const { data: transactionsData, isLoading: transactionsLoading, isError: transactionsError } = useGetEmployeePaymentHistory(user?.id, page, 10)

  const transactionMeta = transactionsData?.data?.data;
  const limit = transactionMeta?.limit || 10;
  const total = transactionMeta?.total || 0;
  const totalPages = transactionMeta?.totalPages || 0;
  const currentPage = transactionMeta?.page || page;

  const startIndex = total > 0 ? (currentPage - 1) * limit + 1 : 0;
  const endIndex = Math.min(currentPage * limit, total);

  const { banks, isLoading: banksLoading } = useEmployeeBanks();
  const { mutate: setPrimary, isPending: settingPrimary } = useSetPrimaryBank();
  const { mutate: deleteBankMutation, isPending: deletingBank } = useDeleteBank();

  const primaryBank = banks?.find((b: any) => b.isPrimary) ?? banks?.[0];

  const handleSetPrimary = (bankId: string) => {
    setPrimary(bankId, {
      onSuccess: () => {
        toast.success("Primary bank updated successfully");
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "Failed to update primary bank");
      }
    });
  };

  const handleDeleteBank = (bankId: string) => {
    deleteBankMutation(bankId, {
      onSuccess: () => {
        toast.success("Bank account deleted successfully");
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "Failed to delete bank account");
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="p-6">
        {/* Welcome Banner */}
        <div className="mb-6 rounded-lg bg-foreground text-background px-8 py-16">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {employee?.firstName} {employee?.lastName}</h2>
          <p className="text-sm text-background/80">
            Here is a summary of your wallet balance, recent payment history, and linked bank accounts.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <Card className='col-span-2'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">TOTAL PAYMENTS RECEIVED (YTD)</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">₦8,450,000.00</span>
                  <span className="text-sm font-medium text-green-600">+12.5%</span>
                </div>
                <Separator />
                <div className="text-xs text-muted-foreground">
                  Base Salary <span className="float-right">₦{(employee?.salary)?.toLocaleString()} / mo</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Payment Date</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div>
                <p className="text-3xl font-bold">Oct 28, 2024</p>
                <p className="text-xs text-muted-foreground mt-2">In 6 days</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bank Account & Payment History */}
        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <Card className="md:col-span-2 h-fit">
            <CardContent className='px-0'>
              <CardHeader className='text-xl font-semibold mb-4'>Recent payment history</CardHeader>
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
          </Card>

          <Card className="h-fit flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 shrink-0">
              <CardTitle className="text-base font-semibold">Bank Accounts</CardTitle>
              {banks && banks.length > 0 && (
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => openModal("add-bank")}>
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4 min-h-0 pt-4 overflow-hidden">
              {banksLoading ? (
                <div className="flex-1 flex items-center justify-center">
                  <Spinner />
                </div>
              ) : !banks || banks.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
                  <Landmark className="h-10 w-10 text-muted-foreground/60 mb-2" />
                  <p className="text-sm font-medium text-muted-foreground">No bank account connected</p>
                  <Button variant="outline" size="sm" className="mt-4 w-full" onClick={() => openModal("add-bank")}>
                    Add Bank Account
                  </Button>
                </div>
              ) : (
                <div className="flex-1 flex flex-col gap-4 min-h-0">
                  {/* Primary Bank Highlight */}
                  {primaryBank && (
                    <div className="rounded-xl border p-4 bg-muted/20 shrink-0">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                          {primaryBank.bankName?.slice(0, 2).toUpperCase() || "BK"}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-semibold text-sm truncate max-w-32.5">{primaryBank.bankName}</p>
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0 px-2 py-0 text-[10px] uppercase font-semibold">
                              Primary
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 truncate">{primaryBank.accountName}</p>
                          <p className="font-mono text-sm mt-1.5 tracking-wider">{primaryBank.accountNumber}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Scrollable list of connected banks */}
                  <div className="flex-1 flex flex-col min-h-0">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 shrink-0">Connected Accounts</p>
                    <div className="flex-1 overflow-y-auto pr-1 space-y-2">
                      {banks.map((bank: any) => (
                        <div key={bank.id} className="flex items-center justify-between p-2.5 rounded-lg border text-sm bg-background">
                          <div className="flex flex-col min-w-0 pr-2">
                            <span className="font-semibold text-xs truncate max-w-27.5">{bank.bankName}</span>
                            <span className="text-[11px] text-muted-foreground truncate">{bank.accountName} • ****{String(bank.accountNumber).slice(-4)}</span>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {!bank.isPrimary ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-[11px] text-primary h-7 px-2 hover:bg-primary/5"
                                disabled={settingPrimary}
                                onClick={() => handleSetPrimary(bank.id)}
                              >
                                Mark Primary
                              </Button>
                            ) : (
                              <span className="text-[10px] text-green-600 font-medium px-2">Primary</span>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                              disabled={deletingBank}
                              onClick={() => handleDeleteBank(bank.id)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

        </div>

        {/* Support Cards */}
        {/* <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-base">Tax Compliance</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                All statutory remittances (PAYE, NHF, Pension) for 2024 are up to date.
              </p>
              <Button variant="ghost" size="sm" className="text-primary">
                View Details →
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-base">Payroll Support</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Need to report an issue or change bank details? Chat with HR.
              </p>
              <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90">
                Message HR
              </Button>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </div>
  )
}
