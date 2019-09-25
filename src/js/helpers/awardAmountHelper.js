/**
 * awardAmountHelper.js
 * Created by michaelbray on 3/7/17.
 */

import { formatMoneyWithPrecision } from 'helpers/moneyFormatter';

// formats the specific checkboxes
// options are NPM accounting package options
export const formatAwardAmountRange = (range, options = 2) => {
    const minLabel = formatMoneyWithPrecision(range[0], options);
    const maxLabel = formatMoneyWithPrecision(range[1], options);
    let label = `${minLabel} - ${maxLabel}`;
    if (!range[0] && (range[0] !== 0)) {
        label = `Under ${maxLabel}`;
    }
    if (!range[1] && (range[1] !== 0)) {
        label = `${minLabel} & Above`;
    }
    return label;
};
