/**
 * accountLandingHelper.js
 * Created by Lizzie Salita 8/4/17
 **/

import Axios, { CancelToken } from 'axios';

import kGlobalConstants from 'GlobalConstants';

export const fetchAllAgencies = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/references/accounts/',
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

