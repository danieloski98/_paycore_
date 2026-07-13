"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Building2,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";

import { Department } from "@/models/departments";
import { useModal } from "@/hooks/use-modal";

interface Props {
  departments: Department[];
  selected?: Department | null;

  loading?: boolean;
  deleting?: boolean;

  onSelect: (department: Department) => void;
  onDelete: (department: Department) => void;
  onAdd: () => void;
}

export function DepartmentListCard({
  departments,
  selected,
  loading,
  deleting,
  onSelect,
  onDelete,
  onAdd,
}: Props) {
  const { openModal } = useModal()
  return (
    <Card className="h-fit">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Departments</CardTitle>

          <CardDescription>
            Create and manage your company's departments.
          </CardDescription>
        </div>

        <Button onClick={() => openModal("add-department")}>
          <Plus className="mr-2 h-4 w-4" />
          New Department
        </Button>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-125 pr-3">
          {/* Loading */}
          {loading && (
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-lg border p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-lg" />

                      <div className="space-y-2">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Skeleton className="h-9 w-9 rounded-md" />
                      <Skeleton className="h-9 w-9 rounded-md" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && departments.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Building2 className="h-8 w-8 text-muted-foreground" />
              </div>

              <h3 className="mt-4 text-lg font-semibold">
                No Departments
              </h3>

              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Departments help organize employees. Create your first
                department to get started.
              </p>

              <Button
                className="mt-6"
                onClick={onAdd}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Department
              </Button>
            </div>
          )}

          {/* Department List */}
          {!loading && departments.length > 0 && (
            <div className="space-y-2">
              {departments.map((department) => {
                const active =
                  selected?.id === department.id;

                return (
                  <div
                    key={department.id}
                    onClick={() => onSelect(department)}
                    className={`group cursor-pointer rounded-xl border p-4 transition-all duration-200 ${active
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "hover:border-primary/30 hover:bg-muted/40"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-lg ${active
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                            }`}
                        >
                          <Building2 className="h-5 w-5" />
                        </div>

                        <div>
                          <p className="font-medium">
                            {department.name}
                          </p>

                          <p className="text-sm text-muted-foreground">
                            Department
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelect(department);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>

                        <Button
                          size="icon"
                          variant="ghost"
                          disabled={deleting}
                          className="text-destructive hover:text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(department);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}