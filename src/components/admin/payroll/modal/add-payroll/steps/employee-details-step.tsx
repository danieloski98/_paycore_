"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { payrollAtom, updatePayrollAtom } from "@/states/payroll-state";
import { useGetEmployees } from "@/hooks/use-employees";
import { EmployeeSearch } from "../employee-search";
import { EmployeeList } from "../employee-list";
import { authUserAtom } from "@/states/auth-user-state";
import { useMemo, useState } from "react";



export default function EmployeeDetailsStep() {
  const [user] = useAtom(authUserAtom)
  const payroll = useAtomValue(payrollAtom);
  const updatePayroll = useSetAtom(updatePayrollAtom);
  const [search, setSearch] = useState("");

  const { employees, isLoading } = useGetEmployees();


  const filteredEmployees = useMemo(() => {
    if (!search.trim()) return employees;

    const query = search.toLowerCase();

    return employees.filter((employee) => {
      const fullName =
        `${employee.firstName} ${employee.lastName}`.toLowerCase();

      return (
        fullName.includes(query) ||
        employee.email.toLowerCase().includes(query) ||
        employee.position.toLowerCase().includes(query) ||
        employee.department.toLowerCase().includes(query)
      );
    });
  }, [employees, search]);

  return (
    <div className="space-y-6">
      <EmployeeSearch
        value={search}
        onChange={setSearch}
      />

      <EmployeeList
        employees={filteredEmployees}
        loading={isLoading}
        selectedIds={payroll.employeeIds}
        onChange={(employeeIds) =>
          updatePayroll({
            employeeIds,
          })
        }
      />
    </div>
  );
}