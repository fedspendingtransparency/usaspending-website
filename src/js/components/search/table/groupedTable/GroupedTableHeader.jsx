/**
 * NestedTanStackTable.jsx
 * Created by JD House July 23, 2025
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    flexRender
} from '@tanstack/react-table';

const propTypes = {
    index: PropTypes.number,
    updateSort: PropTypes.func,
    currentSort: PropTypes.object,
    header: PropTypes.object
};

const GroupedTableHeader = ({
    index,
    updateSort,
    currentSort,
    header
}) => {
    const title = header.column.columnDef.header;

    const handleClickedSort = (e, sortOn = title) => {
        updateSort(sortOn, e.target.value);
    };

    const SortIcon = () => {
        // highlight the active arrow
        const activeAsc = (currentSort?.field === title && currentSort?.direction === 'asc')
            ? ' table-header__icon_active' : '';
        const activeDesc = (currentSort?.field === title && currentSort?.direction === 'desc')
            ? ' table-header__icon_active' : '';

        return (
            <div className="table-header__sort">
                <button
                    type="button"
                    onClick={handleClickedSort}
                    className={`table-header__icon${activeAsc}`}
                    value="asc"
                    title={`Sort table by ascending ${title}`}
                    aria-label={`Sort table by ascending ${title}`}>
                    <FontAwesomeIcon size="2x" icon="caret-up" />
                </button>
                <button
                    type="button"
                    onClick={handleClickedSort}
                    className={`table-header__icon${activeDesc}`}
                    value="desc"
                    title={`Sort table by descending ${title}`}
                    aria-label={`Sort table by descending ${title}`}>
                    <FontAwesomeIcon size="2x" icon="caret-down" />
                </button>
            </div>
        );
    };

    return (
        <div className={`table-header__content${index > 0 ? ' table-header__content_right' : ''}`} >
            <div className="table-header__label">
                { flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                )}
                <></>
                {(updateSort && title) && (
                    <SortIcon />
                )}
            </div>
        </div>
    );
};

GroupedTableHeader.propTypes = propTypes;

export default GroupedTableHeader;

