/**
 * AwardIDV.jsx
 * Created by michaelbray on 2/13/18.
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
    seeAdditional: PropTypes.func
};

export default class AwardIDV extends React.Component {
    render() {
        let awardType = "Not Available";
        if (this.props.selectedAward.latest_transaction.contract_data.idv_type) {
            awardType = idvAwardTypes[this.props.selectedAward.latest_transaction.contract_data.idv_type];
        }

        const endDate = moment(this.props.selectedAward.latest_transaction.contract_data.ordering_period_end_date).format('M/D/YYYY');

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

AwardIDV.propTypes = propTypes;
