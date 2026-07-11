// // data-table-pagination.tsx

// "use client"

// import { Table } from "@tanstack/react-table"
// import { Button } from "@/components/ui/button"

// interface Props<TData> {
//   table: Table<TData>
// }

// export function DataTablePagination<TData>({
//   table,
// }: Props<TData>) {
//   return (
//     <div className="flex items-center justify-between w-full gap-10">

//       <div className="text-sm text-muted-foreground">
//         Showing{" "}
//         {table?.getState().pagination.pageIndex *
//           table?.getState().pagination.pageSize +
//           1}
//         -
//         {Math.min(
//           (table?.getState().pagination.pageIndex + 1) *
//             table?.getState().pagination.pageSize,
//           table?.getFilteredRowModel().rows.length
//         )}{" "}
//         of {table?.getFilteredRowModel().rows.length}
//       </div>

//       <div className="flex gap-2">
//         <Button
//           variant="outline"
//           size="sm"
//           disabled={!table?.getCanPreviousPage()}
//           onClick={() => table?.previousPage()}
//         >
//           Previous
//         </Button>

//         <Button
//           variant="outline"
//           size="sm"
//           disabled={!table?.getCanNextPage()}
//           onClick={() => table?.nextPage()}
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   )
// }

"use client";

import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: Props<TData>) {
  const {
    pageIndex,
    pageSize,
  } = table.getState().pagination;

  const totalRows = table.getFilteredRowModel().rows.length;

  const from =
    totalRows === 0
      ? 0
      : pageIndex * pageSize + 1;

  const to = Math.min(
    (pageIndex + 1) * pageSize,
    totalRows
  );

  return (
    <div className="flex items-center justify-between w-full">
      {/* Left */}

      <div className="text-sm text-muted-foreground">
        Showing <span className="font-medium">{from}</span>–
        <span className="font-medium">{to}</span> of{" "}
        <span className="font-medium">{totalRows}</span>
      </div>

      {/* Right */}

      <div className="flex items-center gap-6">
        {/* Rows per page */}

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Rows
          </span>

          <Select
            value={String(pageSize)}
            onValueChange={(value) =>
              table.setPageSize(Number(value))
            }
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {[5, 10, 20, 50].map((size) => (
                <SelectItem
                  key={size}
                  value={String(size)}
                >
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Page Info */}

        <div className="text-sm">
          Page{" "}
          <span className="font-medium">
            {pageIndex + 1}
          </span>{" "}
          of{" "}
          <span className="font-medium">
            {table.getPageCount()}
          </span>
        </div>

        {/* Controls */}

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="size-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="size-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="size-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}