/**
 * AggregatedAwardAmountsInfo.jsx
 * Created by David Trinh 2/15/19
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'components/sharedComponents/icons/Icons';
import AwardsBanner from './AwardsBanner';


const propTypes = {
    awardAmounts: PropTypes.object,
    jumpToSection: PropTypes.func
};

export default class AggregatedAwardAmountsInfo extends React.Component {
    constructor(props) {
        super(props);

        this.jumpToReferencedAwardsTable = this.jumpToReferencedAwardsTable.bind(this);
    }
    jumpToReferencedAwardsTable() {
        this.props.jumpToSection('referenced-awards');
    }
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
            <div className="award-amounts__content">
                <AwardsBanner
                    jumpToReferencedAwardsTable={this.jumpToReferencedAwardsTable} />
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
                    <div className="award-amounts__viz-desc"><strong>{awardAmounts.rolledBaseExercisedOptionsFormatted}</strong> Combined Base &#38; Exercised Options</div>
                </div>
                <div className="award-amounts__viz-label">
                    <div className="award-amounts__viz-line" />
                    <div className="award-amounts__viz-desc"><strong>{awardAmounts.rolledBaseAllOptionsFormatted}</strong> Combined Base &#38; All Options</div>
                </div>
                <div className="award-amounts__data">
                    <span>Awards that Reference this IDV</span><span>{awardAmounts.idvCount + awardAmounts.contractCount}</span>
                </div>
                <button
                    onClick={this.jumpToReferencedAwardsTable}
                    className="award-viz__button">
                    <div className="award-viz__link-icon">
                        <Table />
                    </div>
                    <div className="award-viz__link-text">
                            View referencing awards table
                    </div>
                </button>
                <div className="award-amounts__data-wrapper">
                    <div className="award-amounts__data-content">
                        <div><span className="award-amounts__data-icon award-amounts__data-icon_blue" />Combined Obligated Amount</div>
                        <span>{awardAmounts.obligation}</span>
                    </div>
                    <div className="award-amounts__data-content">
                        <div><span className="award-amounts__data-icon award-amounts__data-icon_gray" />Combined Base &#38; Exercised Options</div>
                        <span>{awardAmounts.rolledBaseExercisedOptions}</span>
                    </div>
                    <div className="award-amounts__data-content">
                        <div><span className="award-amounts__data-icon award-amounts__data-icon_transparent" />Combined Base &#38; All Options</div>
                        <span>{awardAmounts.rolledBaseAllOptions}</span>
                    </div>
                </div>
            </div>
        );
    }
}
AggregatedAwardAmountsInfo.propTypes = propTypes;
