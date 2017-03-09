/**
 * SpecificAwardAmountItem
 * Created by michaelbray on 3/7/17.
 */

import React from 'react';

const propTypes = {
    searchSpecificRange: React.PropTypes.func
};

export default class SpecificAwardAmountItem extends React.Component {
    searchSpecificRange() {
        this.props.searchSpecificRange([this.minValue.value, this.maxValue.value]);
    }

    render() {
        return (
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
                    onClick={this.searchSpecificRange.bind(this)}>Go</button>
            </div>
        );
    }
}

SpecificAwardAmountItem.propTypes = propTypes;
