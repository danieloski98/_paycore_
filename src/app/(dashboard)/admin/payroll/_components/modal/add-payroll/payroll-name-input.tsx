"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  value: string;

  onChange(value: string): void;
}

export function PayrollNameInput({
  value,
  onChange,
}: Props) {
  return (
    <div className="space-y-2">

      <Label>Payroll Name</Label>

      <Input
        placeholder="Enter payroll name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

    </div>
  );
}