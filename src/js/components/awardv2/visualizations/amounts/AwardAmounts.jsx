/**
 * AwardAmounts.jsx
 * Created by Lizzie Salita 10/12/18
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    award: PropTypes.object
};

export default class AwardAmounts extends React.Component {
    render() {
        const unformattedObligated = 6497742681.42;
        const unformattedExercisedOption = 12691821811.57;
        const baseAndAll = 26504960197.57;
        const obligatedPercentage = Math.round(Math.abs((unformattedObligated / baseAndAll) * 100));
        const exercisedPercentage = Math.round(Math.abs((unformattedExercisedOption / baseAndAll) * 100)) - obligatedPercentage;
        const exercisedLabelPercentage = Math.round(Math.abs((unformattedExercisedOption) / baseAndAll) * 100);

        const obligatedStyle = {
            width: `${obligatedPercentage}%`,
            backgroundColor: '#4773aa'
        };

        const exercisedStyle = {
            width: `${exercisedPercentage}%`,
            backgroundColor: '#d8d8d8'
        };

        const obligatedLableStyle = {
            width: `${obligatedPercentage}%`
        };

        const exercisedLableStyle = {
            width: `${exercisedLabelPercentage}%`
        };

        return (
            <div className="award__col award-viz award-amounts">
                <div className="award-viz__heading">
                    <h3 className="award-viz__title">
                        $ Combined Award Amounts
                    </h3>
                </div>
                <hr />
                <div className="award-amounts__content">
                    <div className="award_amounts__banner">
                        <p>The information in this tab is pulled from the combined data of awards that reference this IDV, not the IDV itself. To see those awards, scroll to the <a href="/">referencing awards table</a> on this page.</p>
                    </div>
                    <div className="award-amounts__viz-label" style={obligatedLableStyle}>
                        <div className="award-amounts__viz-desc">Combined Obligated Amounts</div>
                        <div className="award-amounts__viz-line-up" />
                    </div>
                    <div className="award-amounts__viz">
                        <div className="award-amountdates__viz-obligated" style={obligatedStyle} />
                        <div className="award-amountdates__viz-excerised" style={exercisedStyle} />
                    </div>
                    <div className="award-amounts__viz-label" style={exercisedLableStyle}>
                        <div className="award-amounts__viz-line" />
                        <div className="award-amounts__viz-desc">Combined Base &#38; Exercised Options</div>
                    </div>
                    <div className="award-amounts__viz-label">
                        <div className="award-amounts__viz-line" />
                        <div className="award-amounts__viz-desc">Combined Base &#38; All Options</div>
                    </div>
                    <div className="award-amounts__data">
                        <span>Awards that Reference this IDV</span><span>2</span>
                    </div>
                    <a
                        href="/"
                        className="award-viz__link">
                        <div className="award-viz__link-icon">
                            <Table />
                        </div>
                        <div className="award-viz__link-text">
                            View referencing awards table
                        </div>
                    </a>
                    <div className="award-amounts__data-wrapper">
                        <div className="award-amounts__data-content">
                            <div><span className="award-amounts__data-icon award-amounts__data-icon_blue" />Combined Obligated Amount</div>
                            <span>2</span>
                        </div>
                        <div className="award-amounts__data-content">
                            <div><span className="award-amounts__data-icon award-amounts__data-icon_gray" />Combined Base &#38; Exercised Options</div>
                            <span>2</span>
                        </div>
                        <div className="award-amounts__data-content">
                            <div><span className="award-amounts__data-icon award-amounts__data-icon_transparent" />Combined Base &#38; All Options</div>
                            <span>2</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
AwardAmounts.propTypes = propTypes;
