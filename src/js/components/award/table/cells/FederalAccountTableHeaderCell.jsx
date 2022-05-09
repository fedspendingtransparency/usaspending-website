/**
 * FederalAccountTableHeaderCell.jsx
 * Created by Kwadwo Opoku-Debrah 04/04/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    label: PropTypes.string,
    column: PropTypes.string,
    defaultDirection: PropTypes.string,
    order: PropTypes.object,
    setTransactionSort: PropTypes.func,
    isLastColumn: PropTypes.bool,
    tableMapping: PropTypes.object
};

export default class FederalAccountTableHeaderCell extends React.Component {
    constructor(props) {
        super(props);

        this.clickedHeader = this.clickedHeader.bind(this);
        this.forceDirection = this.forceDirection.bind(this);
        this.pressedKey = this.pressedKey.bind(this);
    }

    clickedHeader() {
    // check if this is the field that is currently being used to sort
        const apiFieldName = this.props.tableMapping.table._mapping[this.props.column];
        if (apiFieldName === this.props.order.field) {
            // it's the same field, just toggle the direction
            let direction = 'asc';
            if (this.props.order.direction === 'asc') {
                direction = 'desc';
            }

            this.props.setTransactionSort({
                direction,
                field: apiFieldName
            });
        }
        else {
            // this is a new sort field, use the default direction
            this.props.setTransactionSort({
                field: apiFieldName,
                direction: this.props.defaultDirection
            });
        }
    }

    forceDirection(e) {
    // don't bubble down to the wrapper click event (which performs similar action)
        e.stopPropagation();

        const direction = e.currentTarget.value;
        const apiFieldName = this.props.tableMapping.table._sortFields[this.props.column];
        this.props.setTransactionSort({
            direction,
            field: apiFieldName
        });
    }

    pressedKey(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.clickedHeader();
        }
    }

    render() {
    // highlight the active arrows
        const apiFieldName = this.props.tableMapping.table._sortFields[this.props.column];
        let activeAsc = '';
        let activeDesc = '';
        if (apiFieldName === this.props.order.field) {
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
            <div className={`transaction-header-cell column-${this.props.column}${lastClass}`}>
                <div
                    className="cell-content"
                    onClick={this.clickedHeader}
                    onKeyDown={this.pressedKey}>
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

FederalAccountTableHeaderCell.propTypes = propTypes;
