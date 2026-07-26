"use client";


import { useGetEmployeeLeave, useGetLeaveById } from "@/hooks/use-leave";
import { getEmployeeFullname, getLeaveStatusStyle } from "@/lib/utils";
import { employeeAtom } from "@/states/auth-user-state";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useAtom } from "jotai";
import { ChevronLeft, Clock, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface ApprovalStep {
    id: string;
    title: string;
    completedAt: string;
    status: "completed" | "pending" | "active";
}

interface ApprovalTimelineProps {
    steps: ApprovalStep[];
    leaveStatus?: string;
    createdAt?: string;
    updatedAt?: string;
}

const EmployeeLeaveStatus = () => {
    const [employee] = useAtom(employeeAtom)
    const params = useParams<{ leaveId: string }>();
    const router = useRouter();

    const { leave, isLoading } = useGetLeaveById(params?.leaveId)
    console.log(leave?.data.Employee)
    return (
        <div className="py-8 px-4 h-[calc(100vh-80px)]">
            {isLoading && (
                <div className="w-full h-full rounded-lg flex items-center justify-center">
                    <div className="animate-spin">
                        <Loader2 className="w-8 h-8 text-blue-600" />
                    </div>
                </div>
            )}
            {!isLoading && leave?.success && (
                <div className="bg-white rounded-sm shadow">
                    <div className="flex items-center gap-2 p-4 text-black border-gray-200">
                        <button
                            onClick={() => router.back()}
                            className="hover:opacity-70 transition-opacity cursor-pointer"
                            aria-label="Go back"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-700 text-sm font-medium">Status:</span>
                            <span
                                className={`text-sm font-medium px-3 py-1 rounded-xl ${getLeaveStatusStyle(
                                    leave?.data.Status
                                ).className}`}
                            >
                                {leave?.data.Status}
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 px-5 md:px-10 py-6 md:py-10">
                        {/* Stepper */}
                        <ApprovalTimeline
                            steps={approvalSteps}
                            leaveStatus={leave?.data.Status}
                            createdAt={leave?.data.createdAt}
                            updatedAt={leave?.data.createdAt}
                        />

                        {/* Request Information */}
                        <div className="w-full bg-gray-50 py-6 px-6 rounded-lg">
                            <h3 className="text-gray-900 text-base font-medium">
                                Request information
                            </h3>
                            <div className="space-y-4 mt-5">
                                <div className="flex items-center gap-2 text-sm font-medium">
                                    <span className="text-gray-700">Type of Request:</span>
                                    <span className="text-gray-900">{leave?.data.type}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-medium">
                                    <span className="text-gray-700">Applicant:</span>
                                    <span className="text-gray-900">
                                        {getEmployeeFullname(leave.data.Employee)}
                                    </span>
                                </div>
                                <div className="flex items-start gap-2 text-sm font-medium">
                                    <span className="text-gray-700">Reason:</span>
                                    <span className="text-gray-900">{leave?.data.description}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-medium">
                                    <span className="text-gray-700">Commencement Date:</span>
                                    <span className="text-gray-900">
                                        {format(new Date(leave?.data.startDate || ""), "P")}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeLeaveStatus;

const approvalSteps: ApprovalStep[] = [
    {
        id: "1",
        title: "Line Manager Approval",
        completedAt: "Completed: 6/4/2025 10:19:04 AM",
        status: "completed",
    },
    {
        id: "2",
        title: "HR Validation",
        completedAt: "Completed: 6/4/2025 10:19:04 AM",
        status: "active",
    },
];

const ApprovalTimeline = ({
    steps,
    leaveStatus = "SUCCESSFUL",
    createdAt,
    updatedAt,
}: ApprovalTimelineProps) => {
    return (
        <div className="flex flex-col gap-0 relative w-full">
            {steps.map((step, index) => {
                const isLast = index === steps.length - 1;

                // Normalize status to uppercase
                const normalizedStatus = leaveStatus.toUpperCase();
                const isCompleted = normalizedStatus !== "PENDING";
                const isRejected =
                    normalizedStatus === "REJECTED" || normalizedStatus === "CANCELLED";
                const isAccepted =
                    normalizedStatus === "ACCEPTED" || normalizedStatus === "APPROVED";

                // Determine circle color
                const getCircleColor = () => {
                    if (isAccepted) return "bg-emerald-500";
                    if (isRejected) return "bg-red-100";
                    return "bg-amber-100";
                };

                // Determine line color
                const getLineColor = () => {
                    if (isAccepted) return "bg-emerald-500";
                    if (isRejected) return "bg-red-500";
                    return "bg-gray-300";
                };

                // Get completion text
                const getCompletionText = () => {
                    if (index === 0) {
                        return createdAt
                            ? `Line Manager approval completion: ${format(
                                new Date(createdAt),
                                "Pp"
                            )}`
                            : "Line Manager approval pending";
                    }
                    if (index === 1) {
                        return updatedAt
                            ? `HR Validation date: ${format(new Date(updatedAt), "Pp")}`
                            : "HR validation pending";
                    }
                    return step.completedAt || "Pending";
                };

                return (
                    <div
                        key={step.id}
                        className="flex gap-3 md:gap-4 w-full relative"
                    >
                        {/* Timeline Circle and Line */}
                        <div className="flex flex-col items-center shrink-0 relative">
                            {/* Circle */}
                            <div
                                className={`mt-4 md:mt-6 w-10 h-10 rounded-full ${getCircleColor()} border-2 flex items-center justify-center z-10 relative ${!isCompleted ? "border-amber-400" : "border-transparent"
                                    }`}
                            >
                                {isCompleted ? (
                                    <>
                                        {isRejected ? (
                                            <XCircle className="w-5 h-5 text-red-600" />
                                        ) : (
                                            <CheckCircle2 className="w-5 h-5 text-white" />
                                        )}
                                    </>
                                ) : (
                                    <Clock className="w-5 h-5 text-amber-400" />
                                )}
                            </div>

                            {/* Connecting Line */}
                            {!isLast && (
                                <div
                                    className={`absolute top-14 md:top-17 -bottom-5 md:-bottom-9 left-1/2 -translate-x-1/2 w-0.5 ${getLineColor()} z-0`}
                                />
                            )}
                        </div>

                        {/* Content Card */}
                        <div className="flex-1 max-w-full min-w-62.5 bg-white border border-gray-200 rounded-lg md:rounded-xl p-4 mb-6 md:mb-8 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col gap-0.5 md:gap-1">
                                <h4 className="text-base md:text-lg font-semibold text-gray-900 wrap-break-word">
                                    {step.title}
                                </h4>
                                <p className="text-xs md:text-sm text-gray-600 wrap-break-word">
                                    {getCompletionText()}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
