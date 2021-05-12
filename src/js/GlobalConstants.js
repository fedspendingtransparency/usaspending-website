/**
 * GlobalConstants.js
 * Created by Maxwell Kendall 7/8/19
*/

const filesServerUrlByEnv = {
    dev: 'https://files-nonprod.usaspending.gov',
    sandbox: 'https://files-nonprod.usaspending.gov',
    qat: 'https://files-nonprod.usaspending.gov',
    staging: 'https://files-staging.usaspending.gov',
    prod: 'https://files.usaspending.gov'
};

const globalConstants = {
    API: process.env.USASPENDING_API,
    LOCAL: false,
    DEV: (process.env.ENV === 'dev' || process.env.ENV === 'sandbox'),
    PERF_LOG: false,
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
    QAT: (process.env.ENV === 'qat'),
    STAGING: (process.env.ENV === 'staging'),
    FILES_SERVER_BASE_URL: filesServerUrlByEnv[process.env.ENV]
};

module.exports = globalConstants;
