/**
 * Created by michaelbray on 12/12/16.
 */

import { sortBy } from 'lodash';

/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other query modules
export const updateSelectedLocations = (state, value) => {
    let updatedSet = state;
    // generate an identifier string based on matched IDs and place name
    const locationIdentifier =
        `${sortBy(value.matched_ids).join(',')}_${value.place}_${value.place_type}`;

    if (updatedSet.has(locationIdentifier)) {
        updatedSet = updatedSet.delete(locationIdentifier);
    }
    else {
        const locationObject = Object.assign({}, value, {
            identifier: locationIdentifier
        });
        updatedSet = updatedSet.set(locationIdentifier, locationObject);
    }

    return updatedSet;
};
/* eslint-enable import/prefer-default-export */
