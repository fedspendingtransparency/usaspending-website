/**
  * naicsHelper.js
  * Created by Jonathan Hill 10/03/2019
  **/

import { apiRequest } from './apiRequest';

// perform search is a cancellable promise
// eslint-disable-next-line import/prefer-default-export
export const naicsRequest = (param) => apiRequest({
    url: 'v2/references/naics/',
    param
});

export const emptyHierarchy = {
    base_code: {},
    midtier_code: {},
    subtier_code: {},
    toptier_code: {}
};

const getPscTypeByToptierCode = (toptierCode) => {
    // Undefined toptierCode code is always a product
    if (toptierCode === undefined) return 'PRODUCTS';

    const topTierCodeAsInt = parseInt(toptierCode, 10);
    if (isNaN(topTierCodeAsInt)) {
        if (toptierCode && toptierCode[0].toUpperCase() === 'A') {
            return 'RESEARCH AND DEVELOPMENT';
        }
        // all letters other than 'A' are services
        return 'SERVICES';
    }
    // all numbers are PRODUCTS
    return 'PRODUCTS';
};

export const deducePscType = (acc, keyValueArray) => {
    const [key, value] = keyValueArray;
    const description = getPscTypeByToptierCode(value.code);
    if (key === 'toptier_code') {
        const pscType = { code: "--", description };
        if (description === 'RESEARCH AND DEVELOPMENT') {
            // replace toptier_code w/ psc type
            return { ...acc, pscType };
        }
        return { ...acc, pscType, [key]: value };
    }
    return { ...acc, [key]: value };
};
