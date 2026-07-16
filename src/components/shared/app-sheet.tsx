"use client";

import { ReactNode } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type AppSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title?: ReactNode;
  description?: ReactNode;

  children: ReactNode;

  side?: "top" | "right" | "bottom" | "left";

  size?: "sm" | "md" | "lg" | "xl" | "full";
};

const sizes = {
  sm: "w-[400px] sm:max-w-[400px]",
  md: "w-[500px] sm:max-w-[500px]",
  lg: "w-[640px] sm:max-w-[640px]",
  xl: "w-[800px] sm:max-w-[800px]",
  full: "w-screen max-w-screen",
};

export function AppSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  side = "right",
  size = "md",
}: AppSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={side}
        className={sizes[size]}
      >
        {(title || description) && (
          <SheetHeader className="mb-6">
            {title && (
              <SheetTitle className="text-xl font-semibold">
                {title}
              </SheetTitle>
            )}

            {description && (
              <SheetDescription>
                {description}
              </SheetDescription>
            )}
          </SheetHeader>
        )}

        {children}
      </SheetContent>
    </Sheet>
  );
}