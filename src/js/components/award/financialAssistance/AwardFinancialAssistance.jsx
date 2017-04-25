/**
 * AwardFinancialAssistance.jsx
 * Created by Lizzie Dabbs 03/06/2017
 **/

import React from 'react';
import * as SummaryPageHelper from 'helpers/summaryPageHelper';

import AwardAmounts from '../AwardAmounts';
import FinancialAssistanceDetails from './FinancialAssistanceDetails';

const propTypes = {
    selectedAward: React.PropTypes.object,
    seeAdditional: React.PropTypes.func
};

export default class AwardFinancialAssistance extends React.Component {
    render() {
        return (
            <div className="award-contract-wrapper">
                <AwardAmounts
                    selectedAward={this.props.selectedAward}
                    showPotential={false}
                    typeString={SummaryPageHelper.awardType(this.props.selectedAward.award_type)} />
                <FinancialAssistanceDetails
                    {...this.props}
                    selectedAward={this.props.selectedAward}
                    seeAdditional={this.props.seeAdditional} />
            </div>
        );
    }
}
AwardFinancialAssistance.propTypes = propTypes;
