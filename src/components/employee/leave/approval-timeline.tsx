"use client";

import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ApprovalStep } from "@/models/leave-model";

interface Props {
  steps: ApprovalStep[];
}

const circleClasses = {
  completed: "bg-emerald-500 border-emerald-500",
  active: "bg-amber-100 border-amber-500",
  pending: "bg-gray-100 border-gray-300",
  rejected: "bg-red-100 border-red-500",
};

const lineClasses = {
  completed: "bg-emerald-500",
  active: "bg-gray-300",
  pending: "bg-gray-300",
  rejected: "bg-red-500",
};

function StepIcon({ state }: { state: ApprovalStep["state"] }) {
  switch (state) {
    case "completed":
      return <CheckCircle2 className="h-5 w-5 text-white" />;

    case "active":
      return <Clock className="h-5 w-5 text-amber-500" />;

    case "pending":
      return <Clock className="h-5 w-5 text-gray-400" />;

    case "rejected":
      return <XCircle className="h-5 w-5 text-red-600" />;
  }
}

export function ApprovalTimeline({ steps }: Props) {
  return (
    <div className="space-y-0">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        return (
          <div
            key={step.id}
            className="relative flex gap-5"
          >
            <div className="flex flex-col items-center relative">
              <div
                className={cn(
                  "z-10 mt-5 flex h-10 w-10 items-center justify-center rounded-full border-2",
                  circleClasses[step.state]
                )}
              >
                <StepIcon state={step.state} />
              </div>

              {!isLast && (
                <div
                  className={cn(
                    "absolute left-1/2 top-14 w-0.5 -translate-x-1/2",
                    lineClasses[step.state]
                  )}
                  style={{
                    height: "calc(100% + 30px)",
                  }}
                />
              )}
            </div>

            <div className="mb-8 flex-1 rounded-xl border bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900">
                {step.title}
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}