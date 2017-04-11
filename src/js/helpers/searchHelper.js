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

// Budget Category autocomplete searches
export const fetchBudgetFunctions = (req) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'tas/autocomplete/',
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

export const fetchFederalAccounts = (req) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'federal_accounts/autocomplete/',
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

// Agency search for autocomplete
export const fetchAgencies = (req) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'references/agency/autocomplete/',
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

// Fetch Individual Award
export const fetchAward = (num) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: `awards/${num}/`,
            baseURL: kGlobalConstants.API,
            method: 'get',
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

// Fetch Individual Award's Transactions
export const fetchAwardTransaction = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: `transactions/`,
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

// Fetch Recipients
export const fetchRecipients = (req) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'references/recipients/autocomplete/',
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

// Fetch Award IDs
export const fetchAwardIDs = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'awards/autocomplete/',
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

// make API call to awards total aggregation endpoint
export const performTransactionsTotalSearch = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'transactions/total/',
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

// make API call to categories total endpoint
// Use this in the Spending By Category search for Budget Categories
export const performCategorySearch = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'tas/categories/total/',
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

// make API call to balances total endpoint
// Use this in the Spending Over Time search for Budget Categories
export const performBalancesSearch = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'tas/balances/total/',
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

export const performFinancialSystemLookup = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'accounts/awards/',
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
