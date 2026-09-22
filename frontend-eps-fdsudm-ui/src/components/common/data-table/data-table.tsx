import type { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderItem,
  TableRow,
} from "@emorg-prd/standard-react";
import styles from "./data-table.module.css";

export type DataTableColumn<T extends Record<string, unknown>> = {
  key: keyof T | string;
  header: string;
  render?: (value: T[keyof T], row: T) => ReactNode;
};

type DataTableProps<T extends Record<string, unknown>> = {
  columns: DataTableColumn<T>[];
  rows: T[];
  emptyMessage?: string;
  tableType?: "em-c-table--condensed" | "em-c-table--striped";
  optionalClass?: string;
  hasPagination?: boolean;
  rowsPerPage?: number;
  onRowClick?: (row: T) => void;
};

export function DataTable<T extends Record<string, unknown>>({
  columns,
  rows,
  emptyMessage = "No records found.",
  tableType = "em-c-table--condensed",
  optionalClass,
  hasPagination = false,
  rowsPerPage = 10,
  onRowClick,
}: DataTableProps<T>) {
  if (!rows.length) {
    return <div>{emptyMessage}</div>;
  }

  return (
    <Table
      type={tableType}
      optionalClass={[styles.dataTable, onRowClick && styles.clickableRows, optionalClass]
        .filter(Boolean)
        .join(" ")}
      hasPagination={hasPagination}
      rowsPerPage={rowsPerPage}
    >
      <TableHeader>
        {columns.map((column) => (
          <TableHeaderItem key={String(column.key)}>{column.header}</TableHeaderItem>
        ))}
      </TableHeader>

      <TableBody>
        {rows.map((row, rowIndex) => (
          <TableRow key={rowIndex} onClick={onRowClick ? () => onRowClick(row) : undefined}>
            {columns.map((column) => {
              const value = row[column.key as keyof T];
              const cellValue: ReactNode = column.render
                ? column.render(value as T[keyof T], row)
                : String(value ?? "—");

              return <td key={`${String(column.key)}-${rowIndex}`}>{cellValue}</td>;
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
