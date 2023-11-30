/**
 * downloadHelper.js
 * Created by Kevin Li 5/8/17
 */
import { apiRequest } from './apiRequest';

const dayjs = require('dayjs');
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');

dayjs.extend(isSameOrBefore);
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
    .filter((period) => dayjs(period.submission_reveal_date).isSameOrBefore(dayjs()))
    .reduce((acc, latestPeriod) => {
        if (acc.period < latestPeriod.submission_fiscal_month) {
            return {
                period: latestPeriod.submission_fiscal_month
            };
        }
        return acc;
    }, { period: 0 });
