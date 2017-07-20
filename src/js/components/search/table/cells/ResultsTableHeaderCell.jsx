/**
  * ResultsTableHeaderCell.jsx
  * Created by Kevin Li 12/1/16
  **/

import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    label: PropTypes.string,
    column: PropTypes.string,
    defaultDirection: PropTypes.string,
    order: PropTypes.object,
    setSearchOrder: PropTypes.func,
    isLastColumn: PropTypes.bool
};

export default class ResultsTableHeaderCell extends React.Component {
    constructor(props) {
        super(props);

        this.clickedHeader = this.clickedHeader.bind(this);
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

            this.props.setSearchOrder(this.props.column, direction);
        }
        else {
            // this is a new sort field, use the default direction
            this.props.setSearchOrder(this.props.column, this.props.defaultDirection);
        }
    }

    forceDirection(e) {
        // don't bubble down to the wrapper click event (which performs similar action)
        e.stopPropagation();

        const direction = e.currentTarget.value;
        this.props.setSearchOrder(this.props.column, direction);
    }

    render() {
        // highlight the active arrows
        let activeAsc = '';
        let activeDesc = '';
        if (this.props.column === this.props.order.field) {
            // this is the column that the table is sorted by
            if (this.props.order.direction === 'asc') {
                activeAsc = ' active';
            }
            else {
                activeDesc = ' active';
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
            <div className={`award-result-header-cell column-${this.props.column}${lastClass}`}>
                <div className="cell-content" onClick={this.clickedHeader}>
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

ResultsTableHeaderCell.propTypes = propTypes;
