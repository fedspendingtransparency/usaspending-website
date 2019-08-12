/**
 * programSourceHelper.js
 * Created by Lizzie Salita 7/22/19
 **/

import Axios, { CancelToken } from 'axios';
import kGlobalConstants from 'GlobalConstants';

export const fetchAIDs = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/autocomplete/accounts/aid/',
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

export const fetchATAs = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/autocomplete/accounts/ata/',
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

export const fetchBPOAs = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/autocomplete/accounts/bpoa/',
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

export const fetchEPOAs = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/autocomplete/accounts/epoa/',
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

export const fetchMAINs = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/autocomplete/accounts/main/',
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

export const fetchSUBs = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/autocomplete/accounts/sub/',
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

export const fetchAs = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/autocomplete/accounts/a/',
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
