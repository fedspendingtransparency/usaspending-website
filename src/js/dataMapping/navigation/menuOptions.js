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
        enabled: true
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
        enabled: true
    },
    {
        label: 'States',
        url: '#/state',
        enabled: true
    },
    {
        label: 'Recipients',
        url: '#/recipient',
        enabled: true
    }
];

export const downloadOptions = [
    {
        label: 'Award Data Archive',
        type: 'award_data_archive',
        url: '#/download_center/award_data_archive',
        code: 'archive',
        description: 'The quickest way to grab award data. Pre-generated award files for each major agency (by fiscal year) save on download time.',
        callToAction: 'Grab Award Files',
        newTab: false,
        enabled: true,
        externalLink: false
    },
    {
        label: 'Custom Award Data',
        type: 'awards',
        url: '#/download_center/custom_award_data',
        code: 'award',
        description: 'The best way to grab detailed slices of award data. Specify the agency, timeframe, award type, award level, and more.',
        callToAction: 'Download Award Data',
        newTab: false,
        enabled: true,
        externalLink: false
    },
    {
        label: 'Custom Account Data',
        type: 'accounts',
        url: '#/download_center/custom_account_data',
        code: 'account',
        description: 'The best way to grab detailed subsets of account data, which offer a broad view of how the government allocates funding from top to bottom.',
        callToAction: 'Download Account Data',
        newTab: false,
        enabled: true,
        externalLink: false
    },
    {
        label: 'Agency Submission Files',
        type: 'snapshots',
        url: `https://files${kGlobalConstants.DEV ? '-nonprod' : ''}.usaspending.gov/agency_submissions/`,
        code: 'submission',
        description: 'Raw, unadulterated data submitted by federal agencies in compliance with the DATA Act.',
        callToAction: 'Download Raw Files',
        newTab: true,
        enabled: true,
        externalLink: false
    },
    {
        label: 'Database Download',
        type: '',
        url: `https://files${kGlobalConstants.DEV ? '-nonprod' : ''}.usaspending.gov/database_download/`,
        code: 'database',
        description: 'Our entire database available as a download – the most complete download option available for advanced users.',
        callToAction: 'Explore Database Download',
        newTab: true,
        enabled: true,
        externalLink: false
    },
    {
        label: 'API',
        type: '',
        url: 'https://api.usaspending.gov',
        code: 'api',
        description: 'An automated way for advanced users to access all the data behind USAspending.gov. Accessible documentation includes tutorials, best practices, and more.',
        callToAction: 'Explore Our API',
        newTab: true,
        enabled: true,
        externalLink: false
    },
    {
        label: 'Data Dictionary',
        type: 'data_dictionary',
        url: '#/download_center/data_dictionary',
        code: 'dictionary',
        description: '',
        callToAction: 'Explore the Data Dictionary',
        newTab: false,
        enabled: true,
        externalLink: false
    }
];
