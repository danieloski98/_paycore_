"use client";

import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import useForm from "@/hooks/use-form";

import {
  DepartmentFormValues,
  departmentSchema,
} from "@/lib/schemas";

import { Department } from "@/models/departments";

import {
  useAddDepartment,
  useEditDepartment,
} from "@/hooks/use-department";

interface DepartmentFormProps {
  department?: Department | null;
  onSuccess?: () => void;
}

export function DepartmentForm({
  department,
  onSuccess,
}: DepartmentFormProps) {
  const isEditing = !!department;

  const {
    mutate: createDepartment,
    isPending: creating,
  } = useAddDepartment();

  const {
    mutate: updateDepartment,
    isPending: updating,
  } = useEditDepartment(department?.id ?? "");

  const loading = creating || updating;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: departmentSchema,
    defaultValues: {
      name: "",
    },
  });

  // Populate form whenever selected department changes
  useEffect(() => {
    if (department) {
      reset({
        name: department.name,
      });
    } else {
      reset({
        name: "",
      });
    }
  }, [department, reset]);

  const onSubmit: SubmitHandler<DepartmentFormValues> = (
    values
  ) => {
    if (isEditing) {
      updateDepartment(values, {
        onSuccess: () => {
          toast.success("Department updated");
          onSuccess?.();
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message ??
            "Unable to update department"
          );
        },
      });

      return;
    }

    createDepartment(values, {
      onSuccess: () => {
        toast.success("Department created");
        reset();
        onSuccess?.();
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
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>
          {isEditing ? "Edit Department" : "New Department"}
        </CardTitle>

        <CardDescription>
          {isEditing
            ? "Update the selected department."
            : "Create a new department."}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-2">
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
            disabled={loading}
            className="w-full"
          >
            {loading
              ? isEditing
                ? "Saving..."
                : "Creating..."
              : isEditing
                ? "Save Changes"
                : "Create Department"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}