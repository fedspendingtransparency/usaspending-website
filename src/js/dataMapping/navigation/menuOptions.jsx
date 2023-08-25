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
export const spendingOptions = [
    {
        label: 'Budget Function ',
        description: 'Drilldown from high-level categories addressing national needs',
        url: '/explorer/budget_function',
        enabled: true,
        icon: 'list-alt'
    },
    {
        label: 'Agency',
        description: 'Drilldown from federal agencies',
        url: '/explorer/agency',
        enabled: true,
        icon: 'landmark'
    },
    {
        label: 'Object Class',
        description: 'Drilldown from items or services purchased',
        url: '/explorer/object_class',
        enabled: true,
        icon: 'th'
    }
];
export const profileOptions = [
    {
        label: 'Agencies',
        description: 'Status of funds and award spending for federal agencies',
        url: '/agency',
        enabled: true,
        icon: 'landmark'
    },
    {
        label: 'Federal Accounts',
        url: '/federal_account',
        description: 'Spending details for accounts within federal agencies',
        enabled: true,
        icon: 'money-check-alt'
    },
    {
        label: 'States & Territories',
        url: '/state',
        description: 'Award amounts to states & territories',
        enabled: true,
        icon: 'map-marker-alt'
    },
    {
        label: 'Recipients',
        url: '/recipient',
        description: 'Award amounts to federal award recipients',
        enabled: true,
        icon: 'building'
    },
    {
        label: "COVID-19 Spending",
        url: '/disaster/covid-19',
        description: 'Total spending and award spending in response to COVID-19',
        enabled: true,
        icon: 'hand-holding-medical'
    }
];

export const learnResourceOptions = [
    {
        label: 'Federal Spending Guide',
        type: 'federal-spending-guide',
        url: '/federal-spending-guide',
        description: 'Questions and answers about federal spending concepts',
        shouldOpenNewTab: false,
        enabled: true,
        externalLink: false
    },
    {
        label: 'Data Sources',
        type: 'data-sources',
        enabled: true,
        description: 'Interactive explainer for the data sources on USAspending.gov',
        url: '/data-sources',
        callToAction: 'Explore the Data Sources',
        shouldOpenNewTab: false,
        externalLink: false
    },
    {
        label: 'Training Videos',
        type: 'training-videos',
        description: 'Tutorials for how to use the data and features on USAspending.gov',
        url: '/training-videos',
        shouldOpenNewTab: false,
        enabled: true,
        externalLink: false,
        isNewTab: false
    }
];
export const referenceMaterialsOptions = [
    {
        label: 'Glossary',
        url: '?glossary',
        description: 'Definitions for commonly used terms',
        enabled: true,
        appendToExistingUrl: true
    },
    {
        label: 'About the Data',
        url: '?about-the-data',
        description: 'Sitewide data disclosures and descriptions',
        enabled: true,
        appendToExistingUrl: true
    },
    {
        label: 'Data Dictionary',
        type: 'data-dictionary',
        url: '/data-dictionary',
        code: 'dictionary',
        description: 'Details about the data elements in downloads',
        callToAction: 'Explore the Data Dictionary',
        shouldOpenNewTab: false,
        enabled: true,
        externalLink: false
    },
    {
        label: "Agency Submission Statistics",
        url: {
            pathname: '/submission-statistics',
            search: '?tab=submissions'
        },
        description: 'Status of agency financial submissions to USAspending.gov',
        enabled: true
    }
];
export const developerOptions = [
    {
        label: 'USAspending API',
        url: 'https://api.usaspending.gov/',
        enabled: true,
        shouldOpenNewTab: true,
        description: 'API endpoints and how they power the data on USAspending.gov',
        externalLink: false
    },
    {
        label: 'USAspending GitHub',
        url: 'https://github.com/fedspendingtransparency/usaspending-website/tree/master',
        enabled: true,
        shouldOpenNewTab: true,
        description: 'Open-source code for USAspending.gov',
        externalLink: true
    },
    {
        label: 'Release Notes',
        url: 'https://github.com/fedspendingtransparency/usaspending-website/wiki',
        enabled: true,
        shouldOpenNewTab: true,
        description: 'Summary of the latest changes on USAspending.gov',
        externalLink: true
    }
];

export const awardDownloadOptions = [{
    label: 'Custom Award Data',
    type: 'awards',
    url: '/download_center/custom_award_data',
    code: 'award',
    description: 'Customized files for prime award transactions and subawards',
    callToAction: 'Download Award Data',
    shouldOpenNewTab: false,
    enabled: true,
    externalLink: false,
    icon: ''
},
{
    label: 'Award Data Archive',
    type: 'award_data_archive',
    url: '/download_center/award_data_archive',
    code: 'archive',
    description: 'Prepackaged files for prime award transactions',
    callToAction: 'Grab Award Files',
    shouldOpenNewTab: false,
    enabled: true,
    externalLink: false,
    icon: ''
}];

export const accountDataOptions = [
    {
        label: 'Custom Account Data',
        type: 'accounts',
        url: '/download_center/custom_account_data',
        code: 'account',
        description: 'Customized files by agency and submission period, including COVID-19 and Infrastructure spending data',
        callToAction: 'Download Account Data',
        shouldOpenNewTab: false,
        enabled: true,
        externalLink: false,
        icon: ''
    }
];

export const allDownloadOptions = [
    {
        label: 'Database Download',
        type: '',
        url: `${FILES_SERVER_BASE_URL}/database_download/`,
        code: 'database',
        description: 'All datasets from Fiscal Year 2001 to present',
        callToAction: 'Explore Database Download',
        shouldOpenNewTab: true,
        enabled: true,
        internalDomain: true,
        externalLink: true,
        icon: ''
    },
    {
        label: 'Dataset Metadata',
        type: 'dataset_metadata',
        url: '/download_center/dataset_metadata',
        code: 'metadata',
        description: 'Information about all datasets such as file format and publishing agency',
        callToAction: 'Explore Dataset Metadata',
        shouldOpenNewTab: false,
        enabled: true,
        externalLink: false,
        icon: ''
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
export const resourceOptions = [
    {
        label: 'Glossary',
        url: '?glossary',
        enabled: true,
        appendToExistingUrl: true
    },
    {
        label: 'About the Data',
        url: '?about-the-data',
        enabled: true,
        appendToExistingUrl: true
    },
    {
        label: 'Training Videos',
        type: 'training-videos',
        url: '/training-videos',
        shouldOpenNewTab: false,
        enabled: true,
        externalLink: false,
        isNewTab: false

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
        label: 'Federal Spending Guide',
        type: 'federal-spending-guide',
        url: '/federal-spending-guide',
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
        externalLink: false
    },
    {
        label: "Agency Submission Statistics",
        url: {
            pathname: '/submission-statistics',
            search: '?tab=submissions'
        },
        enabled: true
    },
    {
        label: 'API Tutorial',
        url: 'https://api.usaspending.gov/docs/intro-tutorial',
        enabled: true,
        shouldOpenNewTab: true,
        externalLink: true
    }
];

export const section1Options = [
    {
        title: '',
        sub: '',
        icon: ''
    },
    {
        title: 'Spending Explorer',
        sub: 'Annual federal spending through three different starting points',
        icon: ''
    },
    {
        title: 'Award Data',
        sub: 'Data about contracts, grants, loans, and other awards that the federal government has made',
        icon: 'hand-holding-usd'
    },
    {
        title: 'Learn',
        sub: '',
        icon: 'graduation-cap'
    }
];
export const section2Options = [
    {
        title: '',
        sub: '',
        icon: ''
    },
    {
        title: 'Profiles',
        sub: 'Federal spending through interactive snapshots',
        icon: ''
    },
    {
        title: 'Account Data',
        sub: 'Data from agency financial submissions, covering both award and non-award spending',
        icon: 'money-bill-wave'
    },
    {
        title: 'Reference Materials',
        sub: '',
        icon: 'book-open'
    }
];
export const section3Options = [
    {
        title: '',
        sub: '',
        icon: ''
    },
    {
        title: '',
        sub: '',
        icon: ''
    },
    {
        title: 'All Data',
        sub: '',
        icon: 'server'
    },
    {
        title: 'For Developers',
        sub: '',
        icon: 'code-branch'
    }
];
