"use client"

import React, { useEffect, useState } from 'react'
import EmployeeUploader from '../employee-upload';
import { toast } from 'sonner';
import { EmployeeType } from '@/models/employee-models';
import { Button } from '@/components/ui/button';
import { useUploadEmployees } from '@/hooks/use-employees';
import useForm from '@/hooks/use-form';
import { SubmitHandler } from 'react-hook-form';
import { UploadEmployeesFormValues, uploadEmployeesSchema } from '@/lib/schemas';
import { useModal } from '@/hooks/useModal';

const UploadEmployeesForm = () => {
  const { isPending, mutate, error } = useUploadEmployees()
  const { closeModal } = useModal()


  const {
    handleSubmit,
    setValue,
    renderForm,
    register
  } = useForm({
    mode: 'onSubmit',
    resolver: uploadEmployeesSchema,
    defaultValues: {
      employees: [],
    },
  });

  useEffect(() => {
    register("employees");
  }, [register]);

  const onSubmit: SubmitHandler<{
    employees: EmployeeType[];
  }> = (values) => {
    mutate(values, {
      onSuccess: () => {
        toast.success("Employees uploaded successfully");
        closeModal()
      },
      onError: () => {
        toast.error(error?.message);
      },
    });
  };

  return (
    <div className='flex flex-col gap-2'>
      {renderForm(<form onSubmit={handleSubmit(onSubmit)}>
        <EmployeeUploader
          onUpload={(employees) => {
            setValue("employees", employees, {
              shouldDirty: true,
              shouldValidate: true,
            });
            toast.success(`${employees.length} employees loaded`);
          }}
        />
        <div className='flex items-center gap-2 w-full mt-4'>
          <Button variant={"outline"} className='flex-1 py-5'>
            Download Template
          </Button>
          <Button
            className='flex-1 py-5'
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Uploading..." : "Upload Employees"}
          </Button>
        </div>
      </form>)}
    </div>

  )
}

export default UploadEmployeesForm