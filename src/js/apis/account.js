import { apiRequest } from 'helpers/apiRequest';

export const fetchFederalAccount = (accountNumber) => apiRequest({
    url: `v2/federal_accounts/${accountNumber}/`
});

export const fetchFederalAccountFYSnapshot = (id, fy) => apiRequest({
    url: `v2/federal_accounts/${id}/fiscal_year_snapshot/${fy}`
});

export const fetchTasCategoryTotals = (data) => apiRequest({
    url: 'v1/tas/categories/total/',
    method: 'post',
    data
});

export const fetchTasBalanceTotals = (data) => apiRequest({
    url: 'v1/tas/balances/total/',
    method: 'post',
    data
});

export const fetchProgramActivities = (data) => apiRequest({
    url: 'v1/tas/categories/total/',
    method: 'post',
    data
});

export const fetchAvailableObjectClasses = (federalAccountId) => apiRequest({
    url: `v2/federal_accounts/${federalAccountId}/available_object_classes`
});

export const fetchAllSubmissionDates = (cached = false) => apiRequest({
    url: cached ? 'v2/references/submission_periods/?use_cache=true' : 'v2/references/submission_periods/'
});
