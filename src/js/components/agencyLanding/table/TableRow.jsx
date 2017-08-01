/**
 * TableRow.jsx
 * Created by Lizzie Salita 08/01/17
 **/

import React from 'react';
import PropTypes from 'prop-types';
import TableCell from './TableCell';

const propTypes = {
    columns: PropTypes.array.isRequired,
    dataHash: PropTypes.string,
    rowIndex: PropTypes.number.isRequired
};

export default class TableRow extends React.PureComponent {
    shouldComponentUpdate(nextProps) {
        // force an update if the data hash has changed
        return (nextProps.dataHash !== this.props.dataHash);
    }

    render() {
        const cells = this.props.columns.map((column) => (
            <TableCell
                column={column}
                rowIndex={this.props.rowIndex}
                key={`${column.columnId}-${this.props.rowIndex}`} />
        ));

        return (
            <tr>
                {cells}
            </tr>
        );
    }
}

TableRow.propTypes = propTypes;
