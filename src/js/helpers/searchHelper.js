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
    url: 'v2/search/spending_by_category/',
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

export const removeNaicsCountsFromFilters = (reduxFilters) => ({
    ...reduxFilters,
    naics_codes: {
        included: reduxFilters.naics_codes.included,
        excluded: reduxFilters.naics_codes.excluded
    }
});
