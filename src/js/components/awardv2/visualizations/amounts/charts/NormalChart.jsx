/**
 * NormalChart.jsx
 * Created by David Trinh 2/15/19
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { generatePercentage } from 'helpers/aggregatedAmountsHelper';

const propTypes = {
    awardAmounts: PropTypes.object
};

export default class NormalChart extends React.Component {
    render() {
        // Rename properties to improve readability of the calculations
        const obligation = this.props.awardAmounts._obligation;
        const current = this.props.awardAmounts._combinedCurrentAwardAmounts;
        const potential = this.props.awardAmounts._combinedPotentialAwardAmounts;

        const obligatedBarStyle = {
            width: generatePercentage(obligation / potential),
            backgroundColor: '#4773aa'
        };

        const currentBarStyle = {
            width: generatePercentage((current - obligation) / potential),
            backgroundColor: '#d8d8d8'
        };

        const obligatedLabelStyle = {
            width: generatePercentage(obligation / potential)
        };

        const currentLabelStyle = {
            width: generatePercentage(current / potential)
        };

        return (
            <div className="award-amounts-viz">
                <div className="award-amounts-viz__desc-top">
                    <strong>{this.props.awardAmounts.obligationFormatted}</strong><br />Combined Obligated Amounts
                </div>
                <div className="award-amounts-viz__label" style={obligatedLabelStyle}>
                    <div className="award-amounts-viz__line-up" />
                </div>
                <div className="award-amounts-viz__bar-wrapper">
                    <div className="award-amounts-viz__bar">
                        <div className="award-amounts-viz__obligated" style={obligatedBarStyle} />
                        <div className="award-amounts-viz__excerised" style={currentBarStyle} />
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
NormalChart.propTypes = propTypes;
