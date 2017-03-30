/**
 * TreeMapSidebar.jsx
 * Created by Emily Gullo 03/28/2017
 **/

import React from 'react';
import * as MoneyFormatter from 'helpers/moneyFormatter';

const propTypes = {
    category: React.PropTypes.string,
    description: React.PropTypes.string,
    amount: React.PropTypes.number
};

export default class TreeMapSidebar extends React.Component {

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

    render() {
        return (
            <div className="treemap-sidebar">
                <h2 className="tree-cat-name">{this.props.category}</h2>
                <h4 className="tree-cat-amount">{this.formatFriendlyString(this.props.amount)}</h4>
                <div className="tree-cat-desc">
                    <p>{this.props.description}</p>
                </div>
            </div>
        );
    }

}
TreeMapSidebar.propTypes = propTypes;
