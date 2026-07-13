"use client";

import { AppDialog } from "@/components/shared/app-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteEmployee } from "@/hooks/use-employees";
import { useModal } from "@/hooks/use-modal";
import { EmployeeType } from "@/models/employee-models";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

export function DeleteEmployeeModal() {
  const { isOpen, closeModal, data } = useModal<EmployeeType>();
  const { mutate, isPending } = useDeleteEmployee();
  const queryClient = useQueryClient();


  const handleDelete = () => {
    if (!data?.id) return;

    mutate(data.id, {
      onSuccess: async () => {
        toast.success("Employee deleted");

        await queryClient.invalidateQueries({
          queryKey: ["employees"],
        });

        closeModal();
      },

      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ??
          "Unable to delete employee"
        );
      },
    });
  };

  return (
    <AppDialog
      open={isOpen("delete-employee")}
      onOpenChange={(open) => !open && closeModal()}
      title="Delete Employee"
      size="sm"
    >
      <div className="space-y-8">
        <p className="text-center text-muted-foreground">
          Are you sure you want to delete{" "}? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={closeModal}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </div>
    </AppDialog>
  );
}