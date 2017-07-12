/**
 * agencyLandingHelper.js
 * Created by Lizzie Salita 7/10/17
 **/

import Axios, { CancelToken } from 'axios';

import kGlobalConstants from 'GlobalConstants';

// TODO - Lizzie: update when endpoint is ready
export const fetchAllAgencies = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/references/agency/',
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

export const fetchSearchResults = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v1/references/agency/autocomplete/',
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
