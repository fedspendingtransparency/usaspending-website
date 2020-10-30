/**
 * accountHelper.js
 * Created by Kevin Li 3/24/17
 */

import moment from 'moment';

import { apiRequest } from './apiRequest';

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

export const fetchAllSubmissionDates = () => apiRequest({
    url: 'v2/references/submission_periods/'
});

export const getLatestPeriodAsMoment = (availablePeriods) => availablePeriods
    .filter((s) => !s.is_quarter)
    .map((s) => ({ revealDate: moment.utc(s.submission_reveal_date), asOfDate: moment.utc(s.period_end_date) }))
    .sort(({ revealDate: a }, { revealDate: b }) => b.valueOf() - a.valueOf())
    .find(({ revealDate: s }) => moment(s).isSameOrBefore(moment()))
    .asOfDate;
