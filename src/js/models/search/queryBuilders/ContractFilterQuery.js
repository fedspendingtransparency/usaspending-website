/**
 * Created by Emily Gullo on 6/27/2017
 */

import * as FilterFields from 'dataMapping/search/filterFields';

export const buildPricingTypeQuery = (pricingTypes, endpoint) => {
    const pricingTypeSet = [];
    let filterField = FilterFields.awardFields.pricingType;

    pricingTypes.forEach((type) => {
        pricingTypeSet.push(type);
    });

    if (endpoint !== 'award') {
        filterField = FilterFields.accountAwardsFields.pricingType;
    }

    const filter = {
        field: filterField,
        operation: "in",
        value: pricingTypeSet
    };

    return filter;
};

export const buildSetAsideQuery = (setAside, endpoint) => {
    const setAsideSet = [];

    let filterField = FilterFields.awardFields.setAside;

    setAside.forEach((type) => {
        setAsideSet.push(type);
    });

    if (endpoint !== 'award') {
        filterField = FilterFields.accountAwardsFields.setAside;
    }

    const filter = {
        field: filterField,
        operation: "in",
        value: setAsideSet
    };

    return filter;
};

export const buildExtentCompetedQuery = (extendCompeted, endpoint) => {
    const extentCompetedTypeSet = [];

    let filterField = FilterFields.awardFields.extentCompeted;

    extendCompeted.forEach((type) => {
        extentCompetedTypeSet.push(type);
    });

    if (endpoint !== 'award') {
        filterField = FilterFields.accountAwardsFields.extentCompeted;
    }

    const filter = {
        field: filterField,
        operation: "in",
        value: extentCompetedTypeSet
    };

    return filter;
};
