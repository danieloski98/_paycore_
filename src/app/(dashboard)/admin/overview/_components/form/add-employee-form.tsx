"use client";

import CustomDatePicker from "@/components/customs/custom-datepicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useGetDepartments } from "@/hooks/use-department";
import { useAddEmployee } from "@/hooks/use-employees";
import useForm from "@/hooks/use-form";
import { useModal } from "@/hooks/use-modal";
import {
  addEmployeeSchema,
  AddEmployeeFormValues,
} from "@/lib/schemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns";
import { Controller, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export default function AddEmployeeForm() {
  const { mutate, isPending, error } = useAddEmployee();
  const { closeModal } = useModal()

  const {
    renderForm,
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    setValue
  } = useForm({
    mode: "onChange",
    resolver: addEmployeeSchema,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      position: "",
      department: "",
      salary: 0,
      startDate: null,
    },
  });

  const serverError = error?.message

  const {
    departments,
    isLoading,
  } = useGetDepartments();

  const onSubmit: SubmitHandler<AddEmployeeFormValues> = (
    values
  ) => {
    mutate(values, {
      onSuccess: () => {
        toast.success("Employee added successfully", {
          position: "bottom-right",
        });
        closeModal()
        reset();
      },

      onError: () => {
        toast.error(serverError ?? "Unable to add employee", {
          position: "bottom-right",
        });
      },
    });
  };

  return renderForm(
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-5">
        {/* Names */}

        <div className="grid grid-cols-2 gap-4">

          <div className="space-y-2">
            <Label>First Name</Label>

            <Input
              placeholder="John"
              {...register("firstName")}
            />

            {errors.firstName?.message && (
              <p className="text-xs text-destructive">
                {/* @ts-ignore */}
                {errors.firstName?.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Last Name</Label>

            <Input
              placeholder="Doe"
              {...register("lastName")}
            />

            {errors.lastName?.message && (
              <p className="text-xs text-destructive">
                {/* @ts-ignore */}
                {errors.lastName?.message}
              </p>
            )}
          </div>

        </div>

        {/* Email */}

        <div className="space-y-2">
          <Label>Email</Label>

          <Input
            type="email"
            placeholder="john@email.com"
            {...register("email")}
          />

          {errors.email && (
            <p className="text-xs text-destructive">
              {/* @ts-ignore */}
              {errors.email?.message}
            </p>
          )}
        </div>

        {/* Phone */}

        <div className="space-y-2">
          <Label>Phone</Label>

          <Input
            placeholder="+2348012345678"
            {...register("phone")}
          />

          {errors.phone && (
            <p className="text-xs text-destructive">
              {/* @ts-ignore */}
              {errors.phone?.message}
            </p>
          )}
        </div>

        {/* Position & Department */}

        <div className="grid grid-cols-2 gap-4">

          <div className="space-y-2">
            <Label>Position</Label>

            <Input
              placeholder="Frontend Developer"
              {...register("position")}
            />

            {errors.position && (
              <p className="text-xs text-destructive">
                {/* @ts-ignore */}
                {errors.position?.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Department</Label>

            <Controller
              control={control}
              name="department"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>

                  <SelectContent>
                    {isLoading ? (
                      <SelectItem value="loading" disabled>
                        Loading departments...
                      </SelectItem>
                    ) : departments?.length ? (
                      departments?.map(({ id, name }) => (
                        <SelectItem key={id} value={id}>
                          {name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="empty" disabled>
                        No departments found
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              )}
            />

            {errors.department && (
              <p className="text-xs text-destructive">
                {/* @ts-ignore */}
                {errors?.department.message}
              </p>
            )}
          </div>

        </div>

        {/* Salary */}

        <div className="space-y-2">
          <Label>Salary</Label>

          <Input
            type="number"
            placeholder="1000000"
            {...register("salary", {
              valueAsNumber: true,
            })}
          />

          {errors.salary && (
            <p className="text-xs text-destructive">
              {/* @ts-ignore */}
              {errors.salary?.message}
            </p>
          )}
        </div>

        {/* Start Date */}

        <div className="space-y-2">
          <Controller
            control={control}
            name="startDate"
            render={({ field }) => (
              <CustomDatePicker
                label="Start Date"
                value={field.value}
                onChange={(date) => {
                  setValue(
                    "startDate",
                    date ? format(date, "yyyy-MM-dd") : "",
                    {
                      shouldValidate: true,
                      shouldDirty: true,
                    }
                  );
                }}
              />
            )}
          />
          {errors.startDate && (
            <p className="text-xs text-destructive">
              {/* @ts-ignore */}
              {errors.startDate?.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-11"
        >
          {isPending && (
            <Spinner data-icon="inline-start" />
          )}

          {isPending
            ? "Adding Employee..."
            : "Add Employee"}
        </Button>
      </div>
    </form>
  );
}