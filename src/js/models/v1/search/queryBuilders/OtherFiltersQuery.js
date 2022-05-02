/**
 * Created by Emily Gullo 07/12/2017
 */

import * as FilterFields from 'dataMapping/search/filterFields';

export const buildCFDAQuery = (cfdaGroup, searchContext = 'award') => {
    const field = FilterFields[`${searchContext}Fields`].cfdaNumber;
    const cfdaSet = [];

    // Push IDs of selected Awards
    cfdaGroup.forEach((cfda) => {
        cfdaSet.push(cfda.program_number);
    });

    const filter = {
        field,
        operation: "in",
        value: cfdaSet
    };

    return filter;
};

export const buildNAICSQuery = (naicsGroup, searchContext = 'award') => {
    const field = FilterFields[`${searchContext}Fields`].naics;

    const naicsSet = [];

    // Push IDs of selected Awards
    naicsGroup.forEach((naics) => {
        naicsSet.push(naics.naics);
    });

    const filter = {
        field,
        operation: "in",
        value: naicsSet
    };

    return filter;
};

export const buildPSCQuery = (pscGroup, searchContext = 'award') => {
    const field = FilterFields[`${searchContext}Fields`].psc;

    const pscSet = [];

    // Push IDs of selected Awards
    pscGroup.forEach((psc) => {
        pscSet.push(psc.product_or_service_code);
    });

    const filter = {
        field,
        operation: "in",
        value: pscSet
    };

    return filter;
};

export const buildPricingTypeQuery = (pricingTypes, searchContext = 'award') => {
    const pricingTypeSet = [];
    const filterField = FilterFields[`${searchContext}Fields`].pricingType;

    pricingTypes.forEach((type) => {
        pricingTypeSet.push(type);
    });

    const filter = {
        field: filterField,
        operation: "in",
        value: pricingTypeSet
    };

    return filter;
};

export const buildSetAsideQuery = (setAside, searchContext = 'award') => {
    const setAsideSet = [];

    const filterField = FilterFields[`${searchContext}Fields`].setAside;

    setAside.forEach((type) => {
        setAsideSet.push(type);
    });

    const filter = {
        field: filterField,
        operation: "in",
        value: setAsideSet
    };

    return filter;
};

export const buildExtentCompetedQuery = (extendCompeted, searchContext = 'award') => {
    const extentCompetedTypeSet = [];

    const filterField = FilterFields[`${searchContext}Fields`].extentCompeted;

    extendCompeted.forEach((type) => {
        extentCompetedTypeSet.push(type);
    });

    const filter = {
        field: filterField,
        operation: "in",
        value: extentCompetedTypeSet
    };

    return filter;
};
