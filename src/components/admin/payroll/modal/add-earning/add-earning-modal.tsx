"use client";

import React from "react";
import { AppDialog } from "@/components/shared/app-dialog";
import { useEarningsDeductions } from "@/hooks/use-earnings-deductions";
import { useModal } from "@/hooks/use-modal";
import MainView from "./main-view";
import Earnings from "./earnings";
import Deductions from "./deductions";

export default function AddEarningModal() {
  const { screen, close } = useEarningsDeductions();
  const { isOpen } = useModal();

  return (
    <AppDialog
      open={isOpen("add-earning")}
      onOpenChange={(open) => !open && close()}
      size="lg"
    >
      <div className="p-2">
        {screen === "main-view" && <MainView />}
        {screen === "earnings" && <Earnings />}
        {screen === "deductions" && <Deductions />}
      </div>
    </AppDialog>
  );
}
