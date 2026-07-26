"use client"

import CustomDatePicker from '@/components/customs/custom-datepicker'
import { AppDialog } from '@/components/shared/app-dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import useForm from '@/hooks/use-form'
import { useRequestLeave } from '@/hooks/use-leave'
import { useModal } from '@/hooks/use-modal'
import { leaveRequestSchema, LeaveRequestValues } from '@/lib/schemas'
import { LEAVE_TYPES, LeaveRequestPayload } from '@/models/leave-model'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'


const EmployeeLeaveModal = () => {
  const { isOpen, closeModal } = useModal()

  const { mutate, isPending } =
    useRequestLeave();


  const { watch, renderForm, register, setValue, reset, handleSubmit, formState: { errors } } = useForm({
    mode: "onSubmit",
    resolver: leaveRequestSchema,
    defaultValues: {
      leaveType: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  })


  const onSubmit = (
    values: LeaveRequestValues
  ) => {

    mutate(values as LeaveRequestPayload, {
      onSuccess: () => {
        toast.success(
          "Leave request submitted."
        );

        reset();

        closeModal();
      },

      onError: (err: any) => {
        toast.error(
          err.message
        );
      }
    });
  };


  return (
    <AppDialog
      open={isOpen("leave-request")}
      onOpenChange={(open) => !open && closeModal()}
      title="Leave Request"
      description="Submit a leave request"
      size="md"
    >
      {renderForm(<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div className='flex flex-col gap-1'>
          <Label>
            Leave Type
          </Label>
          <Select
            value={watch("leaveType")}
            onValueChange={(value) =>
              setValue("leaveType", value, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger className='w-full py-4.5'>
              <SelectValue placeholder="Select leave type" />
            </SelectTrigger>

            <SelectContent>
              {Object.values(LEAVE_TYPES).map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors?.leaveType?.message && (
            <p className="text-xs text-destructive">
              {/* @ts-ignore */}
              {errors.leaveType?.message}
            </p>
          )}
        </div>
        <div className='flex flex-col gap-1'>
          <Label>
            Start Date
          </Label>
          <CustomDatePicker
            value={watch("startDate")}
            label=''
            onChange={(date) =>
              setValue("startDate", date?.toDateString())
            }
          />
          {errors?.startDate?.message && (
            <p className="text-xs text-destructive">
              {/* @ts-ignore */}
              {errors.startDate?.message}
            </p>
          )}
        </div>
        <div className='flex flex-col gap-1'>
          <Label>
            End Date
          </Label>
          <CustomDatePicker
            value={watch("endDate")}
            label=''
            onChange={(date) =>
              setValue("endDate", date?.toDateString())
            }
          />
          {errors?.endDate?.message && (
            <p className="text-xs text-destructive">
              {/* @ts-ignore */}
              {errors.endDate?.message}
            </p>
          )}
        </div>
        <div className='flex flex-col gap-1'>
          <Label>
            Description
          </Label>
          <Textarea
            {...register("description")}
            // rows={10}
            placeholder="Reason for leave"
            className='resize-none h-30'
          />
          {errors?.description?.message && (
            <p className="text-xs text-destructive">
              {/* @ts-ignore */}
              {errors.description?.message}
            </p>
          )}
        </div>
        <Button
          disabled={isPending}
          type='submit'
        >
          {isPending && (
            <Spinner
              data-icon="inline-start"
            />
          )}
          {isPending ? "Submitting": "Submit Request"}
        </Button>
      </form>)}
    </AppDialog>
  )
}

export default EmployeeLeaveModal