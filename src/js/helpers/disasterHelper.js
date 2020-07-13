/**
 * disasterHelper.js
 * Created by Jonathan Hill 06/11/20
 */

import { apiRequest } from 'helpers/apiRequest';

export const fetchDEFCodes = () => apiRequest({
    url: 'v2/references/def_codes/'
});

export const fetchOverview = () => apiRequest({
    url: 'v2/disaster/overview/'
});

export const fetchRecipientSpendingByGeography = (params) => apiRequest({
    url: 'v2/disaster/spending_by_geography/',
    method: 'post',
    data: params
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

export const fetchLoansByAgency = (params) => apiRequest({
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

export const fetchRecipientCount = (params) => apiRequest({
    url: 'v2/disaster/recipient/count/',
    method: 'post',
    data: params
});

export const fetchCfdaLoans = (params) => apiRequest({
    isMocked: true,
    url: 'v2/disaster/cfda/loans/',
    method: 'post',
    data: params
});

export const fetchDisasterSpending = (type, params) => apiRequest({
    url: `v2/disaster/${type}/spending/`,
    method: 'post',
    data: params
});

export const fetchDisasterSpendingCount = (type, params) => apiRequest({
    url: `v2/disaster/${type}/count/`,
    method: 'post',
    data: params
});

export const fetchLoanSpending = (type, params) => apiRequest({
    url: `v2/disaster/${type}/loans/`,
    method: 'post',
    data: params
});

export const fetchSpendingByRecipient = (params) => apiRequest({
    isMocked: true,
    url: 'v2/disaster/recipient/spending/',
    method: 'post',
    data: params
});

export const fetchRecipientLoans = (params) => apiRequest({
    isMocked: true,
    url: 'v2/disaster/recipient/loans/',
    method: 'post',
    data: params
});
