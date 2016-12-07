/**
  * TableCell.jsx
  * Created by Kevin Li 12/6/16
  **/

import React from 'react';

export default class TableCell extends React.Component {
    render() {
        const style = {
            maxHeight: this.props.height,
            minHeight: this.props.height,
            maxWidth: this.props.width,
            minWidth: this.props.width,
        };

        return (
            <div className="table-cell" style={style}>
                {this.props.column.cell(this.props.rowIndex)}
            </div>
        );
    }
}