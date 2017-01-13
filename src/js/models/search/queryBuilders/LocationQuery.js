/**
* LocationQuery.js
* Created by Emily Gullo
**/

import _ from 'lodash';

const locationIdField = 'recipient__location__location_id';
const countryCodeField = 'recipient__location__location_country_code';

export const buildLocationQuery = (values, prefix = '') => {
    let valueSet = [];

    // Concatenate Matched IDs of selected locations
    // Duplicates do not matter in API query
    values.forEach((locArray) => {
        valueSet = _.concat(valueSet, locArray.matched_ids);
    });

    const filter = {
        field: `${prefix}${locationIdField}`,
        operation: "in",
        value: valueSet
    };

    return filter;
};

export const buildDomesticForeignQuery = (selection, prefix = '') => {
    let op = 'equals';
    if (selection === 'foreign') {
        op = 'not_equals';
    }

    const filter = {
        field: `${prefix}${countryCodeField}`,
        operation: op,
        value: 'USA'
    };

    return filter;
};
