'use client'

import * as React from 'react'
import { Check, ChevronDown, Loader2, X } from 'lucide-react'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import { Label } from '@/components/ui/label'
import {
    Popover,
    PopoverAnchor,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

import 'nigerian-bank-icons/index.css'

export interface ComboboxOption<T = unknown> {
    label: string
    value: string
    disabled?: boolean
    meta?: T
}

interface AppComboboxProps<T = unknown> {
    value?: string
    options: ComboboxOption<T>[]

    onValueChange: (
        value: string,
        option: ComboboxOption<T> | null
    ) => void

    label?: string
    placeholder?: string

    loading?: boolean
    disabled?: boolean

    error?: string

    showClear?: boolean

    showIcon?: boolean

    emptyMessage?: string

    className?: string
}

export function CustomCombobox<T>({
    value,
    options,

    onValueChange,

    label,

    placeholder = 'Search...',

    loading = false,

    disabled = false,

    error,

    showClear = true,

    showIcon = false,

    emptyMessage = 'No results found',

    className,
}: AppComboboxProps<T>) {
    const [open, setOpen] = React.useState(false)

    const selected = React.useMemo(
        () => options.find((item) => item.value === value),
        [options, value]
    )

    return (
        <div className={cn('space-y-2', className)}>
            {label && <Label>{label}</Label>}

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        type="button"
                        variant="outline"
                        disabled={disabled}
                        className={cn(
                            'w-full justify-between h-8 font-normal',
                            !selected && 'text-muted-foreground',
                            error && 'border-destructive'
                        )}
                    >
                        <div className="flex items-center gap-2 overflow-hidden">
                            {showIcon && selected && (
                                <span
                                    className={cn(
                                        'h-6 w-6 shrink-0',
                                        `nbi nbi-${selected.value}`
                                    )}
                                />
                            )}

                            <span className="truncate">
                                {selected?.label ?? placeholder}
                            </span>
                        </div>

                        <div className="flex items-center">
                            {showClear && selected && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onValueChange('', null)
                                    }}
                                    className="mr-1 rounded p-1 hover:bg-muted"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}

                            <ChevronDown
                                className={cn(
                                    'h-4 w-4 transition-transform',
                                    open && 'rotate-180'
                                )}
                            />
                        </div>
                    </Button>
                </PopoverTrigger>

                <PopoverContent
                    align="start"
                    className="w-(--radix-popover-trigger-width) p-0"
                >
                    <Command shouldFilter>
                        <CommandInput placeholder={placeholder} />

                        <CommandList>
                            {loading ? (
                                <div className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Loading...
                                </div>
                            ) : (
                                <>
                                    <CommandEmpty>{emptyMessage}</CommandEmpty>

                                    <CommandGroup>
                                        {options.map((option, idx) => (
                                            <CommandItem
                                                key={`${option.value}-${idx}`}
                                                value={`${option.label} ${option.value}`}
                                                disabled={option.disabled}
                                                onSelect={() => {
                                                    onValueChange(option.value, option)
                                                    setOpen(false)
                                                }}
                                            >
                                                <div className="flex w-full items-center gap-3">
                                                    {showIcon && (
                                                        <span
                                                            className={cn(
                                                                'h-7 w-7 shrink-0',
                                                                `nbi nbi-${option.value}`
                                                            )}
                                                        />
                                                    )}

                                                    <span className="flex-1">
                                                        {option.label}
                                                    </span>

                                                    <Check
                                                        className={cn(
                                                            'h-4 w-4',
                                                            value === option.value
                                                                ? 'opacity-100'
                                                                : 'opacity-0'
                                                        )}
                                                    />
                                                </div>
                                            </CommandItem>
                                        )
                                        )}
                                    </CommandGroup>
                                </>
                            )}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            {error && (
                <p className="text-sm text-destructive">
                    {error}
                </p>
            )}
        </div>
    )
}