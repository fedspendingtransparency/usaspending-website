/**
 * AccountLandingTable.jsx
 * Created by Lizzie Salita 8/4/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import AccountsTableFields from 'dataMapping/accountLanding/accountsTableFields';
import LegacyTableHeaderCell from 'components/account/awards/LegacyTableHeaderCell';
import TableRow from './TableRow';

const propTypes = {
    results: PropTypes.array,
    columns: PropTypes.array,
    order: PropTypes.object,
    updateSort: PropTypes.func,
    error: PropTypes.bool,
    inFlight: PropTypes.bool,
    searchString: PropTypes.string,
    loading: PropTypes.bool
};

export default class AccountLandingTable extends React.PureComponent {
    render() {
        const hideBody = this.props.inFlight || this.props.error || this.props.results.length === 0 ? 'results-table__body_hide' : '';
        let message = null;
        if (!this.props.inFlight && !this.props.error && this.props.results.length === 0) {
            // no results
            if (this.props.searchString) {
                message = (
                    <div className="results-table__message">
                        No results found for &ldquo;<span className="results-table__message_highlight">{this.props.searchString}</span>&rdquo;.
                    </div>
                );
            }
            else {
                message = (
                    <div className="results-table__message">
                        No results found.
                    </div>
                );
            }
        }
        const rows = this.props.results.map((account, index) => (
            <TableRow
                account={account}
                key={account.accountId}
                rowIndex={index}
                columns={this.props.columns}
                accountSearchString={this.props.searchString} />
        ));

        const headers = this.props.columns.map((column, index) => (
            <td key={index} className="results-table__data">
                <LegacyTableHeaderCell
                    isLast={index === this.props.columns.length - 1}
                    field={AccountsTableFields.modelMapping[column.columnName]}
                    title={column.displayName}
                    defaultDirection={column.defaultDirection}
                    currentSort={this.props.order}
                    updateSort={this.props.updateSort} />
            </td>
        ));

        return (
            <div className="results-table">
                <table>
                    <thead className="results-table__head">
                        <tr className="results-table__row">
                            {headers}
                        </tr>
                    </thead>
                    <tbody className={`results-table__body ${hideBody}`}>
                        {rows}
                    </tbody>
                </table>
                {message}
            </div>
        );
    }
}

AccountLandingTable.propTypes = propTypes;
