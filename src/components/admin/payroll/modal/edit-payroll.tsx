// "use client";

// import { useState, useEffect } from "react";
// import { useAtomValue, useSetAtom } from "jotai";
// import { useModal } from "@/hooks/use-modal";
// import { Button } from "@/components/ui/button";
// import { AppDialog } from "@/components/shared/app-dialog";
// import { payrollAtom, updatePayrollAtom } from "@/states/payroll-state";
// // import { PayrollStepper } from "../add-payroll/payroll-stepper";
// import { PayrollItem } from "@/models/payroll-model";
// import { Employee } from "@/models/employee-models";

// // Import step components from add-payroll
// // import { EmployeeDetailsStep, PayrollInfoStep } from "../add-payroll/steps";

// const steps = [
//   {
//     title: "Employee Details",
//     component: EmployeeDetailsStep,
//   },
//   {
//     title: "Payroll Info",
//     component: PayrollInfoStep,
//   },
// ];

// export default function EditPayrollModal() {
//   const { closeModal, isOpen, data } = useModal<PayrollItem>();
//   const payroll = useAtomValue(payrollAtom);
//   const updatePayroll = useSetAtom(updatePayrollAtom);

//   const [step, setStep] = useState(0);
//   const CurrentStep = steps[step].component;

//   // Check if payroll is editable (only PENDING status)
//   const isEditable = data?.status === "PENDING";

//   // Initialize form with existing payroll data
//   useEffect(() => {
//     if (data) {
//       updatePayroll({
//         name: data.name,
//         month: data.month,
//         year: data.year,
//         // Note: employeeIds might need to be fetched separately
//         // as they may not be in the payroll data directly
//         employeeIds: data.payslips?.map((p: any) => p.employeeId) || []
//       });
//     }
//   }, [data, updatePayroll]);

//   function reset() {
//     setStep(0);
//     closeModal();
//     // Reset form to default values
//     updatePayroll({
//       employeeIds: [],
//       name: "",
//       month: new Date().getMonth(),
//       year: new Date().getFullYear(),
//     });
//   }

//   function submit() {
//     if (!data?.id) return;
    
//     // Since there's no update endpoint, we'll need to implement this
//     // For now, show a message that editing is not supported
//     alert("Payroll editing is not currently supported. Payrolls are immutable once created.");
//     reset();
//   }

//   return (
//     <AppDialog
//       open={isOpen("edit-payroll")}
//       onOpenChange={reset}
//       title="Edit Payroll"
//       size="lg"
//     >
//       <div className="space-y-8">
//         {!isEditable && (
//           <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
//             <p className="text-yellow-800 text-sm">
//               This payroll has status: <strong>{data?.status}</strong>. 
//               {data?.status === "PROCESSING" && " Processing payrolls cannot be edited."}
//               {data?.status === "SUCCESSFULL" && " Completed payrolls cannot be edited."}
//               {data?.status === "FAILED" && " Failed payrolls cannot be edited."}
//             </p>
//           </div>
//         )}

//         <PayrollStepper
//           currentStep={step}
//           steps={steps.map(s => s.title)}
//         />

//         {/* Render step with appropriate props based on editability */}
//         {isEditable ? (
//           <CurrentStep />
//         ) : (
//           <div className="space-y-6">
//             <div>
//               <h3 className="text-lg font-semibold mb-2">Payroll Information</h3>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Name</p>
//                   <p className="font-medium">{data?.name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Period</p>
//                   <p className="font-medium">
//                     {data?.month + 1}/{data?.year}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Status</p>
//                   <p className="font-medium">{data?.status}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Employees</p>
//                   <p className="font-medium">{data?.payslips?.length || 0}</p>
//                 </div>
//               </div>
//             </div>
            
//             <div>
//               <h3 className="text-lg font-semibold mb-2">Employee List</h3>
//               <div className="border rounded-md p-4 max-h-60 overflow-y-auto">
//                 {data?.payslips?.length ? (
//                   data.payslips.map((payslip: any, index: number) => (
//                     <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
//                       <div>
//                         <p className="font-medium">
//                           {payslip.employee?.firstName} {payslip.employee?.lastName}
//                         </p>
//                         <p className="text-sm text-muted-foreground">{payslip.employee?.position}</p>
//                       </div>
//                       <div className="text-right">
//                         <p className="font-medium">₦{payslip.netSalary?.toLocaleString()}</p>
//                         <p className="text-sm text-muted-foreground">{payslip.status}</p>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-muted-foreground text-center py-4">No employees in this payroll</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="flex justify-end gap-3">
//           {isEditable && step > 0 && (
//             <Button
//               variant="outline"
//               onClick={() => setStep(step - 1)}
//             >
//               Back
//             </Button>
//           )}

//           {isEditable ? (
//             step < steps.length - 1 ? (
//               <Button
//                 disabled={!payroll.employeeIds.length}
//                 onClick={() => setStep(step + 1)}
//               >
//                 Next
//               </Button>
//             ) : (
//               <Button
//                 onClick={submit}
//                 disabled={true} // Disabled since no update endpoint
//               >
//                 Update Payroll (Not Available)
//               </Button>
//             )
//           ) : (
//             <Button onClick={reset}>
//               Close
//             </Button>
//           )}
//         </div>
//       </div>
//     </AppDialog>
//   );
// }

import React from 'react'

const EditPayrollModal = () => {
  return (
    <div>EditPayrollModal</div>
  )
}

export default EditPayrollModal