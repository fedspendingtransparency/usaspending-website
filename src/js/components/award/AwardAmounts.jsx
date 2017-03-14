/**
 * AwardAmounts.jsx
 * Created by Emily Gullo 02/06/2017
 **/

import React from 'react';
import _ from 'lodash';
import accounting from 'accounting';
import { awardTypeGroups } from 'dataMapping/search/awardType';

import * as MoneyFormatter from 'helpers/moneyFormatter';

import AmountsChart from './visualizations/AmountsChart';

const propTypes = {
    selectedAward: React.PropTypes.object,
    showPotential: React.PropTypes.bool
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

        const isContract = (_.includes(awardTypeGroups.contracts, this.props.selectedAward.award_type));

        let textDetails = (
            <div className="text-details">
                <p>This contract was awarded to&nbsp;
                    <b className="recipient-name">{narrative.recipient}</b>.&nbsp;
                    {narrative.current} has been obligated.</p>
            </div>
        );

        // TODO: add subaward data when available
        if (!isContract) {
            textDetails = (
                <div className="text-details">
                    <p>This contract was awarded to&nbsp;
                        <b className="recipient-name">{narrative.recipient}</b> for&nbsp;
                        <b>{narrative.current}</b>.
                    </p>
                </div>
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
                    {textDetails}
                    <AmountsChart
                        awardId={this.props.selectedAward.id}
                        potential={potential}
                        current={current}
                        showPotential={this.props.showPotential} />
                </div>
            </div>
        );
    }
}
AwardAmounts.propTypes = propTypes;
