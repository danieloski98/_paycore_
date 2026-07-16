"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmployeeType } from "@/models/employee-models";

interface Props {
    employees: EmployeeType[];

    loading?: boolean;

    selectedIds: string[];

    onChange(ids: string[]): void;
}

export function EmployeeList({
    employees,
    loading,
    selectedIds,
    onChange,
}: Props) {
    if (loading) {
        return <p>Loading...</p>;
    }

    const toggle = (id: string) => {
        if (selectedIds.includes(id)) {
            onChange(selectedIds.filter((x) => x !== id));
        } else {
            onChange([...selectedIds, id]);
        }
    };

    const toggleAll = () => {
        if (selectedIds.length === employees.length) {
            onChange([]);
        } else {
            // @ts-ignore
            onChange(employees.map((e) => e.id));
        }
    };

    return (
        <ScrollArea className="h-80 rounded-md border">
            <div className="p-4 space-y-4">

                <div className="flex items-center gap-3">

                    <Checkbox
                        checked={
                            employees.length > 0 &&
                            selectedIds.length === employees.length
                        }
                        onCheckedChange={toggleAll}
                    />

                    <span>Select All</span>

                </div>

                {employees.map((employee) => (
                    <div
                        key={employee.id}
                        className="flex items-center gap-3"
                    >
                        <Checkbox
                            // @ts-ignore
                            checked={selectedIds.includes(employee.id)}
                            // @ts-ignore
                            onCheckedChange={() => toggle(employee.id)}
                        />

                        <div>
                            <p className="font-medium">
                                {employee.firstName} {employee.lastName}
                            </p>

                            <p className="text-sm text-muted-foreground">
                                {employee.position}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </ScrollArea>
    );
}