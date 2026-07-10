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
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
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
  searchColumn?: keyof TData;          // now type‑safe
  searchPlaceholder?: string;
  filters?: TableFilter<TData>[];
  yearFilter?: {
    column: keyof TData;
    startYear?: number
  };
  type?: "select" | "year";
  action?: React.ReactNode;
}

export function DataTable<TData>({
  columns,
  data,
  searchColumn,
  searchPlaceholder = "Search...",
  filters,
  action,
  yearFilter
}: DataTableProps<TData>) {
  const [search, setSearch] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });


  // 🔥 Memoize filtered data to avoid infinite re‑renders
  const filteredData = useMemo(() => {
    if (!searchColumn || !search) return data;
    return data.filter((item) =>
      String(item[searchColumn])
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [data, searchColumn, search]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { columnFilters, pagination },
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    autoResetPageIndex: true,
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
              onChange={(e) => setSearch(e.target.value)}
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
                  <TableHead key={header.id} className="pl-6">
                    {flexRender(
                      header?.column.columnDef.header,
                      header?.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel().rows.length ? (
              table?.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row?.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="pl-6">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns?.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end gap-2 px-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}