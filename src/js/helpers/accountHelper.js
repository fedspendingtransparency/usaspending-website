/**
 * accountHelper.js
 * Created by Kevin Li 3/24/17
 */

import Axios, { CancelToken } from 'axios';

import kGlobalConstants from 'GlobalConstants';

export const fetchFederalAccount = (id) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: `federal_accounts/${id}/`,
            baseURL: kGlobalConstants.API,
            method: 'get',
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const fetchTasCategoryTotals = (data) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            data,
            url: '/tas/categories/total/',
            baseURL: kGlobalConstants.API,
            method: 'post',
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const fetchTasBalanceTotals = (data) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            data,
            url: '/tas/balances/total/',
            baseURL: kGlobalConstants.API,
            method: 'post',
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

