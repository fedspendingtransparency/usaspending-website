/**
 * TableRow.jsx
 * Created by Lizzie Salita 8/4/17
 **/

import React from 'react';
import PropTypes from 'prop-types';
import GenericCell from 'components/agencyLanding/table/cells/GenericCell';
import AccountLinkCell from './cells/AccountLinkCell';

const propTypes = {
    columns: PropTypes.array.isRequired,
    account: PropTypes.object,
    rowIndex: PropTypes.number.isRequired,
    accountSearchString: PropTypes.string
};

export default class TableRow extends React.PureComponent {
    render() {
        let rowClass = 'row-even';
        if (this.props.rowIndex % 2 === 0) {
            rowClass = 'row-odd';
        }
        const cells = this.props.columns.map((column) => {
            if (column.columnName === 'account_name') {
                // show the account link cell
                return (
                    <td
                        className={rowClass}
                        key={`${column.columnName}-${this.props.account.account_id}`}>
                        <AccountLinkCell
                            rowIndex={this.props.rowIndex}
                            name={this.props.account.account_name}
                            id={this.props.account.account_id}
                            accountSearchString={this.props.accountSearchString}
                            column={column.columnName} />
                    </td>
                );
            }
            return (
                <td
                    className={rowClass}
                    key={`${column.columnName}-${this.props.account.account_id}`}>
                    <GenericCell
                        rowIndex={this.props.rowIndex}
                        data={this.props.account.display[column.columnName]}
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
