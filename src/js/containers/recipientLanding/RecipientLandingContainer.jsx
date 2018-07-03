/**
 * RecipientLandingContainer.jsx
 * Created by David Trinh 7/2/18
 */

import React from 'react';
import { isCancel } from 'axios';
import { inRange } from 'lodash';

import AccountsTableFields from 'dataMapping/accountLanding/accountsTableFields';
import * as AccountLandingHelper from 'helpers/accountLandingHelper';
import * as FiscalYearHelper from 'helpers/fiscalYearHelper';

import RecipientLandingContent from 'components/recipientLanding/RecipientLandingContent';

//import BaseFederalAccountLandingRow from 'models/accountLanding/BaseFederalAccountLandingRow';

require('pages/accountLanding/accountLandingPage.scss');

export default class RecipientLandingContainer extends React.Component {
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
            pageSize: 2
        };

        this.recipientssRequest = null;
        this.setRecipientSearchString = this.setRecipientSearchString.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.updateSort = this.updateSort.bind(this);
    }

    componentDidMount() {
        this.fetchRecipients();
    }

    componentWillUnmount() {
        if (this.recipientsRequest) {
            this.recipientsRequest.cancel();
        }
    }

    onChangePage(pageNumber) {
        const totalPages = Math.ceil(this.state.totalItems / this.state.pageSize);
        if (inRange(pageNumber, 1, totalPages + 1)) {
            // Change page number in the state and make a new request
            this.setState({
                pageNumber
            }, () => {
                this.fetchRecipients();
            });
        }
    }

    setRecipientSearchString(searchString) {
        // Change search string in the state and make a new request
        if (searchString.length > 2) {
            this.setState({
                searchString
            }, () => {
                this.fetchRecipients();
            });
        }
    }

    updateSort(field, direction) {
        // Change sort in the state and make a new request
        // Reset the page number to 1
        /*this.setState({
            order: {
                field,
                direction
            },
            pageNumber: 1
        }, () => {
            this.fetchAccounts();
        }); */
    }

    showColumns() {
        const columns = [];
        /* const sortOrder = AccountsTableFields.defaultSortDirection;

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
        }); */
    }

    fetchRecipients() {
        if (this.recipientsRequest) {
            // a request is in-flight, cancel it
            this.recipientsRequest.cancel();
        }

        this.setState({
            inFlight: true,
            error: false
        });

        // generate the params
        /* const pageSize = 50;
        const fy = `${FiscalYearHelper.defaultFiscalYear()}`;
        const params = {
            sort: this.state.order,
            page: this.state.pageNumber,
            limit: pageSize,
            filters: {
                fy
            }
        }; */

        const recipients = [{ name: "Testing1", duns: "132432", amount: "34242332" },
            { name: "Testing1323", duns: "13243223", amount: "34332" },
            { name: "Testing1523", duns: "13243223", amount: "34332334r" },
            { name: "Testing3323", duns: "13243223", amount: "3433232" },
            { name: "Testing134223", duns: "1324433223", amount: "34332" }];

        this.setState({
            totalItems: 6,
            results: recipients
        });

        // this.accountsRequest = AccountLandingHelper.fetchAllAccounts(params);

        // this.accountsRequest.promise
        //     .then((res) => {
        //         this.setState({
        //             inFlight: false
        //         });

        //         this.parseAccounts(res.data);
        //     })
        //     .catch((err) => {
        //         this.recipientsRequest = null;
        //         if (!isCancel(err)) {
        //             this.setState({
        //                 inFlight: false,
        //                 error: true
        //             });
        //             console.log(err);
        //         }
        //     }); 
    }

    parseAccounts(data) {
        /* const recipients = [];

        data.results.forEach((item) => {
            //TODO
            const recipient = Object.create(BaseFederalAccountLandingRow);
            recipient.parse(item);
            recipients.push(recipient);
        });

        this.setState({
            totalItems: data.count,
            results: recipients
        }); */
    }

    render() {
        return (
            <RecipientLandingContent
                results={this.state.results}
                inFlight={this.state.inFlight}
                error={this.state.error}
                columns={this.state.columns}
                order={this.state.order}
                updateSort={this.updateSort}
                accountSearchString={this.state.searchString}
                setAccountSearchString={this.setAccountSearchString}
                onChangePage={this.onChangePage}
                pageNumber={this.state.pageNumber}
                totalItems={this.state.totalItems}
                pageSize={this.state.pageSize} />
        );
    }
}
