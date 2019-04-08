/**
 * ExceedsCurrentChart.jsx
 * Created by Lizzie Salita 4/2/19
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { generatePercentage } from 'helpers/aggregatedAmountsHelper';

import InfoTooltip from 'components/awardv2/idv/InfoTooltip';
import { awardAmountsOverspendingInfo } from 'components/awardv2/idv/InfoTooltipContent';

const propTypes = {
    awardAmounts: PropTypes.object
};

export default class ExceedsCurrentChart extends React.Component {
    render() {
        const obligation = this.props.awardAmounts._obligation;
        const current = this.props.awardAmounts._combinedCurrentAwardAmounts;
        const potential = this.props.awardAmounts._combinedPotentialAwardAmounts;

        const currentBarStyle = {
            width: generatePercentage(current / potential),
            backgroundColor: '#4773aa'
        };

        const overspendingBarStyle = {
            width: generatePercentage((obligation - current) / potential)
        };

        const obligatedLabelStyle = {
            width: generatePercentage(obligation / potential)
        };

        const currentLabelStyle = {
            width: generatePercentage(current / potential)
        };

        return (
            <div className="award-amounts-viz">
                <div className="award-amounts-viz__desc-top-wrapper">
                    <div className="award-amounts-viz__desc-top">
                        <strong>{this.props.awardAmounts.obligationFormatted}</strong><br />Combined Obligated Amounts
                    </div>
                    <div className="award-amounts-viz__desc">
                        <div className="award-amounts-viz__desc-text">
                            <strong>{this.props.awardAmounts.overspendingFormatted}</strong><br />
                            <div className="award-amounts-viz__desc-text-wrapper">
                                <InfoTooltip>{awardAmountsOverspendingInfo}</InfoTooltip> Exceeds Combined Current Award Amounts
                            </div>
                        </div>
                        <div className="award-amounts-viz__legend-line award-amounts-viz__legend-line_overspending" />
                    </div>
                </div>
                <div className="award-amounts-viz__label" style={obligatedLabelStyle}>
                    <div className="award-amounts-viz__line-up" />
                </div>
                <div className="award-amounts-viz__bar-wrapper">
                    <div className="award-amounts-viz__bar">
                        <div className="award-amounts-viz__obligated" style={currentBarStyle} />
                        <div className="award-amounts-viz__exceeded" style={overspendingBarStyle} />
                    </div>
                </div>
                <div className="award-amounts-viz__label" style={currentLabelStyle}>
                    <div className="award-amounts-viz__line" />
                    <div className="award-amounts-viz__desc">
                        <div className="award-amounts-viz__desc-text">
                            <strong>{this.props.awardAmounts.combinedCurrentAwardAmountsFormatted}</strong><br />Combined Current Award Amounts
                        </div>
                        <div className="award-amounts-viz__legend-line" />
                    </div>
                </div>
                <div className="award-amounts-viz__label">
                    <div className="award-amounts-viz__line" />
                    <div className="award-amounts-viz__desc">
                        <div className="award-amounts-viz__desc-text">
                            <strong>{this.props.awardAmounts.combinedPotentialAwardAmountsFormatted}</strong><br />Combined Potential Award Amounts
                        </div>
                        <div className="award-amounts-viz__legend-line award-amounts-viz__legend-line_potential" />
                    </div>
                </div>
            </div>
        );
    }
}
ExceedsCurrentChart.propTypes = propTypes;
