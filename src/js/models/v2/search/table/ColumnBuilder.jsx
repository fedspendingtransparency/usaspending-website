/* eslint-disable import/prefer-default-export */
/**
 * ColumnBuilder.jsx
 * Created by JD House 7/17/2025
 */
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createColumnHelper } from '@tanstack/react-table';
import { uniqueId } from 'lodash';
import {
    subAwardDefaultColumns,
    transactionsDefaultColumns,
    expandedTransactionColumns,
    expandedSubawardColumns
} from 'dataMapping/search/tanStackTableColumns';


const getColumnArray = (type) => {
    switch (type) {
        case "subawards":
            return subAwardDefaultColumns;
        case "transactions":
            return transactionsDefaultColumns;
        case "expanded-subawards":
            return expandedSubawardColumns;
        case "expanded-transactions":
            return expandedTransactionColumns;
        // many more to come.
        default:
            return null;
    }
};

export const ColumnBuilder = (columnType, onButtonClick, expanded) => {
    if (!columnType) return null;

    const columnHelper = createColumnHelper();
    const columnArray = getColumnArray(columnType);

    if (!columnArray) return null;

    const columns = columnArray.map((col) => {
        switch (col.type) {
            case "expandableButton":
                return columnHelper.accessor(col.key, {
                    header: col.header,
                    id: uniqueId(),
                    cell: ({ row, getValue }) => (
                        <button
                            onClick={() => onButtonClick(getValue(), row.id)}
                            onKeyDown={() => onButtonClick(getValue(), row.id)}
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
                            onClick={col.onClick || (() => {})}>{getValue()}
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
    });

    return columns;
};

