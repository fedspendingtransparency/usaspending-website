/**
 * MapListHeaderCell.jsx
 * Created by Kevin Li 5/22/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    label: PropTypes.string,
    column: PropTypes.string,
    columnIndex: PropTypes.number,
    defaultDirection: PropTypes.string,
    order: PropTypes.object,
    changeSearchOrder: PropTypes.func,
    isLastColumn: PropTypes.bool
};

export default class MapListHeaderCell extends React.Component {
    constructor(props) {
        super(props);

        this.clickedHeader = this.clickedHeader.bind(this);
        this.pressedKey = this.pressedKey.bind(this);
        this.forceDirection = this.forceDirection.bind(this);
    }

    clickedHeader() {
        // check if this is the field that is currently being used to sort
        if (this.props.column === this.props.order.field) {
            // it's the same field, just toggle the direction
            let direction = 'asc';
            if (this.props.order.direction === 'asc') {
                direction = 'desc';
            }

            this.props.changeSearchOrder(this.props.column, direction);
        }
        else {
            // this is a new sort field, use the default direction
            this.props.changeSearchOrder(this.props.column, this.props.defaultDirection);
        }
    }

    pressedKey(e) {
        if (e.key === '' || e.key === 'Enter') {
            this.clickedHeader();
        }
    }

    forceDirection(e) {
        // don't bubble down to the wrapper click event (which performs similar action)
        e.stopPropagation();

        const direction = e.currentTarget.value;
        this.props.changeSearchOrder(this.props.column, direction);
    }

    render() {
        // highlight the active arrows
        let activeAsc = '';
        let activeDesc = '';
        let sortDescription = false;
        if (this.props.column === this.props.order.field) {
            // this is the column that the table is sorted by
            if (this.props.order.direction === 'asc') {
                activeAsc = ' active';
                sortDescription = 'ascending';
            }
            else {
                activeDesc = ' active';
                sortDescription = 'descending';
            }
        }

        let lastClass = '';
        if (this.props.isLastColumn) {
            lastClass = ' last-column';
        }

        /* eslint-disable jsx-a11y/no-static-element-interactions */
        // we need to allow the outer div to take an onClick event because there are nested
        // buttons within the div for specific ascending/descending sort actions
        // React does not allow nested buttons. The larger cell/div click target is simply for
        // convenience, screen-reader users are expected to use the button elements instead as
        // they are presented as interactive clickable targets
        return (
            <div
                className={`map-list-header-cell column-${this.props.column}${lastClass}`}
                role="group"
                onKeyPress={this.pressedKey}
                tabIndex={-1}>
                <div
                    className="cell-content"
                    onClick={this.clickedHeader}
                    role="columnheader"
                    aria-sort={sortDescription}
                    aria-label={this.props.label}
                    aria-colindex={this.props.columnIndex}
                    tabIndex={-1}>
                    <div className="header-sort">
                        <div className="header-label">
                            {this.props.label}
                        </div>
                        <div className="header-icons">
                            <button
                                className={`sort-icon${activeAsc}`}
                                value="asc"
                                title={`Sort table by ascending ${this.props.label}`}
                                aria-label={`Sort table by ascending ${this.props.label}`}
                                onClick={this.forceDirection}>
                                <Icons.ArrowUp
                                    alt={`Sort table by ascending ${this.props.label}`} />
                            </button>
                            <button
                                className={`sort-icon${activeDesc}`}
                                value="desc"
                                title={`Sort table by descending ${this.props.label}`}
                                aria-label={`Sort table by descending ${this.props.label}`}
                                onClick={this.forceDirection}>
                                <Icons.ArrowDown
                                    alt={`Sort table by descending ${this.props.label}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
        /* eslint-enable jsx-a11y/no-static-element-interactions */
    }
}

MapListHeaderCell.propTypes = propTypes;
