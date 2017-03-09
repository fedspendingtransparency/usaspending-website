/**
 * awardAmountHelper.js
 * Created by michaelbray on 3/7/17.
 */

import * as MoneyFormatter from 'helpers/moneyFormatter';

export const formatAwardAmountRange = (range) => {
    const min = MoneyFormatter.calculateUnitForSingleValue(range[0]);
    const max = MoneyFormatter.calculateUnitForSingleValue(range[1]);

    const minValue = range[0] / min.unit;
    const maxValue = range[1] / max.unit;

    const minLabel = `${minValue}${min.unitLabel}`;
    const maxLabel = `${maxValue}${max.unitLabel}`;

    if (range[0] === 0) {
        return `Under $${maxLabel}`;
    }
    else if (range[1] === null) {
        return `$${minLabel} & Above`;
    }
    return `$${minLabel} - $${maxLabel}`;
};

export const formatAwardInput = (input) => input;
