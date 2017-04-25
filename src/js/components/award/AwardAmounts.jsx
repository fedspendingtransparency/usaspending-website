/**
 * AwardAmounts.jsx
 * Created by Emily Gullo 02/06/2017
 **/

import React from 'react';
import accounting from 'accounting';

import * as MoneyFormatter from 'helpers/moneyFormatter';

import AmountsChart from './visualizations/AmountsChart';
import LoanAmounts from './LoanAmounts';

const propTypes = {
    selectedAward: React.PropTypes.object,
    showPotential: React.PropTypes.bool,
    typeString: React.PropTypes.string
};

export default class AwardAmounts extends React.Component {

    formatFriendlyString(value) {
        // format the ceiling and current values to be friendly strings
        const units = MoneyFormatter.calculateUnitForSingleValue(value);
        // only reformat at a million or higher
        if (units.unit < MoneyFormatter.unitValues.MILLION) {
            units.unit = 1;
            units.unitLabel = '';
            units.longLabel = '';
        }
        const formattedValue = value / units.unit;
        let precision = 1;
        if (formattedValue % 1 === 0) {
            // whole number
            precision = 0;
        }

        const formattedCurrency =
            MoneyFormatter.formatMoneyWithPrecision(formattedValue, precision);

        // don't add an extra space when there's no units string to display
        let longLabel = '';
        if (units.unit > 1) {
            longLabel = ` ${units.longLabel}`;
        }

        return `${formattedCurrency}${longLabel}`;
    }

    generateNarrative() {
        const recipient = this.props.selectedAward.recipient_name.toLowerCase();

        const ceiling = this.props.selectedAward.potential_total_value_of_award;
        const current = this.props.selectedAward.total_obligation;
        const unformattedCeiling =
        accounting.unformat(this.props.selectedAward.potential_total_value_of_award);
        const unformattedCurrent = accounting.unformat(this.props.selectedAward.total_obligation);

        // calculate the percentage spent
        let percentage = 'N/A';
        if (unformattedCeiling && unformattedCeiling !== 0) {
            percentage = Math.floor((unformattedCurrent / unformattedCeiling) * 1000) / 10;
        }
        let awardNarrative = (<p>This {this.props.typeString} was awarded to&nbsp;
        <b className="recipient-name">{recipient}</b> with a ceiling of
            &nbsp;<b>{ceiling}</b>.&nbsp;
            Of this amount, <b>{percentage}%</b> (<b>{current}</b>)
            has been obligated.</p>);

        if (this.props.typeString === 'grant' || this.props.typeString === 'direct payment' ||
        this.props.typeString === 'insurance') {
            awardNarrative = (<p>This {this.props.typeString} was awarded to&nbsp;
            <b className="recipient-name">{recipient}</b>
            &nbsp;for <b>{current}</b>.</p>);
        }
        else if (this.props.typeString === 'loan') {
            const loanCeiling = this.formatFriendlyString(
                this.props.selectedAward.assistance_data.face_value_loan_guarantee);
            const loanSubsidy = this.formatFriendlyString(
                this.props.selectedAward.assistance_data.original_loan_subsidy_cost);

            awardNarrative = (<p>A {this.props.typeString} with a face value of&nbsp;
                <b>{loanCeiling}</b> was awarded to <b>{recipient}</b>.  The agency&#8217;s
                    estimated non-administrative cost to the government for this&nbsp;
                    {this.props.typeString} is <b>{loanSubsidy}</b>.  This cost is also known as
                    original subsidy cost.</p>);
        }
        return awardNarrative;
    }

    render() {
        // Math
        const current = accounting.unformat(this.props.selectedAward.total_obligation);
        const potential =
            accounting.unformat(this.props.selectedAward.potential_total_value_of_award);

        let amountsDisplay = (<AmountsChart
            awardId={this.props.selectedAward.id}
            potential={potential}
            current={current}
            showPotential={this.props.showPotential}
            type={this.props.typeString} />);

        if (this.props.typeString === 'loan') {
            amountsDisplay = (<LoanAmounts
                faceValue={this.props.selectedAward.assistance_data.face_value_loan_guarantee}
                subsidy={this.props.selectedAward.assistance_data.original_loan_subsidy_cost} />);
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
