/**
 * accountHelper.js
 * Created by Kevin Li 3/24/17
 */

import Axios, { CancelToken } from 'axios';

import kGlobalConstants from 'GlobalConstants';

export const fetchFederalAccount = (accountNumber) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: `v2/federal_accounts/${accountNumber}/`,
            baseURL: kGlobalConstants.API,
            method: 'get',
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const fetchFederalAccountFYSnapshot = (id, fy) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: `v2/federal_accounts/${id}/fiscal_year_snapshot/${fy}`,
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
            url: 'v1/tas/balances/total/',
            baseURL: kGlobalConstants.API,
            method: 'post',
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const fetchProgramActivities = (data) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            data,
            url: 'v1/tas/categories/total/',
            baseURL: kGlobalConstants.API,
            method: 'post',
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const fetchAvailableObjectClasses = (federalAccountId) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: `v2/federal_accounts/${federalAccountId}/available_object_classes`,
            baseURL: kGlobalConstants.API,
            method: 'get',
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};
