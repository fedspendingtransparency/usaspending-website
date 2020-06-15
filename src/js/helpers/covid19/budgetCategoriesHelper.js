/**
 * budgetCategoriesHelper.js
 * Created by James Lee 6/10/20
 */

import { apiRequest } from "../apiRequest";

export const fetchDisasterSpending = (type, params) => apiRequest({
    url: `v2/disaster/${type}/spending/`,
    method: 'post',
    data: params,
    isMocked: true
});

export const fetchDisasterSpendingCount = (type, params) => apiRequest({
    url: `v2/disaster/${type}/count/`,
    method: 'post',
    data: params,
    isMocked: true
});

export const fetchDefCodes = () => apiRequest({
    url: `/v2/references/def_codes/`,
    isMocked: true
});

export const fetchLoanSpending = (type, params) => apiRequest({
    url: `v2/disaster/${type}/loans/`,
    method: 'post',
    data: params,
    isMocked: true
});

