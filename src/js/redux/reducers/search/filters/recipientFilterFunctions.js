/**
 * Created by michaelbray on 2/17/17.
 */

import { sortBy } from 'lodash';
import { Set } from 'immutable';

export const updateSelectedRecipients = (state, value) => {
    let updatedSet = state;

    const agencyIdentifier = `${value.legal_entity_id}`; // force it to a string

    if (updatedSet.has(agencyIdentifier)) {
        updatedSet = updatedSet.delete(agencyIdentifier);
    }
    else {
        updatedSet = updatedSet.set(agencyIdentifier, value);
    }

    return updatedSet;
};

export const updateSelectedRecipientLocations = (state, value) => {
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

export const immutableSetToggle = (set, value) => {
    // as an ImmutableJS set, any modifications to the set creates a new instance
    // this will hold the new instance
    let updatedSet;
    // check to see if the value currently exists within the set
    if (set.includes(value)) {
        // it exists, so remove it from the set
        updatedSet = set.delete(value);
    }
    else {
        // it doesn't exist, so add it to the set
        updatedSet = set.add(value);
    }
    // return the new instance with updated values
    return updatedSet;
};

export const bulkRecipientTypeChange = (state, values, direction) => {
    let updatedSet = new Set(state);

    values.forEach((value) => {
        if (updatedSet.includes(value) && direction === 'remove') {
            // item exists but we want to deselect everything
            // so remove it
            updatedSet = updatedSet.delete(value);
        }
        else if (!updatedSet.includes(value) && direction === 'add') {
            // item doesn't exist but we want to add everything
            // so include it
            updatedSet = updatedSet.add(value);
        }
    });

    return updatedSet;
};
