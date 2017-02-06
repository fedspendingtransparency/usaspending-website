/**
 * AwardAmounts.jsx
 * Created by Emily Gullo 02/06/2017
 **/

import React from 'react';

const propTypes = {
    selectedAward: React.PropTypes.object
};

export default class AwardAmounts extends React.Component {

    render() {
        return (
            <div className="amounts-wrapper">
                <div className="award-amounts">
                    <h4>Award Amounts</h4>
                    <div className="border" />
                    <div className="text-details">
                        {this.props.selectedAward.total_obligation}
                        {this.props.selectedAward.total_funding_amount}
                    </div>
                </div>
            </div>
        );
    }
}
AwardAmounts.propTypes = propTypes;
