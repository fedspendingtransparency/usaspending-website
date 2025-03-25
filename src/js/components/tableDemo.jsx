import React, { useState, useMemo } from 'react';
import { useTable, useSortBy, usePagination, useFlexLayout } from 'react-table';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css'; // For resizable columns styling

export const ResizableHeader = ({ children, column }) => {
  const [width, setWidth] = useState(column.width);
  const onResize = (e, { size }) => {
    setWidth(size.width);
    column.setWidth(size.width);
  };

  return (
    <div style={{ width }}>
      <Resizable width={width} height={0} onResize={onResize}>
        <div>{children}</div>
      </Resizable>
    </div>
  );
};

const TanStackTableDemo = () => {
  const data = useMemo(
    () => [
      { make: 'Toyota', model: 'Celica', price: 35000 },
      { make: 'Ford', model: 'Mondeo', price: 32000 },
      { make: 'Porsche', model: 'Boxster', price: 72000 },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Car Info',
        columns: [
          {
            Header: 'Make',
            accessor: 'make',
          },
          {
            Header: 'Model',
            accessor: 'model',
          },
        ],
      },
      {
        Header: 'Price',
        accessor: 'price',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 5 } },
    useSortBy,
    usePagination,
    useFlexLayout
  );

  const [hiddenColumns, setHiddenColumns] = useState([]);

  const toggleColumnVisibility = (columnId) => {
    setHiddenColumns((prev) =>
      prev.includes(columnId)
        ? prev.filter((id) => id !== columnId)
        : [...prev, columnId]
    );
  };

  return (
    <div>
      <div>
        <button onClick={() => toggleColumnVisibility('make')}>Toggle Make</button>
        <button onClick={() => toggleColumnVisibility('model')}>Toggle Model</button>
        <button onClick={() => toggleColumnVisibility('price')}>Toggle Price</button>
      </div>

      <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    borderBottom: 'solid 3px red',
                    background: 'aliceblue',
                    color: 'black',
                    fontWeight: 'bold',
                    textAlign: 'left',
                  }}
                >
                  <ResizableHeader column={column}>
                    {column.render('Header')}
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </ResizableHeader>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} style={{ borderBottom: '1px solid gray' }}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} style={{ padding: '10px' }}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 20].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TanStackTableDemo;