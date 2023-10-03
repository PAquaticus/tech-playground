"use client";

import React from "react";
import { useReactTable, Column, Row, Cell } from "@tanstack/react-table";

interface Data {
  col1: string;
  col2: string;
  col3: string;
}

export default function Home() {
  const columns = React.useMemo<Column<Data>[]>(
    () => [
      {
        Header: "Header 1",
        accessor: "col1",
      },
      {
        Header: "Header 2",
        accessor: "col2",
      },
      {
        Header: "Header 3",
        accessor: "col3",
      },
    ],
    []
  );

  const data = React.useMemo<Data[]>(
    () => [
      {
        col1: "Data 1",
        col2: "Data 2",
        col3: "Data 3",
      },
      {
        col1: "Data 4",
        col2: "Data 5",
        col3: "Data 6",
      },
    ],
    []
  );

  const table = useReactTable<Data>({ columns, data });

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      <header className="text-center pb-4 mb-4">
        <h1 className="text-4xl font-bold text-white mb-2">Engaging Header</h1>
        <p className="text-white">Subheader with additional information</p>
      </header>
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 h-4/5 flex flex-col justify-between">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800">
            {table.headerGroups.map((headerGroup, hgIndex) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={hgIndex}>
                {headerGroup.headers.map((column, hIndex) => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    key={hIndex}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-gray-900">
            {table.rows.map((row: Row<Data>, rIndex) => {
              table.prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={rIndex}>
                  {row.cells.map((cell: Cell<Data>, cIndex) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 whitespace-nowrap"
                      key={cIndex}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <footer className="mt-4 text-center">
          <p className="text-sm text-gray-600">Footer Information</p>
        </footer>
      </div>
    </main>
  );
}
