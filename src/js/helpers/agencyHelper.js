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
            url: `v2/agency/${id}/`,
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
