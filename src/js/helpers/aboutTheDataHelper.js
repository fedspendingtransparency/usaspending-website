/**
 * aboutTheDataHelper.js
 * Created by Jonathan Hill 11/20/20
 */
import { useState } from 'react';
import { stringify } from 'query-string';

import { calculatePercentage, formatMoney } from 'helpers/moneyFormatter';
import { mockAPI } from 'containers/aboutTheData/AgencyTableMapping';
import GlobalConstants from 'GlobalConstants';

import { apiRequest } from './apiRequest';

const isMocked = GlobalConstants.LOCAL;

export const aboutTheDataQueryString = (params) => {
    if (!Object.keys(params).length) return '';
    return `?
    ${params.fiscalYear ? `fiscal_year=${params.fiscalYear}` : ''}
    ${params.fiscalPeriod ? `&fiscal_period=${params.fiscalPeriod}` : ''}
    ${params.search ? `&search=${encodeURIComponent(params.search)}` : ''}
    ${params.page ? `&page=${params.page}` : ''}
    ${params.limit ? `&limit=${params.limit}` : ''}
    ${params.order ? `&order=${params.order}` : ''}
    ${params.sort ? `&sort=${params.sort}` : ''}`;
};

const defaultState = {
    page: 1,
    limit: 10
};

export const usePagination = (initialState = defaultState) => {
    const [{ page, limit }, updatePagination] = useState(initialState);
    return [{ page, limit }, updatePagination];
};

export const getTotals = (fy = '2020', period = '12') => {
    if (isMocked) {
        // using mockAPI
        return apiRequest({
            isMocked,
            url: `v2/references/total_budgetary_resources?${stringify({
                fiscal_period: period,
                fiscal_year: fy
            })}`
        });
    }
    return {
        promise: new Promise((resolve) => {
            window.setTimeout(() => {
                resolve(mockAPI.totals);
            }, 500);
        }),
        cancel: () => {
            console.log('cancel executed!');
        }
    };
};

export const getDetails = (fy, period, order, sort, page, limit) => {
    if (isMocked) {
        // using mockAPI
        return apiRequest({
            isMocked,
            url: `v2/reporting/agencies/overview?${stringify({
                fiscal_year: fy,
                fiscal_period: period,
                page,
                limit,
                order,
                sort
            })}`
        });
    }
    return {
        promise: new Promise((resolve) => {
            window.setTimeout(() => {
                resolve({
                    data: {
                        // returns multiple pages of data when limit is 10
                        results: mockAPI.details.data.results.concat(mockAPI.details.data.results)
                    }
                });
            }, 500);
        }),
        cancel: () => {
            console.log('cancel executed!');
        }
    };
};

export const getDates = (fy, order, sort, page, limit) => {
    if (isMocked) {
        return apiRequest({
            isMocked,
            url: `v2/reporting/agencies/publish_dates?${stringify({
                fiscal_year: fy,
                page,
                limit,
                order,
                sort
            })}`
        });
    }
    return {
        promise: new Promise((resolve) => {
            window.setTimeout(() => {
                resolve({
                    data: {
                        // returns multiple pages of data when limit is 10
                        results: mockAPI.dates.data.results.concat(mockAPI.dates.data.results)
                    }
                });
            }, 500);
        }),
        cancel: () => {
            console.log('cancel executed!');
        }
    };
};

export const fetchPublishDates = (params) => apiRequest({
    url: `v2/reporting/agencies/${params.agencyCode}/publish_dates/${aboutTheDataQueryString(params)}`
});

export const fetchMissingAccountBalances = (params) => apiRequest({
    url: `v2/reporting/agencies/${params.agencyCode}/discrepancies/${aboutTheDataQueryString(params)}`
});

export const fetchReportingDifferences = (params) => apiRequest({
    url: `/api/v2/reporting/agencies/{agency_code}/differences/${aboutTheDataQueryString(params)}`
});

export const dateFormattedMonthDayYear = (date) => {
    if (!date) return null;
    const newDate = new Date(date);
    const month = (newDate.getUTCMonth() + 1).toString().length === 1 ? `0${newDate.getUTCMonth() + 1}` : newDate.getUTCMonth() + 1;
    const dayOfTheMonth = (newDate.getUTCDate()).toString().length === 1 ? `0${newDate.getUTCDate()}` : newDate.getUTCDate();
    return `${month}/${dayOfTheMonth}/${newDate.getUTCFullYear()}`;
};

export const formatPublicationDates = (dates) => dates.map((date) => {
    let publicationDate = '--';
    let certificationDate = '--';
    if (date.publication_date) {
        publicationDate = dateFormattedMonthDayYear(date.publication_date);
    }
    if (date.certification_date) {
        certificationDate = dateFormattedMonthDayYear(date.certification_date);
    }
    return [publicationDate, certificationDate];
});

export const formatMissingAccountBalancesData = (data) => {
    const weHaveTotalData = data.gtasObligationTotal && data.gtasObligationTotal > 0;
    return data.results.map((tasData) => {
        let amount = '--';
        let percent = '--';
        if (typeof tasData.amount === 'number' && weHaveTotalData) percent = calculatePercentage(tasData.amount, data.gtasObligationTotal);
        if (typeof tasData.amount === 'number') amount = formatMoney(tasData.amount);
        return [tasData.tas, amount, percent];
    });
};

export const formatReportingDifferencesData = (data) => data.results.map(({
    tas = '',
    file_a_obligation: fileAObligation = null,
    file_b_obligation: fileBObligation = null,
    difference = null
}) => ([
    tas || '--',
    fileAObligation ? formatMoney(fileAObligation) : '--',
    fileBObligation ? formatMoney(fileBObligation) : '--',
    difference ? formatMoney(difference) : '--'
]));

export const showQuarterText = (period) => [3, 6, 9, 12].includes(period);
