'use client'

import { useState } from 'react'
import { Search, Lock, Bell, Shield, Edit, EyeOff, Eye, ShieldCheck, Loader, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAtom } from 'jotai'
import { employeeAtom } from '@/states/auth-user-state'
import useForm from '@/hooks/use-form'
import { ChangeEmployeePasswordFormValues, changeEmployeePasswordSchema, ChangePasswordFormValues, changePasswordSchema } from '@/lib/schemas'
import { useChangeEmployeePassword, useChangePassword } from '@/hooks/use-auth'
import { userTypeAtom } from '@/states/user-type-state'
import { SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import { Label } from '@/components/ui/label'

const Security = () => {
    const [user] = useAtom(employeeAtom)
    const [userType] = useAtom(userTypeAtom)
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const { mutate: changePassword, error, isPending } = useChangeEmployeePassword(user?.id!);

    const {
        renderForm,
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
        },
    } = useForm({
        mode: "onChange",
        resolver: changeEmployeePasswordSchema,
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit: SubmitHandler<
        ChangeEmployeePasswordFormValues
    > = async (values) => {
        console.log(values);
        changePassword({
            id: user?.id!,
            password: values.password,
            confirmPassword: values.confirmPassword
        }, {
            onSuccess: () => {
                toast.success("Password updated successfully",
                    {
                        position: "bottom-right",
                    }
                )
            },
            onError: () => {
                toast.error(error?.message ?? "Unable to chang password", {
                    position: "bottom-right",
                });
            },
        })

        reset();
    };
    return (
        <div>
            {/* Security Section Header */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Security</h2>
                <p className="text-sm text-muted-foreground">Ensure your account remains protected with modern protocols.</p>
            </div>

            {/* Security Cards Grid */}
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
                {/* Account Password Card */}
                {renderForm(
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                            <ShieldCheck className="h-6 w-6 text-primary" />
                                        </div>

                                        <div>
                                            <CardTitle>
                                                Change Password
                                            </CardTitle>

                                            <CardDescription>
                                                Update your account password to
                                                keep your account secure.
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-8">
                                    {/* New Password */}
                                    <div className="space-y-2">
                                        <Label>Password</Label>

                                        <div className="relative">
                                            <Input
                                                type={
                                                    showNew
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="Enter new password"
                                                className="pr-10"
                                                {...register("password")}
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowNew(!showNew)
                                                }
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                            >
                                                {showNew ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>

                                        {errors.password && (
                                            <p className="text-xs text-destructive">
                                                {/* @ts-ignore */}
                                                {
                                                    errors.password
                                                        .message
                                                }
                                            </p>
                                        )}
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="space-y-2">
                                        <Label>
                                            Confirm Password
                                        </Label>

                                        <div className="relative">
                                            <Input
                                                type={
                                                    showConfirm
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="Confirm new password"
                                                className="pr-10"
                                                {...register(
                                                    "confirmPassword"
                                                )}
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowConfirm(
                                                        !showConfirm
                                                    )
                                                }
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                            >
                                                {showConfirm ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>

                                        {errors.confirmPassword && (
                                            <p className="text-xs text-destructive">
                                                {/* @ts-ignore */}
                                                {
                                                    errors
                                                        .confirmPassword
                                                        .message
                                                }
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex justify-end">
                                        <Button
                                            size="lg"
                                            type="submit"
                                            disabled={
                                                isPending
                                            }
                                        >
                                            {isPending && <Loader2 />}
                                            {isPending
                                                ? "Updating..."
                                                : "Update Password"}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </form>
                )}

                {/* Two-Factor Authentication Card */}
                <Card className='h-fit'>
                    <CardContent className="h-fit">
                        <div className="flex flex-col h-full">
                            <div className="flex items-start gap-2 mb-3">
                                <Shield className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                                <h4 className="font-semibold text-base">Two-Factor Authentication</h4>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4 flex-1">Secure your account by requiring an additional code during login.</p>
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">Comming Soon</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Security