/**
  * TableCell.jsx
  * Created by Kevin Li 12/6/16
  **/

import React from 'react';

const propTypes = {
    height: React.PropTypes.number,
    width: React.PropTypes.number,
    left: React.PropTypes.number,
    rowIndex: React.PropTypes.number,
    column: React.PropTypes.object
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
            <div className="ibt-table-cell" style={style}>
                {this.props.column.cell(this.props.rowIndex)}
            </div>
        );
    }
}

TableCell.propTypes = propTypes;
