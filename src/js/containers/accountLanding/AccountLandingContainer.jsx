/**
 * AccountLandingContainer.jsx
 * Created by Lizzie Salita 8/4/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { isCancel } from 'axios';
import { bindActionCreators } from 'redux';

import { Search } from 'js-search';
import { range, orderBy } from 'lodash';

import AccountsTableFields from 'dataMapping/accountLanding/accountsTableFields';
// import * as AccountLandingHelper from 'helpers/accountLandingHelper';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import * as accountLandingActions from 'redux/actions/accountLanding/accountLandingActions';

import AccountLandingContent from 'components/accountLanding/AccountLandingContent';

const propTypes = {
    accountsOrder: PropTypes.object,
    pageNumber: PropTypes.number,
    setPageNumber: PropTypes.func
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
            results: [],
            pageOfItems: [],
            pager: {}
        };

        this.accountsRequest = null;
        this.setAccountSearchString = this.setAccountSearchString.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
    }

    componentDidMount() {
        this.showColumns();
    }

    componentDidUpdate(prevProps) {
        if (this.props.accountsOrder !== prevProps.accountsOrder) {
            // table sort changed
            this.performSearch();
        }
        if (this.props.pageNumber !== prevProps.pageNumber) {
            // page number changed
            this.setPageOfItems();
        }
    }

    componentWillUnmount() {
        if (this.accountsRequest) {
            this.accountsRequest.cancel();
        }
    }

    onChangePage(pageNumber) {
        // Change page number in Redux state
        this.props.setPageNumber(pageNumber);
    }

    getPager(totalItems, currentPage, pageSize) {
        // calculate total pages
        const totalPages = Math.ceil(totalItems / pageSize);

        let startPage;
        let endPage;
        let prevEllipses = (<span className="pagination-ellipsis">...</span>);
        let nextEllipses = (<span className="pagination-ellipsis">...</span>);
        let firstButton = (
            <li>
                <button onClick={() => this.onChangePage(1)}>{1}</button>
            </li>
        );
        let lastButton = (
            <li>
                <button onClick={() => this.onChangePage(totalPages)}>{totalPages}</button>
            </li>
        );
        if (totalPages < 5) {
            // less than 5 total pages so show all
            startPage = 1;
            endPage = totalPages;
            prevEllipses = '';
            nextEllipses = '';
            firstButton = '';
            lastButton = '';
        }
        else {
            if (currentPage === 1) {
                startPage = currentPage;
                endPage = currentPage + 2;
            }
            else if (currentPage === totalPages) {
                startPage = currentPage - 2;
                endPage = currentPage;
            }
            else {
                startPage = currentPage - 1;
                endPage = currentPage + 1;
            }


            if (currentPage < 4) {
                prevEllipses = '';
                firstButton = '';
            }
            else if (currentPage > (totalPages - 3)) {
                nextEllipses = '';
                lastButton = '';
            }
        }

        // calculate start and end item indexes
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + (pageSize - 1), (totalItems - 1));

        // create an array of pages to repeat in the pager control
        const pages = range(startPage, endPage + 1);

        // return object with all pager properties
        return {
            totalItems,
            currentPage,
            pageSize,
            totalPages,
            startPage,
            endPage,
            startIndex,
            endIndex,
            pages,
            prevEllipses,
            nextEllipses,
            firstButton,
            lastButton
        };
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

    setPageOfItems() {
        const page = this.props.pageNumber;
        let pager = this.state.pager;
        const results = this.state.results;

        // Get new pager object for specified page
        // TODO - Lizzie: update to 50 when endpoint is ready
        pager = this.getPager(results.length, page, 3);

        // Get new page of items from results
        const pageOfItems = results.slice(pager.startIndex, pager.endIndex + 1);

        // update state
        this.setState({
            pager,
            pageOfItems
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
        const mockData = {
            results: [
                {
                    account_id: 1,
                    account_number: '123-4567',
                    account_name: 'Mock Account',
                    managing_agency: 'Mock Agency',
                    managing_agency_acronym: 'XYZ',
                    budget_authority_amount: 5000000
                },
                {
                    account_id: 2,
                    account_number: '098-7654',
                    account_name: 'Mock Account 2',
                    managing_agency: 'Mock Agency 2',
                    managing_agency_acronym: 'ABC',
                    budget_authority_amount: 6500000
                },
                {
                    account_id: 3,
                    account_number: '234-5678',
                    account_name: 'Test Account',
                    managing_agency: 'Mock Agency 3',
                    managing_agency_acronym: 'DEF',
                    budget_authority_amount: 4500000
                },
                {
                    account_id: 4,
                    account_number: '123-4567',
                    account_name: 'Mock Account 4',
                    managing_agency: 'Mock Agency 4',
                    managing_agency_acronym: 'XYZ',
                    budget_authority_amount: 5500000
                },
                {
                    account_id: 5,
                    account_number: '098-7654',
                    account_name: 'Mock Account 5',
                    managing_agency: 'Mock Agency 5',
                    managing_agency_acronym: 'ABC',
                    budget_authority_amount: 6000000
                },
                {
                    account_id: 6,
                    account_number: '234-5678',
                    account_name: 'Test Account 2',
                    managing_agency: 'Mock Agency 6',
                    managing_agency_acronym: 'DEF',
                    budget_authority_amount: 4000000
                },
                {
                    account_id: 7,
                    account_number: '123-4567',
                    account_name: 'Mock Account 7',
                    managing_agency: 'Mock Agency 7',
                    managing_agency_acronym: 'XYZ',
                    budget_authority_amount: 5000000
                },
                {
                    account_id: 8,
                    account_number: '098-7654',
                    account_name: 'Mock Account 8',
                    managing_agency: 'Mock Agency 8',
                    managing_agency_acronym: 'ABC',
                    budget_authority_amount: 6500000
                },
                {
                    account_id: 9,
                    account_number: '234-5678',
                    account_name: 'Test Account 3',
                    managing_agency: 'Mock Agency 9',
                    managing_agency_acronym: 'DEF',
                    budget_authority_amount: 4500000
                },
                {
                    account_id: 10,
                    account_number: '123-4567',
                    account_name: 'Mock Account 10',
                    managing_agency: 'Mock Agency 6',
                    managing_agency_acronym: 'XYZ',
                    budget_authority_amount: 5500000
                },
                {
                    account_id: 11,
                    account_number: '098-7654',
                    account_name: 'Mock Account 11',
                    managing_agency: 'Mock Agency',
                    managing_agency_acronym: 'XYZ',
                    budget_authority_amount: 6000000
                },
                {
                    account_id: 12,
                    account_number: '234-5678',
                    account_name: 'Test Account 4',
                    managing_agency: 'Mock Agency 12',
                    managing_agency_acronym: 'DEF',
                    budget_authority_amount: 4000000
                },
                {
                    account_id: 13,
                    account_number: '123-4567',
                    account_name: 'Mock Account 13',
                    managing_agency: 'Mock Agency',
                    managing_agency_acronym: 'XYZ',
                    budget_authority_amount: 5000000
                },
                {
                    account_id: 14,
                    account_number: '098-7654',
                    account_name: 'Mock Account 14',
                    managing_agency: 'Mock Agency 3',
                    managing_agency_acronym: 'ABC',
                    budget_authority_amount: 6500000
                },
                {
                    account_id: 15,
                    account_number: '234-5678',
                    account_name: 'Test Account 5',
                    managing_agency: 'Mock Agency 15',
                    managing_agency_acronym: 'DEF',
                    budget_authority_amount: 4500000
                },
                {
                    account_id: 16,
                    account_number: '123-4567',
                    account_name: 'Mock Account 16',
                    managing_agency: 'Mock Agency 2',
                    managing_agency_acronym: 'XYZ',
                    budget_authority_amount: 5500000
                },
                {
                    account_id: 17,
                    account_number: '098-7654',
                    account_name: 'Mock Account 17',
                    managing_agency: 'Mock Agency 17',
                    managing_agency_acronym: 'ABC',
                    budget_authority_amount: 6000000
                },
                {
                    account_id: 18,
                    account_number: '234-5678',
                    account_name: 'Test Account 6',
                    managing_agency: 'Mock Agency 2',
                    managing_agency_acronym: 'DEF',
                    budget_authority_amount: 4000000
                },
                {
                    account_id: 19,
                    account_number: '098-7654',
                    account_name: 'Mock Account 19',
                    managing_agency: 'Mock Agency 5',
                    managing_agency_acronym: 'ABC',
                    budget_authority_amount: 3000000
                },
                {
                    account_id: 20,
                    account_number: '234-5678',
                    account_name: 'Test Account 7',
                    managing_agency: 'Mock Agency 6',
                    managing_agency_acronym: 'DEF',
                    budget_authority_amount: 2000000
                }
            ]
        };
        this.parseAccounts(mockData);

        // TODO - Lizzie: add API call when endpoint is ready
        // if (this.accountsRequest) {
        //    // a request is in-flight, cancel it
        //    this.accountsRequest.cancel();
        // }
        //
        // this.setState({
        //    inFlight: true
        // });
        //
        // // generate the params
        // const params = {
        //    sort: this.props.accountsOrder.field,
        //    order: this.props.accountsOrder.direction
        // };
        //
        // this.accountsRequest = AccountLandingHelper.fetchAllAccounts(params);
        //
        // this.accountsRequest.promise
        //    .then((res) => {
        //        this.setState({
        //            inFlight: false
        //        });
        //
        //        this.parseAccounts(res.data);
        //    })
        //    .catch((err) => {
        //        this.accountsRequest = null;
        //        if (!isCancel(err)) {
        //            this.setState({
        //                inFlight: false
        //            });
        //            console.log(err);
        //        }
        //    });
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
                account_number: item.account_number,
                managing_agency: `${item.managing_agency} (${item.managing_agency_acronym})`,
                account_name: item.account_name,
                budget_authority_amount: item.budget_authority_amount,
                display: {
                    account_number: `${item.account_number}`,
                    account_name: `${item.account_name}`,
                    managing_agency: `${item.managing_agency} (${item.managing_agency_acronym})`,
                    budget_authority_amount: formattedCurrency
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
        search.addIndex('account_number');
        search.addIndex('managing_agency');
        search.addDocuments(this.state.fullData);

        // return the full data set if no search string is provided
        let results = this.state.fullData;
        if (this.state.accountSearchString !== '') {
            results = search.search(this.state.accountSearchString);
        }

        // now sort the results by the appropriate table column and direction
        const orderedResults = orderBy(results,
                [this.props.accountsOrder.field], [this.props.accountsOrder.direction]);

        // Reset to page 1
        this.props.setPageNumber(1);

        this.setState({
            results: orderedResults
        }, () => {
            this.setPageOfItems();
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
                results={this.state.pageOfItems}
                accountSearchString={this.state.accountSearchString}
                inFlight={this.state.inFlight}
                columns={this.state.columns}
                sort={this.props.accountsOrder}
                setAccountSearchString={this.setAccountSearchString}
                onChangePage={this.onChangePage}
                pager={this.state.pager} />
        );
    }
}

AccountLandingContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        accountsOrder: state.accountLanding.accountsOrder,
        pageNumber: state.accountLanding.pageNumber
    }),
    (dispatch) => bindActionCreators(accountLandingActions, dispatch)
)(AccountLandingContainer);
