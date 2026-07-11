"use client"

import { AppDialog } from '@/components/shared/app-dialog';
import { Button } from '@/components/ui/button'
import { useModal } from '@/hooks/use-modal';
import { useDeletePayroll } from '@/hooks/use-payroll';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';


const DeletePayrollModal = () => {
  const { isOpen, closeModal, data } = useModal();
  const { mutate, isPending } = useDeletePayroll();
  const queryClient = useQueryClient();

  const handleDelete = () => {
    mutate(data?.id, {
      onSuccess: () => {
        toast.success("Payroll deleted");
        queryClient.invalidateQueries({
          queryKey: ["employees"]
        })
        closeModal();
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message);
      },
    });
  };

  return (
    <AppDialog
      open={isOpen("delete-payroll")}
      onOpenChange={(open) => !open && closeModal()}
      title="Delete Payroll"
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
            {isPending ? (
              <div className='flex items-center gap-1'>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting
              </div>
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </div>
    </AppDialog>
  )
}

export default DeletePayrollModal