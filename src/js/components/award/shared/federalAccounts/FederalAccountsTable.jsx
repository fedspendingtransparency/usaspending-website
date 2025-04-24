/**
  * FederalAccountsTable.jsx
  * Created by Jonathan Hill 3/25/19
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { map, uniqueId } from 'lodash';
import { Pagination } from 'data-transparency-ui';
import { Link } from 'react-router-dom';

import tableMapping from 'dataMapping/award/federalAccountSectionTable';
import StateLandingTableSorter from 'components/stateLanding/table/StateLandingTableSorter';
import ResultsTableLoadingMessage from 'components/search/table/ResultsTableLoadingMessage';
import ResultsTableErrorMessage from 'components/search/table/ResultsTableErrorMessage';
import NoResultsMessage from 'components/sharedComponents/NoResultsMessage';

export default class FederalAccountsTable extends React.Component {
    static propTypes = {
        page: PropTypes.number,
        limit: PropTypes.number,
        sort: PropTypes.string,
        order: PropTypes.string,
        total: PropTypes.number,
        federalAccounts: PropTypes.array,
        changePage: PropTypes.func,
        updateSort: PropTypes.func,
        inFlight: PropTypes.bool,
        error: PropTypes.bool
    };

    getHeaders() {
        const { sort, order, updateSort } = this.props;
        return map(tableMapping, (header) => (
            <th className="federal-accounts-table__head-cell" key={header.displayName}>
                <div className="header-cell">
                    <div className="header-cell__text">
                        <div className="header-cell__title">
                            {header.displayName}
                        </div>
                    </div>
                    {header.field && <StateLandingTableSorter
                        field={header.field}
                        label={header.displayName}
                        active={{ field: sort, direction: order }}
                        setSort={updateSort} />}
                </div>
            </th>
        ));
    }

    getRows() {
        return this.props.federalAccounts.map((account) => (
            <tr
                className="federal-accounts-table__body-row"
                key={`row-${uniqueId()}`}>
                {map(tableMapping, (header, key) => {
                    let cellData = account[key];
                    if (key === 'federalAccountName') {
                        cellData = (
                            <Link to={`/federal_account/${account.federalAccount}`}>
                                {account[key]}
                            </Link>
                        );
                    }
                    else if (key === 'fundingAgencyName') {
                        cellData = account._fundingAgencySlug ?
                            (
                                <Link to={`/agency/${account._fundingAgencySlug}`}>
                                    {`(${account._fundingAgencyAbbreviation}) ${account[key]}`}
                                </Link>
                            )
                            : '--';
                    }
                    return (
                        <td
                            className={header.classname}
                            key={`${uniqueId()}`}>
                            {cellData}
                        </td>
                    );
                })}
            </tr>
        ));
    }

    renderTable() {
        if ((this.props.federalAccounts.length > 0) && !this.props.error && !this.props.inFlight) {
            return (
                <div className="federal-accounts-table-renderer">
                    <table className="federal-accounts-table">
                        <thead className="federal-accounts-table__head">
                            <tr className="federal-accounts-table__head-row">
                                {this.getHeaders()}
                            </tr>
                        </thead>
                        <tbody>
                            {this.getRows()}
                        </tbody>
                    </table>
                </div>
            );
        }
        return null;
    }

    render() {
        const { inFlight, error, federalAccounts } = this.props;
        let loadingMessage = null;
        let errorMessage = null;
        let noResultsMessage = null;
        let pagination = null;

        if (inFlight) {
            loadingMessage = (<ResultsTableLoadingMessage />);
        }
        if (error) {
            errorMessage = (<ResultsTableErrorMessage />);
        }
        if ((federalAccounts.length === 0) && !error && !inFlight) {
            noResultsMessage = (<NoResultsMessage
                title="Chart Not Available"
                message="No available data to display." />);
        }
        if ((federalAccounts.length > 0) && !error && !inFlight) {
            pagination = (
                <Pagination
                    resultsText
                    totalItems={this.props.total}
                    pageSize={this.props.limit}
                    currentPage={this.props.page}
                    changePage={this.props.changePage} />
            );
        }

        return (
            <div className="federal-accounts-table-holder">
                <div className="results-table-message-container">
                    {loadingMessage}
                    {errorMessage}
                    {noResultsMessage}
                </div>
                {this.renderTable()}
                {pagination}
            </div>
        );
    }
}
