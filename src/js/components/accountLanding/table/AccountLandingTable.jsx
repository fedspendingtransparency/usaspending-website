/**
 * AccountLandingTable.jsx
 * Created by Lizzie Salita 8/4/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import LegacyTableHeaderCell from 'components/account/awards/LegacyTableHeaderCell';
import TableRow from './TableRow';

const propTypes = {
    results: PropTypes.array,
    columns: PropTypes.array,
    accountSearchString: PropTypes.string,
    order: PropTypes.object,
    updateSort: PropTypes.func
};

export default class AccountLandingTable extends React.PureComponent {
    render() {
        let noResultsClass = '';
        if (this.props.results.length === 0) {
            // remove duplicated bottom border
            noResultsClass = ' no-results';
        }


        const rows = this.props.results.map((account, index) => (
            <TableRow
                account={account}
                key={account.account_id}
                rowIndex={index}
                columns={this.props.columns}
                accountSearchString={this.props.accountSearchString} />
        ));

        const headers = this.props.columns.map((column, index) => (
            <td key={index}>
                <LegacyTableHeaderCell
                    isLast={index === this.props.columns.length - 1}
                    field={column.columnName}
                    title={column.displayName}
                    defaultDirection={column.defaultDirection}
                    currentSort={this.props.order}
                    updateSort={this.props.updateSort} />
            </td>
        ));

        return (
            <div className={`account-landing-results-table${noResultsClass}`}>
                <table>
                    <thead>
                        <tr>
                            {headers}
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}

AccountLandingTable.propTypes = propTypes;
