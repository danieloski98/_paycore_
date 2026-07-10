"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  UserPlus,
  FileSpreadsheet,
  ArrowLeft,
  X,
} from "lucide-react";

import { useModal } from "@/hooks/useModal";
import AddEmployee from "./add-employee";
import UploadCSV from "./upload-csv";

type View = "initial" | "employee" | "upload";

export default function NewEmployee() {
  const { isOpen, closeModal } = useModal();

  const [view, setView] = useState<View>("initial");

  const handleClose = () => {
    setView("initial");
    closeModal();
  };

  return (
    <Dialog
      open={isOpen("new-employee")}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent
        className="sm:max-w-155 p-0 overflow-hidden"
        showCloseButton={false}
      >
        {view === "initial" && (
          <>
            <DialogHeader className="px-6 pt-6">
              <DialogTitle className="text-center text-xl">
                How would you like to onboard your staff?
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 px-6 pb-6">

              <button
                onClick={() => setView("employee")}
                className="w-full rounded-xl border p-5 text-left transition hover:border-primary hover:bg-muted"
              >
                <div className="flex gap-4">
                  <UserPlus className="mt-1 h-8 w-8 text-primary" />

                  <div>
                    <h3 className="font-semibold">
                      Add Individual Staff
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      Quickly add a single team member manually.
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setView("upload")}
                className="w-full rounded-xl border p-5 text-left transition hover:border-primary hover:bg-muted"
              >
                <div className="flex gap-4">
                  <FileSpreadsheet className="mt-1 h-8 w-8 text-primary" />

                  <div>
                    <h3 className="font-semibold">
                      Upload Spreadsheet
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      Import multiple staff using CSV or XLSX.
                    </p>
                  </div>
                </div>
              </button>

              <Button
                variant="secondary"
                className="w-full py-6"
                onClick={handleClose}
              >
                {/* <ArrowLeft className="mr-2 h-4 w-4" /> */}
                Cancel
              </Button>
            </div>
          </>
        )}

        {view === "employee" && (
          <AddEmployee
            onBack={() => setView("initial")}
            onClose={handleClose}
          />
        )}

        {view === "upload" && (
          <UploadCSV
            onBack={() => setView("initial")}
            onClose={handleClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}