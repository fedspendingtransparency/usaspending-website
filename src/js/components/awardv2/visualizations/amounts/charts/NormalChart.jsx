/**
 * NormalChart.jsx
 * Created by David Trinh 2/15/19
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    awardAmounts: PropTypes.object
};

export default class NormalChart extends React.Component {
    render() {
        const awardAmounts = this.props.awardAmounts;
        const exercisedLabelPercentage = Math.round(Math.abs((awardAmounts._rolledBaseExercisedOptions) / awardAmounts._rolledBaseAllOptions) * 100);

        const obligatedStyle = {
            width: `${awardAmounts.obligatedPercentage}%`,
            backgroundColor: '#4773aa'
        };

        const exercisedStyle = {
            width: `${awardAmounts.exercisedPercentage}%`,
            backgroundColor: '#d8d8d8'
        };

        const obligatedLableStyle = {
            width: `${awardAmounts.obligatedPercentage}%`
        };

        const exercisedLableStyle = {
            width: `${exercisedLabelPercentage}%`
        };

        return (
            <div className="award-amounts-viz">
                <div className="award-amounts-viz__desc-top">
                    <strong>{awardAmounts.obligationFormatted}</strong><br />Combined Obligated Amounts
                </div>
                <div className="award-amounts-viz__label" style={obligatedLableStyle}>
                    <div className="award-amounts-viz__line-up" />
                </div>
                <div className="award-amounts-viz__bar">
                    <div className="award-amountdates__viz-obligated" style={obligatedStyle} />
                    <div className="award-amountdates__viz-excerised" style={exercisedStyle} />
                </div>
                <div className="award-amounts-viz__label" style={exercisedLableStyle}>
                    <div className="award-amounts-viz__line" />
                    <div className="award-amounts-viz__desc">
                        <div className="award-amounts-viz__desc-text">
                            <strong>{awardAmounts.rolledBaseExercisedOptionsFormatted}</strong><br />Combined Current Award Amounts
                        </div>
                        <div className="award-amounts-viz__legend-line" />
                    </div>
                </div>
                <div className="award-amounts-viz__label">
                    <div className="award-amounts-viz__line" />
                    <div className="award-amounts-viz__desc">
                        <div className="award-amounts-viz__desc-text">
                            <strong>{awardAmounts.rolledBaseAllOptionsFormatted}</strong><br />Combined Potential Award Amounts
                        </div>
                        <div className="award-amounts-viz__legend-line award-amounts-viz__legend-line_potential" />
                    </div>
                </div>
            </div>
        );
    }
}
NormalChart.propTypes = propTypes;
