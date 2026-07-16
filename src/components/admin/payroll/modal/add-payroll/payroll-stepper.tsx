"use client";

import { Check } from "lucide-react";

interface Props {
  steps: string[];
  currentStep: number;
}

export function PayrollStepper({ steps, currentStep }: Props) {
  return (
    <div className="w-full px-6">
      {/* <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#9AA0AE]">
        Payroll run — step {String(currentStep + 1).padStart(2, "0")} of{" "}
        {String(steps.length).padStart(2, "0")}
      </p> */}

      <div className="flex items-start">
        {steps.map((step, index) => {
          const isComplete = index < currentStep;
          const isCurrent = index === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div
              key={step}
              className={`flex flex-col items-center ${isLast ? "" : "flex-1"}`}
            >
              {/* fixed-height row: circle and line are siblings here, so items-center
                  centers the line on the circle's true midpoint, not an mt-N guess */}
              <div className="flex h-10 w-full items-center">
                <div
                  className={`
                    relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full
                    font-mono text-[13px] tabular-nums transition-colors duration-300
                    ${isComplete
                      ? "bg-[#14213D] text-white"
                      : isCurrent
                        ? "bg-white text-[#14213D] ring-2 ring-[#14213D] ring-offset-2 ring-offset-white"
                        : "bg-[#F1F1EF] text-[#9AA0AE]"
                    }
                  `}
                >
                  {isComplete ? (
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                  ) : (
                    String(index + 1).padStart(2, "0")
                  )}

                  {isCurrent && (
                    <span className="absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-white motion-safe:animate-pulse" />
                  )}
                </div>

                {!isLast && (
                  <div className="relative mx-1.5 h-px flex-1 bg-[#E4E5E9]">
                    {/* ledger ticks along the connector */}
                    <div className="absolute inset-0 flex justify-between px-0.5">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <span
                          key={i}
                          className="h-1.5 w-px -translate-y-0.75 bg-[#D6D8DD]"
                        />
                      ))}
                    </div>
                    <div
                      className="absolute inset-y-0 left-0 bg-[#14213D] transition-all duration-500 ease-out"
                      style={{ width: isComplete ? "100%" : "0%" }}
                    />
                  </div>
                )}
              </div>

              <p
                className={`mt-3 max-w-23 text-center text-[12px] leading-tight ${isCurrent
                    ? "font-semibold text-[#14213D]"
                    : isComplete
                      ? "font-medium text-[#4A5578]"
                      : "text-[#9AA0AE]"
                  }`}
              >
                {step}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}