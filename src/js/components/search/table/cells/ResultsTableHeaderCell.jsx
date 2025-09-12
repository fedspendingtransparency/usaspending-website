/**
 * ResultsTableHeaderCell.jsx
 * Created by Kevin Li 12/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ArrowUp, ArrowDown } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    isLast: PropTypes.bool,
    isActive: PropTypes.bool,
    title: PropTypes.string,
    displayName: PropTypes.string,
    subtitle: PropTypes.string,
    background: PropTypes.string,
    defaultDirection: PropTypes.string,
    currentSort: PropTypes.object,
    updateSort: PropTypes.func,
    headerHeight: PropTypes.number
};

const TableHeaderCell = ({
    isLast,
    isActive,
    title,
    displayName,
    subtitle,
    background,
    defaultDirection,
    currentSort,
    updateSort,
    headerHeight = 50
}) => {
    const clickedSort = (e) => {
        e.preventDefault();
        updateSort(title, e.currentTarget.value);
    };

    const clickedDefault = () => {
        if (isActive) {
            // toggle the sort direction
            let opposite = 'asc';
            if (currentSort.direction === 'asc') {
                opposite = 'desc';
            }
            updateSort(title, opposite);
        }
        else {
            updateSort(title, defaultDirection);
        }
    };

    // keyboard accessible option
    const pressedKey = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            clickedDefault();
        }
    };

    const sortClass = (direction) => (
        isActive && currentSort.direction === direction ? ' active' : ''
    );

    let lastClass = '';
    if (isLast) {
        lastClass = ' last-column';
    }

    const customStyle = background ? (
        { backgroundColor: background, height: headerHeight }
    ) : { height: headerHeight };

    /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
    // allow keyboard selection of the header cell
    return (
        <div className={`award-result-header-cell ${lastClass}`}>
            <div
                className="cell-content"
                style={customStyle}>
                <div className="header-sort">
                    <div
                        onClick={clickedDefault}
                        onKeyDown={pressedKey}
                        className="header-label"
                        role="presentation"
                        aria-label={title}
                        tabIndex={0}>
                        {displayName}{subtitle ? (<div>{subtitle}</div>) : ''}
                    </div>
                    <div className="header-icons">
                        <button
                            onClick={clickedSort}
                            className={`sort-icon${sortClass('asc')}`}
                            value="asc"
                            title={`Sort table by ascending ${title}`}
                            aria-label={`Sort table by ascending ${title}`}>
                            <ArrowUp
                                alt={`Sort table by ascending ${title}`} />
                        </button>
                        <button
                            onClick={clickedSort}
                            className={`sort-icon${sortClass('desc')}`}
                            value="desc"
                            title={`Sort table by descending ${title}`}
                            aria-label={`Sort table by descending ${title}`}>
                            <ArrowDown
                                alt={`Sort table by descending ${title}`} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
    /* eslint-enable jsx-a11y/no-noninteractive-tabindex */
};

TableHeaderCell.propTypes = propTypes;
export default TableHeaderCell;
