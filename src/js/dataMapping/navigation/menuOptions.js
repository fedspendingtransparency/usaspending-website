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
        type: 'award_data_archive',
        url: '#/bulk_download/award_data_archive',
        code: 'archive',
        description: 'The quickest way to grab award data. Pre-generated award files for each major agency (by fiscal year) save on download time.',
        callToAction: 'Grab Award Files',
        newTab: false,
        enabled: true
    },
    {
        label: 'Custom Award Data',
        type: 'awards',
        url: '#/bulk_download',
        code: 'award',
        description: 'The best way to grab detailed slices of award data. Specify the agency, timeframe, award type, award level, and more.',
        callToAction: 'Download Award Data',
        newTab: false,
        enabled: true
    },
    {
        label: 'Custom Account Data',
        type: 'accounts',
        url: '#/bulk_download/account',
        code: 'account',
        description: 'The best way to grab detailed subsets of account data, which offer a broad view of how the government allocates funding from top to bottom.',
        callToAction: 'Download Account Data',
        newTab: false,
        enabled: false
    },
    {
        label: 'Agency Submission Files',
        type: 'snapshots',
        url: 'http://usaspending-submissions.s3-website-us-gov-west-1.amazonaws.com/',
        code: 'submission',
        description: 'Raw, unadulterated data submitted by federal agencies in compliance with the DATA Act.',
        callToAction: 'Download Raw Files',
        newTab: true,
        enabled: true
    },
    {
        label: 'Database Snapshots',
        type: '',
        url: 'https://aws.amazon.com/public-datasets/usaspending/',
        code: 'database',
        description: 'Our entire database as a PostgreSQL snapshot \u2014 the most complete download option available for advanced users.',
        callToAction: 'Explore Database Snapshot',
        newTab: true,
        enabled: true
    },
    {
        label: 'API',
        type: '',
        url: 'https://api.usaspending.gov',
        code: 'api',
        description: 'An automated way for advanced users to access all the data behind USAspending.gov. Accessible documentation includes tutorials, best practices, and more.',
        callToAction: 'Explore Our API',
        newTab: true,
        enabled: true
    }
];
