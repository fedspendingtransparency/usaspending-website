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

export const fetchNewAwardsOverTime = (params) => apiRequest({
    isMocked: true,
    url: 'v2/disaster/new_awards_over_time/',
    method: 'post',
    data: params
});
