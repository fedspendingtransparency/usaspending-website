/**
 * menuOptions.js
 * Created by Kevin Li 1/18/18
 */

import GlobalConstants from 'GlobalConstants';

const { FILES_SERVER_BASE_URL } = GlobalConstants;

export const searchOptions = [
    {
        label: 'Advanced Search',
        url: '/search',
        enabled: true
    },
    {
        label: 'Keyword Search',
        url: '/keyword_search',
        enabled: true
    }
];

export const profileOptions = [
    {
        label: 'Agencies',
        url: '/agency',
        enabled: true
    },
    {
        label: 'Federal Accounts',
        url: '/federal_account',
        enabled: true
    },
    {
        label: 'States',
        url: '/state',
        enabled: true
    },
    {
        label: 'Recipients',
        url: '/recipient',
        enabled: true
    },
    {
        label: "COVID-19 Spending",
        url: '/disaster/covid-19',
        enabled: true
    }
];

export const resourceOptions = [
    {
        label: 'Glossary',
        url: '/?glossary',
        enabled: true,
        appendToExistingUrl: true
    },
    {
        label: 'About the Data',
        url: '?about-the-data',
        enabled: true,
        appendToExistingUrl: true,
        isNewTab: true
    },
    {
        label: 'Data Dictionary',
        type: 'data-dictionary',
        url: '/data-dictionary',
        code: 'dictionary',
        description: '',
        callToAction: 'Explore the Data Dictionary',
        shouldOpenNewTab: false,
        enabled: true,
        externalLink: false
    },
    {
        label: 'Analyst Guide',
        type: 'analyst-guide',
        url: '/analyst-guide',
        shouldOpenNewTab: false,
        enabled: true,
        externalLink: false

    },
    {
        label: 'Data Sources',
        type: 'data-sources',
        enabled: true,
        url: '/data-sources',
        callToAction: 'Explore the Data Sources',
        shouldOpenNewTab: false,
        externalLink: false,
        isNewTab: true
    },
    {
        label: "Agency Submission Statistics",
        url: {
            pathname: '/submission-statistics',
            search: '?tab=submissions'
        },
        enabled: true,
        isNewTab: false
    },
    {
        label: 'API Tutorial',
        url: 'https://api.usaspending.gov/docs/intro-tutorial',
        enabled: true,
        shouldOpenNewTab: true,
        externalLink: true
    }
];

export const downloadOptions = [
    {
        label: 'Award Data Archive',
        type: 'award_data_archive',
        url: '/download_center/award_data_archive',
        code: 'archive',
        description: 'The quickest way to grab award data. Pre-generated award files for each major agency (by fiscal year) save on download time.',
        callToAction: 'Grab Award Files',
        shouldOpenNewTab: false,
        enabled: true,
        externalLink: false
    },
    {
        label: 'Custom Award Data',
        type: 'awards',
        url: '/download_center/custom_award_data',
        code: 'award',
        description: 'The best way to grab detailed slices of award data. Specify the agency, timeframe, award type, award level, and more.',
        callToAction: 'Download Award Data',
        shouldOpenNewTab: false,
        enabled: true,
        externalLink: false
    },
    {
        label: 'Custom Account Data',
        type: 'accounts',
        url: '/download_center/custom_account_data',
        code: 'account',
        description: 'The best way to grab detailed subsets of account data, which offer a broad view of how the government allocates funding from top to bottom.',
        callToAction: 'Download Account Data',
        shouldOpenNewTab: false,
        enabled: true,
        externalLink: false
    },
    {
        label: 'Database Download',
        type: '',
        url: `${FILES_SERVER_BASE_URL}/database_download/`,
        code: 'database',
        description: 'Our entire database available as a download – the most complete download option available for advanced users.',
        callToAction: 'Explore Database Download',
        shouldOpenNewTab: true,
        enabled: true,
        internalDomain: true,
        externalLink: true
    },
    {
        label: 'Dataset Metadata',
        type: 'dataset_metadata',
        url: '/download_center/dataset_metadata',
        code: 'metadata',
        description: '',
        callToAction: 'Explore Dataset Metadata',
        shouldOpenNewTab: false,
        enabled: true,
        externalLink: false
    }
];
