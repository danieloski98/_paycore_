"use client";

import { Column } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface YearFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  startYear?: number;
}

export function YearFilter<TData, TValue>({
  column,
  startYear = 2020,
}: YearFilterProps<TData, TValue>) {
  if (!column) return null;

  const currentYear = new Date().getFullYear();

  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => String(currentYear - i)
  );

  return (
    <Select
      value={(column.getFilterValue() as string) ?? "all"}
      onValueChange={(value) =>
        column.setFilterValue(value === "all" ? undefined : value)
      }
    >
      <SelectTrigger className="w-28">
        <SelectValue placeholder="Year" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">All Years</SelectItem>

        {years.map((year) => (
          <SelectItem key={year} value={year}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}