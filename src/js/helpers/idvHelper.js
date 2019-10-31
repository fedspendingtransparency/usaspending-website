/**
  * idvHelper.js
  * Created by Lizzie Salita 2/14/19
  **/

import Axios, { CancelToken } from 'axios';
import kGlobalConstants from 'GlobalConstants';

export const fetchReferencedAwards = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/idvs/awards/',
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

export const fetchReferencedAwardsCounts = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/awards/idvs/awards/count/',
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

export const fetchAwardAmounts = (awardId) => {
    const source = CancelToken.source();
    const parsedAwardId = encodeURI(awardId);
    return {
        promise: Axios.request({
            url: `v2/idvs/amounts/${parsedAwardId}/`,
            baseURL: kGlobalConstants.API,
            method: 'get',
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

// Fetch IDV Award Federal Account Funding Data
export const fetchAwardFedAccountFunding = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/idvs/funding/',
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

export const fetchIdvFundingSummary = (awardId) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/idvs/funding_rollup/',
            baseURL: kGlobalConstants.API,
            method: "post",
            data: { award_id: awardId },
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const fetchIdvDownloadFile = (awardId) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/download/idv/',
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

export const fetchIdvFederalAccounts = (data) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/idvs/accounts/',
            baseURL: kGlobalConstants.API,
            method: 'post',
            data,
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const fetchIdvActivity = (data) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/idvs/activity/',
            baseURL: kGlobalConstants.API,
            method: 'post',
            data,
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};
