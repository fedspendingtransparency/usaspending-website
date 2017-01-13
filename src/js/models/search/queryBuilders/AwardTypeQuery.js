/**
  * AwardTypeQuery.js
  * Created by Kevin Li 11/7/16
  **/

import { awardTypeGroups } from 'dataMapping/search/awardType';

const contractValues = new Set(awardTypeGroups.contracts);
const contractFieldName = 'procurement__contract_award_type';
const otherFieldName = 'type';

const buildFieldQuery = (field, values) => ({
    field,
    operation: 'in',
    value: values
});

const buildCompoundQuery = (contracts, other, prefix = '') => ({
    combine_method: 'OR',
    filters: [
        buildFieldQuery(`${prefix}${contractFieldName}`, contracts),
        buildFieldQuery(`${prefix}${otherFieldName}`, other)
    ]
});

export const buildQuery = (awardType, prefix = '') => {
    let awardQuery = {};

    // break the filters into two categories, contract and other
    // (these use different search fields)
    const contractFilters = [];
    const otherFilters = [];

    // iterate through each award type and add it to the appropriate array
    awardType.forEach((award) => {
        if (contractValues.has(award)) {
            contractFilters.push(award);
        }
        else {
            otherFilters.push(award);
        }
    });

    if (contractFilters.length > 0 && otherFilters.length > 0) {
        awardQuery = buildCompoundQuery(contractFilters, otherFilters, prefix);
    }
    else if (contractFilters.length > 0) {
        awardQuery = buildFieldQuery(`${prefix}${contractFieldName}`, contractFilters);
    }
    else {
        awardQuery = buildFieldQuery(`${prefix}${otherFieldName}`, otherFilters);
    }

    return awardQuery;
};
