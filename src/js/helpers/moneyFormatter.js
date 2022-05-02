/**
 * moneyFormatter.js
 * Created by Kevin Li 1/6/17
 */

import Accounting from 'accounting';
import { max, min, mean, startCase } from 'lodash';

// convert monetary values to currency strings
const accountingOptions = {
    symbol: '$',
    precision: 0,
    format: {
        pos: '%s%v',
        neg: '-%s%v',
        zero: '%s%v'
    }
};

export const unitValues = {
    TRILLION: 1000000000000,
    BILLION: 1000000000,
    MILLION: 1000000,
    THOUSAND: 1000
};

export const unitLabels = {
    TRILLION: 'T',
    BILLION: 'B',
    MILLION: 'M',
    THOUSAND: 'k'
};

export const unitWords = {
    TRILLION: 'trillion',
    BILLION: 'billion',
    MILLION: 'million',
    THOUSAND: 'thousand'
};

export const formatMoney = (value) => Accounting.formatMoney(value, accountingOptions);

/**
 * formatMoneyWithPrecision
 * @param {number} value to be formatted into a precise dollar amount
 * @param {number} precision decimal places to apply to formatting
 * @param {string} falsyReturnValue in case where value is invalid, use this format
 * @returns {string} a formatted string representing a dollar value
 * NOTE: falsyReturnValue is opt in to play nicely with existing consumers. This is a newer param following a new precedent.
 * set by calculatePercentage.
**/
export const formatMoneyWithPrecision = (value, precision, falsyReturnValue = null) => {
    if (falsyReturnValue && !value && value !== 0) {
        return falsyReturnValue;
    }
    const modifiedOptions = Object.assign({}, accountingOptions, {
        precision
    });
    return Accounting.formatMoney(value, modifiedOptions);
};

export const calculateUnits = (data, subdivisions = 6) => {
    // determine the "scale max", that is the largest absolute value data point in the data set
    // this may actually be the min value of the data set if the data set is heavily negative
    const scaleMax = max([Math.abs(min(data)), Math.abs(max(data))]);

    // also determine the absolute value of the average as an indicator of where most of the data
    // is; this will be used to jump down a unit/increase resolution in data sets where there are
    // extreme outliers
    const scaleAvg = Math.abs(mean(data));

    let unit = 1;
    let unitLabel = '';
    let longLabel = '';
    if (scaleMax >= unitValues.TRILLION) {
    // the max is at least 1 trillion
        unit = unitValues.TRILLION;
        unitLabel = unitLabels.TRILLION;
        longLabel = unitWords.TRILLION;
        if (scaleAvg < unitValues.TRILLION) {
            // the average is less than a trillion, drop down to a billion
            unit = unitValues.BILLION;
            unitLabel = unitLabels.BILLION;
            longLabel = unitWords.BILLION;
        }
    }
    else if (scaleMax >= unitValues.BILLION) {
    // the max is at least 1 billion
        unit = unitValues.BILLION;
        unitLabel = unitLabels.BILLION;
        longLabel = unitWords.BILLION;
        if (scaleAvg < unitValues.BILLION) {
            // the average is less than a billion, drop down to a million
            unit = unitValues.MILLION;
            unitLabel = unitLabels.MILLION;
            longLabel = unitWords.MILLION;
        }
    }
    else if (scaleMax >= unitValues.MILLION) {
    // the max is at least 1 million
        unit = unitValues.MILLION;
        unitLabel = unitLabels.MILLION;
        longLabel = unitWords.MILLION;
        if (scaleAvg < unitValues.MILLION) {
            // the average is less than a billion, drop down to a thousand
            unit = unitValues.THOUSAND;
            unitLabel = unitLabels.THOUSAND;
            longLabel = unitWords.THOUSAND;
        }
    }
    else if (scaleMax >= unitValues.THOUSAND) {
    // the max is at least 1 thousand
        unit = unitValues.THOUSAND;
        unitLabel = unitLabels.THOUSAND;
        longLabel = unitWords.THOUSAND;
        if (scaleAvg < unitValues.THOUSAND) {
            // the average is less than a thousand, don't format
            unit = 1;
            unitLabel = '';
            longLabel = '';
        }
    }

    let precision = 0;
    if ((scaleMax / unit) < subdivisions) {
    // add decimal values if the spacing between each label is less than 1
        precision = 2;
    }

    return {
        precision,
        unit,
        unitLabel,
        longLabel
    };
};

// Returns the unit and short/longhand labels for a specific value
// You must divide the value parameter by the unit result to put the value in the proper scale
export const calculateUnitForSingleValue = (value) => {
    const adjustedValue = Math.abs(value);

    let unit = 1;
    let unitLabel = '';
    let unitWord = '';
    if (adjustedValue >= unitValues.TRILLION) {
    // the max is at least 1 trillion
        unit = unitValues.TRILLION;
        unitLabel = unitLabels.TRILLION;
        unitWord = unitWords.TRILLION;
    }
    else if (adjustedValue >= unitValues.BILLION) {
    // the max is at least 1 billion
        unit = unitValues.BILLION;
        unitLabel = unitLabels.BILLION;
        unitWord = unitWords.BILLION;
    }
    else if (adjustedValue >= unitValues.MILLION) {
    // the max is at least 1 million
        unit = unitValues.MILLION;
        unitLabel = unitLabels.MILLION;
        unitWord = unitWords.MILLION;
    }
    else if (adjustedValue >= unitValues.THOUSAND) {
    // the max is at least 1 thousand
        unit = unitValues.THOUSAND;
        unitLabel = unitLabels.THOUSAND;
        unitWord = unitWords.THOUSAND;
    }

    return {
        unit,
        unitLabel,
        longLabel: unitWord
    };
};

export const formatTreemapValues = (value) => {
    // Format the ceiling and current values to be friendly strings
    const units = calculateUnitForSingleValue(value);
    const useCents = units.unit <= unitValues.THOUSAND;

    // Only reformat at a million or higher
    if (units.unit < unitValues.MILLION) {
        units.unit = 1;
        units.unitLabel = '';
        units.longLabel = '';
    }
    const formattedValue = value / units.unit;

    let precision = 1;
    if (formattedValue % 1 === 0) {
    // Whole number
        precision = 0;
    }
    else if (useCents) {
        precision = 2;
    }

    const formattedCurrency = formatMoneyWithPrecision(formattedValue, precision);

    // Don't add an extra space when there's no units string to display
    let longLabel = '';
    if (units.unit > 1) {
        longLabel = ` ${units.longLabel}`;
    }

    return `${formattedCurrency}${longLabel}`;
};

export const formatMoneyWithUnits = (value) => {
    if (typeof value !== 'number') return '--';
    // Format the ceiling and current values to be friendly strings
    const units = calculateUnitForSingleValue(value);

    // Only reformat at a million or higher
    if (units.unit < unitValues.MILLION) {
        units.unit = 1;
        units.unitLabel = '';
        units.longLabel = '';
    }
    const formattedValue = value / units.unit;
    const formattedCurrency = formatMoneyWithPrecision(formattedValue, 2);

    // Don't add an extra space when there's no units string to display
    const longLabel = units.unit > 1 ? ` ${startCase(units.longLabel)}` : '';

    return `${formattedCurrency}${longLabel}`;
};

export const formatMoneyWithUnitsShortLabel = (value, decimalPlaces = 1) => {
    if (typeof value !== 'number') return '--';
    // Format the ceiling and current values to be friendly strings
    const units = calculateUnitForSingleValue(value);
    let precision = decimalPlaces;
    // Only reformat at a million or higher
    if (units.unit < unitValues.MILLION) {
        units.unit = 1;
        units.unitLabel = '';
        units.longLabel = '';
        precision = 0;
    }
    const formattedValue = value / units.unit;

    const formattedCurrency = formatMoneyWithPrecision(formattedValue, precision);

    // Don't add an extra space when there's no units string to display
    const unitLabel = units.unit > 1 ? `${startCase(units.unitLabel)}` : '';

    return `${formattedCurrency}${unitLabel}`;
};

const replaceDecimal = new RegExp(/\.|%/g);

const isFormattedZero = (formatted) => {
    const parsed = formatted.replace(replaceDecimal, '');
    return parsed.split('').every((str) => str === '0');
};

const calculatePercentageDefaultConfig = {
    absoluteMin: null
};

export const calculatePercentage = (value, total, returnValue = '--', decimalPlaces = 1, config = calculatePercentageDefaultConfig) => {
    // handles if denominator is zero, or falsy
    if (!total || typeof total !== 'number') return returnValue;
    // handles if numerator is not a number
    if (value !== 0 && typeof value !== 'number') return returnValue;
    const formatted = `${((value / total) * 100).toFixed(decimalPlaces)}%`;
    if (value > 0 && isFormattedZero(formatted) && config?.absoluteMin) {
        return config.absoluteMin;
    }
    return formatted;
};

export const formatNumber = (number) => {
    const options = Object.assign({}, accountingOptions, {
        symbol: ''
    });
    return Accounting.formatMoney(number, options);
};

export const formatNumberWithPrecision = (number, precision) => {
    const options = Object.assign({}, accountingOptions, {
        symbol: '',
        precision
    });
    return Accounting.formatMoney(number, options);
};
