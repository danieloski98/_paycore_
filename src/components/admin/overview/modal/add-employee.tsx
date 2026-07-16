"use client";

import {
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ArrowLeft } from "lucide-react";
import AddEmployeeForm from "../form/add-employee-form";

interface Props {
  onClose: () => void;
  onBack: () => void;
}

export default function AddEmployee({
  onClose,
  onBack,
}: Props) {
  return (
    <>
      <DialogHeader className="border-b p-6">
        <div className="flex items-center justify-between">
          <DialogTitle className="text-xl font-semibold">Add Individual Staff</DialogTitle>

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </DialogHeader>

      <div className="p-6">
        <AddEmployeeForm />

        <Button
          variant="outline"
          className="mt-6"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
    </>
  );
}