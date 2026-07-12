"use client"

import { AppDialog } from '@/components/shared/app-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAddDepartment, useEditDepartment } from '@/hooks/use-department'
import useForm from '@/hooks/use-form'
import { useModal } from '@/hooks/use-modal'
import { DepartmentFormValues, departmentSchema } from '@/lib/schemas'
import React from 'react'
import { SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'

const AddDepartmentModal = () => {
    const { closeModal, isOpen } = useModal()
    const {
        mutate: createDepartment,
        isPending: creating,
    } = useAddDepartment();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: "onSubmit",
        resolver: departmentSchema,
        defaultValues: {
            name: "",
        },
    });

    const onSubmit: SubmitHandler<DepartmentFormValues> = (
        values
    ) => {

        createDepartment(values, {
            onSuccess: () => {
                toast.success("Department created");
                closeModal()
                reset();
            },
            onError: (error: any) => {
                toast.error(
                    error?.response?.data?.message ??
                    "Unable to create department"
                );
            },
        });
    };

    return (
        <AppDialog
            open={isOpen("add-department")}
            onOpenChange={closeModal}
            title="New Department"
            description="Create a new department."
            size="md"
        >
            {/* <Card className="h-fit">
                <CardContent> */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className='flex flex-col gap-1'>
                            <label className="text-sm font-medium">
                                Department Name
                            </label>

                            <Input
                                placeholder="Engineering"
                                {...register("name")}
                            />

                            {errors.name && (
                                <p className="text-sm text-destructive">
                                    {/* @ts-ignore */}
                                    {errors?.name.message}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={creating}
                            className="w-full"
                        >
                            {creating
                                ? "Creating Department"
                                : "Create Department"}
                        </Button>
                    </form>
                {/* </CardContent>
            </Card> */}
        </AppDialog>
    )
}

export default AddDepartmentModal