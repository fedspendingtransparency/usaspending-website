/**
* AgencyQuery.js
* Created by Emily Gullo
**/

import _ from 'lodash';

/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other query modules

export const buildAgencyQuery = (funding, awarding) => {
    let toptierFundingSet = [];
    let subtierFundingSet = [];
    let toptierAwardingSet = [];
    let subtierAwardingSet = [];

    funding.forEach((agencyArray) => {
        if (agencyArray.agencyType === 'toptier') {
            toptierFundingSet = _.concat(toptierFundingSet, agencyArray.toptier_agency.name);
        }
        else {
            subtierFundingSet = _.concat(subtierFundingSet, agencyArray.subtier_agency.name);
        }
    });

    awarding.forEach((agencyArray) => {
        if (agencyArray.agencyType === 'toptier') {
            toptierAwardingSet = _.concat(toptierAwardingSet, agencyArray.toptier_agency.name);
        }
        else {
            subtierAwardingSet = _.concat(subtierAwardingSet, agencyArray.subtier_agency.name);
        }
    });

    const filter = {
        combine_method: 'OR',
        filters: [
            {
                field: 'funding_agency__toptier_agency__name',
                operation: "in",
                value: toptierFundingSet
            },
            {
                field: 'funding_agency__subtier_agency__name',
                operation: "in",
                value: subtierFundingSet
            },
            {
                field: 'awarding_agency__toptier_agency__name',
                operation: "in",
                value: toptierAwardingSet
            },
            {
                field: 'awarding_agency__subtier_agency__name',
                operation: "in",
                value: subtierAwardingSet
            }]
    };

    return filter;
};

/* eslint-enable import/prefer-default-export */
