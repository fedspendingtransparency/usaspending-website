/**
 * Created by michaelbray on 3/2/17.
 */

const awardsAwardIDField = 'id';
const transactionsAwardIDField = 'award_id';

/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other queries
export const buildAwardIDQuery = (awardIDs, endpointType) => {
    const awardIDField = endpointType === 'awards' ? awardsAwardIDField : transactionsAwardIDField;

    const awardIDSet = [];

    // Push IDs of selected Awards
    awardIDs.forEach((awardID) => {
        awardIDSet.push(awardID.id);
    });

    const filter = {
        field: awardIDField,
        operation: "in",
        value: awardIDSet
    };

    return filter;
};
/* eslint-enable import/prefer-default-export */
