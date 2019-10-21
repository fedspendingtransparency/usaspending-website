/**
 * accountQuartersHelper.js
 * Created by Lizzie Salita 4/04/17
 */

import Axios, { CancelToken } from 'axios';

import kGlobalConstants from 'GlobalConstants';

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
