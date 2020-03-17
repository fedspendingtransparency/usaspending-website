/**
 * downloadHelper.js
 * Created by Kevin Li 5/8/17
 */

import { apiRequest } from './apiRequest';

export const requestFullDownload = (params, type) => apiRequest({
    url: `v2/download/${type}/`,
    method: 'post',
    data: params
});

export const requestDownloadStatus = (params) => apiRequest({
    url: 'v2/download/status/',
    params
});

export const requestDownloadCount = (params) => apiRequest({
    isMocked: true,
    url: 'v2/download/count/',
    method: 'post',
    data: params
});

export const fetchAssistanceDownloadFile = (awardId) => apiRequest({
    url: 'v2/download/assistance/',
    method: 'post',
    headers: {
        "content-type": "application/json"
    },
    data: { award_id: awardId }
});

export const fetchContractDownloadFile = (awardId) => apiRequest({
    url: 'v2/download/contract/',
    method: 'post',
    headers: {
        "content-type": "application/json"
    },
    data: { award_id: awardId }
});

export const fetchIdvDownloadFile = (awardId) => apiRequest({
    url: 'v2/download/idv/',
    method: 'post',
    headers: {
        "content-type": "application/json"
    },
    data: { award_id: awardId }
});
