/**
 * MapListHeaderCell.jsx
 * Created by Kevin Li 5/22/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { ArrowUp, ArrowDown } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    title: PropTypes.string,
    currentSort: PropTypes.object,
    defaultDirection: PropTypes.string,
    changeSearchOrder: PropTypes.func,
    isLast: PropTypes.bool,
    field: PropTypes.string
};

export default class MapListHeaderCell extends React.Component {
    constructor(props) {
        super(props);

        this.clickedHeader = this.clickedHeader.bind(this);
        this.forceDirection = this.forceDirection.bind(this);
    }

    clickedHeader() {
        // check if this is the field that is currently being used to sort
        if (this.props.field === this.props.currentSort.field) {
            // it's the same field, just toggle the direction
            let direction = 'asc';
            if (this.props.currentSort.direction === 'asc') {
                direction = 'desc';
            }

            this.props.changeSearchOrder(this.props.field, direction);
        }
        else {
            // this is a new sort field, use the default direction
            this.props.changeSearchOrder(this.props.field, this.props.defaultDirection);
        }
    }

    forceDirection(e) {
        // don't bubble down to the wrapper click event (which performs similar action)
        e.stopPropagation();

        const direction = e.currentTarget.value;
        this.props.changeSearchOrder(this.props.field, direction);
    }

    render() {
        // highlight the active arrows
        let activeAsc = '';
        let activeDesc = '';
        if (this.props.field === this.props.currentSort.field) {
            // this is the column that the table is sorted by
            if (this.props.currentSort.direction === 'asc') {
                activeAsc = ' active';
            }
            else {
                activeDesc = ' active';
            }
        }

        let lastClass = '';
        if (this.props.isLast) {
            lastClass = ' last-column';
        }

        /* eslint-disable jsx-a11y/no-static-element-interactions */
        // we need to allow the outer div to take an onClick event because there are nested
        // buttons within the div for specific ascending/descending sort actions
        // React does not allow nested buttons. The larger cell/div click target is simply for
        // convenience, screen-reader users are expected to use the button elements instead as
        // they are presented as interactive clickable targets
        return (
            <div className={`map-list-header-cell ${lastClass}`}>
                <div className="cell-content" onClick={this.clickedHeader}>
                    <div className="header-sort">
                        <div className="header-label">
                            {this.props.title}
                        </div>
                        <div className="header-icons">
                            <button
                                className={`sort-icon${activeAsc}`}
                                value="asc"
                                title={`Sort table by ascending ${this.props.title}`}
                                aria-label={`Sort table by ascending ${this.props.title}`}
                                onClick={this.forceDirection}>
                                <ArrowUp
                                    alt={`Sort table by ascending ${this.props.title}`} />
                            </button>
                            <button
                                className={`sort-icon${activeDesc}`}
                                value="desc"
                                title={`Sort table by descending ${this.props.title}`}
                                aria-label={`Sort table by descending ${this.props.title}`}
                                onClick={this.forceDirection}>
                                <ArrowDown
                                    alt={`Sort table by descending ${this.props.title}`} />
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
