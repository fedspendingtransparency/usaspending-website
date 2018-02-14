/**
 * AwardContract.jsx
 * Created by Emily Gullo 02/06/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as SummaryPageHelper from 'helpers/summaryPageHelper';
import { idvAwardTypes } from 'dataMapping/contracts/idvAwardTypes';

import AwardAmounts from '../AwardAmounts';
import ContractDetails from './ContractDetails';

const propTypes = {
    selectedAward: PropTypes.object,
    seeAdditional: PropTypes.func,
    type: PropTypes.string
};

export default class AwardContract extends React.Component {
    render() {
        let awardType = "Not Available";
        let endDate = "";

        // This component is used for both Contracts and IDVs
        if (this.props.type === 'contract') {
            if (this.props.selectedAward.latest_transaction.contract_data.contract_award_type_desc) {
                awardType = this.props.selectedAward.latest_transaction.contract_data.contract_award_type_desc;
            }

            endDate = this.props.selectedAward.period_of_performance_current_end_date;
        }
        else {
            // Use IDV fields
            if (this.props.selectedAward.latest_transaction.contract_data.idv_type) {
                awardType = idvAwardTypes[this.props.selectedAward.latest_transaction.contract_data.idv_type];
            }

            endDate = moment(this.props.selectedAward.latest_transaction.contract_data.ordering_period_end_date).format('M/D/YYYY');
        }

        return (
            <div className="award-contract-wrapper">
                <AwardAmounts
                    selectedAward={this.props.selectedAward}
                    typeString={SummaryPageHelper.awardType(this.props.selectedAward.award_type)} />
                <ContractDetails
                    selectedAward={this.props.selectedAward}
                    seeAdditional={this.props.seeAdditional}
                    maxChars={SummaryPageHelper.maxDescriptionCharacters}
                    awardType={awardType}
                    endDate={endDate} />
            </div>
        );
    }
}
AwardContract.propTypes = propTypes;
