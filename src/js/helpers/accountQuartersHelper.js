/**
 * accountQuartersHelper.js
 * Created by Lizzie Salita 4/04/17
 */

import Axios, { CancelToken } from 'axios';

import kGlobalConstants from 'GlobalConstants';

export const fetchTasCategoryTotals = (data) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            data,
            url: 'v1/tas/categories/quarters/total/',
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
            url: 'v1/tas/balances/quarters/total/',
            baseURL: kGlobalConstants.API,
            method: 'post',
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};
