/**
 * AccountLandingTable.jsx
 * Created by Lizzie Salita 8/4/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import HeaderRow from './HeaderRow';
import TableRow from './TableRow';

const propTypes = {
    results: PropTypes.array,
    columns: PropTypes.array,
    accountSearchString: PropTypes.string
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

        return (
            <div className={`account-landing-results-table${noResultsClass}`}>
                <table>
                    <thead>
                        <HeaderRow
                            columns={this.props.columns} />
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
