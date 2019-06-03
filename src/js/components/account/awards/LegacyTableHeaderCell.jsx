/**
 * LegacyTableHeaderCell.jsx
 * Created by Kevin Li 12/15/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ArrowUp, ArrowDown } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    isLast: PropTypes.bool,
    field: PropTypes.string,
    title: PropTypes.string,
    defaultDirection: PropTypes.string,
    currentSort: PropTypes.object,
    updateSort: PropTypes.func
};

const TableHeaderCell = (props) => {
    const clickedSort = (e) => {
        props.updateSort(props.field, e.target.value);
    };

    const clickedDefault = () => {
        if (props.currentSort.field === props.field) {
            // toggle the sort direction
            let opposite = 'asc';
            if (props.currentSort.direction === 'asc') {
                opposite = 'desc';
            }
            props.updateSort(props.field, opposite);
        }
        else {
            props.updateSort(props.field, props.defaultDirection);
        }
    };

    // keyboard accessible option
    const pressedKey = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            clickedDefault();
        }
    };

    let lastClass = '';
    if (props.isLast) {
        lastClass = ' last-column';
    }

    // highlight the active arrows
    let activeAsc = '';
    let activeDesc = '';

    if (props.currentSort.field === props.field && props.currentSort.direction === 'desc') {
        activeDesc = ' active';
    }
    else if (props.currentSort.field === props.field && props.currentSort.direction === 'asc') {
        activeAsc = ' active';
    }

    /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
    // allow the sort cell to be selectable
    return (
        <div className={`award-result-header-cell ${lastClass}`}>
            <div
                className="cell-content"
                onClick={clickedDefault}
                onKeyDown={pressedKey}
                role="presentation"
                tabIndex={0}>
                <div className="header-sort">
                    <div className="header-label">
                        {props.title}
                    </div>
                    {
                        props.defaultDirection &&
                        <div className="header-icons">
                            <button
                                onClick={clickedSort}
                                className={`sort-icon${activeAsc}`}
                                value="asc"
                                title={`Sort table by ascending ${props.title}`}
                                aria-label={`Sort table by ascending ${props.title}`}>
                                <ArrowUp
                                    alt={`Sort table by ascending ${props.title}`} />
                            </button>
                            <button
                                onClick={clickedSort}
                                className={`sort-icon${activeDesc}`}
                                value="desc"
                                title={`Sort table by descending ${props.title}`}
                                aria-label={`Sort table by descending ${props.title}`}>
                                <ArrowDown
                                    alt={`Sort table by descending ${props.title}`} />
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
};

TableHeaderCell.propTypes = propTypes;

export default TableHeaderCell;
