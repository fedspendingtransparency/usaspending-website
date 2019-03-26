import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchAwardFundingSummary } from '../../../helpers/idvHelper';
import FundingSummary from '../../../components/awardv2/idv/FundingSummary';

const propTypes = {
    awardId: PropTypes.string
};

const defaultProps = {
    awardId: "0"
};

export class AwardMetaDataContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalTransactionObligatedAmount: 0,
            awardingAgencyCount: 0,
            federalAccountCount: 0
        };
        this.awardMetaDataRequest = null;
    }

    async componentDidMount() {
        await this.getAwardMetaData();
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.awardId !== this.props.awardId) {
            await this.getAwardMetaData();
        }
    }

    async getAwardMetaData() {
        if (this.awardMetaDataRequest) {
            this.awardMetaDataRequest.cancel();
        }
        this.awardMetaDataRequest = fetchAwardFundingSummary(this.props.awardId);
        try {
            const { data } = await this.awardMetaDataRequest.promise;
            this.setState({
                totalTransactionObligatedAmount: data.total_transaction_obligated_amount,
                awardingAgencyCount: data.awarding_agency_count,
                federalAccountCount: data.federal_account_count
            });
        }
        catch (error) {
            this.setState({
                totalTransactionObligatedAmount: "N/A",
                awardingAgencyCount: "N/A",
                federalAccountCount: "N/A"
            });
        }
    }

    render() {
        return <FundingSummary {...this.state} />;
    }
}

AwardMetaDataContainer.propTypes = propTypes;
AwardMetaDataContainer.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
    awardId: state.awardV2.id
});

export default connect(mapStateToProps, null)(AwardMetaDataContainer);
