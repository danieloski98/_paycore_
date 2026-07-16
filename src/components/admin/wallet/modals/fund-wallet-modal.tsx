'use client'
import React, { useMemo } from 'react'
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useModal } from '@/hooks/use-modal'
import { Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useAtomValue } from 'jotai'
import { authUserAtom } from '@/states/auth-user-state'
import { usePaystackPayment } from 'react-paystack';
import { useCreatePayment, useValidatePayment } from '@/hooks/use-wallet'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { Spinner } from '@/components/ui/spinner'


function FundWalletModal() {
    const { isOpen, closeModal } = useModal();
    const [amount, setAmount] = useState<string>('');
    const [reference, setReference] = useState<string | null>(null);
    const user = useAtomValue(authUserAtom);
    const queryClient = useQueryClient();

    const { mutateAsync: createPayment, isPending } = useCreatePayment(user?.companyId as string);
    const { mutateAsync: validatePayment, isPending: isPendingValidatePayment } = useValidatePayment(user?.companyId as string);

    const config = useMemo(() => ({
        reference: reference || "",
        amount: amount ? Number(amount) * 100 : 0,
        email: user?.email || "",
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
    }), [user, reference, amount])

    const onSuccess = async (ref: any) => {
        try {
            await validatePayment({ reference: ref.reference })
            toast.success('Payment validated successfully');
            queryClient.invalidateQueries({ queryKey: ['wallet-balance', user?.companyId] });
            queryClient.invalidateQueries({ queryKey: ['payment-history', user?.companyId] });
        } catch (error) {
            toast.error('Failed to validate payment');
        }
    }
    const initializePayment = usePaystackPayment(config);

    const handlePaystackPayment = () => {
        initializePayment({
            onSuccess: onSuccess,
            onClose: () => {
                console.log('Payment closed');
            }
        })
    }
    const handlePaymentCreation = async () => {
        if (Number(amount) < 1000) {
            toast.error('Please put in an amount greater than 1000.00NGN')
        } else {
            try {
                const res = await createPayment({ amount: Number(amount) });
                console.log(res?.data);
                setReference((res?.data?.data as any)?.reference);
                handlePaystackPayment()
            } catch (error) {
                console.log(error);
                toast.error('Failed to create payment');
            }
        }
    }
    return (
        <Dialog
            open={isOpen('fund-wallet')}
            onOpenChange={(open) => {
                if (!open) closeModal();
            }}
        >
            <DialogHeader>
                <DialogTitle>Fund Wallet</DialogTitle>
                <DialogDescription>
                    Fund your wallet to start using our services
                </DialogDescription>
            </DialogHeader>
            <DialogContent>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                            id="amount"
                            type="text"
                            inputMode="decimal"
                            placeholder="Enter amount"
                            className='h-12 mt-5'
                            value={amount}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val === '' || /^\d*\.?\d*$/.test(val)) {
                                    setAmount(val);
                                }
                            }}
                        />
                    </div>
                    <Button className='h-10' onClick={handlePaymentCreation} disabled={isPending || isPendingValidatePayment}>
                        {isPending || isPendingValidatePayment ? <Spinner /> : 'Pay'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default FundWalletModal