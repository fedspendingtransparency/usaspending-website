/**
 * GlobalConstants.js
 * Created by Maxwell Kendall 7/8/19
*/

const local = require('./LocalConstants');

const LIVE_SEARCH_VERSION = 'v2';

const filesServerUrlByEnv = {
    sandbox: 'https://files-nonprod.usaspending.gov',
    qat: 'https://files-nonprod.usaspending.gov',
    staging: 'https://files-staging.usaspending.gov',
    prod: 'https://files.usaspending.gov'
};

const globalConstants = {
    API: local?.localConstants?.API || process.env.USASPENDING_API,
    LOCAL: false,
    QAT: (process.env.ENV === 'qat' || process.env.ENV === 'sandbox'),
    STAGING: (process.env.ENV === 'staging'),
    PERF_LOG: false,
    MAPBOX_TOKEN: local?.localConstants?.MAPBOX_TOKEN || process.env.MAPBOX_TOKEN,
    PROD: process.env.ENV === 'prod',
    FILES_SERVER_BASE_URL: filesServerUrlByEnv[process.env.ENV],
    DUNS_LABEL: 'Legacy ',
    REQUEST_VERSION: '2020-06-01',
    SEARCH_LEGACY_PATH: LIVE_SEARCH_VERSION,
    SEARCH_V2_PATH: LIVE_SEARCH_VERSION
};

module.exports = globalConstants;

