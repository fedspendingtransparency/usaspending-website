/**
 * AwardFinancialAssistance.jsx
 * Created by Lizzie Dabbs 03/06/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';

import AwardAmounts from '../AwardAmounts';
// import FinancialAssistanceDetails from './FinancialAssistanceDetails';

const propTypes = {
    selectedAward: PropTypes.object,
    seeAdditional: PropTypes.func
};

export default class AwardFinancialAssistance extends React.Component {
    render() {
        return (
            <div className="award-contract-wrapper">
                <AwardAmounts
                    selectedAward={this.props.selectedAward}
                    showPotential={false}
                    typeString={this.props.selectedAward.category} />
                {/* TODO - Lizzie: Add financial assistance details section back in */}
            </div>
        );
    }
}
AwardFinancialAssistance.propTypes = propTypes;
