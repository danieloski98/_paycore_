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

type AddEarningModalData = {
  type: "employee" | "payroll";
  submitEarning: (payload: { type: string; amount: number; description?: string }) => Promise<any>;
  invalidateKeys?: any[][];
};

export default function Earnings() {
  const { switchTo, close } = useEarningsDeductions();
  const { data } = useModal();
  const queryClient = useQueryClient();
  const modalData = (data || {}) as AddEarningModalData;

  const [earningType, setEarningType] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const { mutate: saveEarning, isPending } = useMutation({
    mutationFn: async () => {
      if (!modalData?.submitEarning) {
        throw new Error("Missing submitEarning handler in modal data");
      }
      const payload = {
        type: earningType,
        amount: Number(amount || 0),
        description: description || undefined,
      };
      return modalData.submitEarning(payload);
    },
    onSuccess: () => {
      if (modalData?.invalidateKeys && Array.isArray(modalData.invalidateKeys)) {
        modalData.invalidateKeys.forEach((key) => {
          if (Array.isArray(key)) {
            queryClient.invalidateQueries({ queryKey: key });
          }
        });
      }
      toast.success("Earning added successfully");
      switchTo("main-view");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || error?.message || "Failed to add earning"
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
          <DialogTitle className="text-xl font-bold">Add Earnings</DialogTitle>
          <DialogDescription>Create a custom earning adjustment.</DialogDescription>
        </div>
      </DialogHeader>

      <div className="space-y-4">
        {/* Earning Type */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Earning Type</Label>
          <Select value={earningType} onValueChange={setEarningType}>
            <SelectTrigger className="w-full h-11 bg-muted/40 cursor-pointer">
              <SelectValue placeholder="Select an earning type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BASIC_SALARY">BASIC_SALARY</SelectItem>
              <SelectItem value="ALLOWANCE">ALLOWANCE</SelectItem>
              <SelectItem value="BONUS">BONUS</SelectItem>
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
            onClick={() => saveEarning()}
            disabled={isPending || !earningType || !amount}
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Saving...
              </>
            ) : (
              "Save Earning"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
