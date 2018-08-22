/**
 * AccountLandingContainer.jsx
 * Created by Lizzie Salita 8/4/17
 */

import React from 'react';
import { isCancel } from 'axios';
import { inRange } from 'lodash';

import AccountsTableFields from 'dataMapping/accountLanding/accountsTableFields';
import * as AccountLandingHelper from 'helpers/accountLandingHelper';
import * as FiscalYearHelper from 'helpers/fiscalYearHelper';

import AccountLandingContent from 'components/accountLanding/AccountLandingContent';

import BaseFederalAccountLandingRow from 'models/accountLanding/BaseFederalAccountLandingRow';

require('pages/accountLanding/accountLandingPage.scss');

export default class AccountLandingContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pageNumber: 1,
            order: {
                field: 'budgetary_resources',
                direction: 'desc'
            },
            columns: [],
            inFlight: false,
            error: false,
            searchString: '',
            results: [],
            totalItems: 0,
            pageSize: 50
        };

        this.accountsRequest = null;
        this.setAccountSearchString = this.setAccountSearchString.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.updateSort = this.updateSort.bind(this);
    }

    componentDidMount() {
        this.showColumns();
    }

    componentWillUnmount() {
        if (this.accountsRequest) {
            this.accountsRequest.cancel();
        }
    }

    onChangePage(pageNumber) {
        const totalPages = Math.ceil(this.state.totalItems / this.state.pageSize);
        if (inRange(pageNumber, 1, totalPages + 1)) {
            // Change page number in the state and make a new request
            this.setState({
                pageNumber
            }, () => {
                this.fetchAccounts();
            });
        }
    }

    setAccountSearchString(searchString) {
        // Change search string in the state and make a new request
        this.setState({
            searchString,
            pageNumber: 1
        }, () => {
            this.fetchAccounts();
        });
    }

    updateSort(field, direction) {
        // Change sort in the state and make a new request
        // Reset the page number to 1
        this.setState({
            order: {
                field,
                direction
            },
            pageNumber: 1
        }, () => {
            this.fetchAccounts();
        });
    }

    showColumns() {
        const columns = [];
        const sortOrder = AccountsTableFields.defaultSortDirection;

        AccountsTableFields.order.forEach((col) => {
            let displayName = AccountsTableFields[col];
            if (col === 'budgetaryResources') {
                // Add default fiscal year to Budgetary Resources column header
                const fy = FiscalYearHelper.defaultFiscalYear();
                displayName = `${fy} ${displayName}`;
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
            inFlight: true,
            error: false
        });

        // generate the params
        const pageSize = 50;
        const fy = `${FiscalYearHelper.defaultFiscalYear()}`;
        const params = {
            sort: this.state.order,
            page: this.state.pageNumber,
            limit: pageSize,
            filters: {
                fy
            }
        };

        if (this.state.searchString) {
            params.keyword = this.state.searchString;
        }

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
                        inFlight: false,
                        error: true
                    });
                    console.log(err);
                }
            });
    }

    parseAccounts(data) {
        const accounts = [];

        data.results.forEach((item) => {
            const account = Object.create(BaseFederalAccountLandingRow);
            account.parse(item);
            accounts.push(account);
        });

        this.setState({
            totalItems: data.count,
            results: accounts
        });
    }

    render() {
        return (
            <AccountLandingContent
                results={this.state.results}
                inFlight={this.state.inFlight}
                error={this.state.error}
                columns={this.state.columns}
                order={this.state.order}
                updateSort={this.updateSort}
                searchString={this.state.searchString}
                setAccountSearchString={this.setAccountSearchString}
                onChangePage={this.onChangePage}
                pageNumber={this.state.pageNumber}
                totalItems={this.state.totalItems}
                pageSize={this.state.pageSize} />
        );
    }
}
