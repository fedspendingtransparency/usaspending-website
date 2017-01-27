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
            url: 'awards/',
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
export const performPagedSearch = (filters = [], page = 1, limit = 15, order = null, fields = null,
        exclude = null) => {
    const params = { filters, page, limit };

    if (order) {
        params.order = order;
    }

    if (fields != null) {
        // we have specific fields to query for
        params.fields = fields;
    }
    else if (exclude != null) {
        // we have specific fields to exclude
        params.exclude = exclude;
    }

    return performSearch(params);
};

// Location search for autocomplete
export const fetchLocations = (req) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'references/locations/geocomplete/',
            baseURL: kGlobalConstants.API,
            method: 'post',
            data: req,
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

// make API call to awards total aggregation endpoint
export const performAwardsTotalSearch = (params) => {
    const source = CancelToken.source();

    return {
        promise: Axios.request({
            url: 'awards/total/',
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
