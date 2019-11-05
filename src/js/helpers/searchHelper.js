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
            url: 'v1/awards/',
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

// function for determining which award tabs to default to
export const fetchAwardCounts = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v1/awards/total/',
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

// Agency search for autocomplete
export const fetchAwardingAgencies = (req) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/autocomplete/awarding_agency',
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

export const fetchFundingAgencies = (req) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/autocomplete/funding_agency',
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

// CFDA search for autocomplete
export const fetchCFDA = (req) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/autocomplete/cfda/',
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

// NAICS search for autocomplete
export const fetchNAICS = (req) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/autocomplete/naics/',
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

// PSC search for autocomplete
export const fetchPSC = (req) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/autocomplete/psc/',
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
            url: `v1/awards/${num}/`,
            baseURL: kGlobalConstants.API,
            method: 'get',
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const fetchAwardV2 = (awardId) => {
    const source = CancelToken.source();
    const parsedAwardId = encodeURI(awardId);
    return {
        promise: Axios.request({
            url: `v2/awards/${parsedAwardId}/`,
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
            url: `v2/transactions/`,
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

// Spending Over Time Visualization Endpoint
export const performSpendingOverTimeSearch = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: `v2/search/spending_over_time/`,
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

// Spending By Category Visualization Endpoint
export const performSpendingByCategorySearch = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/search/spending_by_category/',
            baseURL: kGlobalConstants.API,
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            data: params,
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

// Spending By Geography Visualization Endpoint
export const performSpendingByGeographySearch = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: `v2/search/spending_by_geography/`,
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

// Spending By Award Tab Count Endpoint
export const performSpendingByAwardTabCountSearch = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/search/spending_by_award_count/',
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

// Spending By Award Table Endpoint
export const performSpendingByAwardSearch = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: `v2/search/spending_by_award/`,
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
            url: 'v1/accounts/awards/',
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

export const performSubawardSearch = (data) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            data,
            url: 'v2/subawards/',
            baseURL: kGlobalConstants.API,
            method: 'post',
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const generateUrlHash = (data) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            data,
            url: 'v1/references/filter/',
            baseURL: kGlobalConstants.API,
            method: 'post',
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const restoreUrlHash = (data) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            data,
            url: 'v1/references/hash/',
            baseURL: kGlobalConstants.API,
            method: 'post',
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const fetchLastUpdate = () => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/awards/last_updated/',
            baseURL: kGlobalConstants.API,
            method: 'get',
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};
