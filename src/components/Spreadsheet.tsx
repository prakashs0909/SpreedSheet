import React from "react";
import {
  useTable,
  useSortBy,
  useBlockLayout,
  useResizeColumns,
  Column,
  Row,
  HeaderGroup,
  ColumnInstance,
} from "react-table";
import StatusChip from "./StatusChip";
import { RowData } from "../types/RowData";

type Props = {
  data: RowData[];
  minRows?: number;
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

  const isRowEmpty = (row: RowData) =>
    Object.values(row).every((v) => v === "");

  const defaultSortType = React.useCallback(
    (rowA: Row<RowData>, rowB: Row<RowData>, columnId: string) => {
      const a = rowA.values[columnId];
      const b = rowB.values[columnId];
      const isAEmpty = isRowEmpty(rowA.original);
      const isBEmpty = isRowEmpty(rowB.original);

      if (isAEmpty && !isBEmpty) return 1;
      if (!isAEmpty && isBEmpty) return -1;
      if (isAEmpty && isBEmpty) return 0;

      return String(a).localeCompare(String(b), undefined, { numeric: true });
    },
    []
  );

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
    [defaultSortType]
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
          {headerGroups.map((headerGroup: HeaderGroup<RowData>) => {
            const { key, ...restHeaderProps } =
              headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...restHeaderProps}>
                {headerGroup.headers.map((column: ColumnInstance<RowData>) => {
                  const { key: colKey, ...restColProps } =
                    column.getHeaderProps(
                      "getSortByToggleProps" in column &&
                        typeof column.getSortByToggleProps === "function"
                        ? column.getSortByToggleProps()
                        : undefined
                    );

                  return (
                    <th key={colKey} {...restColProps} className="p-2 relative">
                      {column.render("Header")}
                      <div
                        {...("getResizerProps" in column &&
                        typeof column.getResizerProps === "function"
                          ? column.getResizerProps()
                          : {})}
                        className="absolute right-0 top-0 h-full w-0.5 bg-gray-400 cursor-col-resize"
                      />
                      {(() => {
                        const sortedColumn =
                          column as ColumnInstance<RowData> & {
                            isSorted?: boolean;
                            isSortedDesc?: boolean;
                          };
                        return sortedColumn.isSorted
                          ? sortedColumn.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : null;
                      })()}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            const { key: rowKey, ...restRowProps } = row.getRowProps();
            return (
              <tr key={rowKey} {...restRowProps} className="hover:bg-gray-50">
                {row.cells.map((cell) => {
                  const { key: cellKey, ...restCellProps } =
                    cell.getCellProps();
                  if (cell.column.id === "serial") {
                    return (
                      <td
                        key={cellKey}
                        {...restCellProps}
                        className="p-2 border-t border-r border-gray-200"
                      >
                        {i + 1}
                      </td>
                    );
                  }
                  return (
                    <td
                      key={cellKey}
                      {...restCellProps}
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
