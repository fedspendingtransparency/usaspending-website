/**
 * aboutTheDataHelper.js
 * Created by Jonathan Hill 11/20/20
*/

import { useState } from 'react';
import { format } from 'date-fns';

import { calculatePercentage, formatMoney, formatNumber, formatMoneyWithPrecision } from 'helpers/moneyFormatter';
import {
    periodsPerQuarter,
    lastPeriods
} from 'dataMapping/aboutTheData/timeFilters';

export const getSelectedPeriodTitle = (str) => (
    str.includes('Q')
        ? `${str.split(' ')[0]} / ${str.split(' ')[1]}`
        : str
);

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
    if (period) return { ...period, title: getSelectedPeriodTitle(period.title) };
    return getPeriodWithTitleById(`${latestPeriod.period}`);
};

// periods can be visible but not selectable
export const isPeriodVisible = (availablePeriodsInFy, periodId) => (
    availablePeriodsInFy
        .some((p) => (
            p.submission_fiscal_month >= parseInt(periodId, 10) && parseInt(periodId, 10) > 0
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
    limit: 10,
    totalItems: 0
};

export const usePagination = (initialState = defaultState) => {
    const [state, updatePagination] = useState(initialState);
    const { page, limit, totalItems } = state;

    return [
        { page, limit, totalItems },
        (newPg) => updatePagination({ ...state, page: newPg }),
        (newLimit) => updatePagination({ ...state, limit: newLimit }),
        (newTotal) => updatePagination({ ...state, totalItems: newTotal })
    ];
};

export const formatPublicationDates = (dates) => dates.map((date) => {
    let publicationDate = '--';
    let certificationDate = '--';
    if (date.publication_date) {
        publicationDate = format(new Date(date.publication_date), 'MM/dd/yyyy');
    }
    if (date.certification_date) {
        certificationDate = format(new Date(date.certification_date), 'MM/dd/yyyy');
    }
    return [publicationDate, certificationDate];
});

export const formatMissingAccountBalancesData = (data) => {
    const weHaveTotalData = data.gtasObligationTotal && data.gtasObligationTotal > 0;
    return data.results.map((tasData) => {
        let amount = '--';
        let percent = '--';
        if (typeof tasData.amount === 'number' && weHaveTotalData) percent = calculatePercentage(tasData.amount, data.gtasObligationTotal, null, 2);
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
    (fileAObligation || fileAObligation === 0) ? formatMoneyWithPrecision(fileAObligation, 2) : '--',
    (fileBObligation || fileBObligation === 0) ? formatMoneyWithPrecision(fileBObligation, 2) : '--',
    difference ? formatMoneyWithPrecision(difference, 2) : '--'
]));

export const convertDatesToMilliseconds = (data) => data.map((datesObj) => {
    const publicationDate = !datesObj.publication_date ? new Date(0) : new Date(datesObj.publication_date);
    const certificationDate = !datesObj.certification_date ? new Date(0) : new Date(datesObj.certification_date);
    return { publication_date: publicationDate.getTime(), certification_date: certificationDate.getTime() };
});

export const formatUnlinkedDataRows = (data, type) => ([
    [
        { displayName: 'Count', title: '', rowSpan: '0' },
        formatNumber(data.unlinked_file_d_award_count),
        formatNumber(data.unlinked_file_c_award_count),
        formatNumber(data.unlinked_file_c_award_count + data.unlinked_file_d_award_count)
    ],
    [
        { displayName: `as a Percentage of All ${type} Awards`, title: '', rowSpan: '0' },
        calculatePercentage(
            data.unlinked_file_d_award_count,
            data.total_linked_award_count + data.unlinked_file_c_award_count + data.unlinked_file_d_award_count,
            null,
            2
        ),
        calculatePercentage(data.unlinked_file_c_award_count,
            data.total_linked_award_count + data.unlinked_file_c_award_count + data.unlinked_file_d_award_count,
            null,
            2
        ),
        calculatePercentage(
            data.unlinked_file_c_award_count + data.unlinked_file_d_award_count,
            data.total_linked_award_count + data.unlinked_file_c_award_count + data.unlinked_file_d_award_count,
            null,
            2
        )
    ]
]);

export const showQuarterText = (period) => [3, 6, 9, 12].includes(period);

export const renderDeadline = (title, deadlines) => {
    if (title === 'publication_date' && deadlines?.submissionDueDate) {
        return format(new Date(deadlines.submissionDueDate), 'MM/dd/yyyy');
    }
    if (title !== 'publication_date' && deadlines?.certificationDueDate) {
        return format(new Date(deadlines.certificationDueDate), 'MM/dd/yyyy');
    }
    return '--';
};

export const getAgencyDetailEmail = (agencyName, agencyCode) => ({
    subject: `Agency Submission Statistics | ${agencyName}`,
    body: `View agency submission details for ${agencyName} on USAspending: https://www.usaspending.gov/submission-statistics/agency/${agencyCode}`
});

export const getAllAgenciesEmail = (fy, period, tab) => {
    const params = new URLSearchParams({ fy, period, tab }).toString();
    const url = `https://www.usaspending.gov/submission-statistics/?${encodeURIComponent(params)}`;
    return {
        subject: 'Agency Submission Statistics | USAspending.gov',
        body: `View agency submission details on USAspending: ${url}`
    };
};

export const getFederalBudget = (federalTotals, latestPeriod) => {
    const parsedFederalTotals = federalTotals
        .find(({ fiscal_period: p, fiscal_year: y }) => (p === latestPeriod.period && y === latestPeriod.year));
    // eslint-disable-next-line camelcase
    return parsedFederalTotals?.total_budgetary_resources;
};
