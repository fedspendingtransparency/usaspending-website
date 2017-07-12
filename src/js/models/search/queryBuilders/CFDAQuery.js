/**
 * Created by Emily Gullo 07/12/2017
 */

import * as FilterFields from 'dataMapping/search/filterFields';
/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other queries
export const buildCFDAQuery = (cfdas, searchContext = 'award') => {
    const field = FilterFields[`${searchContext}Fields`].cfda;

    const cfdaSet = [];

    // Push IDs of selected Awards
    cfdas.forEach((cfda) => {
        cfdaSet.push(cfda.id);
    });

    const filter = {
        field,
        operation: "in",
        value: cfdaSet
    };

    return filter;
};
/* eslint-enable import/prefer-default-export */
