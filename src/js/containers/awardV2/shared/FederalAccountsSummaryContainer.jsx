/**
  * FederalAccountsSummaryContainer.jsx
  * Created by Lizzie Salita 8/16/19
  **/

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isCancel } from 'axios';

import { fetchIdvFundingSummary } from 'helpers/idvHelper';
import { fetchAwardFundingSummary } from 'helpers/awardSummaryHelper';
import BaseFundingRollup from 'models/v2/awardsV2/BaseFundingRollup';
import FederalAccountsSummary from 'components/awardv2/shared/federalAccounts/FederalAccountsSummary';

const propTypes = {
    awardId: PropTypes.string,
    category: PropTypes.string,
    jumpToFederalAccountsHistory: PropTypes.func
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
    }

    render() {
        return (
            <FederalAccountsSummary
                {...this.state}
                category={this.props.category}
                jumpToFederalAccountsHistory={this.props.jumpToFederalAccountsHistory} />
        );
    }
}

FederalAccountsSummaryContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
    awardId: state.awardV2.id,
    category: state.awardV2.category
});

export default connect(mapStateToProps, null)(FederalAccountsSummaryContainer);
