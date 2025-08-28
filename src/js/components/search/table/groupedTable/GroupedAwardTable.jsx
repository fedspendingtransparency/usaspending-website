/* eslint-disable react-hooks/exhaustive-deps */
/**
 * TanStackTable.jsx
 * Created by JD House July 2, 2025
 */

import React, { useMemo, useState } from 'react';
import PropTypes, { shape, oneOf } from 'prop-types';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    flexRender,
    getSortedRowModel
} from '@tanstack/react-table';
import { uniqueId } from 'lodash-es';
import { ColumnBuilder } from 'models/v2/search/table/groupedTable/ColumnBuilder';
import { Pagination } from "data-transparency-ui";
import GroupedTableHeader from './GroupedTableHeader';
import NestedAwardTable from './NestedAwardTable';

const propTypes = {
    columnType: PropTypes.string,
    expandableData: PropTypes.array,
    subCols: PropTypes.object,
    sort: shape({
        direction: oneOf(['asc', 'desc']),
        field: PropTypes.string
    }),
    updateSort: PropTypes.func,
    isMobile: PropTypes.bool,
    newMobileView: PropTypes.bool,
    subaward: PropTypes.bool,
    currentType: PropTypes.string
};

const GroupedAwardTable = (props) => {
    const [awardId, setAwardId] = useState(null);
    const [expanded, setExpanded] = useState({});
    let resultsCount = props.resultsCount;
    let top = 45;

    const toggleSubData = (id, rowId) => {
        if (props.toggleSubData) {
            props.toggleSubData(id);
        }

        if (Object.hasOwn(expanded, rowId)) {
            // assume row is expanded and needs unexpanded
            const newExpanded = { ...expanded };
            delete newExpanded[rowId];
            setAwardId(id);
            setExpanded(newExpanded);
            return null;
        }

        setAwardId(id);
        setExpanded((prevState) => ({
            ...prevState,
            [rowId]: true
        }));

        return true;
    };

    const columns = useMemo(() => ColumnBuilder(
        props.columnType,
        // togglePrimeAward,
        toggleSubData,
        expanded
    ), [expanded, props.columnType, toggleSubData]);

    const table = useReactTable({
        data: props.expandableData,
        columns,
        state: {
            expanded
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
        rowCount: props.resultsLimit,
        filterFromLeafRows: true, // search through the expanded rows
        maxLeafRowFilterDepth: 1
    });


    return (
        <>
            <div
                className="advanced-search__table-wrapper"
                id="advanced-search__table-wrapper"
                style={props.resultsCount >= props.resultsLimit ? { height: '638px' } : {}}>
                <table className={`usda-table table-for-new-search-page award-results-table-dtui expandable ${Object.keys(expanded).length ? ' expandable-table__show-expanded' : ''}`}>
                    <thead className="usda-table__head" style={{ maxWidth: '100%' }}>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="usda-table__row" style={{ height: 45 }}>
                                {headerGroup.headers.map((header, h) => (
                                    <th key={header.id} className="table-header stickyColumn">
                                        {header.isPlaceholder
                                            ? null
                                            : <GroupedTableHeader
                                                index={h}
                                                updateSort={props.updateSort}
                                                currentSort={props.sort}
                                                header={header} />
                                        }
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="usda-table__body">
                        {table.getRowModel().rows.map((row) => (
                            <React.Fragment key={uniqueId()}>
                                <tr key={row.id} className={`usda-table__row-item usda-table__row ${row.getIsExpanded() ? "expaned-table-parent__sticky" : ""}`}>
                                    {row.getVisibleCells().map((cell, c) => {
                                        if (row.getIsExpanded()) {
                                            // very hacky, but works for now.
                                            const countKey = Object.keys(row.original).find((key) => key.endsWith('count'));
                                            resultsCount = row.original[countKey];
                                            const addTo = 45 * c;
                                            top += addTo;
                                        }

                                        return (
                                            <td key={cell.id} className="usda-table__cell">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        );
                                    })}
                                </tr>

                                {row.getIsExpanded() && (
                                    <tr className="expaned-table-container">
                                        <td colSpan={row.getVisibleCells().length} className="expaned-table-container__outer-cell" style={{ top: `${top}px` }}>
                                            <NestedAwardTable
                                                {...props}
                                                awardId={awardId}
                                                resultsCount={resultsCount} />
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                resultsText
                limitSelector
                hideLast={props.expandableData.length >= 50000}
                currentPage={props.page}
                pageSize={props.resultsLimit}
                changePage={props.setPage}
                changeLimit={props.setResultLimit}
                totalItems={props.expandableData.length} />
        </>
    );
};

GroupedAwardTable.propTypes = propTypes;

export default GroupedAwardTable;

