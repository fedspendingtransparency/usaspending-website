/**
* AgencyQuery.js
* Created by Emily Gullo
**/

import * as FilterFields from 'dataMapping/search/filterFields';

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

export const buildFundingAgencyTASQuery = (funding, searchContext = 'tasCategories') => {
    const fundingSet = [];

    funding.forEach((agencyArray) => {
        fundingSet.push(agencyArray.toptier_agency.toptier_code);
    });

    const field = FilterFields[`${searchContext}Fields`].fundingAgency;
    const frecField = FilterFields[`${searchContext}Fields`].fundingAgencyFREC;

    const filter = {
        combine_method: 'OR',
        filters: [
            {
                field,
                operation: "in",
                value: fundingSet
            },
            {
                field: frecField,
                operation: "in",
                value: fundingSet
            }
        ]
    };

    return filter;
};
