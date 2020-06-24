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

export const recipientMapHelper = (params) => apiRequest({
    url: '/api/v2/disaster/spending_by_geography/',
    params,
    method: 'post'
});
