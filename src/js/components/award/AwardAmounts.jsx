/**
 * AwardAmounts.jsx
 * Created by Emily Gullo 02/06/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';

import AmountsChart from './visualizations/AmountsChart';
import LoanAmounts from './LoanAmounts';

const propTypes = {
    selectedAward: PropTypes.object,
    showPotential: PropTypes.bool
};

export default class AwardAmounts extends React.Component {
    generateNarrative() {
        const award = this.props.selectedAward;
        const recipient = award.recipient.name.toLowerCase();

        const ceiling = award.ceiling;
        const current = award.obligation;
        const unformattedCeiling = award._ceiling;
        const unformattedCurrent = award._obligation;

        // calculate the percentage spent
        let percentage = 'N/A';
        if (unformattedCeiling && unformattedCeiling !== 0) {
            percentage = Math.floor((unformattedCurrent / unformattedCeiling) * 1000) / 10;
        }
        let awardNarrative = (
            <p>
                This {award.category} was awarded to&nbsp;
                <b className="recipient-name">{recipient}</b> with a potential award amount of
                &nbsp;<b>{ceiling}</b>.&nbsp;
                Of this amount, <b>{percentage}%</b> (<b>{current}</b>)
                has been obligated.
            </p>
        );

        if (award.category === 'grant' || award.category === 'direct payment' || award.category === 'other') {
            awardNarrative = (
                <p>
                    This {award.category} was awarded to&nbsp;
                    <b className="recipient-name">{recipient}</b>
                    &nbsp;for <b>{current}</b>.
                </p>
            );
        }
        else if (award.category === 'loan') {
            const loanCeiling = award.faceValue;
            const loanSubsidy = award.subsidy;

            awardNarrative = (
                <p>
                    A {award.category} with a face value of&nbsp;
                    <b>{loanCeiling}</b> was awarded to <b>{recipient}</b>. The agency&#8217;s
                        estimated non-administrative cost to the government for this&nbsp;
                    {award.category} is <b>{loanSubsidy}</b>. This cost is also known as
                        original subsidy cost.
                </p>
            );
        }
        return awardNarrative;
    }

    render() {
        let amountsDisplay = (
            <AmountsChart
                awardId={this.props.selectedAward.id}
                potential={this.props.selectedAward._amount}
                current={this.props.selectedAward._obligation}
                showPotential={this.props.showPotential}
                type={this.props.selectedAward.category} />
        );

        if (this.props.selectedAward.category === 'loan') {
            amountsDisplay = (
                <LoanAmounts
                    faceValue={this.props.selectedAward._faceValue}
                    subsidy={this.props.selectedAward._subsidy} />
            );
        }

        return (
            <div className="amounts-wrapper">
                <div className="award-amounts">
                    <h3>Award Amounts</h3>
                    <hr
                        className="results-divider"
                        ref={(hr) => {
                            this.sectionHr = hr;
                        }} />
                    <div className="text-details">
                        { this.generateNarrative() }
                    </div>
                    { amountsDisplay }
                </div>
            </div>
        );
    }
}
AwardAmounts.propTypes = propTypes;
