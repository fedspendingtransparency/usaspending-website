/**
 * SpecificAwardAmountItem
 * Created by michaelbray on 3/7/17.
 */

import React from 'react';

import * as AwardAmountHelper from 'helpers/awardAmountHelper';
import AwardAmountItem from './AwardAmountItem';

const propTypes = {
    searchSpecificRange: React.PropTypes.func
};

export default class SpecificAwardAmountItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            min: 0,
            max: 0,
            hideCustom: true
        };
    }

    componentDidMount() {
        this.setupInputListeners();
    }

    setupInputListeners() {
        [this.minValue, this.maxValue].forEach((target) => {
            target.addEventListener('keydown', (e) => {
                // Enter
                if (e.keyCode === 13) {
                    e.preventDefault();
                    this.searchSpecificRange();
                }
            });
        });
    }

    searchSpecificRange() {
        const min = AwardAmountHelper.ensureInputIsNumeric(this.minValue.value);
        let max = AwardAmountHelper.ensureInputIsNumeric(this.maxValue.value);

        if (min >= max) {
            // If minimum is larger than maximum, take minimum value
            max = 0;
        }

        this.setState({
            min,
            max,
            hideCustom: false
        });

        this.props.searchSpecificRange([min, max]);
    }

    render() {
        const hide = this.state.hideCustom ? ' hide' : '';

        return (
            <div className="specific-award-amount">
                <hr className="specific-award-amount-divider" />
                <div className={`award-amount-item-wrapper${hide}`}>
                    <AwardAmountItem
                        {...this.props}
                        values={[this.state.min, this.state.max]}
                        key="award-range-specific"
                        rangeID="specific"
                        toggleSelection={this.searchSpecificRange.bind(this)} />
                </div>

                <div className="specific-award-amount-wrapper">
                    <span>$</span>
                    <input
                        placeholder="Min"
                        className="specific-award-min"
                        ref={(input) => {
                            this.minValue = input;
                        }} />
                    <span>to $</span>
                    <input
                        placeholder="Max"
                        className="specific-award-max"
                        ref={(input) => {
                            this.maxValue = input;
                        }} />
                    <input
                        type="submit"
                        value="Submit"
                        className="award-amount-submit"
                        onClick={this.searchSpecificRange.bind(this)} />
                </div>
            </div>
        );
    }
}

SpecificAwardAmountItem.propTypes = propTypes;
