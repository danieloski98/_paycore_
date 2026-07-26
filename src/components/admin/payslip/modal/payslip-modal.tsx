import { AppSheet } from '@/components/shared/app-sheet'
import { Row } from '@/components/shared/row'
import { Button } from '@/components/ui/button'
import { useModal } from '@/hooks/use-modal'
import { generatePayslipPDF } from '@/lib/pdfGenerator'
import { Payslip } from '@/models/payslip-model'
import { useState } from 'react'
import { AiOutlineFilePdf } from "react-icons/ai";

const PayslipModal = () => {
    const { isOpen, closeModal, data } = useModal()
    const [isGenerating, setIsGenerating] = useState(false)

    const payslip: Payslip = data

    
    const handleSaveAsPDF = async () => {
        if (!payslip) return;
        
        try {
            setIsGenerating(true);
            await generatePayslipPDF(payslip);
        } catch (error) {
            console.error("Error generating payslip PDF:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    if (!payslip) return null

    return (
        <AppSheet
            open={isOpen("payslip-details")}
            onOpenChange={(open) => !open && closeModal()}
            title="Payslip Details"
            description="View payslp information."
            size="xl"
            side="right"
        >
            <div className='px-4 pb-10 h-full flex flex-1 flex-col justify-between'>
                <div className="h-fit rounded-xl border bg-muted/30">
                    <Row label='Employee' value={`${payslip?.Employee?.firstName} ${payslip?.Employee?.lastName}`} />
                    <Row label='Email Address' value={payslip?.Employee?.email} />
                    {/* FIX: this was a duplicate 'Employee' row (copy-paste).
                        Net Salary is already computed on the model but was
                        never shown in this sheet. */}
                    <Row label='Net Salary'
                        value={`₦${Number(payslip?.netSalary || 0).toLocaleString(
                            "en-NG",
                            { minimumFractionDigits: 2 }
                        )}`}
                    />
                    <Row label='Account Name' value={payslip?.Bank?.accountName} />
                    <Row label='Account Number' value={payslip?.Bank?.accountNumber} />
                    <Row label='Bank Name' value={payslip?.Bank?.bankName} />
                    <Row label='Basic Salary'
                        value={`₦${Number(payslip?.basicSalary || 0).toLocaleString(
                            "en-NG",
                            { minimumFractionDigits: 2 }
                        )}`}
                    />
                    <Row label='Allowance'
                        value={`₦${Number(payslip?.allowances || 0).toLocaleString(
                            "en-NG",
                            { minimumFractionDigits: 2 }
                        )}`}
                    />
                    <Row label='Deductions'
                        value={`₦${Number(payslip?.deductions || 0).toLocaleString(
                            "en-NG",
                            { minimumFractionDigits: 2 }
                        )}`}
                    />
                </div>

                <div className='flex items-center justify-end mt-6'>
                    <Button variant={"outline"} className='cursor-pointer' onClick={handleSaveAsPDF} disabled={isGenerating}>
                        <AiOutlineFilePdf />
                        {isGenerating ? "Generating..." : "Generate Pdf"}
                    </Button>
                </div>
            </div>
        </AppSheet>
    )
}

export default PayslipModal