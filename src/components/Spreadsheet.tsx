import React from "react";
import {
  useTable,
  useSortBy,
  useBlockLayout,
  useResizeColumns,
  Column,
} from "react-table";
import StatusChip from "./StatusChip";
import { RowData } from "../types/RowData";

type Props = {
  data: RowData[];
  minRows?: number; // Optional: minimum number of rows to show
};

const Spreadsheet: React.FC<Props> = ({ data, minRows = 12 }) => {
  const paddedData = React.useMemo(() => {
    if (data.length >= minRows) return data;
    const emptyRow: RowData = {
      job: "",
      submitted: "",
      status: "",
      submitter: "",
      url: "",
      assigned: "",
      priority: "",
      due: "",
      value: "",
    };
    return [...data, ...Array(minRows - data.length).fill(emptyRow)];
  }, [data, minRows]);

  // Helper to check if a row is completely empty (for padded rows)
  const isRowEmpty = (row: RowData) =>
    Object.values(row).every((v) => v === "");

  const defaultSortType = (rowA: any, rowB: any, columnId: string) => {
    const a = rowA.values[columnId];
    const b = rowB.values[columnId];

    const isAEmpty = isRowEmpty(rowA.original);
    const isBEmpty = isRowEmpty(rowB.original);

    // If A is empty and B is not => B first
    if (isAEmpty && !isBEmpty) return 1;
    if (!isAEmpty && isBEmpty) return -1;
    if (isAEmpty && isBEmpty) return 0;

    // Otherwise, default string comparison
    return String(a).localeCompare(String(b), undefined, { numeric: true });
  };

  const columns = React.useMemo<Column<RowData>[]>(
    () => [
      {
        Header: "#",
        id: "serial",
        width: 50,
      },
      {
        Header: "Job Request",
        accessor: "job",
        sortType: defaultSortType,
        width: 300,
      },
      { Header: "Submitted", accessor: "submitted", sortType: defaultSortType },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) =>
          value ? <StatusChip status={value as string} /> : null,
        sortType: defaultSortType,
        width: 120,
      },
      { Header: "Submitter", accessor: "submitter", sortType: defaultSortType },
      {
        Header: "URL",
        accessor: "url",
        Cell: ({ value }) =>
          value ? (
            <a
              href={`https://${value as string}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {value as string}
            </a>
          ) : null,
        sortType: defaultSortType,
        width: 200,
      },
      { Header: "Assigned", accessor: "assigned", sortType: defaultSortType },
      {
        Header: "Priority",
        accessor: "priority",
        sortType: defaultSortType,
        width: 100,
      },
      { Header: "Due Date", accessor: "due", sortType: defaultSortType },
      { Header: "Est. Value", accessor: "value", sortType: defaultSortType },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<RowData>(
      { columns, data: paddedData },
      useBlockLayout,
      useResizeColumns,
      useSortBy
    );

  return (
    <div className="overflow-x-auto">
      <table {...getTableProps()} className="min-w-full text-sm text-left">
        <thead className="bg-gray-100">
          {headerGroups.map((headerGroup) => {
            const { key, ...rest } = headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...rest}>
                {headerGroup.headers.map((column) => (
                  <th
                    key={column.id}
                    {...(() => {
                      const { key, ...rest } = column.getHeaderProps(
                        (column as any).getSortByToggleProps?.() || {}
                      );
                      return rest;
                    })()}
                    className="p-2 relative"
                  >
                    {column.render("Header")}
                    <div
                      {...(column as any).getResizerProps?.()}
                      className="absolute right-0 top-0 h-full w-0.5 bg-gray-400 cursor-col-resize"
                    />
                    {(column as any).isSorted
                      ? (column as any).isSorted
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </th>
                ))}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            const { key, ...rest } = row.getRowProps();
            return (
              <tr key={key} {...rest} className="hover:bg-gray-50">
                {row.cells.map((cell) => {
                  const { key, ...rest } = cell.getCellProps();
                  if (cell.column.id === "serial") {
                    return (
                      <td
                        key={key}
                        {...rest}
                        className="p-2 border-t border-r border-gray-200"
                      >
                        {i + 1}
                      </td>
                    );
                  }
                  return (
                    <td
                      key={key}
                      {...rest}
                      className="p-2 border-t border-r border-gray-200"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Spreadsheet;
