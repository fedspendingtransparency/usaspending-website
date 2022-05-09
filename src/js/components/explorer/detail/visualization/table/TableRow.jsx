/**
 * TableRow.jsx
 * Created by Lizzie Salita 10/12/17
 **/

import React from 'react';
import PropTypes from 'prop-types';
import GenericCell from 'components/agencyLanding/table/cells/GenericCell';
import LinkCell from './cells/LinkCell';

const propTypes = {
    columns: PropTypes.array.isRequired,
    item: PropTypes.object,
    rowIndex: PropTypes.number.isRequired,
    selectedRow: PropTypes.func,
    goToUnreported: PropTypes.func
};

export default class TableRow extends React.PureComponent {
    render() {
        let rowClass = 'row-even';
        if (this.props.rowIndex % 2 === 0) {
            rowClass = 'row-odd';
        }
        const cells = this.props.columns.map((column) => {
            if (column.columnName === 'name' && (this.props.item.id || this.props.item.name === "Unreported Data") && this.props.item.id !== 'undefined') {
                // show the link cell
                return (
                    <td
                        className={rowClass}
                        key={`${column.columnName}-${this.props.item.id}`}>
                        <LinkCell
                            rowIndex={this.props.rowIndex}
                            name={this.props.item.name}
                            data={this.props.item}
                            id={`${this.props.item.id}`}
                            column={column.columnName}
                            selectedRow={this.props.selectedRow}
                            goToUnreported={this.props.goToUnreported} />
                    </td>
                );
            }
            return (
                <td
                    className={rowClass}
                    key={`${column.columnName}-${this.props.item.name}`}>
                    <GenericCell
                        rowIndex={this.props.rowIndex}
                        data={this.props.item.display[column.columnName]}
                        column={column.columnName} />
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
