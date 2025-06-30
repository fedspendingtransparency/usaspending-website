import React, { useMemo, useState } from 'react';
// import PropTypes, { shape, oneOf, oneOfType } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    createColumnHelper,
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    flexRender,
    getSortedRowModel,
    useExpanded
} from '@tanstack/react-table';
import { uniqueId } from 'lodash';
import NestedTanStackTable from './NestedTanStackTable';
import { subAwardDefaultColumns, transactionsDefaultColumns } from '../../../dataMapping/search/tanStackTableColumns';

const TanStackTable = (props) => {
    const [awardId, setAwardId] = useState(null);
    const [expanded, setExpanded] = useState({});
    const columnHelper = createColumnHelper();
    let columnArray = subAwardDefaultColumns;

    if (props.columnType === "transactions") {
        columnArray = transactionsDefaultColumns;
    }

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


    const columns = useMemo(() => columnArray.map((col) => {
        switch (col.type) {
            case "expandableButton":
                return columnHelper.accessor(col.key, {
                    header: col.header,
                    id: uniqueId(),
                    cell: ({ row, getValue }) => (
                        <button
                            onClick={() => togglePrimeAward(getValue(), row.id)}
                            onKeyDown={() => togglePrimeAward(getValue(), row.id)}
                            role="link"
                            className={`usa-button-link ${col.className ? col.className : ''}`} >
                            <FontAwesomeIcon
                                icon={`${expanded[row.id] ? "chevron-down" : "chevron-right"}`} />
                            {' '}
                            {getValue()}
                        </button>
                    )
                });
            case "formatted":
                return columnHelper.accessor(col.key, {
                    header: col.header,
                    id: uniqueId(),
                    cell: col.element
                });
            case "link":
                return columnHelper.accessor(col.key, {
                    header: col.header,
                    id: uniqueId(),
                    cell: ({ getValue }) => (
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={col.link}
                            onClick={col.onClick}>{getValue()}
                        </a>
                    )
                });
            default:
                return columnHelper.accessor(col.key, {
                    header: col.header,
                    id: uniqueId(),
                    cell: (info) => info.getValue()
                });
        }
    }), [props.data, expanded]);

    const table = useReactTable({
        data: props.data,
        columns,
        state: {
            expanded
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        useExpanded
    });

    return (
        <table className="usda-table table-for-new-search-page expandable-table">
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="usda-table__row">
                        {headerGroup.headers.map((header) => (
                            <th key={header.id}>
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
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>

                        {row.getIsExpanded() && (
                            <tr>
                                <td colSpan={row.getAllCells().length}>

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

// ExpandableTable.propTypes = propTypes;

export default TanStackTable;

