/**
 * Created by michaelbray on 2/17/17.
 */

import _ from 'lodash';

const recipientIdField = 'recipient__legal_entity_id';
const countryCodeField = 'recipient__location__location_country_code';
const locationIdField = 'recipient__location__location_id';

export const buildRecipientQuery = (recipients) => {
    const recipientSet = [];

    // Push legal_entity_id's of selected recipients
    recipients.forEach((recipient) => {
        recipientSet.push(recipient.legal_entity_id);
    });

    const filter = {
        field: recipientIdField,
        operation: "in",
        value: recipientSet
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

export const buildRecipientLocationQuery = (locations) => {
    let locationSet = [];

    // Concatenate Matched IDs of selected locations
    // Duplicates do not matter in API query
    locations.forEach((location) => {
        locationSet = _.concat(locationSet, location.matched_ids);
    });

    const filter = {
        field: locationIdField,
        operation: "in",
        value: locationSet
    };

    return filter;
};
