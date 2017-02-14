/**
* AgencyQuery.js
* Created by Emily Gullo
**/

import _ from 'lodash';

/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other query modules

export const buildAgencyQuery = (values) => {
    let toptierValueSet = [];
    let subtierValueSet = [];

    values.forEach((agencyArray) => {
        if (agencyArray.agencyType === 'toptier') {
            toptierValueSet = _.concat(toptierValueSet, agencyArray.toptier_agency.name);
        }
        else {
            subtierValueSet = _.concat(subtierValueSet, agencyArray.subtier_agency.name);
        }
    });

    const toptierFilters = {
        field: "funding_agency__toptier_agency__name",
        operation: "in",
        value: toptierValueSet
    };

    const subtierFilters = {
        field: "funding_agency__subtier_agency__name",
        operation: "in",
        value: subtierValueSet
    };

    const filter = {
        combine_method: 'OR',
        filters: [toptierFilters, subtierFilters]
    };

    return filter;
};

/* eslint-enable import/prefer-default-export */
