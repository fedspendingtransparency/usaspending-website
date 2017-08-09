/**
 * TableCell.jsx
 * Created by Lizzie Salita 08/01/17
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    rowIndex: PropTypes.number,
    column: PropTypes.object
};

export default class TableCell extends React.Component {
    render() {
        let rowClass = 'row-even';
        if (this.props.rowIndex % 2 === 0) {
            // row index is zero-based
            rowClass = 'row-odd';
        }

        return (
            <td className={rowClass}>
                {this.props.column.cell(this.props.rowIndex)}
            </td>
        );
    }
}

TableCell.propTypes = propTypes;

