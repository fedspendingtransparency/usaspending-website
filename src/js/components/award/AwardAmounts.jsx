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

        // TO-DO: When subaward amount is available on endpoint,
        // add it here if it exists, as per mockup
        const subAward = "";
        return (
            <div className="amounts-wrapper">
                <div className="award-amounts">
                    <h4>Award Amounts</h4>
                    <div className="border" />
                    <div className="text-details">
                        <b>{this.props.selectedAward.potential_total_value_of_award}</b>,
                            or <b>{truncatedPercent}%</b>, of the potential
                            <b> {this.props.selectedAward.total_obligation} </b>
                             award ceiling, has been obligated. { subAward }
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
