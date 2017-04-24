/**
 * Created by michaelbray on 3/2/17.
 */

import * as FilterFields from 'dataMapping/search/filterFields';
/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other queries
export const buildAwardIDQuery = (awardIDs, searchContext = 'award') => {
    const field = FilterFields[`${searchContext}Fields`].awardId;

    const awardIDSet = [];

    // Push IDs of selected Awards
    awardIDs.forEach((awardID) => {
        awardIDSet.push(awardID.id);
    });

    const filter = {
        field,
        operation: "in",
        value: awardIDSet
    };

    return filter;
};
/* eslint-enable import/prefer-default-export */
