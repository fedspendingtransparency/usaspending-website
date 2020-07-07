/**
 * disasterHelper.js
 * Created by Jonathan Hill 06/11/20
 */

import { apiRequest } from 'helpers/apiRequest';

const defCodeQueryString = (defCodes) => defCodes.reduce((acc, code, i, array) => {
    let currentString = acc;
    currentString += code;
    if (i + 1 !== array.length) currentString += ',';
    return currentString;
}, '');

export const fetchDEFCodes = () => apiRequest({
    url: 'v2/references/def_codes/'
});

export const fetchOverview = (defCodes) => apiRequest({
    url: defCodes ? `v2/disaster/overview/?def_codes=${defCodeQueryString(defCodes)}` : 'v2/disaster/overview/'
});

export const recipientMapHelper = (params) => apiRequest({
    url: '/api/v2/disaster/spending_by_geography/',
    params,
    method: 'post'
});

export const fetchSpendingOverTime = (params) => apiRequest({
    isMocked: true,
    url: 'v2/disaster/spending_over_time/',
    method: 'post',
    data: params
});

export const fetchAgencyCount = (params) => apiRequest({
    isMocked: true,
    url: 'v2/disaster/agency/count/',
    method: 'post',
    data: params
});

export const fetchAwardSpendingByAgency = (params) => apiRequest({
    isMocked: true,
    url: 'v2/disaster/agency/spending/',
    method: 'post',
    data: params
});

export const fetchFaceValueOfLoansByAgency = (params) => apiRequest({
    isMocked: true,
    url: 'v2/disaster/agency/loans/',
    method: 'post',
    data: params
});

export const fetchNewAwardsCount = (params) => apiRequest({
    isMocked: true,
    url: 'v2/disaster/new_award/count/',
    method: 'post',
    data: params
});

export const fetchAwardAmounts = (params) => apiRequest({
    isMocked: true,
    url: 'v2/disaster/award/amount/',
    method: 'post',
    data: params
});

export const fetchNewAwardsOverTime = (params) => apiRequest({
    isMocked: true,
    url: 'v2/disaster/new_awards_over_time/',
    method: 'post',
    data: params
});

export const fetchAwardCount = (params) => apiRequest({
    isMocked: true,
    url: 'v2/disaster/award/count/',
    method: 'post',
    data: params
});

export const fetchCfdaCount = (params) => apiRequest({
    isMocked: true,
    url: 'v2/disaster/cfda/count/',
    method: 'post',
    data: params
});

export const fetchSpendingByCfda = (params) => apiRequest({
    isMocked: true,
    url: 'v2/disaster/cfda/spending/',
    method: 'post',
    data: params
});

export const fetchCfdaLoans = (params) => apiRequest({
    isMocked: true,
    url: 'v2/disaster/cfda/loans/',
    method: 'post',
    data: params
});
