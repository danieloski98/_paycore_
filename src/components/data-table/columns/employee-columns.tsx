"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal";
import { EmployeeType } from "@/models/employee-models";


export const employeeColumns: ColumnDef<EmployeeType>[] = [
  {
    accessorKey: "name",
    header: "Name",
    filterFn: "equals",
    cell: ({ row }) => {
      const employee = row.original;
      return (
        <div className="flex items-center gap-3 ml-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={employee.picture} />
            <AvatarFallback>
              {employee.firstName
                .split(" ")
                .map((x) => x[0])
                .join("")}
              {employee.lastName
                .split(" ")
                .map((x) => x[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{`${employee.firstName} ${employee.lastName}`}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    filterFn: "equals",
    cell: ({ row }) => {
      const employee = row.original;
      return (
        <div className="flex items-center gap-3">
          <p className="text-sm text-black">{employee.email}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "position",
    header: "Position",
    filterFn: "equals",
    cell: ({ row }) => {
      const employee = row.original;
      return (
        <div className="flex items-center gap-3">
          <p className="text-sm text-black">{employee.position}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => {
      const employee = row.original;
      return (
        <div className="flex items-center gap-3">
          <p className="text-sm text-black">{employee.salary}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "department",
    header: "Department",
    filterFn: "equals", // exact match for dropdown filter
    cell: ({ row }) => {
      const employee = row.original;
      return (
        <div className="flex items-center gap-3">
          <p className="text-sm text-black">{employee.department}</p>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   filterFn: "equals",
  //   cell: ({ row }) => {
  //     const status = row.original.status;
  //     return (
  //       <Badge
  //         variant={
  //           status === "Active"
  //             ? "default"
  //             : status === "On Leave"
  //               ? "secondary"
  //               : "destructive"
  //         }
  //       >
  //         {status}
  //       </Badge>
  //     );
  //   },
  // },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const router = useRouter()
      const { openModal } = useModal()
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push(`/admin/employees/${row.original.id}`)}>
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => openModal("edit-employee", row.original)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600" onClick={() => openModal("delete-employee", row.original)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];