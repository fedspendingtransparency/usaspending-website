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

export const getSubmissionDeadlines = (fiscalYear, fiscalPeriod, submissionPeriods) => {
    if (!submissionPeriods.length) return null;
    const submissionPeriod = submissionPeriods
        .find((submission) => submission.submission_fiscal_year === fiscalYear && submission.submission_fiscal_month === fiscalPeriod);
    if (!submissionPeriod) return null;
    return { submissionDueDate: submissionPeriod.submission_due_date, certificationDueDate: submissionPeriod.certification_due_date };
};

export const getLatestPeriod = (availablePeriods, fy = null) => {
    if (availablePeriods.length) {
        return availablePeriods
            .filter((s) => {
                if (fy) {
                    return s.submission_fiscal_year === parseInt(fy, 10);
                }
                return true;
            })
            .map((s) => ({
                revealDate: moment.utc(s.submission_reveal_date),
                asOfDate: moment.utc(s.period_end_date),
                period: s.submission_fiscal_month,
                year: s.submission_fiscal_year,
                quarter: s.submission_fiscal_quarter
            }))
            .sort(({ revealDate: a }, { revealDate: b }) => b.valueOf() - a.valueOf())
            .find(({ revealDate: s }) => moment(s).isSameOrBefore(moment()));
    }

    return {
        revealDate: null,
        asOfDate: null,
        period: null,
        year: null,
        quarter: null
    };
};

export const getLatestPeriodAsMoment = (availablePeriods) => {
    if (availablePeriods.length) {
        return getLatestPeriod(availablePeriods).asOfDate;
    }
    return {
        revealDate: null,
        asOfDate: null,
        period: null,
        year: null,
        quarter: null
    };
};

