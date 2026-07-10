"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import ImageUpload from '@/components/file-upload'
import { companyIndustryTypes } from '@/lib/dummy'
import { useRouter } from 'next/navigation'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { userTypeAtom } from '@/states/user-type-state'
import { useCompanySetup } from '@/hooks/use-auth'
import useForm from '@/hooks/use-form'
import { CompanyUserSetupFormValues, companyUserSetupSchema } from '@/lib/schemas'
import { SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import { CompanyUserSetupPayload } from '@/lib/auth/payload'
import { useAuthUser } from '@/hooks/use-auth-user'
import FileUpload from '@/components/file-upload'
import { Upload } from 'lucide-react'
import { IMAGE_ACCEPT } from '@/lib/constants'

function CompanySetup() {
    const user = useAuthUser()
    // on completion of setup the user to be redirected to admin dashboard
    const router = useRouter()
    const [, setUserType] = useAtom(userTypeAtom)
    const [successMessage, setSuccessMessage] = useState('')
    const { isPending, mutate: company_user_setup, error } = useCompanySetup()

    const { renderForm, register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        mode: 'onChange',
        resolver: companyUserSetupSchema,
        defaultValues: {
            name: "",
            RCNumber: "",
            address: "",
            industry: "",
            logo: ""
        },
    })

    useEffect(() => {
        register("industry");
    }, [register]);


    useEffect(() => {
        setUserType("USER")
    }, [setUserType])

    const serverError = error?.response?.data?.message ?? error?.message

    const onSubmit: SubmitHandler<CompanyUserSetupFormValues> = (values) => {
        const payload: CompanyUserSetupPayload = {
            name: values.name,
            RCNumber: values.RCNumber,
            address: values.address,
            industry: values.industry,
            logo: values.logo,
        }

        setSuccessMessage('')
        company_user_setup({ userId: user?.id!, payload }, {
            onSuccess: (response) => {
                console.log(response.data.message)
                toast.success(successMessage || 'Setup Complated', {
                    position: "bottom-right",
                })
                reset()
                // Redirect to employee dashboard
                router.push('/admin/overview')
            },
            onError: () => {
                console.log("Server Error", serverError)
                toast.error(serverError!, {
                    position: "bottom-right",
                })
            }
        })
    }

    const onError = (errors: any) => {
        console.log(errors)
    }

    return (
        <div className='h-screen w-full flex flex-col items-center justify-center'>
            <Card className='w-lg shadow-md py-6 px-2 mt-10'>
                <CardHeader className='gap-1 mb-4 text-center'>
                    <CardTitle className='text-2xl font-sans font-semibold tracking-wide'>
                        Tell us about yout Company
                    </CardTitle>
                    <CardDescription className='text-[#5D5F5F] text-base font-normal'>Complete your profile to start managing payroll effortlessly.</CardDescription>
                </CardHeader>
                <CardContent>
                    {renderForm(<form onSubmit={handleSubmit(onSubmit, onError)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="logo">Company Logo</Label>

                                <FileUpload
                                    title="Upload Company Logo"
                                    description="SVG, PNG or JPG (Max 2MB)"
                                    icon={Upload}
                                    accept={IMAGE_ACCEPT}
                                    preview
                                    onUpload={(url) =>
                                        setValue("logo", url, {
                                            shouldValidate: true,
                                        })
                                    }
                                />

                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Company Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Enter company name"
                                    aria-invalid={Boolean(errors.name)}
                                    required
                                    className='h-10 text-sm font-medium tracking-wide rounded-sm outline-none focus-within:border-0 focus-within:outline-0'
                                    {...register("name")}
                                />
                                {errors.name?.message ? (
                                    <p className='text-xs text-destructive'>{String(errors.name.message)}</p>
                                ) : null}
                            </div>
                            <div className='grid grid-cols-2 gap-2'>
                                <div className="grid gap-2">
                                    <Label htmlFor="RCNumber">RC Number</Label>
                                    <Input
                                        id="RCNumber"
                                        type="text"
                                        placeholder="Enter your RC Number"
                                        aria-invalid={Boolean(errors.RCNumber)}
                                        required
                                        className='h-10 text-sm font-medium tracking-wide rounded-sm outline-none focus-within:border-0 focus-within:outline-0'
                                        {...register("RCNumber")}
                                    />
                                    {errors.first_name?.message ? (
                                        <p className='text-xs text-destructive'>{String(errors.RCNumber)}</p>
                                    ) : null}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="industry">Industry</Label>
                                    <Select
                                        onValueChange={(value) => {
                                            setValue("industry", value, {
                                                shouldValidate: true,
                                                shouldDirty: true,
                                            })
                                        }}
                                    >
                                        <SelectTrigger className="w-full py-4.75 rounded-sm">
                                            <SelectValue placeholder="Select an industry" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {companyIndustryTypes.map((industry) => (
                                                    <SelectItem key={industry.label} value={industry.value}>{industry.label}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {errors.industry?.message && (
                                        <p>{errors.form?.message}</p>
                                    )}
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="address">Company Address</Label>
                                <Textarea
                                    id='address'
                                    placeholder='Enter company address'
                                    className='h-25 resize-none'
                                    {...register("address")}
                                ></Textarea>
                                {errors.address?.message ? (
                                    <p className='text-xs text-destructive'>{String(errors.address.message)}</p>
                                ) : null}
                            </div>
                        </div>
                        <div className='flex gap-2 w-full mt-6'>
                            <Button variant="outline" className='px-16 h-12 text-black font-medium cursor-pointer'>Back</Button>
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="flex-1 h-12 cursor-pointer"
                            >
                                {isPending ? "Saving..." : "Complete Setup"}
                            </Button>
                        </div>
                    </form>)}
                </CardContent>
            </Card>
        </div >
    )
}

export default CompanySetup
