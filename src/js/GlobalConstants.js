/**
 * GlobalConstants.js
 * Created by Maxwell Kendall 7/8/19
*/

const filesServerUrlByEnv = {
    sandbox: 'https://files-nonprod.usaspending.gov',
    qat: 'https://files-nonprod.usaspending.gov',
    staging: 'https://files-staging.usaspending.gov',
    prod: 'https://files.usaspending.gov'
};

const globalConstants = {
    API: process.env.USASPENDING_API,
    LOCAL: false,
    PERF_LOG: false,
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
    QAT: (process.env.ENV === 'qat' || process.env.ENV === 'sandbox'),
    STAGING: (process.env.ENV === 'staging'),
    PROD: process.env.ENV === 'prod',
    FILES_SERVER_BASE_URL: filesServerUrlByEnv[process.env.ENV],
    ARP_RELEASED: process.env.ENV !== 'prod',
    AGENCYV2_RELEASED: true,
    AGENCY_LINK: 'agency'
};

module.exports = globalConstants;
