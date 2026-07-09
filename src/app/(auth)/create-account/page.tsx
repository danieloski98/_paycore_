'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import useForm from '@/hooks/use-form'
import { useCreateCompanyUserAccount } from '@/hooks/use-auth'
import type { CreateCompanyUserAccountPayload } from '@/lib/auth/payload'
import { createCompanyUserAccountSchema, type CreateCompanyUserAccountFormValues } from '@/lib/schemas'
import { userTypeAtom } from '@/states/user-type-state'
import { useAtom } from 'jotai'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import type { SubmitHandler } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'
import { AuthUser, authUserAtom } from '@/states/auth-user-state'


function CreateCompanyAccount() {
  const router = useRouter()
  const [, setUserType] = useAtom(userTypeAtom)
  const [, setAuthUser] = useAtom(authUserAtom);
  const [successMessage, setSuccessMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { isPending, mutate: createCompanyUserAccount, error } = useCreateCompanyUserAccount()
  const { renderForm, register, handleSubmit, formState: { errors }, reset } = useForm({
    mode: 'onChange',
    resolver: createCompanyUserAccountSchema,
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: '',
      role: "SUPER_ADMIN"
    },
  })

  const serverError = error?.response?.data?.message ?? error?.message

  const onSubmit: SubmitHandler<CreateCompanyUserAccountFormValues> = (values) => {
    const payload: CreateCompanyUserAccountPayload = {
      firstName: values.first_name,
      lastName: values.last_name,
      email: values.email,
      password: values.password,
      phone: values.phone,
      role: values.role
    }

    setSuccessMessage('')
    createCompanyUserAccount(payload, {
      onSuccess: (response) => {
        setUserType('USER')
        setAuthUser(response?.data?.data! as AuthUser);
        toast.success(successMessage || 'Account created successfully', {
          dismissible: true,
          duration: 2000,
        })
        reset()
        router.push('/company-setup')
      },
      onError: () => {
        toast.error(serverError, {
          dismissible: true,
          duration: 2000,
        })
      }
    })
  }

  return (
    <div className='min-h-screen w-full flex items-center justify-center p-4'>
      <Card className='w-full max-w-lg shadow-md py-6 px-2'>
        <CardHeader className='gap-2 mb-4'>
          <CardTitle className='text-xl font-sans font-semibold tracking-wide'>
            Create Account
          </CardTitle>
          <CardDescription>Create an account to start managing payroll, employees, and payslips</CardDescription>
        </CardHeader>
        <CardContent>
          {renderForm(<form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className='grid grid-cols-2 gap-2'>
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Enter your First Name"
                    aria-invalid={Boolean(errors.first_name)}
                    required
                    className='h-10 text-sm font-medium tracking-wide rounded-sm outline-none focus-within:border-0 focus-within:outline-0'
                    {...register('first_name')}
                  />
                  {errors.first_name?.message ? (
                    <p className='text-xs text-destructive'>{String(errors.first_name.message)}</p>
                  ) : null}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    type="text"
                    placeholder="Enter your Last Name"
                    aria-invalid={Boolean(errors.last_name)}
                    required
                    className='h-10 text-sm font-medium tracking-wide rounded-sm outline-none focus-within:border-0 focus-within:outline-0'
                    {...register('last_name')}
                  />
                  {errors.last_name?.message ? (
                    <p className='text-xs text-destructive'>{String(errors.last_name.message)}</p>
                  ) : null}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  aria-invalid={Boolean(errors.email)}
                  required
                  className='h-10 text-sm font-medium tracking-wide rounded-sm outline-none focus-within:border-0 focus-within:outline-0'
                  {...register('email')}
                />
                {errors.email?.message ? (
                  <p className='text-xs text-destructive'>{String(errors.email.message)}</p>
                ) : null}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your Phone number"
                  aria-invalid={Boolean(errors.phone)}
                  required
                  className='h-10 text-sm font-medium tracking-wide rounded-sm outline-none focus-within:border-0 focus-within:outline-0'
                  {...register('phone')}
                />
                {errors.phone?.message ? (
                  <p className='text-xs text-destructive'>{String(errors.phone.message)}</p>
                ) : null}
              </div>
              <div className='flex flex-col gap-1'>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <div className='relative'>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      aria-invalid={Boolean(errors.password)}
                      placeholder='Enter your password'
                      required
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
              <Button type="submit" disabled={isPending} className='py-6 text-base cursor-pointer'>
                {isPending ? <Spinner data-icon="inline-start" /> : null}
                {isPending ? "Creating Account" : "Create Account"}
              </Button>
              <p className='text-center text-sm text-muted-foreground'>Already have an account? <Link href="/company-login" className='text-foreground'>Log In</Link></p>
            </div>

          </form>)}
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateCompanyAccount
