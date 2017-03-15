/**
 * AwardGrant.jsx
 * Created by Lizzie Dabbs 03/06/2017
 **/

import React from 'react';
import * as SummaryPageHelper from 'helpers/summaryPageHelper';

import AwardAmounts from '../AwardAmounts';
import GrantDetails from './GrantDetails';

const propTypes = {
    selectedAward: React.PropTypes.object
};

export default class AwardGrant extends React.Component {
    render() {
        return (
            <div className="award-contract-wrapper">
                <AwardAmounts
                    selectedAward={this.props.selectedAward}
                    showPotential={false}
                    typeString={SummaryPageHelper.awardType(this.props.selectedAward.award_type)} />
                <GrantDetails
                    {...this.props}
                    selectedAward={this.props.selectedAward} />
            </div>
        );
    }
}
AwardGrant.propTypes = propTypes;
