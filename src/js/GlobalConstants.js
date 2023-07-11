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
    API: ' https://qat-api.usaspending.gov/api/', // to point to QAT
    LOCAL: false,
    PERF_LOG: false,
    MAPBOX_TOKEN: 'pk.eyJ1IjoidXNhc3BlbmRpbmciLCJhIjoiY2l6ZnZjcmh0MDBtbDMybWt6NDR4cjR6ZSJ9.zsCqjJgrMDOA-i1RcCvGvg',
    QAT: (process.env.ENV === 'qat' || process.env.ENV === 'sandbox'),
    STAGING: (process.env.ENV === 'staging'),
    PROD: process.env.ENV === 'prod',
    FILES_SERVER_BASE_URL: filesServerUrlByEnv[process.env.ENV],
    ARP_RELEASED: process.env.ENV !== 'prod',
    DUNS_LABEL: 'Legacy ',
    REQUEST_VERSION: '2020-06-01'
};

module.exports = globalConstants;
