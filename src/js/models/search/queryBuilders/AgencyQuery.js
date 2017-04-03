/**
* AgencyQuery.js
* Created by Emily Gullo
**/

const fundingAgencyField = 'treasury_account__agency_id';

export const buildAgencyQuery = (funding, awarding) => {
    const toptierFundingSet = [];
    const subtierFundingSet = [];
    const toptierAwardingSet = [];
    const subtierAwardingSet = [];

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
            field: 'funding_agency__toptier_agency__name',
            operation: "in",
            value: toptierFundingSet
        });
    }

    if (subtierFundingSet.length > 0) {
        filter.filters.push({
            field: 'funding_agency__subtier_agency__name',
            operation: "in",
            value: subtierFundingSet
        });
    }

    if (toptierAwardingSet.length > 0) {
        filter.filters.push({
            field: 'awarding_agency__toptier_agency__name',
            operation: "in",
            value: toptierAwardingSet
        });
    }

    if (subtierAwardingSet.length > 0) {
        filter.filters.push({
            field: 'awarding_agency__subtier_agency__name',
            operation: "in",
            value: subtierAwardingSet
        });
    }

    return filter;
};

export const buildFundingAgencyCGACQuery = (funding) => {
    const fundingSet = [];

    funding.forEach((agencyArray) => {
        fundingSet.push(agencyArray.toptier_agency.cgac_code);
    });

    const filter = {
        field: fundingAgencyField,
        operation: "in",
        value: fundingSet
    };

    return filter;
};
