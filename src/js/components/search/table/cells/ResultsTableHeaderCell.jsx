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

const defaultProps = {
    headerHeight: 50
};

const TableHeaderCell = (props) => {
    const clickedSort = (e) => {
        e.preventDefault();
        props.updateSort(props.title, e.currentTarget.value);
    };

    const clickedDefault = () => {
        if (props.isActive) {
            // toggle the sort direction
            let opposite = 'asc';
            if (props.currentSort.direction === 'asc') {
                opposite = 'desc';
            }
            props.updateSort(props.title, opposite);
        }
        else {
            props.updateSort(props.title, props.defaultDirection);
        }
    };

    // keyboard accessible option
    const pressedKey = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            clickedDefault();
        }
    };

    const sortClass = (direction) => (props.isActive && props.currentSort.direction === direction ? ' active' : '');

    let lastClass = '';
    if (props.isLast) {
        lastClass = ' last-column';
    }

    const customStyle = props.background ? (
        { backgroundColor: props.background, height: props.headerHeight }
    ) : { height: props.headerHeight };

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
                        aria-label={props.title}
                        tabIndex={0}>
                        {props.displayName}{props.subtitle ? (<div>{props.subtitle}</div>) : ''}
                    </div>
                    <div className="header-icons">
                        <button
                            onClick={clickedSort}
                            className={`sort-icon${sortClass('asc')}`}
                            value="asc"
                            title={`Sort table by ascending ${props.title}`}
                            aria-label={`Sort table by ascending ${props.title}`}>
                            <ArrowUp
                                alt={`Sort table by ascending ${props.title}`} />
                        </button>
                        <button
                            onClick={clickedSort}
                            className={`sort-icon${sortClass('desc')}`}
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
TableHeaderCell.defaultProps = defaultProps;

export default TableHeaderCell;
