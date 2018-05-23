/**
 * stateHelper.js
 * Created by Lizzie Salita 5/1/18
 */

import Axios, { CancelToken } from "axios/index";
import kGlobalConstants from 'GlobalConstants';

export const fetchStateOverview = (id, year) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: `v2/recipient/state/${id}/`,
            baseURL: kGlobalConstants.API,
            method: 'get',
            params: {
                year
            },
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const fetchStateList = () => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: `v2/recipient/state/`,
            baseURL: kGlobalConstants.API,
            method: 'get',
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};
