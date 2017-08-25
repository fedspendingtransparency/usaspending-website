/**
 * explorerHelper.js
 * Created by Kevin Li 8/16/17
 */

import Axios, { CancelToken } from 'axios';

import kGlobalConstants from 'GlobalConstants';

import MockAPI from './mockExplorerApi';

export const fetchBreakdown = (params) => {
    const source = CancelToken.source();
    return {
        promise: new Promise((resolve) => {
            setTimeout(() => {
                console.log(params);
                const data = MockAPI.respondToRequest(params.type, params.filters);
                console.log(data);

                resolve({
                    data
                });
            }, 1500);
        }),
        // promise: Axios.request({
        //     url: 'v2/spending/',
        //     baseURL: kGlobalConstants.API,
        //     method: 'post',
        //     data: params,
        //     cancelToken: source.token
        // }),
        cancel() {
            source.cancel();
        }
    };
};
