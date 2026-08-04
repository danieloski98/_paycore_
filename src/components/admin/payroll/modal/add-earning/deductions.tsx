"use client";

import React, { useState } from "react";
import { useEarningsDeductions } from "@/hooks/use-earnings-deductions";
import { useModal } from "@/hooks/use-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

type AddDeductionModalData = {
  type: "employee" | "payroll";
  submitDeduction: (payload: { type: string; amount: number; description?: string }) => Promise<any>;
  invalidateKeys?: any[][];
};

export default function Deductions() {
  const { switchTo, close } = useEarningsDeductions();
  const { data } = useModal();
  const queryClient = useQueryClient();
  const modalData = (data || {}) as AddDeductionModalData;

  const [deductionType, setDeductionType] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const { mutate: saveDeduction, isPending } = useMutation({
    mutationFn: async () => {
      if (!modalData?.submitDeduction) {
        throw new Error("Missing submitDeduction handler in modal data");
      }
      const payload = {
        type: deductionType,
        amount: Number(amount || 0),
        description: description || undefined,
      };
      return modalData.submitDeduction(payload);
    },
    onSuccess: () => {
      if (modalData?.invalidateKeys && Array.isArray(modalData.invalidateKeys)) {
        modalData.invalidateKeys.forEach((key) => {
          if (Array.isArray(key)) {
            queryClient.invalidateQueries({ queryKey: key });
          }
        });
      }
      toast.success("Deduction added successfully");
      switchTo("main-view");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || error?.message || "Failed to add deduction"
      );
    },
  });

  return (
    <div className="space-y-6">
      <DialogHeader className="flex flex-row items-center gap-3 border-b pb-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 cursor-pointer"
          onClick={() => switchTo("main-view")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <DialogTitle className="text-xl font-bold">Add Deductions</DialogTitle>
          <DialogDescription>Create a custom deduction adjustment.</DialogDescription>
        </div>
      </DialogHeader>

      <div className="space-y-4">
        {/* Deduction Type */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Deduction Type</Label>
          <Select value={deductionType} onValueChange={setDeductionType}>
            <SelectTrigger className="w-full h-11 bg-muted/40 cursor-pointer">
              <SelectValue placeholder="Select a deduction type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="HEALTH_INSURANCE">HEALTH_INSURANCE</SelectItem>
              <SelectItem value="LOAN">LOAN</SelectItem>
              <SelectItem value="OTHER">OTHER</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Amount</Label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-base">₦</span>
            <Input
              type="number"
              className="pl-8 h-11 bg-muted/40"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Notes (Optional)</Label>
          <Input
            className="h-11 bg-muted/40"
            placeholder="Add a note"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Action Button */}
        <div className="pt-4 flex justify-end">
          <Button
            className="w-full sm:w-[150px] h-11 cursor-pointer"
            onClick={() => saveDeduction()}
            disabled={isPending || !deductionType || !amount}
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Saving...
              </>
            ) : (
              "Save Deduction"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
