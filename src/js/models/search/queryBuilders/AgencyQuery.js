/**
* AgencyQuery.js
* Created by Emily Gullo
**/

import _ from 'lodash';

export const buildAwardingAgencyQuery = (values) => {
    let valueSet = [];

    values.forEach((agencyArray) => {
        valueSet = _.concat(valueSet, agencyArray.id);
    });

    const filter = {
        field: "awarding_agency__id",
        operation: "in",
        value: valueSet
    };

    return filter;
};

export const buildFundingAgencyQuery = (values) => {
    let valueSet = [];

    values.forEach((agencyArray) => {
        valueSet = _.concat(valueSet, agencyArray.id);
    });

    const filter = {
        field: "funding_agency__id",
        operation: "in",
        value: valueSet
    };

    return filter;
};
