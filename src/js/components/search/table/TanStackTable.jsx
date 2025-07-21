/**
 * TanStackTable.jsx
 * Created by JD House July 2, 2025
 */

import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    flexRender,
    getSortedRowModel
} from '@tanstack/react-table';
import { uniqueId } from 'lodash';
import { ColumnBuilder } from 'models/v2/search/table/ColumnBuilder';
import NestedTanStackTable from './NestedTanStackTable';


const propTypes = {
    columnType: PropTypes.string,
    data: PropTypes.array
};

const TanStackTable = (props) => {
    const [awardId, setAwardId] = useState(null);
    const [expanded, setExpanded] = useState({});

    const togglePrimeAward = (primeAwardId, rowId) => {
        if (Object.hasOwn(expanded, rowId)) {
            // assume row is expanded and needs unexpanded
            const newExpanded = { ...expanded };
            delete newExpanded[rowId];
            setAwardId(null);
            setExpanded(newExpanded);
            return null;
        }
        setAwardId(primeAwardId);
        setExpanded((prevState) => ({
            ...prevState,
            [rowId]: true
        }));
        return true;
    };

    const columns = useMemo(() => ColumnBuilder(
        props.columnType,
        togglePrimeAward,
        expanded
    ), [props.data, props.columnType]);

    const table = useReactTable({
        data: props.data,
        columns,
        state: {
            expanded
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel()
    });

    return (
        <table className="usda-table table-for-new-search-page award-results-table-dtui">
            <thead className="usda-table__head">
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="usda-table__row" style={{ height: 45 }}>
                        {headerGroup.headers.map((header, h) => (
                            <th key={header.id} className={`table-header ${h === 0 ? ' stickyColumn' : ''}`}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody className="usda-table__body">
                {table.getRowModel().rows.map((row) => (
                    <React.Fragment key={uniqueId()}>
                        <tr key={row.id} className={`usda-table__row-item usda-table__row ${row.getIsExpanded() ? "expaned-table-parent__sticky" : ""}`}>
                            {row.getVisibleCells().map((cell, c) => (
                                <td key={cell.id} className={`usda-table__cell ${c === 0 ? ' stickyColumn' : ''}`}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>

                        {row.getIsExpanded() && (
                            <tr className="expaned-table-container">
                                <td colSpan={row.getAllCells().length} className="expaned-table-container__outer-cell">

                                    <NestedTanStackTable
                                        {...props}
                                        awardId={awardId} />
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    );
};

TanStackTable.propTypes = propTypes;

export default TanStackTable;

