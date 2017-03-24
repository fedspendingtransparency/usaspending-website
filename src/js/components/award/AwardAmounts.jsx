/**
 * AwardAmounts.jsx
 * Created by Emily Gullo 02/06/2017
 **/

import React from 'react';
import accounting from 'accounting';

import * as MoneyFormatter from 'helpers/moneyFormatter';

import AmountsChart from './visualizations/AmountsChart';

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

        const ceiling =
            accounting.unformat(this.props.selectedAward.potential_total_value_of_award);
        const current = accounting.unformat(this.props.selectedAward.total_obligation);

        // calculate the percentage spent
        let percentage = 'N/A';
        if (ceiling && ceiling !== 0) {
            percentage = Math.floor((current / ceiling) * 1000) / 10;
        }

        return {
            recipient,
            percentage,
            ceiling: this.formatFriendlyString(ceiling),
            current: this.formatFriendlyString(current)
        };
    }

    render() {
        // Math
        const current = accounting.unformat(this.props.selectedAward.total_obligation);
        const potential =
            accounting.unformat(this.props.selectedAward.potential_total_value_of_award);

        const narrative = this.generateNarrative();

        let awardNarrative = (<p>This {this.props.typeString} was awarded to&nbsp;
        <b className="recipient-name">{narrative.recipient}</b> with a ceiling of
            &nbsp;<b>{narrative.ceiling}</b>.&nbsp; Of this amount,
            &nbsp;<b>{narrative.percentage}%</b>&nbsp; (<b>{narrative.current}</b>)
            has been obligated.</p>);
        if (this.props.typeString === 'grant') {
            awardNarrative = (<p>This {this.props.typeString} was awarded to&nbsp;
            <b className="recipient-name">{narrative.recipient}</b> for
                &nbsp;<b>{narrative.current}</b>.</p>);
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
                        { awardNarrative }
                    </div>
                    <AmountsChart
                        awardId={this.props.selectedAward.id}
                        potential={potential}
                        current={current}
                        showPotential={this.props.showPotential}
                        type={this.props.typeString} />
                </div>
            </div>
        );
    }
}
AwardAmounts.propTypes = propTypes;
