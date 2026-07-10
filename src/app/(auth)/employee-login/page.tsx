// import LandingPage from '@/components/landing-page/pages/landing-page'
// export default LandingPage
"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { useEmployeeLogin } from '@/hooks/use-auth'
import useForm from '@/hooks/use-form'
import { EmployeeLoginFormValues, employeeLoginSchema } from '@/lib/schemas'
import { userTypeAtom } from '@/states/user-type-state'
import { useAtom } from 'jotai'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'

function EmployeeLogin() {
    const router = useRouter()
    const [,setUserType] = useAtom(userTypeAtom)
    const [successMessage, setSuccessMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const { isPending, mutate: companyUserLogin, error } = useEmployeeLogin()


    useEffect(() => {
        setUserType("EMPLOYEE")
    }, [setUserType])

    const { renderForm, register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: 'onChange',
        resolver: employeeLoginSchema,
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const serverError =  error?.message
    console.log(serverError)

    const onSubmit: SubmitHandler<EmployeeLoginFormValues> = (values) => {
        const payload: EmployeeLoginFormValues = {
            email: values.email,
            password: values.password,
        }

        setSuccessMessage('')
        companyUserLogin(payload, {
            onSuccess: () => {
                setUserType('EMPLOYEE')
                toast.success(successMessage || 'Log In successfully', {
                    position: "bottom-right",
                })
                reset()
                // Redirect to employee dashboard
                router.push('/employee/overview')
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
                <CardHeader className='gap-2 mb-4'>
                    <CardTitle className='text-xl font-sans font-semibold tracking-wide'>
                        Login into your account
                    </CardTitle>
                    <CardDescription>Welcome back! Please enter your details</CardDescription>
                </CardHeader>
                <CardContent>
                    {renderForm(<form onSubmit={handleSubmit(onSubmit)}>

                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    className='h-10 text-sm font-medium tracking-wide rounded-sm outline-none focus-within:border-0 focus-within:outline-0'
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <div className="grid gap-2">
                                    <div className='flex items-center justify-between'>
                                        <Label htmlFor="password">Password</Label>
                                        <Button variant={"ghost"} className='text-gray-500 text-xs tracking-wide text-right cursor-pointer' onClick={() => router.push('/forgot-password')}>Forgot Password?</Button>
                                    </div>
                                    <div className='relative'>
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            aria-invalid={Boolean(errors.password)}
                                            required
                                            placeholder='Enter your password'
                                            className='h-10 rounded-sm outline-none focus-within:border-0 focus-within:outline-0'
                                            {...register('password')}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 -translate-y-1/2"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                {errors.password?.message ? (
                                    <p className='text-xs text-destructive'>{String(errors.password.message)}</p>
                                ) : null}
                            </div>
                            <Button disabled={isPending} className='py-6 text-base cursor-pointer'>
                                {isPending ? <Spinner data-icon="inline-start" /> : null}
                                {isPending ? "Logging In" : "Log In"}
                            </Button>
                            {/* <p className='text-center text-sm text-muted-foreground'>Don't have an account? <Link href="#" className='text-black'>Sign Up</Link></p> */}
                        </div>
                    </form>)}
                </CardContent>
            </Card>
        </div>
    )
}

export default EmployeeLogin