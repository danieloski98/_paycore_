"use client";

import { useEffect, useMemo, useState } from "react";
import { useModal } from "@/hooks/use-modal";
import { AppDialog } from "@/components/shared/app-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Wallet, Landmark, User } from "lucide-react";
import { toast } from "sonner";
import { WithdrawModalData } from "@/models/withdraw-model";
import useForm from "@/hooks/use-form";
import { useWithdrawBalance } from "@/hooks/use-wallet";
import { withdrawBalanceSchema, WithdrawBalanceValues } from "@/lib/schemas";
import { Spinner } from "@/components/ui/spinner";

type WithdrawType = "all" | "partial";

export const WithdrawBalanceModal = () => {
    const { isOpen, closeModal, data } = useModal();
    const withdrawData = data as WithdrawModalData | undefined;

    const [withdrawType, setWithdrawType] = useState<WithdrawType>("all");
    const { mutate, isPending } = useWithdrawBalance();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        renderForm,
        formState: { errors }
    } = useForm({
        mode: "onSubmit",
        resolver: withdrawBalanceSchema,
        defaultValues: {
            amount: 0,
            bankDetailsId: "",
        }
    });

    useEffect(() => {
        if (withdrawData) {
            setWithdrawType("all");
            const defaultBankId = withdrawData.defaultBankId ??
                withdrawData.banks?.find((b) => b.isPrimary)?.id ??
                withdrawData.banks?.[0]?.id ??
                "";
            reset({
                amount: withdrawData.availableBalance,
                bankDetailsId: defaultBankId,
            });
        }
    }, [withdrawData, reset]);

    const selectedBankId = watch("bankDetailsId");
    const withdrawalAmount = watch("amount") || 0;

    const selectedBank = useMemo(
        () => withdrawData?.banks?.find((b) => b.id === selectedBankId),
        [withdrawData?.banks, selectedBankId]
    );

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 2,
        }).format(value);

    const handleWithdrawTypeChange = (type: WithdrawType) => {
        setWithdrawType(type);
        if (type === "all") {
            setValue("amount", withdrawData?.availableBalance || 0, { shouldValidate: true });
        } else {
            setValue("amount", 0, { shouldValidate: true });
        }
    };

    const onSubmit = (values: WithdrawBalanceValues) => {
        if (!withdrawData) return;

        if (values.amount > withdrawData.availableBalance) {
            toast.error("Withdrawal amount exceeds available balance");
            return;
        }

        mutate({
            amount: values.amount,
            bankDetailsId: values.bankDetailsId,
        }, {
            onSuccess: () => {
                toast.success("Withdrawal request submitted successfully");
                closeModal();
                reset();
            },
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || "Failed to withdraw balance");
            }
        });
    };

    if (!withdrawData) return null;

    return (
        <AppDialog
            open={isOpen("withdraw-balance")}
            onOpenChange={(open) => !open && closeModal()}
            title="Withdraw Balance"
            description="Withdraw your available earnings to your bank account."
            size="lg"
        >
            {renderForm(
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Employee Summary */}
                    <div className="rounded-xl border bg-muted/30 p-4">
                        <Badge variant="outline" className="px-3 py-1 text-xs font-medium">
                            Available
                        </Badge>

                        <div className="mt-4 flex items-center gap-3 rounded-lg bg-background p-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                                <Wallet className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Available Balance</p>
                                <p className="text-2xl font-bold text-foreground">
                                    {formatCurrency(withdrawData.availableBalance)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Withdrawal Type */}
                    <div className="space-y-3">
                        <Label className="text-sm font-semibold">Withdrawal Type</Label>
                        <RadioGroup
                            value={withdrawType}
                            onValueChange={(value) => handleWithdrawTypeChange(value as WithdrawType)}
                            className="grid gap-3 md:grid-cols-2"
                        >
                            <Label
                                htmlFor="withdraw-all"
                                className="flex cursor-pointer items-start gap-3 rounded-xl border p-4 hover:bg-muted/40 data-[state=checked]:border-primary"
                            >
                                <RadioGroupItem value="all" id="withdraw-all" className="mt-0.5" />
                                <div className="space-y-1">
                                    <p className="font-medium">Withdraw All</p>
                                    <p className="text-sm text-muted-foreground">
                                        Transfer your full available balance immediately.
                                    </p>
                                </div>
                            </Label>

                            <Label
                                htmlFor="withdraw-partial"
                                className="flex cursor-pointer items-start gap-3 rounded-xl border p-4 hover:bg-muted/40 data-[state=checked]:border-primary"
                            >
                                <RadioGroupItem
                                    value="partial"
                                    id="withdraw-partial"
                                    className="mt-0.5"
                                />
                                <div className="space-y-1">
                                    <p className="font-medium">Partial Withdrawal</p>
                                    <p className="text-sm text-muted-foreground">
                                        Choose a specific amount to withdraw.
                                    </p>
                                </div>
                            </Label>
                        </RadioGroup>
                    </div>

                    {/* Amount Input */}
                    {withdrawType === "partial" && (
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="withdraw-amount">Withdrawal Amount</Label>
                                <button
                                    type="button"
                                    className="text-xs font-medium text-primary hover:underline"
                                    onClick={() => setValue("amount", withdrawData.availableBalance, { shouldValidate: true })}
                                >
                                    Use max
                                </button>
                            </div>

                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                                    ₦
                                </span>
                                <Input
                                    id="withdraw-amount"
                                    type="number"
                                    min={1}
                                    max={withdrawData.availableBalance}
                                    {...register("amount", { valueAsNumber: true })}
                                    placeholder="Enter amount"
                                    className="pl-8"
                                />
                            </div>

                            {errors.amount?.message && (
                                <p className="text-xs text-destructive">
                                    {errors.amount.message as string}
                                </p>
                            )}

                            <p className="text-xs text-muted-foreground">
                                Maximum withdrawal: {formatCurrency(withdrawData.availableBalance)}
                            </p>
                        </div>
                    )}

                    <Separator />

                    {/* Bank Selection */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Landmark className="h-4 w-4 text-muted-foreground" />
                            <Label className="text-sm font-semibold">Destination Bank Account</Label>
                        </div>

                        <Select
                            value={watch("bankDetailsId")}
                            onValueChange={(value) => setValue("bankDetailsId", value, { shouldValidate: true })}
                        >
                            <SelectTrigger className="p-4 w-full">
                                <SelectValue placeholder="Select bank account" />
                            </SelectTrigger>

                            <SelectContent>
                                {withdrawData.banks?.map((bank) => (
                                    <SelectItem key={bank.id} value={bank.id}>
                                        <div className="flex items-center gap-2 w-full">
                                            <span className="font-medium">{bank.bankName}</span>
                                            <span className="text-xs text-muted-foreground">
                                                {bank.accountName} • ****{String(bank.accountNumber).slice(-4)}
                                            </span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {errors.bankDetailsId?.message && (
                            <p className="text-xs text-destructive">
                                {errors.bankDetailsId.message as string}
                            </p>
                        )}

                        {selectedBank && (
                            <div className="rounded-lg border bg-background p-4 text-sm">
                                <div className="grid gap-2 sm:grid-cols-2">
                                    <div>
                                        <p className="text-muted-foreground">Bank Name</p>
                                        <p className="font-medium">{selectedBank.bankName}</p>
                                    </div>

                                    <div>
                                        <p className="text-muted-foreground">Account Number</p>
                                        <p className="font-medium">{selectedBank.accountNumber}</p>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <p className="text-muted-foreground">Account Name</p>
                                        <p className="font-medium">{selectedBank.accountName}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <Separator />

                    {/* Summary */}
                    <div className="rounded-xl bg-primary/5 p-4">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Withdrawal Amount</span>
                            <span className="font-semibold">
                                {formatCurrency(withdrawalAmount)}
                            </span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-2">
                        <Button variant="outline" type="button" onClick={closeModal}>
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={
                                isPending ||
                                withdrawalAmount <= 0 ||
                                !watch("bankDetailsId") ||
                                withdrawalAmount > withdrawData.availableBalance
                            }
                        >
                            {isPending && <Spinner data-icon="inline-start" />}
                            Withdraw {formatCurrency(withdrawalAmount)}
                        </Button>
                    </div>
                </form>
            )}
        </AppDialog>
    );
};