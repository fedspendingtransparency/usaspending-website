/**
 * ShownBudgetFunction.jsx
 * Created by michaelbray on 3/22/17.
 */

import React from 'react';

const propTypes = {
    updateSelectedBudgetFunctions: React.PropTypes.func,
    label: React.PropTypes.string
};

export default class ShownBudgetFunction extends React.Component {
    render() {
        return (
            <button
                className="shown-budget-category-button"
                value={this.props.label}
                onClick={this.props.updateSelectedBudgetFunctions}>
                <span className="close">x</span> {this.props.label}
            </button>
        );
    }
}

ShownBudgetFunction.propTypes = propTypes;
