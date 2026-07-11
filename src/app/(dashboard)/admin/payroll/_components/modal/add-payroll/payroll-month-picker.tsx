"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type MonthYearPickerProps = {
  month: number;
  year: number;
  onChange: (month?: number, year?: number) => void;
  disableYear?: boolean;
};

const months = [
  { label: "January", value: 0 },
  { label: "February", value: 1 },
  { label: "March", value: 2 },
  { label: "April", value: 3 },
  { label: "May", value: 4 },
  { label: "June", value: 5 },
  { label: "July", value: 6 },
  { label: "August", value: 7 },
  { label: "September", value: 8 },
  { label: "October", value: 9 },
  { label: "November", value: 10 },
  { label: "December", value: 11 },
];

export default function PayrollMonthPicker({
  month,
  year,
  onChange,
  disableYear = true,
}: MonthYearPickerProps) {
  return (
    <div className="flex gap-4">
      <Select
        value={month?.toString()}
        onValueChange={(value) => onChange(Number(value), year)}
      >
        <SelectTrigger className="flex-1">
          <SelectValue placeholder="Select Month" />
        </SelectTrigger>

        <SelectContent>
          {months.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value.toString()}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="number"
        value={year ?? ""}
        disabled={disableYear}
        placeholder="Year"
        onChange={(e) =>
          onChange(month, Number(e.target.value))
        }
      />
    </div>
  );
}