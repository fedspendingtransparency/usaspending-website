/**
 * awardAmountHelper.js
 * Created by michaelbray on 3/7/17.
 */

import * as MoneyFormatter from 'helpers/moneyFormatter';

export const formatAwardAmountRange = (range) => {
    if (range[1] === null) {
        return `${MoneyFormatter.formatMoney(range[0])} +`;
    }
    return `${MoneyFormatter.formatMoney(range[0])} - ${MoneyFormatter.formatMoney(range[1])}`;
};

export const formatAwardInput = (input) => input;
