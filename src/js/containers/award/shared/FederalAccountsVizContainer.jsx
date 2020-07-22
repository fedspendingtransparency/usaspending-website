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
import BaseFederalAccount from 'models/v2/award/BaseFederalAccount';
import FederalAccountsViz from 'components/award/shared/federalAccounts/FederalAccountsViz';

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
            inFlight: false,
            error: false,
            federalAccounts: [],
            view: 'table'
        };

        this.request = null;

        this.changePage = this.changePage.bind(this);
        this.updateSort = this.updateSort.bind(this);
        this.changeView = this.changeView.bind(this);
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

    componentWillUnmount() {
        if (this.request) {
            this.request.cancel();
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
            limit, sort, order, award_id: this.props.awardId
        };
        // Only add page number for the table view
        if (this.state.view === 'table') {
            params.page = page;
        }
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

    changeView(view) {
        if (this.state.view !== view) {
            const limit = view === 'tree' ? 100 : 10;
            this.setState({
                view,
                limit
            }, () => {
                this.getFederalAccounts();
            });
        }
    }

    render() {
        return (
            <FederalAccountsViz
                {...this.state}
                changePage={this.changePage}
                updateSort={this.updateSort}
                changeView={this.changeView} />
        );
    }
}

FederalAccountsVizContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
    awardId: state.award.id,
    category: state.award.category,
    totalTransactionObligatedAmount: state.award.totalTransactionObligatedAmount
});

export default connect(mapStateToProps, null)(FederalAccountsVizContainer);
