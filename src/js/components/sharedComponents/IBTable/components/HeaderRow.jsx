/**
  * HeaderRow.jsx
  * Created by Kevin Li 12/6/16
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { min } from 'lodash';

import HeaderCell from './HeaderCell';

const propTypes = {
    headerHeight: PropTypes.number,
    maxWidth: PropTypes.number,
    width: PropTypes.number,
    columns: PropTypes.array
};

export default class HeaderRow extends React.Component {
    updateScrollPosition(x, y) {
        // by directly modifying the DOM, we can skip the render process
        // this avoids having to iterate through the columns again
        this.rowDiv.style.left = `${-1 * x}px`;
        this.rowDiv.style.top = `${y}px`;
    }

    render() {
        const visibleWidth = min([this.props.maxWidth, this.props.width]);

        const style = {
            height: this.props.headerHeight,
            minWidth: visibleWidth,
            maxWidth: visibleWidth
        };

        const rowStyle = {
            height: this.props.headerHeight,
            width: this.props.width
        };

        const headers = this.props.columns.map((column) => (
            <HeaderCell height={this.props.headerHeight} {...column} key={column.columnId} />
        ));

        return (
            <div className="ibt-header" style={style}>
                <div
                    className="ibt-header-row"
                    style={rowStyle}
                    ref={(div) => {
                        this.rowDiv = div;
                    }}>
                    {headers}
                </div>
            </div>
        );
    }
}

HeaderRow.propTypes = propTypes;
