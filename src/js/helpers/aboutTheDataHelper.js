/**
 * aboutTheDataHelper.js
 * Created by Jonathan Hill 11/20/20
 */
import { useState } from 'react';
import { stringify } from 'querystring';

import { calculatePercentage, formatMoney } from 'helpers/moneyFormatter';
import { mockAPI } from 'containers/aboutTheData/AgencyTableMapping';
import GlobalConstants from 'GlobalConstants';
import {
    periodsPerQuarter,
    lastPeriods
} from 'components/aboutTheData/dataMapping/timeFilters';

import { apiRequest } from './apiRequest';

const isMocked = GlobalConstants.LOCAL;

// returns the correct string representing the title of the period; for example '1' or '2' === 'P01 - P02'
export const getPeriodWithTitleById = (urlPeriod, latestPeriod) => {
    if (parseInt(urlPeriod, 10) > 12) return getPeriodWithTitleById(`${latestPeriod.period}`);
    const period = periodsPerQuarter
        .find((arr) => arr.some(({ id }) => {
            if (urlPeriod === "1" || urlPeriod === "2") return id === "2";
            return id === urlPeriod;
        }))
        .filter(({ id }) => {
            if (urlPeriod === "1" || urlPeriod === "2") return id === "2";
            return id === urlPeriod;
        })[0];
    if (period) return period;
    return getPeriodWithTitleById(`${latestPeriod.period}`);
};

export const getSelectedPeriodTitle = (str) => (
    str.includes('Q')
        ? `${str.split(' ')[0]} / ${str.split(' ')[1]}`
        : str
);

// periods can be visible but not selectable
export const isPeriodVisible = (availablePeriodsInFy, periodId) => (
    availablePeriodsInFy
        .some((p) => (
            p.submission_fiscal_month >= parseInt(periodId, 10)
        ))
);

// periods are only selectable post 2020
export const isPeriodSelectable = (availablePeriodsInFy, periodId) => (
    availablePeriodsInFy
        .filter((p) => (
            parseInt(periodId, 10) === p.submission_fiscal_month
        ))
        .length > 0
);

// getting last period of quarter for period via index of this array. ✨✨ ✨  S/O to (3rd grade) Maths ✨ ✨ ✨
export const getLastPeriodWithinQuarterByPeriod = (periodId) => (
    lastPeriods[Math.ceil((parseInt(periodId, 10) / 3)) - 1] || "1"
);

const defaultState = {
    page: 1,
    limit: 10
};

export const usePagination = (initialState = defaultState) => {
    const [{ page, limit }, updatePagination] = useState(initialState);
    return [{ page, limit }, updatePagination];
};

export const getTotalBudgetaryResources = (fy, period) => {
    if (fy && period) {
        return apiRequest({
            isMocked,
            url: `v2/references/total_budgetary_resources?${stringify({
                fiscal_period: period,
                fiscal_year: fy
            })}`
        });
    }
    return apiRequest({
        isMocked,
        url: 'v2/references/total_budgetary_resources'
    });
};

export const getAgenciesReportingData = (fy, period, order, sort, page, limit) => {
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

export const getSubmissionPublicationDates = (fy, order, sort, page, limit) => {
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

export const fetchPublishDates = (agencyCode, params) => apiRequest({
    url: `v2/reporting/agencies/${agencyCode}/publish_dates/${stringify(params)}`
});

export const fetchMissingAccountBalances = (agencyCode, params) => apiRequest({
    url: `v2/reporting/agencies/${agencyCode}/discrepancies/?${stringify(params)}`
});

export const fetchReportingDifferences = (agencyCode, params) => apiRequest({
    url: `/api/v2/reporting/agencies/${agencyCode}/differences/?${stringify(params)}`
});

export const fetchAgency = (agencyCode, params) => apiRequest({
    url: `v2/reporting/agencies/${agencyCode}/overview/?${stringify(params)}`
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

export const findTotalBudget = (budgetaryResources, fy, period) => {
    const matchingBudget = budgetaryResources.find((item) => item.fiscal_year === fy && item.fiscal_period === period);
    return matchingBudget && matchingBudget.total_budgetary_resources;
};
