/**
 * ExceedsCurrentChart.jsx
 * Created by Lizzie Salita 4/2/19
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    awardAmounts: PropTypes.object
};

export default class ExceedsCurrentChart extends React.Component {
    render() {
        const awardAmounts = this.props.awardAmounts;
        const currentPercentage = Math.round((awardAmounts._combinedCurrentAwardAmounts / awardAmounts._combinedPotentialAwardAmounts) * 100);
        const exceededPercentage = Math.round(((awardAmounts._obligation - awardAmounts._combinedCurrentAwardAmounts) / awardAmounts._combinedPotentialAwardAmounts) * 100);

        const currentStyle = {
            width: `${currentPercentage}%`,
            backgroundColor: '#4773aa'
        };

        const exceededStyle = {
            width: `${exceededPercentage}%`
        };

        const obligatedLabelStyle = {
            width: `${currentPercentage + exceededPercentage}%`
        };

        const currentLabelStyle = {
            width: `${currentPercentage}%`
        };

        return (
            <div className="award-amounts-viz">
                <div className="award-amounts-viz__desc-top">
                    <strong>{awardAmounts.obligationFormatted}</strong><br />Combined Obligated Amounts
                </div>
                <div className="award-amounts-viz__label" style={obligatedLabelStyle}>
                    <div className="award-amounts-viz__line-up" />
                </div>
                <div className="award-amounts-viz__bar-wrapper">
                    <div className="award-amounts-viz__bar">
                        <div className="award-amounts-viz__obligated" style={currentStyle} />
                        <div className="award-amounts-viz__exceeded" style={exceededStyle} />
                    </div>
                </div>
                <div className="award-amounts-viz__label" style={currentLabelStyle}>
                    <div className="award-amounts-viz__line" />
                    <div className="award-amounts-viz__desc">
                        <div className="award-amounts-viz__desc-text">
                            <strong>{awardAmounts.combinedCurrentAwardAmountsFormatted}</strong><br />Combined Current Award Amounts
                        </div>
                        <div className="award-amounts-viz__legend-line" />
                    </div>
                </div>
                <div className="award-amounts-viz__label">
                    <div className="award-amounts-viz__line" />
                    <div className="award-amounts-viz__desc">
                        <div className="award-amounts-viz__desc-text">
                            <strong>{awardAmounts.combinedPotentialAwardAmountsFormatted}</strong><br />Combined Potential Award Amounts
                        </div>
                        <div className="award-amounts-viz__legend-line award-amounts-viz__legend-line_potential" />
                    </div>
                </div>
            </div>
        );
    }
}
ExceedsCurrentChart.propTypes = propTypes;
