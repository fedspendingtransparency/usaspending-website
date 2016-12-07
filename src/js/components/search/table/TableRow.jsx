/**
  * TableRow.jsx
  * Created by Kevin Li 12/6/16
  **/

import React from 'react';
import TableCell from './TableCell';

export default class TableRow extends React.Component {
    render() {
        const cells = this.props.columns.map((column) => (
            <TableCell
                column={column}
                height={this.props.rowHeight}
                width={column.width}
                rowIndex={this.props.rowIndex}
                key={`${column.key}-${this.props.rowIndex}`} />
        ));

        return (
            <div className="table-row">
                {cells}
            </div>
        );
    }
}