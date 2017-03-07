/**
 * SpecificAwardAmountItem
 * Created by michaelbray on 3/7/17.
 */

import React from 'react';

import SpecificAwardAmountInput from './SpecificAwardAmountInput';

const propTypes = {

};

export default class SpecificAwardAmountItem extends React.Component {
    render() {
        return (
            <div className="">
                <div className="specific-award-amount-wrapper">
                    $
                    <SpecificAwardAmountInput
                        amountType="min" />
                    to $
                    <SpecificAwardAmountInput
                        amountType="max" />
                </div>
            </div>
        );
    }
}

SpecificAwardAmountItem.propTypes = propTypes;
