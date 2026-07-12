"use client";

import { useEffect } from "react";
import { Controller, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { useModal } from "@/hooks/use-modal";
import useForm from "@/hooks/use-form";
import { userSchema, UserFormValues } from "@/lib/schemas";

import { AppDialog } from "@/components/shared/app-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { AuthUser, authUserAtom } from "@/states/auth-user-state";
import { useUpdateUser } from "@/hooks/use-user";
import { format } from "date-fns";
import { useAtom, useSetAtom } from "jotai";

const ROLE_OPTIONS: { label: string; value: AuthUser["role"] }[] = [
    { label: "Super Admin", value: "SUPER_ADMIN" },
    { label: "Admin", value: "ADMIN" },
    { label: "User", value: "USER" },
    { label: "Employee", value: "EMPLOYEE" },
];

export function EditUserModal() {
    // `data` is the user passed via openModal("edit-user", someUser) —
    // this is the record being edited, NOT necessarily the logged-in viewer
    const [user, setAuthUser] = useAtom(authUserAtom);
    const { isOpen, closeModal, data } = useModal();
    // const user = data as AuthUser | undefined;

    const { mutate, isPending } = useUpdateUser(user?.id ?? "");

    const {
        renderForm,
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm({
        resolver: userSchema,
        mode: "onSubmit",
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            picture: null,
            role: "SUPER_ADMIN",
            isActive: true,
        },
    });

    useEffect(() => {
        if (!user) return;
        reset({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            picture: user.picture,
            isActive: user.isActive,
        });
    }, [user, reset]);

    const onSubmit: SubmitHandler<UserFormValues> = (values) => {
        mutate(values, {
            onSuccess() {
                if (user) {
                    setAuthUser({ ...user, ...values, role: values.role as AuthUser["role"] })
                }
                toast.success("User updated successfully");
                closeModal();
            },
            onError(error: any) {
                toast.error(error?.response?.data?.message ?? "Unable to update user");
            },
        });
    };

    return (
        <AppDialog
            open={isOpen("edit-user")}
            onOpenChange={closeModal}
            title="Edit User"
            size="md"
        >
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={user?.picture ?? undefined} />
                        <AvatarFallback>
                            {user?.firstName[0]}
                            {user?.lastName[0]}
                        </AvatarFallback>
                    </Avatar>

                    <div className="space-y-1">
                        <p className="font-semibold text-xl">
                            {user?.firstName} {user?.lastName}
                        </p>
                    </div>
                </div>

                {renderForm(
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>First Name</Label>
                                <Input placeholder="John" {...register("firstName")} />
                                {errors.firstName?.message && (
                                    <p className="text-xs text-destructive">
                                        {/* @ts-ignore */}
                                        {errors.firstName?.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Last Name</Label>
                                <Input placeholder="Doe" {...register("lastName")} />
                                {errors.lastName?.message && (
                                    <p className="text-xs text-destructive">
                                        {/* @ts-ignore */}
                                        {errors.lastName?.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input type="email" placeholder="john@email.com" {...register("email")} />
                            {errors.email?.message && (
                                <p className="text-xs text-destructive">
                                    {/* @ts-ignore */}
                                    {errors.email?.message}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Role</Label>
                                <Controller
                                    control={control}
                                    name="role"
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange} disabled>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {ROLE_OPTIONS.map((r) => (
                                                    <SelectItem key={r.value} value={r.value}>
                                                        {r.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Account Status</Label>
                                <Controller
                                    control={control}
                                    name="isActive"
                                    render={({ field }) => (
                                        <div className="flex h-9 items-center gap-3 rounded-md border px-3">
                                            <Switch disabled checked={field.value} onCheckedChange={field.onChange} />
                                            <span className="text-sm text-muted-foreground">
                                                {field.value ? "Active" : "Suspended"}
                                            </span>
                                        </div>
                                    )}
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* <div className="grid gap-1 text-xs text-muted-foreground md:grid-cols-2">
                            <p>Created {format(new Date(user?.createdAt!), "PP")}</p>
                            <p>Last updated {format(new Date(user?.updatedAt!), "PP")}</p>
                        </div> */}

                        <div className="flex justify-end gap-3 pt-2">
                            <Button type="button" variant="outline" onClick={closeModal}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? "Saving..." : "Save changes"}
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </AppDialog>
    );
}