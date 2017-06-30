/**
 * Created by Emily Gullo on 6/27/2017
 */

import * as FilterFields from 'dataMapping/search/filterFields';

export const buildPricingTypeQuery = (pricingTypes, endpoint) => {
    const pricingTypeSet = [];
    let filterField = null;

    pricingTypes.forEach((type) => {
        pricingTypeSet.push(type);
    });

    if (endpoint === 'award') {
        filterField = FilterFields.awardFields.pricingType;
    }
    if (endpoint === 'tasCategories') {
        filterField = 'contract_data__type_of_contract_pricing';
    }
    if (endpoint === 'transaction') {
        filterField = 'contract_data__type_of_contract_pricing';
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
    let filterField = null;

    setAside.forEach((type) => {
        setAsideSet.push(type);
    });

    if (endpoint === 'award') {
        filterField = FilterFields.awardFields.setAside;
    }
    if (endpoint === 'tasCategories') {
        filterField = 'contract_data__type_set_aside';
    }
    if (endpoint === 'transaction') {
        filterField = 'contract_data__type_set_aside';
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
    let filterField = null;

    extendCompeted.forEach((type) => {
        extentCompetedTypeSet.push(type);
    });

    if (endpoint === 'award') {
        filterField = FilterFields.awardFields.extentCompeted;
    }
    if (endpoint === 'tasCategories') {
        filterField = 'contract_data__extent_competed';
    }
    if (endpoint === 'transaction') {
        filterField = 'contract_data__extent_competed';
    }

    const filter = {
        field: filterField,
        operation: "in",
        value: extentCompetedTypeSet
    };

    return filter;
};
