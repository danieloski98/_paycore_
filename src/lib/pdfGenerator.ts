import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Payslip } from '@/models/payslip-model';
import { months } from './constants';

export interface PayslipPdfData {
    employee: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        position: string;
    };

    company: {
        name: string;
        address: string;
        phone: string | null;
    };

    bank: {
        bankName: string;
        accountName: string;
        accountNumber: number;
    };

    basicSalary: number;
    allowances: number;

    totalEarnings: number;
    totalDeductions: number;

    tax: number;
    netSalary: number;
    payoutAmount: number;

    period: string;
    paymentDate: string;
}

const LOGO_URL = `/images/logo.png`;

// NOTE: generatePayslipPDF works directly off the raw `Payslip` shape
// (capitalized relations: data.Employee, data.Bank, data.Payroll). It does
// NOT consume `PayslipPdfData` — that DTO uses lowercase relation names and
// is a different shape. Don't run a Payslip through preparePayslipData()
// before calling this; pass the Payslip straight through.
export const generatePayslipPDF = async (data: Payslip): Promise<boolean> => {
    try {
        // Create HTML content with the new template
        const htmlContent = createPayslipHTML(data);

        // Create a temporary iframe for complete isolation
        const iframe = document.createElement('iframe');
        iframe.style.position = 'fixed';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.width = '794px'; // 210mm in pixels
        iframe.style.height = '1123px'; // 297mm in pixels
        iframe.style.border = 'none';
        iframe.style.visibility = 'hidden';
        iframe.style.zIndex = '-9999';
        iframe.style.padding = '0';
        iframe.style.margin = '0';
        iframe.style.overflow = 'hidden';
        document.body.appendChild(iframe);

        // Write HTML to iframe
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!iframeDoc) throw new Error('Could not create iframe');

        iframeDoc.open();
        iframeDoc.write(htmlContent);
        iframeDoc.close();

        // Wait for iframe to render
        await new Promise(resolve => setTimeout(resolve, 500));

        // Get the container element
        const container = iframeDoc.querySelector('.payslip-container');
        if (!container) throw new Error('Container not found');

        // Force iframe body to have no padding/margin
        iframeDoc.body.style.margin = '0';
        iframeDoc.body.style.padding = '0';
        iframeDoc.body.style.overflow = 'hidden';

        // Convert to canvas
        const canvas = await html2canvas(container as HTMLElement, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
            logging: false,
            width: 794, // A4 width in pixels (210mm)
            height: 1123, // A4 height in pixels (297mm)
            windowWidth: 794,
            windowHeight: 1123,
            x: 0,
            y: 0,
            scrollX: 0,
            scrollY: 0,
            onclone: (clonedDoc, element) => {
                // Ensure the element has proper dimensions
                element.style.width = '794px';
                element.style.height = 'auto';
                element.style.margin = '0';
                element.style.padding = '32px';
                // Force body styles
                clonedDoc.body.style.margin = '0';
                clonedDoc.body.style.padding = '0';
                clonedDoc.body.style.overflow = 'hidden';
            }
        });

        // Clean up
        document.body.removeChild(iframe);

        // Create PDF
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: true
        });

        // Calculate dimensions
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // Add image to PDF - fill entire page
        const imgData = canvas.toDataURL('image/png', 1.0);

        // Add image to fit A4 page
        pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight, '', 'FAST');

        // Save PDF
        // FIX: was `data.Employee?.firstName` but `data.Employee.lastName`
        // (no ?.) — inconsistent chaining could throw if Employee is
        // missing. Also the fallback 'month' for a missing last name was a
        // leftover copy-paste; 'employee' matches the firstName fallback.
        const fileName = `payslip_${data.Employee?.firstName || 'employee'}_${data.Employee?.lastName || 'employee'}.pdf`.replace(/\s+/g, '_');
        pdf.save(fileName);

        return true;
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw new Error('Failed to generate PDF');
    }
};

const createPayslipHTML = (data: Payslip): string => {
    const formatCurrency = (amount: number = 0) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    };

    // Calculate totals
    const basicSalary = Number(data.basicSalary || 0);
    const allowances = Number(data.allowances || 0);
    const deductions = Number(data.deductions || 0);
    const tax = Number(data.tax || 0);

    const totalEarnings = basicSalary + allowances;
    const totalDeductions = deductions + tax;
    const netPay = totalEarnings - totalDeductions;

    // Format dates
    const formatDate = (dateString?: string | Date) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        } catch {
            return String(dateString);
        }
    };

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pay Slip - Paycore</title>
        <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f5f5;
            padding: 10px;
            width: 100%;
            min-height: 100%;
            margin: 0;
        }

        .payslip-container {
            max-width: 900px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 40px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            width: 100%;
        }

        /* Header Styles */
        .payslip-header {
            border-bottom: 3px solid #0066ff;
            padding: 10px;
            text-align: center;
            margin-bottom: 30px;
            background-color: #f9fbff;
        }

        .payslip-logo {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-bottom: 10px;
        }

        .logo {
            height: 40px;
            width: 40px;
        }

        .payslip-logo h2 {
            font-size: 24px;
            color: #0066ff;
            font-weight: 600;
        }

        .payslip-address {
            font-size: 14px;
            color: #666666;
            margin-top: 8px;
        }

        /* Title */
        .payslip-title {
            font-size: 16px;
            color: #333333;
            font-weight: 600;
            margin-bottom: 30px;
        }

        /* Section Styles */
        .payslip-section {
            margin-bottom: 35px;
        }

        .section-title {
            font-size: 14px;
            color: #0066ff;
            font-weight: 700;
            letter-spacing: 0.5px;
            margin-bottom: 20px;
        }
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
        }
        .summary-item {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .summary-item label {
            font-size: 13px;
            color: #777777;
            font-weight: 500;
            display: block;
        }

        .summary-item p {
            font-size: 14px;
            color: #333333;
            font-weight: 500;
        }

        /* Earnings Section */
        .earnings-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
        }

        .earnings-divider {
            height: 1px;
            background: linear-gradient(90deg, #0066ff 0%, transparent 50%, #0066ff 100%);
            margin-bottom: 20px;
            opacity: 0.3;
        }

        .earnings-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            font-size: 14px;
            color: #333333;
            border-bottom: 1px solid #f0f0f0;
        }

        .earnings-item span:first-child {
            font-weight: 400;
        }

        .earnings-item span:last-child {
            font-weight: 600;
        }

        .earnings-total {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 10px;
            font-size: 15px;
            font-weight: 700;
            color: #0066ff;
            border-top: 2px solid #0066ff;
            border-bottom: 2px solid #0066ff;
            margin-top: 15px;
            background-color: #f9fbff;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .payslip-container {
                padding: 20px;
            }

            .payslip-header {
                padding: 20px;
            }

            .payslip-logo h2 {
                font-size: 20px;
            }

            .earnings-header {
                font-size: 12px;
            }

            .earnings-item {
                font-size: 13px;
            }
        }
        </style>
    </head>
    <body>
        <div class="payslip-container">
            <!-- Header -->
            <div class="payslip-header">
                <div class="payslip-logo">
                   <img src="${LOGO_URL}" alt="Logo" class="logo" />
                    <h2>Paycore</h2>
                </div>
            </div>

            <!-- Title -->
            <h3 class="payslip-title">Pay Slip for the month of ${`${months[data.Payroll.month].label} ${data.Payroll.year}`}</h3>

            <!-- Employee Pay Summary Section -->
            <div class="payslip-section">
                <h4 class="section-title">EMPLOYEE PAY SUMMARY</h4>
                <div class="summary-grid">
                    <div class="summary-item">
                        <label>Employee Name:</label>
                        <p>${data.Employee?.firstName || ''} ${data.Employee?.lastName || ''}</p>
                    </div>
                    <div class="summary-item">
                        <label>Designation:</label>
                        <p>${data.Employee?.position || 'N/A'}</p>
                    </div>
                    <div class="summary-item">
                        <label>Pay Period:</label>
                        <p>${`${months[data.Payroll.month].label} ${data.Payroll.year}`}</p>
                    </div>
                    <div class="summary-item">
                        <label>Pay Date:</label>
                        <p>${formatDate(data.paymentDate)}</p>
                    </div>
                </div>
            </div>

            <!-- Earnings Section -->
            <div class="payslip-section">
                <div class="earnings-header">
                    <h4 class="section-title">EARNINGS</h4>
                    <h4 class="section-title">AMOUNT</h4>
                </div>
                <div class="earnings-divider"></div>

                <div class="earnings-item">
                    <span>Basic Salary</span>
                    <span>${formatCurrency(basicSalary)}</span>
                </div>
                <div class="earnings-item">
                    <span>Allowances</span>
                    <span>${formatCurrency(allowances)}</span>
                </div>
                <div class="earnings-item">
                    <span>Deductions</span>
                    <span>${formatCurrency(deductions)}</span>
                </div>
                <div class="earnings-item">
                    <span>Tax</span>
                    <span>${formatCurrency(tax)}</span>
                </div>

                <div class="earnings-total">
                    <span>Total Net Pay</span>
                    <span>${formatCurrency(netPay)}</span>
                </div>
            </div>

            <!-- Payment Summary Section -->
            <div class="payslip-section">
                <h4 class="section-title">PAYMENT SUMMARY</h4>
                <div class="summary-grid">
                    <div class="summary-item">
                        <label>Account Name</label>
                        <p>${data.Employee?.firstName || ''} ${data.Employee?.lastName || ''}</p>
                    </div>
                    <div class="summary-item">
                        <label>Receiving bank:</label>
                        <p>${data.Bank?.bankName || 'N/A'}</p>
                    </div>
                    <div class="summary-item">
                        <label>Recipient Account Number:</label>
                        <p>${data.Bank?.accountNumber || 'N/A'}</p>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Kept for callers that need the flatter PayslipPdfData DTO elsewhere in
// the app. generatePayslipPDF does NOT take this shape — see the note above
// its declaration.
export const preparePayslipData = (
    payslip: Payslip
): PayslipPdfData => ({
    employee: {
        id: payslip.Employee.id!,
        firstName: payslip?.Employee?.firstName!,
        lastName: payslip?.Employee?.lastName!,
        email: payslip?.Employee?.email!,
        position: payslip?.Employee?.position!,
    },

    company: {
        name: payslip?.Company?.name!,
        address: payslip?.Company?.address!,
        phone: payslip?.Company?.phone!,
    },

    bank: {
        bankName: payslip?.Bank?.bankName,
        accountName: payslip?.Bank?.accountName,
        accountNumber: payslip?.Bank?.accountNumber,
    },

    basicSalary: Number(payslip?.basicSalary),
    allowances: Number(payslip?.allowances),

    totalEarnings: Number(payslip?.totalEarnings),
    totalDeductions: Number(payslip?.totalDeductions),

    tax: Number(payslip?.tax),
    netSalary: Number(payslip?.netSalary),
    payoutAmount: Number(payslip?.payoutAmount),

    period: `${months[payslip?.Payroll?.month]?.label} ${payslip?.Payroll?.year}`,

    paymentDate: new Date(payslip?.paymentDate)?.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }),
});