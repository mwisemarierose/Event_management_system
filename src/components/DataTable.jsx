import React, { useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import DataPagination from "./DataPagination";

function DataTable({ data, columns, title }) {
  const [filteredData, setFilteredData] = useState(data);

  const TableInstance = useTable(
    { data: filteredData, columns },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    setGlobalFilter,
    getTableBodyProps,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    gotoPage,
    pageCount,
    setPageSize,
    pageOptions,
    headerGroups,
    prepareRow,
    state,
  } = TableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  
  useMemo(() => {
    setFilteredData(data);
  }, [data]);

  return (
    <div className="bg-white border dark:bg-dark-bg shadow-md px-5 py-8 rounded-md w-[100%] mx-auto lg:w-[80%] lg:ml-8 mb-10">
      <div className=" flex items-center justify-between pb-6">
        <div>
          <h2 className="text-gray-800 dark:text-black font-semibold text-xl">
            {title}
          </h2>
          <input
            value={globalFilter || ""}
            placeholder="Filter"
            className="border-gray-300 dark:bg-dark-tertiary dark:text-black border py-2 mt-4 rounded outline-none px-5 font-sans text-xs w-52 md:w-96"
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table className="w-full leading-normal" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="bg-secondary text-white"
              >
                {headerGroup.headers.map((column) => (
                  <th
                    className={column.isSorted ? "sort-asc thead" : " thead"}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              const rowTheme =
                row.index % 2 !== 0
                  ? "bg-light-bg dark:bg-dark-tertiary"
                  : "bg-white dark:bg-dark-bg";
              return (
                <tr className={rowTheme} {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td className="data-cell text-center justify-center text-lg" {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <DataPagination
          pageOptions={pageOptions}
          canNextPage={canNextPage}
          gotoPage={gotoPage}
          columnLength={columns.length}
          canPreviousPage={canPreviousPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          previousPage={previousPage}
          nextPage={nextPage}
          pageCount={pageCount}
          pageIndex={pageIndex}
        />
      </div>
    </div>
  );
}

export default DataTable;
