/**
 * Created by michaelbray on 2/17/17.
 */

import { concat } from 'lodash';

import * as FilterFields from 'dataMapping/search/filterFields';

export const buildRecipientQuery = (recipients, searchContext = 'award') => {
    const recipientSet = [];

    // Push legal_entity_id's of selected recipients
    recipients.forEach((recipient) => {
        recipientSet.push(recipient.legal_entity_id);
    });

    const field = FilterFields[`${searchContext}Fields`].recipientId;

    const filter = {
        field,
        operation: "in",
        value: recipientSet
    };

    return filter;
};

export const buildDomesticForeignQuery = (selection, searchContext = 'award') => {
    let op = 'equals';
    if (selection === 'foreign') {
        op = 'not_equals';
    }

    const field = FilterFields[`${searchContext}Fields`].recipientLocationScope;

    const filter = {
        field,
        operation: op,
        value: 'USA'
    };

    return filter;
};

export const buildRecipientLocationQuery = (locations, searchContext = 'award') => {
    let locationSet = [];

    // Concatenate Matched IDs of selected locations
    // Duplicates do not matter in API query
    locations.forEach((location) => {
        locationSet = concat(locationSet, location.matched_ids);
    });

    const field = FilterFields[`${searchContext}Fields`].recipientLocation;

    const filter = {
        field,
        operation: "in",
        value: locationSet
    };

    return filter;
};

const buildFieldQuery = (field, values) => ({
    field,
    operation: "overlap",
    value: values
});

export const buildRecipientTypeQuery = (recipientType, searchContext = 'award') => {
    let awardQuery = {};

    const fieldName = FilterFields[`${searchContext}Fields`].recipientType;

    awardQuery = buildFieldQuery(fieldName, recipientType);

    return awardQuery;
};
