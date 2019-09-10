/**
 * awardAmountHelper.js
 * Created by michaelbray on 3/7/17.
 */

import Accounting from 'accounting';
import * as MoneyFormatter from 'helpers/moneyFormatter';

// formats the pre-made checkboxes
export const formatAwardAmountRange = (range) => {
    const min = MoneyFormatter.calculateUnitForSingleValue(range[0]);
    const max = MoneyFormatter.calculateUnitForSingleValue(range[1]);

    const minValue = Math.round((10 * range[0]) / min.unit) / 10;
    const maxValue = Math.round((10 * range[1]) / max.unit) / 10;

    const minLabel = `${minValue}${min.unitLabel}`;
    const maxLabel = `${maxValue}${max.unitLabel}`;

    if (range[0] === 0 && range[1] === 0) {
        return `$0 & Above`;
    }
    else if (range[0] === 0) {
        return `Under $${maxLabel}`;
    }
    else if (range[1] === 0) {
        return `$${minLabel} & Above`;
    }
    return `$${minLabel} - $${maxLabel}`;
};
// formats the specific checkboxes
export const formatAwardAmountItemLabel = (range) => {
    const minLabel = `$${range[0]}`;
    const maxLabel = `$${range[1]}`;
    let label = `${minLabel} - ${maxLabel}`;
    if (range[0] === 0 && range[1] === 0) {
        label = `$0 - $0`;
    }
    if (!range[0] && (range[0] !== 0)) {
        label = `Under ${maxLabel}`;
    }
    if (!range[1] && (range[1] !== 0)) {
        label = `${minLabel} & Above`;
    }
    return label;
};

export const ensureInputIsNumeric = (input) => {
    if (!input && input !== 0) return null;
    // Format user input
    const cleanInput = Accounting.unformat(input.toString());
    if (isNaN(Number(cleanInput)) || cleanInput === '') {
        return null;
    }
    return Number(cleanInput);
};
