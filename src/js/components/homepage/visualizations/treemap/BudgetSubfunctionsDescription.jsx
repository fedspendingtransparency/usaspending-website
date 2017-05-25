/**
* BudgetSubfunctionsDescription.jsx
* Created by Emily Gullo 05/15/2017
**/

import React from 'react';

const propTypes = {
    category: React.PropTypes.string,
    value: React.PropTypes.string,
    percentage: React.PropTypes.string,
    description: React.PropTypes.string
};

export default class BudgetSubfunctionsDescription extends React.Component {
    render() {
        return (
            <div className="function-desc">
                <h1>{this.props.category}</h1>
                <h6>{this.props.value} | {this.props.percentage}%</h6>
                <p>{this.props.description}</p>
            </div>
        );
    }
}
BudgetSubfunctionsDescription.propTypes = propTypes;
