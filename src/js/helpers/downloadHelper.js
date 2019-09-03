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
            baseURL: "http://localhost:5000/api/",
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            data: { award_id: "ASST_NON_12FA00PY52375933_12D2" },
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
            baseURL: "http://localhost:5000/api/",
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            data: { award_id: "CONT_AWD_UZ02_9700_SPM2DV11D9200_9700" },
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const fetchAwardDownloadFile = (awardType, awardId) => {
    console.log("awardType", awardType);
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
