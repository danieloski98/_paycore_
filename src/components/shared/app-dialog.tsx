"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

type AppDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title?: ReactNode;
  description?: ReactNode;

  children: ReactNode;

  size?: "sm" | "md" | "lg" | "xl";
};

const sizes = {
  sm: "sm:max-w-md",
  md: "sm:max-w-lg",
  lg: "sm:max-w-2xl",
  xl: "sm:max-w-4xl",
};

export function AppDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  size = "md",
}: AppDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={sizes[size]}>
        {(title || description) && (
          <DialogHeader className="mb-6">
            {title && <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}

        {children}
      </DialogContent>
    </Dialog>
  );
}