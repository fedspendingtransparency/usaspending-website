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
    updateSort: PropTypes.func
};

const TableHeaderCell = (props) => {
    const clickedSort = (e) => {
        props.updateSort(props.title, e.target.value);
    };

    const clickedDefault = () => {
        // if (props.isActive) {
        //     // toggle the sort direction
        //     let opposite = 'asc';
        //     if (props.currentSort.direction === 'asc') {
        //         opposite = 'desc';
        //     }
        //     props.updateSort(props.title, opposite);
        // }
        // else {
        //     props.updateSort(props.title, props.defaultDirection);
        // }
        // BODGE: don't allow ascending
        props.updateSort(props.title, 'desc');
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
    const activeAsc = '';
    let activeDesc = '';

    if (props.isActive) {
        activeDesc = ' active';
    }

    const customStyle = props.background ? (
        { backgroundColor: props.background }
    ) : {};

    /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
    // allow keyboard selection of the header cell
    return (
        <div className={`award-result-header-cell ${lastClass}`}>
            <div
                className="cell-content"
                style={customStyle}
                onClick={clickedDefault}
                onKeyDown={pressedKey}
                role="presentation"
                aria-label={props.title}
                tabIndex={0}>
                <div className="header-sort">
                    <div className="header-label">
                        {props.displayName}{props.subtitle ? (<div>{props.subtitle}</div>) : ''}
                    </div>
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
                </div>
            </div>
        </div>
    );
    /* eslint-enable jsx-a11y/no-noninteractive-tabindex */
};

TableHeaderCell.propTypes = propTypes;

export default TableHeaderCell;
