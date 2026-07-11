"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

export function EmployeeSearch({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

      <Input
        className="pl-10"
        placeholder="Search employee..."
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}