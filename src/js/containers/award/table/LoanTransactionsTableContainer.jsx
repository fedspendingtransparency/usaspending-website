/**
 * LoanTransactionsTableContainer.jsx
 * Created by Kevin Li 3/13/17
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import * as SearchHelper from 'helpers/searchHelper';
import * as awardActions from 'redux/actions/award/awardActions';
import LoanTransaction from 'models/results/transactions/LoanTransaction';

import LoanTransactionsTable from 'components/award/table/LoanTransactionsTable';

const propTypes = {
    award: React.PropTypes.object,
    setAwardTransactions: React.PropTypes.func,
    appendAwardTransactions: React.PropTypes.func,
    setTransactionsMeta: React.PropTypes.func,
    updateTransactionRenderHash: React.PropTypes.func,
    updateTransactionGroupHash: React.PropTypes.func
};

const pageLimit = 13;

export class LoanTransactionsTableContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inFlight: false
        };

        this.transactionRequest = null;

        this.nextTransactionPage = this.nextTransactionPage.bind(this);
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
            const transaction = new LoanTransaction(item);
            transactions.push(transaction);
        });

        if (reset) {
            // override the existing transactions
            this.props.setAwardTransactions(transactions);
        }
        else {
            // append to the existing list
            this.props.appendAwardTransactions(transactions);
        }

        // update the metadata
        const meta = data.page_metadata;
        this.props.setTransactionsMeta({
            page: meta.page,
            nextPage: meta.has_next_page
        });

        // update the render hash
        this.props.updateTransactionRenderHash();
        if (reset) {
            this.props.updateTransactionGroupHash();
        }
    }

    nextTransactionPage() {
        if (!this.props.award.transactionMeta.nextPage) {
            return;
        }

        const nextPage = this.props.award.transactionMeta.page + 1;
        this.fetchTransactions(nextPage, false);
    }

    render() {
        return (
            <LoanTransactionsTable
                {...this.props}
                inFlight={this.state.inFlight}
                nextTransactionPage={this.nextTransactionPage} />
        );
    }
}

LoanTransactionsTableContainer.propTypes = propTypes;

export default connect(
    (state) => ({ award: state.award }),
    (dispatch) => bindActionCreators(awardActions, dispatch)
)(LoanTransactionsTableContainer);
