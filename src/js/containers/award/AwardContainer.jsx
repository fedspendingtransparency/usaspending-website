/**
  * AwardContainer.jsx
  * Created by Emily Gullo 01/19/2017
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import Award from 'components/award/Award';

import * as SearchHelper from 'helpers/searchHelper';
import * as awardActions from 'redux/actions/award/awardActions';
import AwardSummary from 'models/results/award/AwardSummary';
import ContractTransaction from 'models/results/transactions/ContractTransaction';

const propTypes = {
    setSelectedAward: React.PropTypes.func,
    setAwardTransactions: React.PropTypes.func,
    appendAwardTransactions: React.PropTypes.func,
    setTransactionsMeta: React.PropTypes.func,
    updateTransactionRenderHash: React.PropTypes.func,
    updateTransactionGroupHash: React.PropTypes.func,
    params: React.PropTypes.object,
    award: React.PropTypes.object
};

const countLimit = 13;

class AwardContainer extends React.Component {
    constructor(props) {
        super(props);

        this.searchRequests = [];

        this.state = {
            noAward: false,
            awardId: null,
            inFlight: false
        };

        this.nextTransactionPage = this.nextTransactionPage.bind(this);
    }

    componentDidMount() {
        this.getSelectedAward();
    }

    componentDidUpdate(prevProps) {
        if (this.state.awardId && this.state.awardId !== this.props.params.awardId) {
            this.getSelectedAward();
        }
        else if (this.props.award.transactionSort !== prevProps.award.transactionSort) {
            // table sort changed
            this.fetchTransactions();
        }
    }

    getSelectedAward() {
        const input = this.props.params.awardId;

        const transactionParams = {
            filters: [
                {
                    field: 'award',
                    operation: 'equals',
                    value: input
                }
            ],
            order: ['-modification_number'],
            limit: countLimit
        };

        if (this.searchRequests.length > 0) {
            // A request is currently in-flight, cancel them
            this.searchRequests.forEach((request) => {
                request.cancel();
            });
        }

        this.setState({
            inFlight: true,
            awardId: null
        });

        const awardRequest = SearchHelper.fetchAward(input);
        const transactionRequest = SearchHelper.fetchAwardTransaction(transactionParams);

        this.searchRequests = [awardRequest, transactionRequest];

        Promise.all([awardRequest.promise, transactionRequest.promise])
            .then((results) => {
                const awardData = results[0].data;
                const txnData = results[1].data;

                this.setState({
                    inFlight: false
                });

                const fullData = (Object.assign(awardData, txnData.results[0].contract_data));
                this.parseAward(fullData);
                this.parseTransactions(txnData, true);

                // operations have resolved
                this.searchRequests = [];
            })
            .catch((error) => {
                if (isCancel(error)) {
                    // Got cancelled
                    console.log(error);
                }
                else if (error.response) {
                    // Errored out but got response, toggle noAward flag
                    this.searchRequests = [];
                    this.setState({
                        noAward: true,
                        awardId: this.props.params.awardId
                    });
                }
                else {
                    // Request failed
                    this.searchRequests = [];
                }
            });
    }

    parseAward(data) {
        this.setState({
            noAward: false,
            awardId: this.props.params.awardId
        });

        // const fullData = _.flatten(data, trx);
        // console.log(fullData);

        const award = new AwardSummary(data);
        // Add search results to Redux
        this.props.setSelectedAward(award);
    }

    parseTransactions(data, reset = false) {
        const transactions = [];

        data.results.forEach((item) => {
            const transaction = new ContractTransaction(item);
            transactions.push(transaction);
        });

        if (reset) {
            this.props.setAwardTransactions(transactions);
        }
        else {
            // append instead of overwrite
            this.props.appendAwardTransactions(transactions);
        }

        // update the metadata
        const meta = data.page_metadata;
        this.props.setTransactionsMeta({
            count: meta.count,
            page: meta.page_number,
            totalPages: meta.num_pages
        });

        // update the render hash
        this.props.updateTransactionRenderHash();
        if (reset) {
            this.props.updateTransactionGroupHash();
        }
    }

    fetchTransactions(page = 1) {
        let searchPrefix = '';
        if (this.props.award.transactionSort.direction === 'desc') {
            searchPrefix = '-';
        }

        const transactionParams = {
            page,
            filters: [
                {
                    field: 'award',
                    operation: 'equals',
                    value: this.props.params.awardId
                }
            ],
            order: [`${searchPrefix}${this.props.award.transactionSort.field}`],
            limit: countLimit
        };

        if (this.searchRequests.length > 0) {
            // A request is currently in-flight, cancel them
            this.searchRequests.forEach((request) => {
                request.cancel();
            });
        }

        this.setState({
            inFlight: true
        });


        const transactionRequest = SearchHelper.fetchAwardTransaction(transactionParams);

        this.searchRequests = [transactionRequest];

        transactionRequest.promise
            .then((res) => {
                this.setState({
                    inFlight: false
                });

                const reset = page === 1;
                this.parseTransactions(res.data, reset);
            })
            .catch((error) => {
                if (isCancel(error)) {
                    // Got cancelled
                }
                else {
                    // Request failed
                    this.searchRequests = [];
                }
            });
    }

    nextTransactionPage() {
        const nextPage = this.props.award.transactionMeta.page + 1;
        this.fetchTransactions(nextPage);
    }

    render() {
        return (
            <Award
                {...this.props}
                inFlight={this.state.inFlight}
                noAward={this.state.noAward}
                nextTransactionPage={this.nextTransactionPage} />
        );
    }
}

AwardContainer.propTypes = propTypes;

export default connect(
    (state) => ({ award: state.award }),
    (dispatch) => bindActionCreators(awardActions, dispatch)
)(AwardContainer);
