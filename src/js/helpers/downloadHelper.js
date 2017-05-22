/**
 * downloadHelper.js
 * Created by Kevin Li 5/8/17
 */

import Axios, { CancelToken } from 'axios';

import kGlobalConstants from 'GlobalConstants';

export const requestAwardTable = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'download/awards/',
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
