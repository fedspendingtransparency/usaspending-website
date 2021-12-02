/**
* LocationQuery.js
* Created by Emily Gullo
**/

import { concat } from 'lodash';

import * as FilterFields from 'dataMapping/search/filterFields';

export const buildLocationQuery = (values, searchContext = 'award') => {
    let valueSet = [];

    // Concatenate Matched IDs of selected locations
    // Duplicates do not matter in API query
    values.forEach((locArray) => {
        valueSet = concat(valueSet, locArray.matched_ids);
    });

    const field = FilterFields[`${searchContext}Fields`].location;

    const filter = {
        field,
        operation: "in",
        value: valueSet
    };

    return filter;
};

export const buildDomesticForeignQuery = (selection, searchContext = 'award') => {
    let op = 'equals';
    if (selection === 'foreign') {
        op = 'not_equals';
    }

    const field = FilterFields[`${searchContext}Fields`].locationScope;

    const filter = {
        field,
        operation: op,
        value: 'USA'
    };

    return filter;
};
