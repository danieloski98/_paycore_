// import LandingPage from '@/components/landing-page/pages/landing-page'
// export default LandingPage
"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { useSetupEmployeePassword } from '@/hooks/use-employees'
import useForm from '@/hooks/use-form'
import { EmployeeSetupFormValues, employeeSetupSchema } from '@/lib/schemas'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'



function EmployeeSetupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const searchParams = useSearchParams();
  const router = useRouter();

  const employeeId =
    searchParams.get("employeeId")

  const {
    mutate,
    isPending,
    error,
  } = useSetupEmployeePassword(employeeId!);

  const {
    renderForm,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: employeeSetupSchema,

    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const serverError = error?.message;

  const onSubmit: SubmitHandler<
    EmployeeSetupFormValues
  > = (values) => {
    mutate(values, {
      onSuccess: (response: any) => {
        toast.success(
          response?.data?.message ??
          "Password created successfully"
        );

        reset();

        router.push("/employee-login");
      },

      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ??
          serverError ??
          "Unable to create password"
        );
      },
    });
  };



  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <Card className='w-lg shadow-md py-6 px-2'>
        <CardHeader className='gap-2 mb-4'>
          <CardTitle className='text-xl font-sans font-semibold tracking-wide'>
            Create your password
          </CardTitle>
          <CardDescription>Set a password for your account</CardDescription>
        </CardHeader>
        <CardContent>
          {renderForm(<form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className='flex flex-col gap-1'>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
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
              <div className='flex flex-col gap-1'>
                <div className="grid gap-2">
                  <Label htmlFor="password">Confirm Password</Label>
                  <div className='relative'>
                    <Input
                      id="password"
                      type={showConfirmPassword ? "text" : "password"}
                      aria-invalid={Boolean(errors.password)}
                      required
                      placeholder='Enter your confirm password'
                      className='h-10 rounded-sm outline-none focus-within:border-0 focus-within:outline-0'
                      {...register('confirmPassword')}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.confirmPassword?.message ? (
                  <p className='text-xs text-destructive'>{String(errors.confirmPassword.message)}</p>
                ) : null}
              </div>
              <Button disabled={isPending} className='py-6 text-base cursor-pointer'>
                {isPending ? <Spinner data-icon="inline-start" /> : null}
                {isPending ? "Creating Password" : "Create Password"}
              </Button>
              {/* <p className='text-center text-sm text-muted-foreground'>Don't have an account? <Link href="#" className='text-black'>Sign Up</Link></p> */}
            </div>
          </form>)}
        </CardContent>
      </Card>
    </div>
  )
}

export default EmployeeSetupPage