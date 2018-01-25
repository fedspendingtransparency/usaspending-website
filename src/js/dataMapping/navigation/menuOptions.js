/**
 * menuOptions.js
 * Created by Kevin Li 1/18/18
 */

import kGlobalConstants from 'GlobalConstants';

export const searchOptions = [
    {
        label: 'Advanced Search',
        url: '#/search',
        enabled: true
    },
    {
        label: 'Keyword Search',
        url: '#/keyword_search',
        enabled: kGlobalConstants.KEYWORD_AVAILABLE
    }
];

export const profileOptions = [
    {
        label: 'Agencies',
        url: '#/agency',
        enabled: true
    },
    {
        label: 'Federal Accounts',
        url: '#/federal_account',
        enabled: false
    },
    {
        label: 'Recipients',
        url: '#/recipient',
        enabled: false
    }
];

export const downloadOptions = [
    {
        label: 'Award Data Archive',
        url: '#/bulk_download/award_data_archive',
        code: 'archive',
        enabled: true
    },
    {
        label: 'Custom Award Data',
        url: '#/bulk_download',
        code: 'award',
        enabled: true
    },
    {
        label: 'Custom Account Data',
        url: '#/bulk_download/account',
        code: 'account',
        enabled: false
    },
    {
        label: 'Agency Submission Files',
        url: 'http://usaspending-submissions.s3-website-us-gov-west-1.amazonaws.com/',
        code: 'submission',
        newTab: true,
        enabled: true
    },
    {
        label: 'API',
        url: 'https://api.usaspending.gov',
        code: 'api',
        newTab: true,
        enabled: true
    },
    {
        label: 'Database Snapshots',
        url: '#/bulk_download/database',
        code: 'database',
        enabled: false
    }
];
