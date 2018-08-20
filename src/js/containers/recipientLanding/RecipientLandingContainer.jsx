/**
 * RecipientLandingContainer.jsx
 * Created by David Trinh 7/2/18
 */

import React from 'react';
import { isCancel } from 'axios';
import { inRange } from 'lodash';


import * as RecipientLandingHelper from 'helpers/recipientLandingHelper';

import RecipientLandingContent from 'components/recipientLanding/RecipientLandingContent';

import BaseRecipientLandingRow from 'models/v2/recipient/BaseRecipientLandingRow';


export default class RecipientLandingContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pageNumber: 1,
            order: {
                field: 'amount',
                direction: 'desc'
            },
            awardType: 'all',
            inFlight: false,
            error: false,
            searchString: '',
            results: [],
            totalItems: 0,
            pageSize: 50
        };

        this.recipientsRequest = null;
        this.setRecipientSearchString = this.setRecipientSearchString.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.setSort = this.setSort.bind(this);
        this.setTab = this.setTab.bind(this);
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
        const pageNumber = 1;
        // Change search string in the state and make a new request
        this.setState({
            searchString,
            pageNumber
        }, () => {
            this.fetchRecipients();
        });
    }

    setSort(field, direction) {
        // Change sort in the state and make a new request
        // Reset the page number to 1
        this.setState({
            order: {
                field,
                direction
            },
            pageNumber: 1
        }, () => {
            this.fetchRecipients();
        });
    }

    setTab(awardType) {
        const pageNumber = 1;
        this.setState({
            pageNumber,
            awardType
        }, () => {
            this.fetchRecipients();
        });
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
        const params = {
            order: this.state.order.direction,
            sort: this.state.order.field,
            page: this.state.pageNumber,
            limit: this.state.pageSize,
            award_type: this.state.awardType
        };

        if (this.state.searchString !== '') {
            params.keyword = this.state.searchString;
        }

        this.recipientsRequest = RecipientLandingHelper.fetchAllRecipients(params);

        this.recipientsRequest.promise
            .then((res) => {
                this.setState({
                    inFlight: false
                });

                this.parseRecipients(res.data);
            })
            .catch((err) => {
                this.recipientsRequest = null;
                if (!isCancel(err)) {
                    this.setState({
                        inFlight: false,
                        error: true
                    });
                    console.log(err);
                }
            });
    }

    parseRecipients(data) {
        const recipients = [];

        data.results.forEach((item) => {
            const recipient = Object.create(BaseRecipientLandingRow);
            recipient.populate(item);
            if (recipient.duns !== "DUNS not provided" || recipient.name !== "Not provided in source system") {
                recipients.push(recipient);
            }
        });

        this.setState({
            totalItems: data.page_metadata.total,
            results: recipients
        });
    }

    render() {
        return (
            <RecipientLandingContent
                results={this.state.results}
                inFlight={this.state.inFlight}
                error={this.state.error}
                order={this.state.order}
                setSort={this.setSort}
                setTab={this.setTab}
                searchString={this.state.searchString}
                setRecipientSearchString={this.setRecipientSearchString}
                onChangePage={this.onChangePage}
                pageNumber={this.state.pageNumber}
                totalItems={this.state.totalItems}
                pageSize={this.state.pageSize} />
        );
    }
}
