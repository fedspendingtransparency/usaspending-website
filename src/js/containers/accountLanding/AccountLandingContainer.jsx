/**
 * AccountLandingContainer.jsx
 * Created by Lizzie Salita 8/4/17
 */

import React from 'react';
import { isCancel } from 'axios';

import AccountsTableFields from 'dataMapping/accountLanding/accountsTableFields';
import * as AccountLandingHelper from 'helpers/accountLandingHelper';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import * as FiscalYearHelper from 'helpers/fiscalYearHelper';

import AccountLandingContent from 'components/accountLanding/AccountLandingContent';

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
            searchString: '',
            results: [],
            totalItems: 0,
            // TODO - Lizzie: update to 50
            pageSize: 10
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
        // Change page number in the state and make a new request
        this.setState({
            pageNumber
        }, () => {
            this.fetchAccounts();
        });
    }

    setAccountSearchString(searchString) {
        // Change search string in the state and make a new request
        if (searchString.length > 2) {
            this.setState({
                searchString
            }, () => {
                this.fetchAccounts();
            });
        }
    }

    updateSort(field, direction) {
        // Change sort in the state and make a new request
        this.setState({
            order: {
                field,
                direction
            }
        }, () => {
            this.fetchAccounts();
        });
    }

    showColumns() {
        const columns = [];
        const sortOrder = AccountsTableFields.defaultSortDirection;

        AccountsTableFields.order.forEach((col) => {
            let displayName = AccountsTableFields[col];
            if (col === 'budgetary_resources') {
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
            inFlight: true
        });

        // generate the params
        const pageSize = 50;
        const params = {
            sort: this.state.order,
            page: this.state.pageNumber,
            limit: pageSize
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
            // Format budgetary resources
            const formattedCurrency =
                MoneyFormatter.formatMoneyWithPrecision(item.budgetary_resources, 0);

            const account = {
                account_id: item.account_id,
                account_number: item.account_number,
                managing_agency: `${item.managing_agency} (${item.managing_agency_acronym})`,
                account_name: item.account_name,
                budgetary_resources: item.budgetary_resources,
                display: {
                    account_number: `${item.account_number}`,
                    account_name: `${item.account_name}`,
                    managing_agency: `${item.managing_agency} (${item.managing_agency_acronym})`,
                    budgetary_resources: formattedCurrency
                }
            };
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
                columns={this.state.columns}
                order={this.state.order}
                updateSort={this.updateSort}
                setAccountSearchString={this.setAccountSearchString}
                onChangePage={this.onChangePage}
                pageNumber={this.state.pageNumber}
                totalItems={this.state.totalItems}
                pageSize={this.state.pageSize} />
        );
    }
}
