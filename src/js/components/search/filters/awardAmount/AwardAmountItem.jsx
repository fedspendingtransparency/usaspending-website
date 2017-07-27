/**
 * AwardAmountItem.jsx
 * Created by michaelbray on 3/7/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as AwardAmountHelper from 'helpers/awardAmountHelper';

const propTypes = {
    awardAmounts: PropTypes.object,
    values: PropTypes.array,
    rangeID: PropTypes.string,
    toggleSelection: PropTypes.func
};

const defaultProps = {
    values: '',
    rangeID: 0
};

export default class AwardAmountItem extends React.Component {
    formatRange() {
        return AwardAmountHelper.formatAwardAmountRange(this.props.values);
    }

    render() {
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
                        {this.formatRange()}</label>
                </div>
            </li>
        );
    }
}

AwardAmountItem.propTypes = propTypes;
AwardAmountItem.defaultProps = defaultProps;
