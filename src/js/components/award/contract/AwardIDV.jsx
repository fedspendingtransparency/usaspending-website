/**
 * AwardIDV.jsx
 * Created by michaelbray on 2/13/18.
 **/

import React from 'react';
import PropTypes from 'prop-types';
import * as SummaryPageHelper from 'helpers/summaryPageHelper';

import AwardAmounts from '../AwardAmounts';
import IDVDetails from './IDVDetails';

const propTypes = {
    selectedAward: PropTypes.object,
    seeAdditional: PropTypes.func
};

export default class AwardIDV extends React.Component {
    render() {
        return (
            <div className="award-contract-wrapper">
                <AwardAmounts
                    selectedAward={this.props.selectedAward}
                    typeString={SummaryPageHelper.awardType(this.props.selectedAward.award_type)} />
                <IDVDetails
                    selectedAward={this.props.selectedAward}
                    seeAdditional={this.props.seeAdditional}
                    maxChars={SummaryPageHelper.maxDescriptionCharacters} />
            </div>
        );
    }
}

AwardIDV.propTypes = propTypes;
