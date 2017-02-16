/**
* LocationQuery.js
* Created by Emily Gullo
**/

import _ from 'lodash';

const locationIdField = 'place_of_performance__location_id';
const countryCodeField = 'place_of_performance__location_country_code';

export const buildLocationQuery = (values) => {
    let valueSet = [];

    // Concatenate Matched IDs of selected locations
    // Duplicates do not matter in API query
    values.forEach((locArray) => {
        valueSet = _.concat(valueSet, locArray.matched_ids);
    });

    const filter = {
        field: locationIdField,
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
        field: countryCodeField,
        operation: op,
        value: 'USA'
    };

    return filter;
};
