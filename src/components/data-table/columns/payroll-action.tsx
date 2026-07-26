// payroll-actions.tsx
"use client";

import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { PayrollItem } from "@/models/payroll-model";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal";
import { useStartPayrollProcessing } from "@/hooks/use-payroll";
import { toPayrollDraft } from "@/components/shared/payroll-draft";

interface Props {
  payroll: PayrollItem;
}

export function PayrollActions({
  payroll,
}: Props) {
  const { openModal } = useModal();
  const { mutate: startProcessing } = useStartPayrollProcessing();


  return (
    <div className="flex items-center justify-between pr-6">
      <Button
        onClick={(e) => {
          e.stopPropagation();

          if (payroll.status === "PENDING") {
            startProcessing(payroll.id);
          }
        }}
      >
        {payroll.status === "PENDING"
          ? "Start Processing"
          : payroll.status === "PROCESSING"
            ? "Cancel Processing"
            : "Payroll Done"}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation()
              openModal("payroll-details", payroll)
            }}
          >
            <Eye className="mr-2 h-4 w-4" />
            View
          </DropdownMenuItem>

          <DropdownMenuItem onClick={(e) => {
            e.stopPropagation()
            // openModal("add-payroll", payroll)
            openModal("edit-payroll", { payroll: toPayrollDraft(payroll) })
          }}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation()
              openModal("delete-payroll", payroll)
            }}
            // className="text-red-600"
            variant="destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}