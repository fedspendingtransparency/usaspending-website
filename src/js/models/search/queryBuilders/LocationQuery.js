/**
* LocationQuery.js
* Created by Emily Gullo
**/

import _ from 'lodash';

/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other query modules
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
/* eslint-enable import/prefer-default-export */
