"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type CustomDatePickerProps = {
  label: string;
  placeholder?: string;
  value?: Date;
  onChange: (date: Date | undefined) => void;
  disabled?: boolean;
};

export default function CustomDatePicker({
  label,
  placeholder = "Select date",
  value,
  onChange,
  disabled = false,
}: CustomDatePickerProps) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full justify-between text-left font-normal h-10",
              !value && "text-muted-foreground"
            )}
          >
            {value ? format(value, "PPP") : placeholder}

            <CalendarIcon className="h-4 w-4 opacity-60" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}