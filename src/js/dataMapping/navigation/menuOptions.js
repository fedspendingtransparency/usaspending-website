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
        label: 'Recipients',
        url: '#/recipient',
        enabled: false
    },
    {
        label: 'Federal Accounts',
        url: '#/federal_account',
        enabled: false
    }
];

export const downloadOptions = [
    {
        label: 'Award Data',
        url: '#/bulk_download',
        enabled: true
    },
    {
        label: 'Account Data',
        url: '#/bulk_download/account',
        enabled: false
    },
    {
        label: 'Award Data Archive',
        url: '#/bulk_download/award_data_archive',
        enabled: true
    }
];
