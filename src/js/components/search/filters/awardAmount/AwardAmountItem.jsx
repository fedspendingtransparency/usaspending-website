/**
 * AwardAmountItem.jsx
 * Created by michaelbray on 3/7/17.
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    awardAmounts: PropTypes.object,
    label: PropTypes.string,
    rangeID: PropTypes.string,
    toggleSelection: PropTypes.func
};

const defaultProps = {
    values: '',
    rangeID: 0
};

export default class AwardAmountItem extends React.Component {
    render() {
        if (!this.props.label) return null;
        const checked = this.props.awardAmounts.has(this.props.rangeID);

        return (
            <li className="award-amount-set">
                <div className="award-type-item-wrapper">
                    <input
                        type="checkbox"
                        id={`award-amount-${this.props.rangeID}`}
                        value={this.props.rangeID}
                        checked={checked}
                        onChange={this.props.toggleSelection.bind(this)} />
                    <label htmlFor={`award-amount-${this.props.rangeID}`}>
                        {this.props.label}
                    </label>
                </div>
            </li>
        );
    }
}

AwardAmountItem.propTypes = propTypes;
AwardAmountItem.defaultProps = defaultProps;
