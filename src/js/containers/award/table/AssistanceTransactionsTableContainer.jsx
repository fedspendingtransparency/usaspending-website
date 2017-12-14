/**
 * AssistanceTransactionsTableContainer.jsx
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
import AssistanceTransaction from 'models/results/transactions/AssistanceTransaction';

import AssistanceTransactionsTable from 'components/award/table/AssistanceTransactionsTable';

const propTypes = {
    award: PropTypes.object,
    setAwardTransactions: PropTypes.func,
    appendAwardTransactions: PropTypes.func,
    setTransactionsMeta: PropTypes.func,
    updateTransactionRenderHash: PropTypes.func,
    updateTransactionGroupHash: PropTypes.func
};

const pageLimit = 13;

export class AssistanceTransactionsTableContainer extends React.Component {
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
        if (this.props.award.selectedAward.id !== prevProps.award.selectedAward.id) {
            this.fetchTransactions(1, true);
        }
        else if (this.props.award.transactionSort !== prevProps.award.transactionSort) {
            // table sort changed
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
        if (this.props.award.transactionSort.direction === 'desc') {
            direction = '-';
        }

        return `${direction}${this.props.award.transactionSort.field}`;
    }

    fetchTransactions(page = 1, reset = false) {
        if (!this.props.award.selectedAward.id) {
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
            page,
            filters: [
                {
                    field: 'award',
                    operation: 'equals',
                    value: this.props.award.selectedAward.id
                }
            ],
            order: [this.formatSort()],
            limit: pageLimit
        };

        this.transactionRequest = SearchHelper.fetchAwardTransaction(params);

        this.transactionRequest.promise
            .then((res) => {
                this.setState({
                    inFlight: false
                });

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
            const transaction = new AssistanceTransaction(item);
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
            <AssistanceTransactionsTable
                {...this.props}
                inFlight={this.state.inFlight}
                nextTransactionPage={this.nextTransactionPage} />
        );
    }
}

AssistanceTransactionsTableContainer.propTypes = propTypes;

export default connect(
    (state) => ({ award: state.award }),
    (dispatch) => bindActionCreators(awardActions, dispatch)
)(AssistanceTransactionsTableContainer);
