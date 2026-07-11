"use client";

import {
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
  ArrowLeft,
  X,
} from "lucide-react";
import UploadEmployeesForm from "../form/upload-employee-form";


interface Props {
  onClose: () =>void;
  onBack: () =>void;
}

export default function UploadCSV({
  onClose,
  onBack,
}: Props) {
  return (
    <>
      <DialogHeader className="border-b p-6">
        <div className="flex items-center justify-between">
          <DialogTitle className="text-xl font-semibold">
            Upload Employees
          </DialogTitle>

          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
          >
            <X className="h-4 w-4"/>
          </Button>
        </div>
      </DialogHeader>

      <div className="p-6">
        <UploadEmployeesForm />

        <Button
          variant="outline"
          className="mt-6"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4"/>
          Back
        </Button>
      </div>
    </>
  );
}