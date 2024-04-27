import {
    ArrowCircleLeftIcon,
    ArrowCircleRightIcon,
  } from "@heroicons/react/outline";
  
  import React from "react";
  
  function DataPagination({
    pageOptions,
    columnLength,
    canNextPage,
    canPreviousPage,
    pageSize,
    setPageSize,
    gotoPage,
    previousPage,
    nextPage,
    pageIndex,
  }) {
    return (
      <div>
        {pageOptions.length >= 0 && (
          <table className="w-full mt-2">
            <tfoot className="w-full py-2">
              <tr className="w-full py-2">
                <td colSpan={columnLength}>
                  <div className="w-full justify-center flex mx-auto flex-row items-center overflow-x-auto">
                    <button
                      type="button"
                      className="page mx-2 text-white rounded-circle appearance-none font-bold flex items-center justify-center bg-black h-[30px] w-[60px] cursor-pointer"
                      onClick={() => previousPage()}
                      disabled={!canPreviousPage}
                    >
                      <ArrowCircleLeftIcon className="w-5" fontSize="sm" />
                    </button>{" "}
                    <button
                      type="button"
                      onClick={() => nextPage()}
                      disabled={!canNextPage}
                      className="page mx-2 text-white rounded-circle font-bold flex items-center justify-center bg-black h-[30px] w-[60px] cursor-pointer"
                    >
                      <ArrowCircleRightIcon className="w-5" fontSize="sm" />
                    </button>{" "}
                    <div className="flex flex-row justify-center w-full sm:text-[12px] items-center ">
                      <span className="inline-block mx-2">
                        Page{" "}
                        <strong>
                          {pageIndex + 1} of
                          {` ${pageOptions.length}`}
                        </strong>{" "}
                      </span>
                      <span className="inline-block mx-2">
                        | Go to page:{" "}
                        <input
                          type="number"
                          className="outline-none border w-12 rounded-md appearance-none border-black dark:bg-white"
                          defaultValue={pageIndex + 1}
                          onChange={(e) => {
                            const pageNumber = e.target.value
                              ? Number(e.target.value) - 1
                              : 0;
                            gotoPage(pageNumber);
                          }}
                        />
                      </span>
                      <select
                        className="px-2 h-10 font-raleway rounded-md border border-black dark:bg-white"
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                      >
                        {[3, 5, 10, 25, 50, 100].map((pgSize) => (
                          <option key={pgSize} value={pgSize}>
                            Show {pgSize}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        )}
      </div>
    );
  }
  
  export default DataPagination;
  