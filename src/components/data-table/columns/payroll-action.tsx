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

export function ProcessPayrollButton({
  payroll,
}: Props) {
  const { mutate: startProcessing } = useStartPayrollProcessing();

  return (
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
  );
}

export function PayrollMoreActions({
  payroll,
}: Props) {
  const { openModal } = useModal();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="ml-6">
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
          variant="destructive"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}