"use client";

import { useState } from "react";

import { DepartmentListCard } from "./_components/department-list-card";
import { DepartmentForm } from "./_components/department-list-form";
import { useDeleteDepartment, useGetDepartments } from "@/hooks/use-department";
import { toast } from "sonner";
import type { Department } from "@/models/departments";

const Department = () => {

  const [selected, setSelected] =
    useState<Department | null>(null);


  const handleAdd = () => {
    setSelected(null);
  };


  const {
    departments,
    isLoading,
  } = useGetDepartments();

  const {
    mutate: deleteDepartment,
    isPending: deleting,
  } = useDeleteDepartment();

  function handleDelete(department: Department) {
    deleteDepartment(department.id, {
      onSuccess() {
        toast.success("Department deleted");

        if (selected?.id === department.id) {
          setSelected(null);
        }
      },

      onError(error: any) {
        toast.error(
          error?.response?.data?.message ??
          "Unable to delete department"
        );
      },
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <DepartmentListCard
          departments={departments}
          loading={isLoading}
          deleting={deleting}
          selected={selected}
          onSelect={setSelected}
          onDelete={handleDelete}
          onAdd={handleAdd}
        />
      </div>
      {selected &&
        <DepartmentForm
          department={selected}
        />
      }
    </div>
  );
};

export default Department;