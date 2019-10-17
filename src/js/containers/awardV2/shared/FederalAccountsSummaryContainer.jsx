/**
  * FederalAccountsSummaryContainer.jsx
  * Created by Lizzie Salita 8/16/19
  **/

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { isCancel } from 'axios';

import { fetchIdvFundingSummary } from 'helpers/idvHelper';
import { fetchAwardFundingSummary } from 'helpers/awardSummaryHelper';
import { setTotalTransactionObligatedAmount } from 'redux/actions/awardV2/awardActions';
import BaseFundingRollup from 'models/v2/awardsV2/BaseFundingRollup';
import FederalAccountsSummary from 'components/awardv2/shared/federalAccounts/FederalAccountsSummary';

const propTypes = {
    awardId: PropTypes.string,
    category: PropTypes.string,
    jumpToFederalAccountsHistory: PropTypes.func,
    setTotalTransactionObligatedAmount: PropTypes.func
};

export class FederalAccountsSummaryContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inFlight: true,
            summary: null
        };

        this.request = null;
    }

    async componentDidMount() {
        if (this.props.awardId && this.props.category) {
            await this.getAwardMetaData();
        }
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.awardId !== this.props.awardId && (this.props.awardId && this.props.category)) {
            await this.getAwardMetaData();
        }
    }

    componentWillUnmount() {
        if (this.request) {
            this.request.cancel();
        }
    }

    async getAwardMetaData() {
        if (this.request) {
            this.request.cancel();
        }
        if (this.props.category === 'idv') {
            this.request = fetchIdvFundingSummary(this.props.awardId);
        }
        else {
            this.request = fetchAwardFundingSummary(this.props.awardId);
        }
        try {
            const { data } = await this.request.promise;
            this.parseFundingRollup(data);
        }
        catch (error) {
            if (!isCancel(error)) {
                // Send an empty object to display N/A for the values
                this.parseFundingRollup({});
                console.log(error);
            }
        }
    }

    parseFundingRollup(data) {
        const summary = Object.create(BaseFundingRollup);
        summary.populate(data);
        this.setState({
            inFlight: false,
            summary
        });
        // Store the total transaction obligated amount in Redux
        // for use in the table view to calculate percentages
        this.props.setTotalTransactionObligatedAmount(summary._obligatedAmount);
    }

    render() {
        return (
            <FederalAccountsSummary
                {...this.state}
                jumpToFederalAccountsHistory={this.props.jumpToFederalAccountsHistory} />
        );
    }
}

FederalAccountsSummaryContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
    awardId: state.awardV2.id,
    category: state.awardV2.category
});

export default connect(
    mapStateToProps,
    (dispatch) => bindActionCreators({
        setTotalTransactionObligatedAmount
    }, dispatch)
)(FederalAccountsSummaryContainer);
