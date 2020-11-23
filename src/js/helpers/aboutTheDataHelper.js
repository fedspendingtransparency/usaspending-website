/**
 * aboutTheDataHelper.js
 * Created by Jonathan Hill 11/20/20
 */


import { apiRequest } from './apiRequest';

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

export const fetchPublishDates = (params) => apiRequest({
    url: `v2/reporting/agencies/${params.agencyCode}/publish_dates${aboutTheDataQueryString(params)}`
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
