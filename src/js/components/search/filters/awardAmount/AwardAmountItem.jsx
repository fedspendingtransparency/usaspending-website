/**
 * AwardAmountItem.jsx
 * Created by michaelbray on 3/7/17.
 */

import React from 'react';
import * as AwardAmountHelper from 'helpers/awardAmountHelper';

const propTypes = {
    awardAmounts: React.PropTypes.object,
    values: React.PropTypes.array,
    rangeID: React.PropTypes.string
};

const defaultProps = {
    values: '',
    rangeID: 0
};

export default class AwardAmountItem extends React.Component {
    constructor(props) {
        super(props);
    }

    toggleSelection() {

    }

    formatRange() {
        return AwardAmountHelper.formatAwardAmountRange(this.props.values);
    }

    render() {
        const checked = this.props.awardAmounts.includes(this.props.rangeID);

        return (
            <li className="award-amount-set">
                <div className="award-type-item-wrapper">
                    <input
                        type="checkbox"
                        id={this.props.rangeID}
                        value={this.props.rangeID}
                        checked={checked}
                        onChange={this.toggleSelection} />
                    <label htmlFor={this.formatRange()}>{this.formatRange()}</label>
                </div>
            </li>
        );
    }
}

AwardAmountItem.propTypes = propTypes;
AwardAmountItem.defaultProps = defaultProps;
