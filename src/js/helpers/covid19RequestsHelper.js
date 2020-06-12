/**
 * covid19RequestsHelper.js
 * Created By Lizzie Salita 6/10/20
 */

import { apiRequest } from './apiRequest';

export const fetchOverview = () => apiRequest({
    isMocked: true,
    url: 'v2/disaster/overview/'
});

export const fetchSpendingOverTime = (params) => apiRequest({
    isMocked: true,
    url: 'v2/disaster/spending_over_time/',
    method: 'post',
    data: params
});

export const fetchNewAwardsCount = (params) => apiRequest({
    isMocked: true,
    url: 'v2/disaster/new_award/count/',
    method: 'post',
    data: params
});
