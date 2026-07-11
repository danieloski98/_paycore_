"use client";

import { useState } from "react";
import {
    Dropzone,
    DropzoneContent,
    DropzoneEmptyState,
} from "@/components/kibo-ui/dropzone";
import { FileSpreadsheet, UploadCloud } from "lucide-react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { readFileAsArrayBuffer, validateAndTransformEmployeeData } from "@/lib/employee-file-parser";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ACCEPT = {
    "text/csv": [".csv"],
    "application/vnd.ms-excel": [".csv"],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
    ],
};

interface EmployeeUploader {
    onUpload: (employees: any[]) => void;
}

export default function EmployeeUploader({ onUpload }: EmployeeUploader) {
    const [files, setFiles] = useState<File[]>();

    const processFile = async (file: File) => {
        if (file.size > MAX_FILE_SIZE) {
            throw new Error("Maximum file size is 10MB");
        }

        const extension = file.name.split(".").pop()?.toLowerCase();

        if (!extension || !["csv", "xlsx"].includes(extension)) {
            throw new Error("Only CSV or XLSX files are supported.");
        }

        if (extension === "csv") {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,

                complete(result: any) {
                    const validation = validateAndTransformEmployeeData(result.data);

                    if (!validation.isValid) {
                        throw new Error(validation.errors.join(", "));
                    }

                    onUpload(validation.transformedData);
                },
            });

            return;
        }

        const buffer = await readFileAsArrayBuffer(file);

        const workbook = XLSX.read(buffer, {
            type: "array",
        });

        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        const rows = XLSX.utils.sheet_to_json(sheet, {
            raw: false,
            blankrows: false,
            defval: "",
        });

        const transformed = rows.map((row: any) => ({
            firstName:
                row.firstName ??
                row["First Name"] ??
                row["FIRSTNAME"] ??
                "",

            lastName:
                row.lastName ??
                row["Last Name"] ??
                row["LASTNAME"] ??
                "",

            email:
                row.email ??
                row.Email ??
                "",

            phone:
                row.phone ??
                row.Phone ??
                "",

            position:
                row.position ??
                row.Position ??
                "",

            department:
                row.department ??
                row.Department ??
                "",

            salary:
                row.salary ??
                row.Salary ??
                "",

            startDate:
                row.startDate ??
                row["Start Date"] ??
                "",
        }));

        const validation =
            validateAndTransformEmployeeData(transformed);

        if (!validation.isValid) {
            throw new Error(validation.errors.join(", "));
        }

        onUpload(validation.transformedData);
    };

    const handleDrop = async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];

        if (!file) return;

        setFiles(acceptedFiles);

        try {
            await processFile(file);
        } catch (err: any) {
            console.error(err);
        }
    };

    return (
        <Dropzone
            accept={ACCEPT}
            maxFiles={1}
            maxSize={MAX_FILE_SIZE}
            onDrop={handleDrop}
            src={files}
            className="w-full"
        >
            <DropzoneEmptyState>
                <div className="flex flex-col items-center justify-center gap-2 py-10 cursor-pointer">
                    <UploadCloud className="h-8 w-8 text-primary" />

                    <p className="font-medium">
                        Upload CSV or Excel File
                    </p>

                    <p className="text-xs text-muted-foreground">
                        CSV or XLSX • Max 10MB
                    </p>
                </div>
            </DropzoneEmptyState>

            <DropzoneContent>
                <div className="flex items-center gap-3">
                    <FileSpreadsheet className="h-8 w-8" />

                    <div>
                        <p>{files?.[0]?.name}</p>

                        <p className="text-xs text-muted-foreground">
                            Click or drag to replace
                        </p>
                    </div>
                </div>
            </DropzoneContent>
        </Dropzone>
    );
}