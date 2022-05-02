/**
 * downloadHelper.js
 * Created by Kevin Li 5/8/17
 */

import moment from 'moment';

import { apiRequest } from './apiRequest';

export const requestFullDownload = (params, type) => apiRequest({
    url: `v2/download/${type}/`,
    method: 'post',
    data: params
});

export const requestFullDownloadRecipient = (params) => apiRequest({
    url: 'v2/download/disaster/recipients',
    method: 'post',
    data: params
});

export const requestDownloadStatus = (params) => apiRequest({
    url: 'v2/download/status/',
    params
});

export const requestDownloadCount = (params) => apiRequest({
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

export const getLatestSubmissionPeriodInFy = (fy, availablePeriods) => availablePeriods
    .filter((period) => period.submission_fiscal_year === parseInt(fy, 10))
    .filter((period) => moment(period.submission_reveal_date).isSameOrBefore(moment()))
    .reduce((acc, latestPeriod) => {
        if (acc.period < latestPeriod.submission_fiscal_month) {
            return {
                period: latestPeriod.submission_fiscal_month
            };
        }
        return acc;
    }, { period: 0 });
