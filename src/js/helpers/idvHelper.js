/**
  * searchHelper.js
  * Created by Lizzie Salita 2/14/19
  **/

import Axios, { CancelToken } from 'axios';
import kGlobalConstants from 'GlobalConstants';

export const fetchReferencedAwards = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/awards/idvs/awards/',
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

export const fetchReferencedAwardsCounts = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/awards/idvs/awards/count/',
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

export const fetchAwardAmounts = (awardId) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: `v2/awards/idvs/amounts/${awardId}/`,
            baseURL: kGlobalConstants.API,
            method: 'get',
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};
