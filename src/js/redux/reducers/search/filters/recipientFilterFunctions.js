/**
 * Created by michaelbray on 2/17/17.
 */

export const updateSelectedRecipients = (state, value) => {
    let updatedSet = state;

    const agencyIdentifier = `${value.recipient_unique_id}`;

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
        `${_.sortBy(value.matched_ids).join(',')}_${value.place}_${value.place_type}`;

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