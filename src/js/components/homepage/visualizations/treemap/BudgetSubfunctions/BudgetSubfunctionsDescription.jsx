/**
* BudgetSubfunctionsDescription.jsx
* Created by Emily Gullo 05/15/2017
**/

import React from 'react';
import PropTypes from 'prop-types';
import * as MoneyFormatter from 'helpers/moneyFormatter';

const propTypes = {
    category: PropTypes.object,
    description: PropTypes.object,
    totalNumber: PropTypes.number,
    subfunctionTotal: PropTypes.number,
    numberOfSubfunctions: PropTypes.number
};

export default class BudgetSubfunctionsDescription extends React.Component {
    render() {
        const value = this.props.category.value;
        const totalSpend = MoneyFormatter.formatTreemapValues(value);
        const percentage = MoneyFormatter.calculateTreemapPercentage(value, this.props.totalNumber);
        let subject = "subcategories";
        let verb = "add up to";

        if (this.props.numberOfSubfunctions === 1) {
            subject = "subcategory";
            verb = "is";
        }

        let greatThanOneHundredDescription = null;
        if (this.props.subfunctionTotal > this.props.category.value) {
            greatThanOneHundredDescription = (<p><em><strong>Note:</strong> The {subject} of
                spending below {verb} more than 100%. This is because this budget function
                includes both spending and income. The income offsets the spending, but
                cannot be displayed on this type of graph.
            </em>
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
