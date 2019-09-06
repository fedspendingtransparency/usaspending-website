/**
  * FederalAccountsVizContainer.jsx
  * Created by Lizzie Salita 8/16/19
  **/

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isCancel } from 'axios';

import { fetchIdvFederalAccounts } from 'helpers/idvHelper';
import { fetchAwardFederalAccounts } from 'helpers/awardSummaryHelper';
import BaseFederalAccount from 'models/v2/awardsV2/BaseFederalAccount';
import FederalAccountsViz from 'components/awardv2/shared/federalAccounts/FederalAccountsViz';

const propTypes = {
    awardId: PropTypes.string,
    category: PropTypes.string,
    totalTransactionObligatedAmount: PropTypes.number
};

export class FederalAccountsVizContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 10,
            sort: 'total_transaction_obligated_amount',
            page: 1,
            order: 'desc',
            total: 0,
            inFlight: true,
            error: false,
            federalAccounts: []
        };

        this.request = null;

        this.changePage = this.changePage.bind(this);
        this.updateSort = this.updateSort.bind(this);
    }

    async componentDidMount() {
        if (this.props.totalTransactionObligatedAmount && this.props.awardId && this.props.category) {
            await this.getFederalAccounts();
        }
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.totalTransactionObligatedAmount !== this.props.totalTransactionObligatedAmount && (this.props.totalTransactionObligatedAmount)) {
            await this.getFederalAccounts();
        }
    }

    async getFederalAccounts() {
        if (this.request) {
            this.request.cancel();
        }
        const {
            limit, sort, page, order
        } = this.state;
        const params = {
            limit, sort, page, order, award_id: this.props.awardId
        };
        this.setState({ inFlight: true, error: false });
        if (this.props.category === 'idv') {
            this.request = fetchIdvFederalAccounts(params);
        }
        else {
            this.request = fetchAwardFederalAccounts(params);
        }
        try {
            const res = await this.request.promise;
            this.setState({
                total: res.data.page_metadata.count
            });
            this.parseFederalAccounts(res.data.results);
        }
        catch (e) {
            if (!isCancel(e)) this.setState({ inFlight: false, error: true });
            console.log(' Error : ', e);
        }
    }

    parseFederalAccounts(results) {
        const federalAccounts = results.map((account) => {
            // get the totalTransactionObligatedAmount from Redux
            const newAccount = new BaseFederalAccount(account, this.props.totalTransactionObligatedAmount);
            return newAccount;
        });

        this.setState({
            federalAccounts,
            inFlight: false,
            error: false
        });
    }

    updateSort(sort, order) {
        this.setState({ sort, order }, () => this.getFederalAccounts());
    }

    changePage(page) {
        this.setState({ page }, () => this.getFederalAccounts());
    }

    render() {
        return (
            <FederalAccountsViz
                {...this.state}
                changePage={this.changePage}
                updateSort={this.updateSort} />
        );
    }
}

FederalAccountsVizContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
    awardId: state.awardV2.id,
    category: state.awardV2.category,
    totalTransactionObligatedAmount: state.awardV2.totalTransactionObligatedAmount
});

export default connect(mapStateToProps, null)(FederalAccountsVizContainer);
