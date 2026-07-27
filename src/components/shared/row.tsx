

export const Row = ({
    label,
    value,
    className
}: {
    label: string;
    value: React.ReactNode;
    className?: string
}) => (
    <div className="flex items-center justify-between border-b px-5 py-4 last:border-0">
        <p className="text-muted-foreground">
            {label}
        </p>
        <div className={className}>{value}</div>
    </div>
);