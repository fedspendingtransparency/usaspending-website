/**
  * guideHelper.js
  * Created by Kevin Li 5/3/17
  **/

import Axios, { CancelToken } from 'axios';

import kGlobalConstants from 'GlobalConstants';

// perform search is a cancellable promise
export const fetchAllTerms = () => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            // TODO - Lizzie: change to glossary when API updated
            url: 'v1/references/guide/?limit=500',
            baseURL: kGlobalConstants.API,
            method: 'get',
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
            // TODO - Lizzie: change to glossary when API updated
            url: 'v1/references/guide/autocomplete/',
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
