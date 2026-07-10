import { EmployeeType } from "@/models/employee-models";

/**
 * Read file as ArrayBuffer
 */
export const readFileAsArrayBuffer = (
    file: File
): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            resolve(e.target?.result as ArrayBuffer);
        };

        reader.onerror = () => {
            reject(new Error("Failed to read file"));
        };

        reader.readAsArrayBuffer(file);
    });
};

/**
 * Validate uploaded employees
 */
export const validateAndTransformEmployeeData = (
    data: any[]
): {
    isValid: boolean;
    errors: string[];
    transformedData: EmployeeType[];
} => {
    const errors: string[] = [];
    const transformedData: EmployeeType[] = [];

    if (!data.length) {
        return {
            isValid: false,
            errors: ["File contains no data"],
            transformedData: [],
        };
    }

    data.forEach((item, index) => {
        const rowErrors: string[] = [];

        const employee: EmployeeType = {
            // id: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            position: "",
            department: "",
            salary: 0,
            startDate: "",
        };

        // First Name
        if (!item.firstName?.toString().trim()) {
            rowErrors.push("First Name is required");
        } else {
            employee.firstName = item.firstName.toString().trim();
        }

        // Last Name
        if (!item.lastName?.toString().trim()) {
            rowErrors.push("Last Name is required");
        } else {
            employee.lastName = item.lastName.toString().trim();
        }

        // Email
        if (!item.email?.toString().trim()) {
            rowErrors.push("Email is required");
        } else {
            const email = item.email.toString().trim().toLowerCase();

            if (!/\S+@\S+\.\S+/.test(email)) {
                rowErrors.push("Invalid Email");
            } else {
                employee.email = email;
            }
        }

        // Phone
        if (!item.phone?.toString().trim()) {
            rowErrors.push("Phone is required");
        } else {
            employee.phone = item.phone.toString().trim();
        }

        // Position
        if (!item.position?.toString().trim()) {
            rowErrors.push("Position is required");
        } else {
            employee.position = item.position.toString().trim();
        }

        // Department
        if (!item.department?.toString().trim()) {
            rowErrors.push("Department is required");
        } else {
            employee.department = item.department.toString().trim();
        }

        // Salary
        const salary = Number(
            item.salary
                ?.toString()
                .replace(/,/g, "")
                .replace(/[₦$£€]/g, "")
        );

        if (isNaN(salary)) {
            rowErrors.push("Salary must be a number");
        } else {
            employee.salary = salary;
        }

        // Start Date
        if (!item.startDate?.toString().trim()) {
            rowErrors.push("Start Date is required");
        } else {
            employee.startDate = item.startDate.toString();
        }

        if (rowErrors.length) {
            errors.push(`Row ${index + 2}: ${rowErrors.join(", ")}`);
        } else {
            transformedData.push(employee);
        }
    });

    return {
        isValid: errors.length === 0,
        errors,
        transformedData,
    };
};