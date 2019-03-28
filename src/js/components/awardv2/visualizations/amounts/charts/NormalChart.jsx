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
            <div>
                <div className="award-amounts__viz-desc-top"><strong>{awardAmounts.obligationFormatted}</strong> Combined Obligated Amounts</div>
                <div className="award-amounts__viz-label" style={obligatedLableStyle}>
                    <div className="award-amounts__viz-line-up" />
                </div>
                <div className="award-amounts__viz">
                    <div className="award-amountdates__viz-obligated" style={obligatedStyle} />
                    <div className="award-amountdates__viz-excerised" style={exercisedStyle} />
                </div>
                <div className="award-amounts__viz-label" style={exercisedLableStyle}>
                    <div className="award-amounts__viz-line" />
                    <div className="award-amounts__viz-desc"><strong>{awardAmounts.rolledBaseExercisedOptionsFormatted}</strong> Combined Current Award Amounts</div>
                </div>
                <div className="award-amounts__viz-label">
                    <div className="award-amounts__viz-line" />
                    <div className="award-amounts__viz-desc"><strong>{awardAmounts.rolledBaseAllOptionsFormatted}</strong> Combined Potential Award Amounts</div>
                </div>
            </div>
        );
    }
}
NormalChart.propTypes = propTypes;
