/**
 * GlobalConstants.js
 * Created by Maxwell Kendall 7/8/19
*/

const local = require('./LocalConstants');

const filesServerUrlByEnv = {
    sandbox: 'https://files-nonprod.usaspending.gov',
    qat: 'https://files-nonprod.usaspending.gov',
    staging: 'https://files-staging.usaspending.gov',
    prod: 'https://files.usaspending.gov'
};

const globalConstants = {
    API: local?.localConstants?.API || process.env.USASPENDING_API,
    LOCAL: false,
    PERF_LOG: false,
    MAPBOX_TOKEN: local?.localConstants?.MAPBOX_TOKEN || process.env.MAPBOX_TOKEN,
    QAT: (process.env.ENV === 'qat' || process.env.ENV === 'sandbox'),
    STAGING: (process.env.ENV === 'staging'),
    PROD: process.env.ENV === 'prod',
    FILES_SERVER_BASE_URL: filesServerUrlByEnv[process.env.ENV],
    ARP_RELEASED: process.env.ENV !== 'prod',
    DUNS_LABEL: 'Legacy ',
    REQUEST_VERSION: '2020-06-01',
    BANNER: {
        isActive: true,
        title: 'The data on the COVID-19 Spending Profile are current as of April 29, 2024.',
        content: 'We are fixing a bug to ensure the latest data are available. We apologize for the inconvenience. We appreciate your understanding and patience as we work to fix this issue quickly.',
        page: '/disaster/covid-19'
    }
};

module.exports = globalConstants;
