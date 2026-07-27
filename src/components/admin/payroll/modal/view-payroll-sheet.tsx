"use client";

import { useModal } from "@/hooks/use-modal";
import { cn, formatMonthYear, getPayrollStatusStyle } from "@/lib/utils";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

export default function PayrollDetailsSheet() {
    const { isOpen, closeModal, data } = useModal();

    const styles = getPayrollStatusStyle(data?.status!);

    if (!data) return null;

    return (
        <Sheet
            open={isOpen("payroll-details")}
            onOpenChange={(open) => {
                if (!open) closeModal();
            }}
        >
            <SheetContent
                side="right"
                className="w-full max-w-md p-0 flex flex-col"
            >
                {/* Header */}
                <SheetHeader className="flex-row items-center justify-between border-b px-8 py-6">
                    <SheetTitle className="text-xl font-semibold">
                        Payroll Details
                    </SheetTitle>
                </SheetHeader>

                {/* Body */}
                <div className="flex flex-1 flex-col justify-between p-8">
                    <div className="rounded-lg bg-muted/40 p-4">
                        <div className="flex items-center justify-between border-b py-5">
                            <p className="text-muted-foreground">
                                Payroll Name
                            </p>

                            <p className="font-medium">
                                {data?.name!}
                            </p>
                        </div>

                        <div className="flex items-center justify-between border-b py-5">
                            <p className="text-muted-foreground">
                                Status
                            </p>

                            <span
                                className={cn(`rounded-md px-4 py-1 text-xs font-medium`, styles?.textColor!, styles?.bgColor!)}
                            >
                                {data?.status}
                            </span>
                        </div>

                        <div className="flex items-center justify-between py-5">
                            <p className="text-muted-foreground">
                                Date Processed
                            </p>

                            <p className="font-medium">
                                {formatMonthYear(data?.month, data?.year)}
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 flex justify-end">
                        <Button>
                            Export
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}