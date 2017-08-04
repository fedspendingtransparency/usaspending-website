/**
 * AccountLandingContainer.jsx
 * Created by Lizzie Salita 8/4/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import { Search } from 'js-search';
import { orderBy } from 'lodash';

import AccountsTableFields from 'dataMapping/accountLanding/accountsTableFields';
import * as AccountLandingHelper from 'helpers/accountLandingHelper';
import * as MoneyFormatter from 'helpers/moneyFormatter';

import AccountLandingContent from 'components/accountLanding/AccountLandingContent';

const propTypes = {
    accountsOrder: PropTypes.object
};

export class AccountLandingContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [],
            inFlight: false,
            currentFY: '',
            accountSearchString: '',
            fullData: [],
            results: []
        };

        this.accountsRequest = null;
        this.setAccountSearchString = this.setAccountSearchString.bind(this);
    }

    componentDidMount() {
        this.showColumns();
    }

    componentDidUpdate(prevProps) {
        if (this.props.accountsOrder !== prevProps.accountsOrder) {
            // table sort changed
            this.performSearch();
        }
    }

    componentWillUnmount() {
        if (this.accountsRequest) {
            this.accountsRequest.cancel();
        }
    }

    setAccountSearchString(accountSearchString) {
        let searchValue = '';
        if (accountSearchString.length > 2) {
            searchValue = accountSearchString;
        }

        this.setState({
            accountSearchString: searchValue
        }, () => {
            this.performSearch();
        });
    }

    showColumns() {
        const columns = [];
        const sortOrder = AccountsTableFields.defaultSortDirection;

        AccountsTableFields.order.forEach((col) => {
            let displayName = AccountsTableFields[col];
            if ((col === 'budget_authority_amount') ||
                (col === 'percentage_of_total_budget_authority')) {
                // Add (FY YYYY) to Budget Authority and Percent of Total U.S. Budget column headers
                if (this.state.fy) {
                    displayName = `${displayName} (FY ${this.state.currentFY})`;
                }
            }
            const column = {
                columnName: col,
                displayName,
                defaultDirection: sortOrder[col]
            };
            columns.push(column);
        });

        this.setState({
            columns
        }, () => {
            this.fetchAccounts();
        });
    }

    fetchAccounts() {
        if (this.accountsRequest) {
            // a request is in-flight, cancel it
            this.accountsRequest.cancel();
        }

        this.setState({
            inFlight: true
        });

        // generate the params
        const params = {
            sort: this.props.accountsOrder.field,
            order: this.props.accountsOrder.direction
        };

        this.accountsRequest = AccountLandingHelper.fetchAllAccounts(params);

        this.accountsRequest.promise
            .then((res) => {
                this.setState({
                    inFlight: false
                });

                this.parseAccounts(res.data);
            })
            .catch((err) => {
                this.accountsRequest = null;
                if (!isCancel(err)) {
                    this.setState({
                        inFlight: false
                    });
                    console.log(err);
                }
            });
    }

    parseAccounts(data) {
        const accounts = [];

        data.results.forEach((item) => {
            // Format budget authority amount
            const formattedCurrency =
                MoneyFormatter.formatMoneyWithPrecision(item.budget_authority_amount, 0);

            // Convert from decimal value to percentage and round to 2 decimal places
            const percentage = (item.percentage_of_total_budget_authority * 100).toFixed(2);

            let percent = `${percentage}%`;
            if (percent === '0.00%') {
                percent = 'Less than 0.01%';
            }

            const account = {
                account_id: item.account_id,
                account_name: `${item.account_name} (${item.abbreviation})`,
                budget_authority_amount: item.budget_authority_amount,
                percentage_of_total_budget_authority: item.percentage_of_total_budget_authority,
                display: {
                    account_name: `${item.account_name} (${item.abbreviation})`,
                    budget_authority_amount: formattedCurrency,
                    percentage_of_total_budget_authority: percent
                }
            };
            accounts.push(account);
        });

        this.setState({
            fullData: accounts
        }, () => {
            this.performSearch();
        });
    }

    performSearch() {
        // perform a local search
        const search = new Search('account_id');
        search.addIndex('account_name');
        search.addDocuments(this.state.fullData);

        // return the full data set if no search string is provided
        let results = this.state.fullData;
        if (this.state.accountSearchString !== '') {
            results = search.search(this.state.accountSearchString);
        }

        // now sort the results by the appropriate table column and direction
        const orderedResults = orderBy(results,
                [this.props.accountsOrder.field], [this.props.accountsOrder.direction]);

        this.setState({
            results: orderedResults
        });
    }

    render() {
        const resultsCount = this.state.results.length;
        let resultsText = `${resultsCount} results`;
        if (resultsCount === 1) {
            resultsText = `${resultsCount} result`;
        }

        return (
            <AccountLandingContent
                resultsText={resultsText}
                results={this.state.results}
                accountSearchString={this.state.accountSearchString}
                inFlight={this.state.inFlight}
                columns={this.state.columns}
                sort={this.props.accountsOrder}
                setAccountSearchString={this.setAccountSearchString} />
        );
    }
}

AccountLandingContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        accountsOrder: state.accountLanding.accountsOrder
    })
)(AccountLandingContainer);
