// data-table-pagination.tsx

"use client"

import { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

interface Props<TData> {
  table: Table<TData>
}

export function DataTablePagination<TData>({
  table,
}: Props<TData>) {
  return (
    <div className="flex items-center justify-between w-full gap-10">

      <div className="text-sm text-muted-foreground">
        Showing{" "}
        {table?.getState().pagination.pageIndex *
          table?.getState().pagination.pageSize +
          1}
        -
        {Math.min(
          (table?.getState().pagination.pageIndex + 1) *
            table?.getState().pagination.pageSize,
          table?.getFilteredRowModel().rows.length
        )}{" "}
        of {table?.getFilteredRowModel().rows.length}
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={!table?.getCanPreviousPage()}
          onClick={() => table?.previousPage()}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          disabled={!table?.getCanNextPage()}
          onClick={() => table?.nextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}