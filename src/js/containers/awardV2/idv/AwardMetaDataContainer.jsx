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

class AwardMetaDataContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalTransactionObligatedAmount: 0,
            awardingAgencyCount: 0,
            federalAccountCount: 0
        };
    }
    async componentWillMount() {
        try {
            const summary = await fetchAwardFundingSummary(this.props.awardId).promise;
            const data = summary.data.results[0];
            this.setState({
                totalTransactionObligatedAmount: data.total_transaction_obligated_amount,
                awardingAgencyCount: data.awarding_agency_count,
                federalAccountCount: data.federal_account_count
            });
        }
        catch (error) {
            console.log("handle this error: ", error);
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
