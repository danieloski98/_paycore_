"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import useForm from '@/hooks/use-form'
import { Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { SubmitHandler } from 'react-hook-form'
import { VerifyOTPFormValues, verifyOTPSchema } from '@/lib/schemas'
import { useVerifyOTP } from '@/hooks/use-auth'
import { toast } from 'sonner'

const Verify_OTP = () => {
    const router = useRouter()
    const { isPending, mutate: verify_OTP, error } = useVerifyOTP()
    const { renderForm, register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: 'onChange',
        resolver: verifyOTPSchema,
        defaultValues: {
            otp: '',
        },
    })

    const serverError = error?.response?.data?.message ?? error?.message

    const onSubmit: SubmitHandler<VerifyOTPFormValues> = (values) => {
        const payload: VerifyOTPFormValues = {
            otp: values.otp,
        }
        verify_OTP(payload, {
            onSuccess: () => {
                toast.success('Request Sent', {
                    position: "bottom-right",
                })
                reset()
                // Redirect to employee dashboard
                router.push('/verify-otp')
            },
            onError: () => {
                console.log("Server Error", serverError)
                toast.error(serverError!, {
                    position: "bottom-right",
                })
            }
        })
    }
    return (
        <div className='h-screen w-full flex items-center justify-center'>
            <Card className='w-lg shadow-md py-6 px-2'>
                <CardHeader className='flex flex-col items-center gap-2 mb-4'>
                    <div className='sizw-32 bg-[#F3F4F5] rounded-full p-4 mb-6'>

                        <Mail />
                    </div>
                    <CardTitle className='text-xl text-center font-sans font-semibold tracking-wide'>
                        Check Your Email
                    </CardTitle>
                    <CardDescription className=' flex justify-center text-center w-full'>
                        <p className='w-3/4'>
                            We've sent a 6-digit verification code to
                            your email address. Enter it below to
                            continue.
                        </p>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {renderForm(<form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col items-center gap-6">
                            <div className="grid gap-2 tex">
                                <InputOTP maxLength={6} >
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>
                        </div>
                        <Button disabled={isPending} className='py-6 text-base cursor-pointer w-full mt-6'>
                            Verify code
                        </Button>
                    </form>)}
                </CardContent>
            </Card>
        </div>
    )
}

export default Verify_OTP