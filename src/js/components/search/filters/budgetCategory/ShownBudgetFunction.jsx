/**
 * ShownBudgetFunction.jsx
 * Created by michaelbray on 3/22/17.
 */

import React from 'react';
import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    updateSelectedBudgetFunctions: React.PropTypes.func,
    label: React.PropTypes.string
};

export default class ShownBudgetFunction extends React.Component {
    render() {
        return (
            <button
                className="shown-filter-button"
                value={this.props.label}
                onClick={this.props.updateSelectedBudgetFunctions}>
                <span className="close">
                    <Icons.Close className="usa-da-icon-close" />
                </span> {this.props.label}
            </button>
        );
    }
}

ShownBudgetFunction.propTypes = propTypes;
