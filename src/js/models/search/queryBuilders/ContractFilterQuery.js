/**
 * Created by Emily Gullo on 6/27/2017
 */

import * as FilterFields from 'dataMapping/search/filterFields';

export const buildPricingTypeQuery = (pricingTypes) => {
    const pricingTypeSet = [];

    pricingTypes.forEach((type) => {
        pricingTypeSet.push(type);
    });

    const filterField = FilterFields.awardFields.pricingType;

    const filter = {
        field: filterField,
        operation: "in",
        value: pricingTypeSet
    };

    return filter;
};

export const buildSetAsideQuery = (setAsides) => {
    const setAsideTypeSet = [];

    setAsides.forEach((type) => {
        setAsideTypeSet.push(type);
    });

    const filterField = FilterFields.awardFields.setAside;

    const filter = {
        field: filterField,
        operation: "in",
        value: setAsideTypeSet
    };

    return filter;
};

export const buildExtentCompetedQuery = (extendCompeted) => {
    const extentCompetedTypeSet = [];

    extendCompeted.forEach((type) => {
        extentCompetedTypeSet.push(type);
    });

    const filterField = FilterFields.awardFields.extentCompeted;

    const filter = {
        field: filterField,
        operation: "in",
        value: extentCompetedTypeSet
    };

    return filter;
};
