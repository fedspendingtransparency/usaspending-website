/**
 * explorerHelper.js
 * Created by Kevin Li 8/16/17
 */

import { apiRequest } from './apiRequest';

// eslint-disable-next-line import/prefer-default-export
export const fetchBreakdown = (params) => apiRequest({
    url: 'v2/spending/',
    method: 'post',
    data: params
});
