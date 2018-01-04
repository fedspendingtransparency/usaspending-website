/**
 * TableRow.jsx
 * Created by Lizzie Salita 12/15/17
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    columns: PropTypes.array.isRequired,
    file: PropTypes.object,
    rowIndex: PropTypes.number.isRequired
};

export default class TableRow extends React.PureComponent {
    render() {
        let rowClass = 'row-even';
        if (this.props.rowIndex % 2 === 0) {
            rowClass = 'row-odd';
        }
        const cells = this.props.columns.map((column) => {
            if (column.columnName === 'fileName') {
                // link to the file
                return (
                    <td
                        className={rowClass}
                        key={`${column.columnName}-${this.props.file.url}`}>
                        <a
                            href={this.props.file.url}
                            target="_blank"
                            rel="noopener noreferrer">
                            {this.props.file.fileName}
                        </a>
                    </td>
                );
            }
            return (
                <td
                    className={rowClass}
                    key={`${column.columnName}-${this.props.file.url}`}>
                    {this.props.file[column.columnName]}
                </td>
            );
        });

        return (
            <tr>
                {cells}
            </tr>
        );
    }
}

TableRow.propTypes = propTypes;
