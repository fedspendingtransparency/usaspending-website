/**
 * agencyLandingHelper.js
 * Created by Lizzie Salita 7/10/17
 **/

import Axios, { CancelToken } from 'axios';

import kGlobalConstants from 'GlobalConstants';

export const fetchAllAgencies = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/references/toptier_agencies/',
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

