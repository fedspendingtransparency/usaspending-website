/**
 * programSourceHelper.js
 * Created by Lizzie Salita 7/22/19
 **/

import { apiRequest } from './apiRequest';

export const fetchAIDs = (params) => apiRequest({
    url: 'v2/autocomplete/accounts/aid/',
    method: 'post',
    data: params
});

export const fetchATAs = (params) => apiRequest({
    url: 'v2/autocomplete/accounts/ata/',
    method: 'post',
    data: params
});

export const fetchBPOAs = (params) => apiRequest({
    url: 'v2/autocomplete/accounts/bpoa/',
    method: 'post',
    data: params
});

export const fetchEPOAs = (params) => apiRequest({
    url: 'v2/autocomplete/accounts/epoa/',
    method: 'post',
    data: params
});

export const fetchMAINs = (params) => apiRequest({
    url: 'v2/autocomplete/accounts/main/',
    method: 'post',
    data: params
});

export const fetchSUBs = (params) => apiRequest({
    url: 'v2/autocomplete/accounts/sub/',
    method: 'post',
    data: params
});

export const fetchAs = (params) => apiRequest({
    url: 'v2/autocomplete/accounts/a/',
    method: 'post',
    data: params
});
