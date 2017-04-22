/**
* AgencyQuery.js
* Created by Emily Gullo
**/

import * as FilterFields from 'dataMapping/search/filterFields';

const fundingAgencyField = 'agency_id';

const tasPrefix = 'treasury_account__';
const appropriationsPrefix = 'treasury_account_identifier__';
const fileCPrefix = 'award__financial_set__';

export const buildAgencyQuery = (funding, awarding, searchContext = 'award') => {
    const toptierFundingSet = [];
    const subtierFundingSet = [];
    const toptierAwardingSet = [];
    const subtierAwardingSet = [];

    const fields = FilterFields[`${searchContext}Fields`];
    const fundingField = fields.fundingAgency;
    const awardingField = fields.awardingAgency;

    const filter = {
        combine_method: 'OR',
        filters: []
    };

    funding.forEach((agencyArray) => {
        if (agencyArray.agencyType === 'toptier') {
            toptierFundingSet.push(agencyArray.toptier_agency.name);
        }
        else {
            subtierFundingSet.push(agencyArray.subtier_agency.name);
        }
    });

    awarding.forEach((agencyArray) => {
        if (agencyArray.agencyType === 'toptier') {
            toptierAwardingSet.push(agencyArray.toptier_agency.name);
        }
        else {
            subtierAwardingSet.push(agencyArray.subtier_agency.name);
        }
    });

    if (toptierFundingSet.length > 0) {
        filter.filters.push({
            field: fundingField.toptier,
            operation: "in",
            value: toptierFundingSet
        });
    }

    if (subtierFundingSet.length > 0) {
        filter.filters.push({
            field: fundingField.subtier,
            operation: "in",
            value: subtierFundingSet
        });
    }

    if (toptierAwardingSet.length > 0) {
        filter.filters.push({
            field: awardingField.toptier,
            operation: "in",
            value: toptierAwardingSet
        });
    }

    if (subtierAwardingSet.length > 0) {
        filter.filters.push({
            field: awardingField.subtier,
            operation: "in",
            value: subtierAwardingSet
        });
    }

    return filter;
};

export const buildFundingAgencyCGACQuery = (funding, requestType) => {
    const fundingSet = [];

    funding.forEach((agencyArray) => {
        fundingSet.push(agencyArray.toptier_agency.cgac_code);
    });

    let agencyField = '';

    if (requestType === 'fileC') {
        agencyField = `${fileCPrefix}${tasPrefix}${fundingAgencyField}`;
    }
    else if (requestType === 'appropriations') {
        agencyField = `${appropriationsPrefix}${fundingAgencyField}`;
    }
    else {
        agencyField = `${tasPrefix}${fundingAgencyField}`;
    }

    const filter = {
        field: agencyField,
        operation: "in",
        value: fundingSet
    };

    return filter;
};

export const buildFundingAgencyTASQuery = (funding, searchContext = 'tasCategories') => {
    const fundingSet = [];

    funding.forEach((agencyArray) => {
        fundingSet.push(agencyArray.toptier_agency.cgac_code);
    });

    const field = FilterFields[`${searchContext}Fields`].fundingAgency;

    const filter = {
        field,
        operation: "in",
        value: fundingSet
    };

    return filter;
};

