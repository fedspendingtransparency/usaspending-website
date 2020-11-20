/**
 * aboutTheDataHelper.js
 * Created by Jonathan Hill 11/20/20
 */


import { apiRequest } from './apiRequest';

export const aboutTheDataQueryString = (params) => {
    if (!Object.keys(params).length) return '';
    return `?fiscal_year=${params.fiscalYear}
    ${params.fiscalPeriod ? `&fiscal_period=${params.fiscalPeriod}` : ''}
    ${params.search ? `&search=${params.search}` : ''}
    ${params.page ? `&page=${params.page}` : ''}
    ${params.limit ? `&limit=${params.limit}` : ''}
    ${params.order ? `&order=${params.order}` : ''}
    ${params.sort ? `&sort=${params.sort}` : ''}`;
};

export const fetchPublishDates = (params) => apiRequest({
    url: `v2/reporting/agencies/${params.agencyCode}/publish_dates${aboutTheDataQueryString(params)}`
});

export const formatPublicationDates = (dates) => dates.map((date) => {
    let publicationDate = '--';
    let certificationDate = '--';
    if (date.publication_date) {
        publicationDate = new Date(date.publication_date);
        publicationDate = `${publicationDate.getMonth() + 1}/${publicationDate.getDate()}/${publicationDate.getFullYear()}`;
    }
    if (date.certification_date) {
        certificationDate = new Date(date.publication_date);
        certificationDate = `${certificationDate.getMonth() + 1}/${certificationDate.getDate()}/${certificationDate.getFullYear()}`;
    }
    return [publicationDate, certificationDate];
});
