/**
 * accountLandingHelper.js
 * Created by Lizzie Salita 8/4/17
 **/

import Axios, { CancelToken } from 'axios';

import kGlobalConstants from 'GlobalConstants';

export const fetchAllAccounts = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/references/federal_account/',
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

