/**
 * Created by Emily Gullo 07/12/2017
 */

import * as FilterFields from 'dataMapping/search/filterFields';

export const buildCFDAQuery = (cfdaGroup, searchContext = 'award') => {
    const field = FilterFields[`${searchContext}Fields`].cfda;

    const cfdaSet = [];

    // Push IDs of selected Awards
    cfdaGroup.forEach((cfda) => {
        cfdaSet.push(cfda.id);
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
        naicsSet.push(naics.id);
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
        pscSet.push(psc.id);
    });

    const filter = {
        field,
        operation: "in",
        value: pscSet
    };

    return filter;
};
