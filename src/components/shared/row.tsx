

export const Row = ({
    label,
    value,
}: {
    label: string;
    value: React.ReactNode;
}) => (
    <div className="flex items-center justify-between border-b px-5 py-4 last:border-0">
        <p className="text-muted-foreground">
            {label}
        </p>
        <div>{value}</div>
    </div>
);