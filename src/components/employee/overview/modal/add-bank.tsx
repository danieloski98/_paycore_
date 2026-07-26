"use client"

import { CustomCombobox } from '@/components/customs/custom-combobox'
import { AppDialog } from '@/components/shared/app-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useBanks, useCreateBankDetails, useValidateBank } from '@/hooks/use-bank'
import useForm from '@/hooks/use-form'
import { useModal } from '@/hooks/use-modal'
import { BankDetailsFormValues, bankDetailsSchema } from '@/lib/schemas'
import { cn } from '@/lib/utils'
import { employeeAtom } from '@/states/auth-user-state'
import { useAtom } from 'jotai'
import { ArrowLeft, Check, Loader2 } from 'lucide-react'
import React from 'react'
import { useWatch } from 'react-hook-form'
import { toast } from 'sonner'

const AddBank = () => {
    const { isOpen, closeModal } = useModal()
    const [employee, setEmployee] = useAtom(employeeAtom)

    const {
        register,
        control,
        watch,
        setValue,
        getValues,
        handleSubmit,
        formState: { errors },
        renderForm,
    } = useForm({
        resolver: bankDetailsSchema,
        mode: "onSubmit",
        defaultValues: {
            accountNumber: "",
            bankCode: "",
            bankName: "",
            accountName: "",
        },
    });

    const accountName = useWatch({
        control,
        name: "accountName",
    });

    const bankCode = useWatch({
        control,
        name: "bankCode",
    });

    const accountNumber = useWatch({
        control,
        name: "accountNumber",
    });

    const checked = accountNumber.length === 10;
    const {
        banks,
        isLoading: loadingBanks,
    } = useBanks();

    const {
        mutate: validateBankAccount,
        isPending: validating,
        error: validateError
    } = useValidateBank();

    const serverValidateError = validateError?.message
    const {
        mutate,
        isPending,
    } = useCreateBankDetails();

    const onSubmit = (values: BankDetailsFormValues) => {
        mutate(values, {
            onSuccess: (res) => {
                setEmployee((prev) =>
                    prev
                        ? {
                            ...prev,
                            bank: res.data,
                        }
                        : prev
                );
                toast.success("Bank added successfully");
                closeModal();
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
    };

    const validate = () => {
        if (!bankCode || accountNumber.length !== 10) {
            toast.error("Enter a valid account number and select a bank");
            return;
        }

        validateBankAccount(
            {
                bankCode: "001",
                accountNumber: "2072726231",
            },
            {
                onSuccess(res) {
                    setValue("accountName", res.data.data.account_name);
                    setValue("bankName", res.data.data.bank_name);

                    setValue("accountName", res.data.data.account_name, {
                        shouldDirty: true,
                        shouldValidate: true,
                    });

                    toast.success("Account validated");
                },
                onError() {
                    toast.error(serverValidateError);
                },
            }
        );
    };

    return (
        <AppDialog
            open={isOpen("add-bank")}
            onOpenChange={(open) => !open && closeModal()}
            title="Add Bank"
            description="Add banks details for payment"
            size="md"
        >
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="space-y-6">

                    {/* Account Number */}
                    <div className="space-y-2">
                        <Label htmlFor="accountNumber">
                            Account Number
                        </Label>

                        <Input
                            id="accountNumber"
                            placeholder="Enter Account Number"
                            maxLength={10}
                            {...register("accountNumber")}
                        />
                    </div>

                    {/* Bank */}
                    <div className="flex items-end gap-1">
                        <div className="flex-1">
                            <CustomCombobox
                                options={banks}
                                loading={loadingBanks}
                                value={bankCode}
                                onValueChange={(value, option) => {
                                    setValue("bankCode", value, {
                                        shouldDirty: true,
                                        shouldValidate: true,
                                    });

                                    setValue("bankName", option?.label ?? "", {
                                        shouldDirty: true,
                                        shouldValidate: true,
                                    });

                                    if (accountNumber.length === 10) {
                                        validateBankAccount(
                                            {
                                                bankCode: value,
                                                accountNumber,
                                            },
                                            {
                                                onSuccess(res) {
                                                    setValue("accountName", res.data.data.account_name, {
                                                        shouldDirty: true,
                                                        shouldValidate: true,
                                                    });
                                                },
                                            }
                                        );
                                    }
                                }}
                            />
                        </div>

                        <Button
                            size="icon"
                            className={cn("w-8", validating ? "#fef3c7" : "#10b981", validating ? "#854d0e" : "white")}
                            onClick={validate}
                            disabled={!checked}
                        >
                            {validating ? <Loader2 /> : <Check size={14} />}
                        </Button>
                    </div>

                    {/* Account Name */}
                    {accountName ? (
                        <div className="rounded-lg border px-4 py-3">
                            <p className="font-medium text-green-600">
                                {accountName}
                            </p>
                        </div>
                    ) : null}

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                    >
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Confirm
                    </Button>
                </div>
            </form>
        </AppDialog>
    )
}

export default AddBank