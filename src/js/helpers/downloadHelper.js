/**
 * downloadHelper.js
 * Created by Kevin Li 5/8/17
 */

import Axios, { CancelToken } from 'axios';

import kGlobalConstants from 'GlobalConstants';
import { fetchIdvDownloadFile } from './idvHelper';
import { financialAssistanceAwardTypes } from '../dataMapping/awardsv2/awardTypes';

export const requestAwardTable = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v1/download/awards/',
            baseURL: kGlobalConstants.API,
            method: 'post',
            data: params,
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const requestFullDownload = (params, type) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: `v2/download/${type}/`,
            baseURL: kGlobalConstants.API,
            method: 'post',
            data: params,
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const requestDownloadStatus = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/download/status/',
            baseURL: kGlobalConstants.API,
            method: 'get',
            params,
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const requestDownloadCount = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/download/count/',
            baseURL: kGlobalConstants.API,
            method: 'post',
            data: params,
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const fetchAssistanceDownloadFile = (awardId) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/download/assistance/',
            baseURL: kGlobalConstants.API,
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            data: { award_id: awardId },
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const fetchContractDownloadFile = (awardId) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/download/contract/',
            baseURL: kGlobalConstants.API,
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            data: { award_id: awardId },
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const fetchAwardDownloadFile = (awardType, awardId) => {
    if (financialAssistanceAwardTypes.includes(awardType)) {
        return fetchAssistanceDownloadFile(awardId);
    }
    else if (awardType === 'idv') {
        return fetchIdvDownloadFile(awardId);
    }
    else if (awardType === 'contract') {
        return fetchContractDownloadFile(awardId);
    }
};
