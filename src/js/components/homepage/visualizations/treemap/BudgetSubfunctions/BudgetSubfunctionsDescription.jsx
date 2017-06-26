/**
* BudgetSubfunctionsDescription.jsx
* Created by Emily Gullo 05/15/2017
**/

import React from 'react';
import * as MoneyFormatter from 'helpers/moneyFormatter';

const propTypes = {
    category: React.PropTypes.object,
    description: React.PropTypes.object,
    totalNumber: React.PropTypes.number,
    subfunctionTotal: React.PropTypes.number
};

export default class BudgetSubfunctionsDescription extends React.Component {
    render() {
        const value = this.props.category.value;
        const totalSpend = MoneyFormatter.formatTreemapValues(value);
        const percentage = MoneyFormatter.calculateTreemapPercentage(value, this.props.totalNumber);

        let greatThanOneHundredDescription = null;
        if (this.props.subfunctionTotal > this.props.category.value) {
            greatThanOneHundredDescription = (<p>Note: The subcategories of spending below add up
                to more than 100%. This is because this budget function includes both spending and
                income. The income offsets the spending, but cannot be displayed on this type of
                graph.
            </p>);
        }

        return (
            <div className="function-desc">
                <h1>{this.props.category.name}</h1>
                <h6>{totalSpend} | {percentage} of total spending</h6>
                <p>{this.props.description.value}</p>
                {greatThanOneHundredDescription}
            </div>
        );
    }
}

BudgetSubfunctionsDescription.propTypes = propTypes;
