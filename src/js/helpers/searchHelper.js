/**
  * searchHelper.js
  * Created by Kevin Li 11/2/16
  **/

import { apiRequest } from './apiRequest';

// Agency search for autocomplete
export const fetchAwardingAgencies = (req) => apiRequest({
    url: 'v2/autocomplete/awarding_agency',
    method: 'post',
    data: req
});

export const fetchFundingAgencies = (req) => apiRequest({
    url: 'v2/autocomplete/funding_agency',
    method: 'post',
    data: req
});

// TAS search
export const fetchTas = (idString = '') => apiRequest({
    // str contains depth, prepended with agency & federal account delimited by a '/', if any.
    url: idString.length === 0
        ? `/v2/references/filter_tree/tas/`
        : `/v2/references/filter_tree/tas/${idString}`
});

// PSC search
export const fetchPsc = (paramString = '') => apiRequest({
    url: paramString === ''
        ? `/v2/references/filter_tree/psc/`
        : `/v2/references/filter_tree/psc/${paramString}`
});

// CFDA search for autocomplete
export const fetchCFDA = (req) => apiRequest({
    url: 'v2/autocomplete/cfda/',
    method: 'post',
    data: req
});


// NAICS search for autocomplete
export const fetchNAICS = (req) => apiRequest({
    url: 'v2/autocomplete/naics/',
    method: 'post',
    data: req
});

// perform search is a cancellable promise
// eslint-disable-next-line import/prefer-default-export
export const naicsRequest = (param) => apiRequest({
    url: `v2/references/naics/${param || ''}`
});

// PSC search for autocomplete
export const fetchPSC = (req) => apiRequest({
    url: 'v2/autocomplete/psc/',
    method: 'post',
    data: req
});

export const fetchAwardV2 = (awardId) => apiRequest({
    url: `v2/awards/${awardId}/`
});

// Fetch Individual Award's Transactions
export const fetchAwardTransaction = (params) => apiRequest({
    url: 'v2/transactions/',
    method: 'post',
    data: params
});

// Spending Over Time Visualization Endpoint
export const performSpendingOverTimeSearch = (params) => apiRequest({
    url: 'v2/search/spending_over_time/',
    method: 'post',
    data: params
});

// Spending By Category Visualization Endpoint
export const performSpendingByCategorySearch = (params) => apiRequest({
    url: `v2/search/spending_by_category/${params.category}`,
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
    },
    data: params
});

// Spending By Geography Visualization Endpoint
export const performSpendingByGeographySearch = (params) => apiRequest({
    url: 'v2/search/spending_by_geography/',
    method: 'post',
    data: params
});

// Spending By Award Tab Count Endpoint
export const performSpendingByAwardTabCountSearch = (params) => apiRequest({
    url: 'v2/search/spending_by_award_count/',
    method: 'post',
    data: params
});

// Spending By Award Table Endpoint
export const performSpendingByAwardSearch = (params) => apiRequest({
    url: 'v2/search/spending_by_award/',
    method: 'post',
    data: params
});

export const performSubawardSearch = (data) => apiRequest({
    url: 'v2/subawards/',
    method: 'post',
    data
});

export const generateUrlHash = (data) => apiRequest({
    url: 'v1/references/filter/',
    method: 'post',
    data
});

export const restoreUrlHash = (data) => apiRequest({
    url: 'v1/references/hash/',
    method: 'post',
    data
});

export const fetchLastUpdate = () => apiRequest({
    url: 'v2/awards/last_updated/'
});
