"use client";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnDef,
  ColumnFiltersState,
  getFilteredRowModel,
  PaginationState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DataTableFilter, FilterOption } from "./data-table-filter";
import { DataTablePagination } from "./data-table-pagination";
import { YearFilter } from "./year-filter";

export type TableFilter<T> = {
  label: string;
  column: keyof T;
  options: FilterOption[];
  type?: "select" | "year";
};

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  searchColumn?: keyof TData | (keyof TData)[];
  searchPlaceholder?: string;
  filters?: TableFilter<TData>[];
  yearFilter?: {
    column: keyof TData;
    startYear?: number;
  };
  action?: React.ReactNode;
  isLoading?: boolean;
  getRowLink?: (row: TData) => string | undefined;

  // 🆕 server-side pagination
  manualPagination?: boolean;
  pageCount?: number; // required when manualPagination is true
  pagination?: PaginationState; // controlled from parent
  onPaginationChange?: (updater: PaginationState | ((old: PaginationState) => PaginationState)) => void;

  // 🆕 server-side search (optional — see note below)
  onSearchChange?: (search: string) => void;
}

export function DataTable<TData>({
  columns,
  data,
  searchColumn,
  searchPlaceholder = "Search...",
  filters,
  action,
  isLoading,
  yearFilter,
  getRowLink,
  manualPagination = false,
  pageCount,
  pagination: controlledPagination,
  onPaginationChange,
  onSearchChange,
}: DataTableProps<TData>) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [internalPagination, setInternalPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // fall back to internal state if the parent isn't controlling pagination
  const pagination = controlledPagination ?? internalPagination;
  const setPagination = onPaginationChange ?? setInternalPagination;

  // client-side text search — only meaningful when you have the FULL dataset in memory.
  // Under manualPagination, `data` is just the current page from the server, so this
  // would silently only search 10-50 rows instead of your whole table. Use
  // `onSearchChange` instead to debounce and refetch from the server.
  const filteredData = useMemo(() => {
    if (manualPagination || !searchColumn || !search) return data;

    const columns = Array.isArray(searchColumn) ? searchColumn : [searchColumn];
    const term = search.toLowerCase();

    return data.filter((item) =>
      columns.some((col) =>
        String(item[col] ?? "").toLowerCase().includes(term)
      )
    );
  }, [data, searchColumn, search, manualPagination]);

  const table = useReactTable({
    data: manualPagination ? data : filteredData,
    columns,
    state: { columnFilters, pagination },
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    ...(manualPagination
      ? {}
      : {
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
      }),
    manualPagination,
    pageCount: manualPagination ? pageCount ?? -1 : undefined,
    autoResetPageIndex: !manualPagination,
  });

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-4">
        <div className="flex flex-wrap items-center gap-4">
          {searchColumn && (
            <Input
              placeholder={searchPlaceholder}
              className="w-62.5"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                onSearchChange?.(e.target.value);
              }}
            />
          )}
          {yearFilter && (
            <YearFilter
              column={table?.getColumn(yearFilter.column as string)}
              startYear={yearFilter.startYear}
            />
          )}
          {filters?.map((filter) => (
            <DataTableFilter
              key={String(filter.column)}
              label={filter.label}
              options={filter.options}
              column={table.getColumn(filter.column as string)}
            />
          ))}
        </div>
        {action}
      </div>

      {/* Table */}
      <div className="border-y">
        <Table>
          <TableHeader className="bg-muted/50">
            {table?.getHeaderGroups()?.map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup?.headers.map((header) => (
                  <TableHead key={header.id} className="pl-10">
                    {flexRender(header?.column.columnDef.header, header?.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          {isLoading ? (
            <TableLoading columns={columns.length} rows={pagination.pageSize} />
          ) : (
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => {
                  const href = getRowLink?.(row.original);
                  return (
                    <TableRow
                      key={row.id}
                      onClick={(e) => {
                        e.stopPropagation()
                        if (href) router.push(href);
                      }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="pl-6">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center h-24">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end gap-2 px-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}



// table-loading.tsx

import { Skeleton } from "@/components/ui/skeleton";
interface TableLoadingProps {
  columns: number;
  rows?: number;
}

export function TableLoading({
  columns,
  rows = 8,
}: TableLoadingProps) {
  return (
    <TableBody>
      {Array.from({ length: rows }).map((_, row) => (
        <TableRow key={row}>
          {Array.from({ length: columns }).map((_, col) => (
            <TableCell key={col}>
              <Skeleton className="h-5 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}