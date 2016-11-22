/**
  * searchHelper.js
  * Created by Kevin Li 11/2/16
  **/

import Axios, { CancelToken } from 'axios';

import kGlobalConstants from 'GlobalConstants';

// perform search is a cancellable promise
export const performSearch = (searchParams) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'awards/summary/',
            baseURL: kGlobalConstants.API,
            method: 'post',
            data: searchParams,
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

// convenience function for performing paged searches
export const performPagedSearch = (filters = [], page = 1, limit = 5) =>
    performSearch({ filters, page, limit });
