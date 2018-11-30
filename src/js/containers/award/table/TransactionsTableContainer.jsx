/**
 * TransactionsTableContainer.jsx
 * Created by Kevin Li 3/13/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { uniqueId } from 'lodash';

import * as SearchHelper from 'helpers/searchHelper';
import * as awardActions from 'redux/actions/award/awardActions';

import BaseAssistanceTransaction from 'models/v2/awards/transactions/BaseAssistanceTransaction';
import BaseContractTransaction from 'models/v2/awards/transactions/BaseContractTransaction';
import BaseLoanTransaction from 'models/v2/awards/transactions/BaseLoanTransaction';

import TransactionsTable from 'components/award/table/TransactionsTable';

const propTypes = {
    award: PropTypes.object,
    category: PropTypes.string
};

const pageLimit = 15;

export class TransactionsTableContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inFlight: false,
            nextPage: false,
            page: 1,
            sort: {
                field: 'action_date',
                direction: 'desc'
            },
            tableInstance: `${uniqueId()}`,
            transactions: []
        };

        this.transactionRequest = null;

        this.nextTransactionPage = this.nextTransactionPage.bind(this);
        this.changeSort = this.changeSort.bind(this);
    }

    componentDidMount() {
        this.fetchTransactions(1, true);
    }

    componentDidUpdate(prevProps) {
        if (this.props.award.selectedAward.internalId !== prevProps.award.selectedAward.internalId) {
            this.fetchTransactions(1, true);
        }
    }

    componentWillUnmount() {
        if (this.transactionRequest) {
            this.transactionRequest.cancel();
        }
    }

    formatSort() {
        let direction = '';
        if (this.state.sort.direction === 'desc') {
            direction = '-';
        }

        return `${direction}${this.state.sort.field}`;
    }

    fetchTransactions(page = 1, reset = false) {
        if (!this.props.award.selectedAward.internalId) {
            return;
        }

        if (this.transactionRequest) {
            // a request is in-flight, cancel it
            this.transactionRequest.cancel();
        }

        this.setState({
            inFlight: true
        });

        // generate the params
        const params = {
            award_id: this.props.award.selectedAward.internalId,
            page,
            sort: this.state.sort.field,
            order: this.state.sort.direction,
            limit: pageLimit
        };

        this.transactionRequest = SearchHelper.fetchAwardTransaction(params);

        this.transactionRequest.promise
            .then((res) => {
                this.parseTransactions(res.data, reset);
            })
            .catch((err) => {
                this.transactionRequest = null;
                if (!isCancel(err)) {
                    this.setState({
                        inFlight: false
                    });
                    console.log(err);
                }
            });
    }

    parseTransactions(data, reset) {
        const transactions = [];

        data.results.forEach((item) => {
            let transaction = null;
            if (this.props.category === 'contract') {
                transaction = Object.create(BaseContractTransaction);
            }
            else if (this.props.category === 'loan') {
                transaction = Object.create(BaseLoanTransaction);
            }
            else {
                transaction = Object.create(BaseAssistanceTransaction);
            }

            transaction.populate(item);
            transactions.push(transaction);
        });

        // update the metadata
        const meta = data.page_metadata;
        const newState = {
            page: meta.page,
            nextPage: meta.has_next_page,
            inFlight: false
        };

        if (reset) {
            newState.tableInstance = `${uniqueId()}`;
            newState.transactions = transactions;
        }
        else {
            // append to the current results
            newState.transactions = this.state.transactions.concat(transactions);
        }

        this.setState(newState);
    }

    nextTransactionPage() {
        if (!this.state.nextPage || this.state.inFlight) {
            return;
        }

        const nextPage = this.state.page + 1;
        this.setState({
            page: nextPage
        });
        this.fetchTransactions(nextPage, false);
    }

    changeSort(sort) {
        this.setState({
            sort
        }, () => {
            this.fetchTransactions(1, true);
        });
    }

    render() {
        return (
            <TransactionsTable
                {...this.props}
                {...this.state}
                changeSort={this.changeSort}
                nextTransactionPage={this.nextTransactionPage} />
        );
    }
}

TransactionsTableContainer.propTypes = propTypes;

export default connect(
    (state) => ({ award: state.award }),
    (dispatch) => bindActionCreators(awardActions, dispatch)
)(TransactionsTableContainer);
