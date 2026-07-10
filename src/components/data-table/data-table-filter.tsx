"use client";

import { Column } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type FilterOption = {
  label: string;
  value: string;
};

interface DataTableFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  label: string;
  options: FilterOption[];
  type?: 'select' | 'year'
}

export function DataTableFilter<TData, TValue>({
  column,
  label,
  options,
  type
}: DataTableFilterProps<TData, TValue>) {
  if (!column) return null;

  const currentYear = new Date().getFullYear();

  const years = Array.from(
    { length: currentYear - 2020 + 1 },
    (_, i) => ({
      label: String(currentYear - i),
      value: String(currentYear - i),
    })
  );

  const filterOptions =
    type === "year" ? years : options ?? [];

  return (
    <Select
      value={(column?.getFilterValue() as string) ?? "all"}
      onValueChange={(value) =>
        column?.setFilterValue(value === "all" ? undefined : value)
      }
    >
      <SelectTrigger className="w-36">
        <SelectValue placeholder={label} />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">
          All {label}
        </SelectItem>

        {filterOptions.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}