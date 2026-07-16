"use client"

import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { useEffect, useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAtom } from 'jotai'
import { authUserAtom } from '@/states/auth-user-state'
import useForm from '@/hooks/use-form'
import { CompanyFormValues, companySchema } from '@/lib/schemas'
import { useGetCompany, useUpdateCompany, useUpdateCompanyLogo } from '@/hooks/use-company'
import { SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import { useUploadImage } from '@/hooks/use-upload'

const CompanyProfile = () => {
    const [user] = useAtom(authUserAtom)
    const [enableCompanyEdit, setEnableCompanyEdit] = useState(false)

    const { company, isLoading } = useGetCompany(user?.companyId ?? "");
    const { mutate: updateCompany, isPending } = useUpdateCompany(user?.companyId ?? "");

    const fileInputRef = useRef<HTMLInputElement>(null);
    const { mutate: updateCompanyLogo, isPending: isSavingLogo } = useUpdateCompanyLogo();

    const [logoPreview, setLogoPreview] = useState<string | undefined>();
    // console.log(company)

    const {
        renderForm,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: companySchema,
        mode: "onSubmit",
        defaultValues: {
            name: "",
            RCNumber: "",
            address: "",
            industry: "",
            phone: "",
            taxId: "",
        },
    });

    // populate the form once company data arrives, and again whenever it's refetched
    useEffect(() => {
        if (!company) return;
        reset({
            name: company.name,
            RCNumber: company.RCNumber,
            address: company.address,
            industry: company.industry,
            phone: company.phone,
            taxId: company.taxId,
        });
    }, [company, reset]);

    const onSubmit: SubmitHandler<CompanyFormValues> = (values) => {
        updateCompany(values, {
            onSuccess(data) {
                // reset to the saved values, not to blank defaults —
                // swap `data` below for whatever your mutation actually returns
                reset(data ?? values);
                setEnableCompanyEdit(false);
                toast.success("Company updated successfully");
            },
            onError(error: any) {
                toast.error(error?.response?.data?.message ?? "Unable to update company");
            },
        });
    };

    const handleActionClick = () => {
        if (!enableCompanyEdit) {
            setEnableCompanyEdit(true);
            return;
        }
        handleSubmit(onSubmit)();
    };


    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = ""; // allow re-selecting the same file later
        if (!file) return;

        if (!user?.companyId) {
            toast.error("No company found for this account");
            return;
        }

        // optimistic local preview while the upload/update round-trip is in flight
        const localPreview = URL.createObjectURL(file);
        setLogoPreview(localPreview);

        updateCompanyLogo(
            { companyId: user.companyId, file },
            {
                onSuccess(logo) {
                    setLogoPreview(logo);
                    toast.success("Logo updated");
                },
                onError(error: any) {
                    toast.error(error?.response?.data?.message ?? error?.message ?? "Unable to save logo");
                    setLogoPreview(company?.logo ?? undefined); // revert the optimistic preview
                },
            }
        );

    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                    <CardTitle>Company Profile</CardTitle>
                    <CardDescription>Update your registered business information and address.</CardDescription>
                </div>
                <Button
                    type="button"
                    variant="default"
                    size="sm"
                    disabled={isPending}
                    onClick={handleActionClick}
                >
                    {isPending && <Spinner data-icon="inline-start" />}
                    {enableCompanyEdit ? (isPending ? "Saving..." : "Save") : "Enable Edit"}
                </Button>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className='flex items-center gap-6'>
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={logoPreview ?? company?.logo!} />
                        <AvatarFallback>JA</AvatarFallback>
                    </Avatar>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoChange}
                    />

                    <Button
                        variant="outline"
                        type="button"
                        disabled={isSavingLogo}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {isSavingLogo ? (
                            <Spinner data-icon="inline-start" />
                        ) : (
                            <Upload className="mr-2 h-4 w-4" />
                        )}
                        {isSavingLogo ? "Uploading..." : "Upload Company Logo"}
                    </Button>
                </div>

                {renderForm(
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label className="text-sm font-semibold mb-2 block">Company Legal Name</label>
                                <Input
                                    disabled={!enableCompanyEdit || isLoading}
                                    className='capitalize'
                                    {...register("name")}
                                />
                                {errors.name?.message && (
                                    <p className="text-xs text-destructive mt-1">
                                        {/* @ts-ignore */}
                                        {errors.name?.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="text-sm font-semibold mb-2 block">Registration Number (RC)</label>
                                <Input disabled={!enableCompanyEdit || isLoading} {...register("RCNumber")} />
                                {errors.RCNumber?.message && (
                                    <p className="text-xs text-destructive mt-1">
                                        {/* @ts-ignore */}
                                        {errors.RCNumber?.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-semibold mb-2 block">Registered Address</label>
                            <Input disabled={!enableCompanyEdit || isLoading} {...register("address")} />
                            {errors.address?.message && (
                                <p className="text-xs text-destructive mt-1">
                                    {/* @ts-ignore */}
                                    {errors.address?.message}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label className="text-sm font-semibold mb-2 block">Phone</label>
                                <Input type="tel" disabled={!enableCompanyEdit || isLoading} {...register("phone")} />
                                {errors.phone?.message && (
                                    <p className="text-xs text-destructive mt-1">
                                        {/* @ts-ignore */}
                                        {errors.phone?.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="text-sm font-semibold mb-2 block">Industry</label>
                                <Input disabled={!enableCompanyEdit || isLoading} {...register("industry")} />
                                {errors.industry?.message && (
                                    <p className="text-xs text-destructive mt-1">
                                        {/* @ts-ignore */}
                                        {errors.industry?.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label className="text-sm font-semibold mb-2 block">Tax ID</label>
                                <Input disabled={!enableCompanyEdit || isLoading} {...register("taxId")} />
                                {errors.taxId?.message && (
                                    <p className="text-xs text-destructive mt-1">
                                        {/* @ts-ignore */}
                                        {errors.taxId?.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </form>
                )}
            </CardContent>
        </Card>
    )
}

export default CompanyProfile