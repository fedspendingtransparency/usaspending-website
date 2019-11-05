/**
 * agencyHelper.js
 * Created by Kevin Li 6/8/17
 */

import Axios, { CancelToken } from 'axios';

import kGlobalConstants from 'GlobalConstants';

export const fetchAgencyOverview = (id) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: `v2/references/agency/${id}/`,
            baseURL: kGlobalConstants.API,
            method: 'get',
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

// Get major object classes
export const fetchAgencyMajorObjectClasses = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/financial_spending/major_object_class/',
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

// Get minor object classes
export const fetchAgencyMinorObjectClasses = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/financial_spending/object_class/',
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

// get federal accounts
export const fetchAgencyFederalAccounts = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/federal_obligations/',
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

// get recipients
export const fetchAwardRecipients = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/award_spending/recipient/',
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

// Get Obligated Amount and Budget Authority Amount
export const fetchAgencyObligatedAmounts = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: `v2/financial_balances/agencies/`,
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
