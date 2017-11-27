/**
  * TableRow.jsx
  * Created by Kevin Li 12/6/16
  **/

import React from 'react';
import PropTypes from 'prop-types';
import TableCell from './TableCell';

const propTypes = {
    visibleColumns: PropTypes.array.isRequired,
    visibleCoords: PropTypes.string.isRequired,
    dataHash: PropTypes.string,
    rowHeight: PropTypes.number.isRequired,
    rowIndex: PropTypes.number.isRequired
};

export default class TableRow extends React.Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps.visibleCoords !== this.props.visibleCoords) {
            // only update if the visible columns have changed
            // rows themselves will be mounted/unmounted as they move into/out of view
            return true;
        }
        else if (nextProps.dataHash !== this.props.dataHash) {
            // force an update if the data hash has changed
            return true;
        }
        return false;
    }

    render() {
        // iterate through and only render the visible columns
        const cells = this.props.visibleColumns.map((column) => (
            <TableCell
                column={column}
                height={this.props.rowHeight}
                width={column.width}
                left={column.left}
                rowIndex={this.props.rowIndex}
                key={`${column.columnId}-${this.props.rowIndex}-${this.props.dataHash}`} />
        ));

        const style = {
            top: this.props.rowHeight * this.props.rowIndex
        };

        return (
            <div
                className="ibt-table-row"
                style={style}
                role="row">
                {cells}
            </div>
        );
    }
}

TableRow.propTypes = propTypes;
