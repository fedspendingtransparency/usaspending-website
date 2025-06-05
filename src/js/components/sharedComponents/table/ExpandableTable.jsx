import React, { useMemo, useState } from 'react';
import PropTypes, { shape, oneOf, oneOfType } from 'prop-types';

import { TableHeader } from 'data-transparency-ui';
import { uniqueId } from 'lodash';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    Column,
    Table,
    ExpandedState,
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getExpandedRowModel,
    ColumnDef,
    flexRender
} from '@tanstack/react-table';

const propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    rows: PropTypes.arrayOf(oneOfType([PropTypes.array, PropTypes.object])),
    rowHeight: PropTypes.number,
    headerRowHeight: PropTypes.number,
    currentSort: shape({
        direction: oneOf(['asc', 'desc']),
        field: PropTypes.string
    }),
    classNames: PropTypes.string,
    updateSort: PropTypes.func,
    expandable: PropTypes.bool,
    divider: PropTypes.string,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    isStacked: PropTypes.bool,
    screenReaderCaption: PropTypes.string,
    onClickHandler: PropTypes.func,
    isMobile: PropTypes.bool,
    stickyFirstColumn: PropTypes.bool,
    highlightedColumns: PropTypes.object,
    subColumnNames: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
    icon: PropTypes.element,
    displayName: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

const SortIcon = ({
    clickedSort,
    displayName,
    currentSort,
    title
}) => {
    // highlight the active arrow
    const activeAsc = (currentSort?.field === title && currentSort?.direction === 'asc')
        ? ' table-header__icon_active' : '';
    const activeDesc = (currentSort?.field === title && currentSort?.direction === 'desc')
        ? ' table-header__icon_active' : '';

    return (
        <div className="table-header__sort">
            <button
                type="button"
                onClick={clickedSort}
                className={`table-header__icon${activeAsc}`}
                value="asc"
                title={`Sort table by ascending ${displayName}`}
                aria-label={`Sort table by ascending ${displayName}`}>
                <FontAwesomeIcon size="2x" icon="caret-up" />
            </button>
            <button
                type="button"
                onClick={clickedSort}
                className={`table-header__icon${activeDesc}`}
                value="desc"
                title={`Sort table by descending ${displayName}`}
                aria-label={`Sort table by descending ${displayName}`}>
                <FontAwesomeIcon size="2x" icon="caret-down" />
            </button>
        </div>
    );
};

const ExpandableTable = ({
    columns,
    rows,
    rowHeight,
    headerRowHeight,
    currentSort,
    classNames = '',
    updateSort,
    expandable,
    divider,
    loading,
    error,
    message,
    isStacked = false,
    screenReaderCaption,
    onClickHandler,
    isMobile,
    stickyFirstColumn = false,
    highlightedColumns = {
        standardColumns: 9,
        highlightedColumns: 7
    },
    subColumnNames = [],
    icon = (<></>),
    displayName = ''
}) => {
    const cols = useMemo(
        () => [
            {
                accessorFn: (row) => row.awardID,
                id: 'primeAwardID',
                // header: ({table, i}) => (
                //     <TableHeader
                //         key={uniqueId()}
                //         currentSort={currentSort}
                //         updateSort={updateSort}
                //         stickyFirstColumn={stickyFirstColumn}
                //         highlightedColumns={highlightedColumns}
                //         index={i}
                //         {...columns} />
                // ),
                header: 'Prime Award ID',
                footer: (props) => props.column.id
            },
            {
                accessorKey: 'count',
                header: 'Count of Subwards that Match Search Criteria',
                footer: (props) => props.column.id
            },
            {
                accessorKey: 'obligations',
                header: 'Obligations that Match Search Criteria',
                footer: (props) => props.column.id
            }
        ],
        []
    );

    const [data, setData] = useState([]);

    const [expanded, setExpanded] = useState({});

    const table = useReactTable({
        data,
        columns: cols,
        state: {
            expanded
        },
        onExpandedChange: setExpanded,
        getSubRows: (row) => row.subRows,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getExpandedRowModel: getExpandedRowModel()
    });

    return (
        <div className="p-2">
            <div className="h-2" />
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder ? null : (
                                        <div>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {header.column.getCanFilter() ? (
                                                <div>
                                                    <Filter column={header.column} table={table} />
                                                </div>
                                            ) : null}
                                        </div>
                                    )}
                                </th>
                            )
                            )}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

ExpandableTable.propTypes = propTypes;

export default ExpandableTable;

