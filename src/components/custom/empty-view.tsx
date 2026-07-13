import React from 'react'
import { cn } from '@/lib/utils'

interface EmptyViewProps {
  title: string
  description: string
  icon?: React.ReactNode
  action?: React.ReactNode
  className?: string
}

export function EmptyView({
  title,
  description,
  icon,
  action,
  className,
}: EmptyViewProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 min-h-[320px] rounded-2xl border border-dashed border-muted-foreground/20 bg-background/40 backdrop-blur-xs transition-all duration-300 hover:border-muted-foreground/35",
        className
      )}
    >
      {icon && (
        <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground mb-4">
          {React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
            className: "size-6",
          })}
        </div>
      )}
      <h3 className="text-lg font-semibold tracking-tight text-foreground mb-1">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
        {description}
      </p>
      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}
    </div>
  )
}
