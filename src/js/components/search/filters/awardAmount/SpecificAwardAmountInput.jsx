/**
 * SpecificAwardAmountInput
 * Created by michaelbray on 3/7/17.
 */


/**
 * SpecificAwardAmountItem
 * Created by michaelbray on 3/7/17.
 */

import React from 'react';

import * as AwardAmountHelper from 'helpers/awardAmountHelper';

const propTypes = {
    amountType: React.PropTypes.string
};

export default class SpecificAwardAmountItem extends React.Component {
    render() {
        return (
            <input />
        );
    }
}

SpecificAwardAmountItem.propTypes = propTypes;
