"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEmployeeLogin, useForgotPassword } from '@/hooks/use-auth'
import useForm from '@/hooks/use-form'
import { ForgotPasswordFormValues, forgotPasswordSchema } from '@/lib/schemas'
import { userTypeAtom } from '@/states/user-type-state'
import { useAtom } from 'jotai'
import { ArrowLeft, ArrowRight, Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'

const ForgotPassword = () => {
    const router = useRouter()
    const [userType, ] = useAtom(userTypeAtom)
    const [successMessage, setSuccessMessage] = useState('')
    const { isPending, mutate: companyUserLogin, error } = useForgotPassword()
    const { renderForm, register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: 'onChange',
        resolver: forgotPasswordSchema,
        defaultValues: {
            email: '',
            type: ""
        },
    })

    const serverError = error?.response?.data?.message ?? error?.message

    const onSubmit: SubmitHandler<ForgotPasswordFormValues> = (values) => {
        const payload: ForgotPasswordFormValues = {
            email: values.email,
            type: userType
        }

        setSuccessMessage('')
        companyUserLogin(payload, {
            onSuccess: () => {
                toast.success(successMessage || 'Request Sent', {
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

                        <Lock />
                    </div>
                    <CardTitle className='text-xl text-center font-sans font-semibold tracking-wide'>
                        Forgot Password
                    </CardTitle>
                    <CardDescription className=' flex justify-center text-center w-full'>
                        <p className='w-3/4'>

                            Enter your email address and we'll send
                            you a 6-digit code to reset your
                            password.
                        </p>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {renderForm(<form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    aria-invalid={Boolean(errors.email)}
                                    required
                                    className='h-10 text-sm font-medium tracking-wide rounded-sm outline-none focus-within:border-0 focus-within:outline-0'
                                {...register('email')}
                                />
                            </div>
                            <Button disabled={isPending} className='py-6 text-base cursor-pointer'>
                                Send Reset Code <ArrowRight size={16} />
                            </Button>
                        </div>
                    </form>)}
                </CardContent>
            </Card>
        </div>
    )
}

export default ForgotPassword