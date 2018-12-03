/**
 * ContractAmounts.jsx
 * Created by David Trinh 11/14/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';

import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    selectedAward: PropTypes.object
};

export default class ContractAmounts extends React.Component {
    render() {
        const award = this.props.selectedAward;
        const unformattedObligated = award._obligation;
        const unformattedExercisedOption = award._baseExercisedOptions;
        const baseAndAll = award._amount;
        const obligatedPercentage = Math.round(Math.abs((unformattedObligated / baseAndAll) * 100));
        const exercisedPercentage = Math.round(Math.abs((unformattedExercisedOption / baseAndAll) * 100)) - obligatedPercentage;

        const obligatedStyle = {
            width: `${obligatedPercentage}%`,
            backgroundColor: '#4773aa'
        };

        const exercisedStyle = {
            width: `${exercisedPercentage}%`,
            backgroundColor: '#d8d8d8'
        };

        return (
            <div className="award-amountdates__amounts">
                <div className="award-amountdates__heading">
                    <span className="award-amountdates__heading-title">Award Amounts <span className="award-amountdates__heading-info"><Icons.InfoCircle /></span></span> <span className="award-amountdates__heading-remaining">{award.remaining}<span className="award-amountdates__heading-remaining-text">Remains</span></span>
                </div>
                <div className="award-amountdates__stats-amounts">
                    <div className="award-amountdates__stats-inner" style={obligatedStyle} />
                    <div className="award-amountdates__stats-inner" style={exercisedStyle} />
                </div>
                <div className="award-amountdates__details-container">
                    <div className="award-amountdates__details"><span><span className="award-amountdates__circle_blue" />Obligated Amount</span> <span>{award.obligation}</span></div>
                    <div className="award-amountdates__details"><span><span className="award-amountdates__circle_gray" />Base &amp; Exercised Options</span> <span>{award.baseExercisedOptions}</span></div>
                    <div className="award-amountdates__details"><span><span className="award-amountdates__circle_light-gray" />Base &amp; All Options</span> <span>{award.amount}</span></div>
                </div>
            </div>
        );
    }
}
ContractAmounts.propTypes = propTypes;
