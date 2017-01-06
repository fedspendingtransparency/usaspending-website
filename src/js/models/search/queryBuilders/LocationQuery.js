/**
* LocationQuery.js
* Created by Emily Gullo
**/

import _ from 'lodash';

export const buildLocationQuery = (values) => {
    let valueSet = [];

    // Concatenate Matched IDs of selected locations
    // Duplicates do not matter in API query
    values.forEach((locArray) => {
        valueSet = _.concat(valueSet, locArray.matched_ids);
    });

    const filter = {
        field: "recipient__location__location_id",
        operation: "in",
        value: valueSet
    };

    return filter;
};

export const buildDomesticForeignQuery = (selection) => {
    let op = 'equals';
    if (selection === 'foreign') {
        op = 'not_equals';
    }

    const filter = {
        field: 'recipient__location__location_country_code',
        operation: op,
        value: 'USA'
    };

    return filter;
};
