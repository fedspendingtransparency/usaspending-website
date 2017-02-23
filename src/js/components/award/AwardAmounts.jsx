/**
 * AwardAmounts.jsx
 * Created by Emily Gullo 02/06/2017
 **/

import React from 'react';
import accounting from 'accounting';
import _ from 'lodash';
import AmountsChartContainer from 'containers/award/AmountsChartContainer';

const propTypes = {
    selectedAward: React.PropTypes.object
};

export default class AwardAmounts extends React.Component {

    render() {
        const recipient = this.props.selectedAward.recipient_name.toLowerCase();
        // Math
        const potential = accounting.unformat(this.props.selectedAward.total_obligation);
        const current =
        accounting.unformat(this.props.selectedAward.potential_total_value_of_award);
        const percentage = _.divide(current, potential);
        let sub = null;
        let truncatedPercent = "";

        if (this.props.selectedAward.subaward_amount) {
            sub = accounting.unformat(this.props.selectedAward.subaward_amount);
        }
        if (percentage === 1) {
            truncatedPercent = 100;
        }
        else {
            truncatedPercent = _.ceil(percentage, 2);
        }

        // TODO: When subaward amount is available on endpoint,add it here if it exists, as per mockup
        // TODO: round dollar amounts in description to billions/ millions
        const subAward = "";
        return (
            <div className="amounts-wrapper">
                <div className="award-amounts">
                    <h4>Award Amounts</h4>
                    <div className="border" />
                    <div className="text-details">
                        <p>This contract was awarded to <b className="recipient-name">{recipient}</b> with
                            a ceiling of <b>{this.props.selectedAward.total_obligation}</b>.
                            Of this amount, <b>{truncatedPercent}% ({this.props.selectedAward.potential_total_value_of_award})</b> has
                            been obligated. { subAward }</p>
                    </div>
                    <AmountsChartContainer
                        potential={potential}
                        current={current}
                        sub={sub} />
                </div>
            </div>
        );
    }
}
AwardAmounts.propTypes = propTypes;
