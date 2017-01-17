/**
* AgencyQuery.js
* Created by Emily Gullo
**/

import _ from 'lodash';

export const buildAwardingAgencyQuery = (values) => {
    let valueSet = [];

    values.forEach((agencyArray) => {
        valueSet = _.concat(valueSet, agencyArray);
    });

    const filter = {
        field: ["awarding_agency__subtier_agency__name"],
        operation: "in",
        value: valueSet
    };

    return filter;
};

export const buildFundingAgencyQuery = (values) => {
    let valueSet = [];

    values.forEach((agencyArray) => {
        valueSet = _.concat(valueSet, agencyArray);
    });

    const filter = {
        field: ["funding_agency__subtier_agency__name"],
        operation: "in",
        value: valueSet
    };

    return filter;
};
