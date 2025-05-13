/**
 * GlobalConstants.js
 * Created by Maxwell Kendall 7/8/19
*/

const local = require('./LocalConstants');

const LIVE_SEARCH_VERSION = process.env.ENV === 'qat' || process.env.ENV === 'sandbox' || process.env.ENV === 'staging' ? 'v2' : 'legacy'; // // "legacy" or "v2" (the v in v2 should be lowercase)

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
    ARP_RELEASED: process.env.ENV !== 'prod',
    DUNS_LABEL: 'Legacy ',
    REQUEST_VERSION: '2020-06-01',
    LIVE_SEARCH_VERSION: process.env.ENV === 'qat' || process.env.ENV === 'sandbox' || process.env.ENV === 'staging' ? 'v2' : 'legacy', // "legacy" or "v2" (the v in v2 should be lowercase)
    SEARCH_LEGACY_PATH: LIVE_SEARCH_VERSION === "v2" ? '/search-legacy' : '/search',
    SEARCH_V2_PATH: LIVE_SEARCH_VERSION === "v2" ? '/search' : '/searchv2'
};

module.exports = globalConstants;

