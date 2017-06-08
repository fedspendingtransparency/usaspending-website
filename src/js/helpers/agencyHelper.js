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
