/**
  * TableCell.jsx
  * Created by Kevin Li 12/6/16
  **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    left: PropTypes.number,
    rowIndex: PropTypes.number,
    column: PropTypes.object
};

export default class TableCell extends React.Component {
    shouldComponentUpdate() {
        // never update, the cell should be entirely mounted or unmounted
        return false;
    }

    render() {
        const style = {
            maxHeight: this.props.height,
            minHeight: this.props.height,
            maxWidth: this.props.width,
            minWidth: this.props.width,
            left: this.props.left
        };

        return (
            <div
                className="ibt-table-cell"
                style={style}
                role="gridcell"
                tabIndex={-1}>
                {this.props.column.cell(this.props.rowIndex)}
            </div>
        );
    }
}

TableCell.propTypes = propTypes;
