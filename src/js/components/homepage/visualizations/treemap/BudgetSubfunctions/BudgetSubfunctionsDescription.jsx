/**
* BudgetSubfunctionsDescription.jsx
* Created by Emily Gullo 05/15/2017
**/

import React from 'react';
import * as MoneyFormatter from 'helpers/moneyFormatter';

const propTypes = {
    category: React.PropTypes.object,
    description: React.PropTypes.object,
    totalNumber: React.PropTypes.number
};

export default class BudgetSubfunctionsDescription extends React.Component {
    render() {
        const value = this.props.category.value;
        const totalSpend = MoneyFormatter.formatTreemapValues(value);
        const percentage = MoneyFormatter.calculateTreemapPercentage(value, this.props.totalNumber);

        return (
            <div className="function-desc">
                <h1>{this.props.category.name}</h1>
                <h6>{totalSpend} | {percentage}</h6>
                <p>{this.props.description.value}</p>
            </div>
        );
    }
}
BudgetSubfunctionsDescription.propTypes = propTypes;
