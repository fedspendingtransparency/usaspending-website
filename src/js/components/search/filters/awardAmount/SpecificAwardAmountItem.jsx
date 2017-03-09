/**
 * SpecificAwardAmountItem
 * Created by michaelbray on 3/7/17.
 */

import React from 'react';

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

    searchSpecificRange() {
        const min = isNaN(Number(this.minValue.value)) ? 0 : Number(this.minValue.value);
        let max = isNaN(Number(this.maxValue.value)) ? 0 : Number(this.maxValue.value);

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
        const hide = this.state.hideCustom ? 'hide' : '';

        return (
            <div>
                <div className={hide}>
                    <AwardAmountItem
                        {...this.props}
                        values={[this.state.min, this.state.max]}
                        key="award-range-5"
                        rangeID="5"
                        toggleSelection={this.searchSpecificRange.bind(this)} />
                </div>

                <div className="specific-award-amount-wrapper">
                    <span>$</span>
                    <input
                        placeholder="Minimum"
                        ref={(input) => {
                            this.minValue = input;
                        }} />
                    <span>to $</span>
                    <input
                        placeholder="Maximum"
                        ref={(input) => {
                            this.maxValue = input;
                        }} />
                    <button
                        type="button"
                        onClick={this.searchSpecificRange.bind(this)}>{`>>`}</button>
                </div>
            </div>
        );
    }
}

SpecificAwardAmountItem.propTypes = propTypes;
