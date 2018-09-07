/**
 * explorerHelper.js
 * Created by Kevin Li 8/16/17
 */

import Axios, { CancelToken } from 'axios';

import kGlobalConstants from 'GlobalConstants';

export const fetchBreakdown = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/spending/',
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

export const fetchFederalAccount = (id) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: `v1/federal_accounts/${id}/`,
            baseURL: kGlobalConstants.API,
            method: 'get',
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};
