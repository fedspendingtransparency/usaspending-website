/**
 * agencyHelper.js
 * Created by James Lee 6/10/20
 */

import { apiRequest } from '../apiRequest';

export const fetchDisasterSpending = (type, params) => apiRequest({
    url: `v2/disaster/${type}/spending/`,
    method: 'post',
    data: params
});

export const fetchDisasterSpendingCount = (type, params) => apiRequest({
    url: `v2/disaster/${type}/spending/count/`,
    method: 'post',
    data: params
});

export const fetchDefCodes = () => apiRequest({
    url: `/v2/references/def_codes/`
});

