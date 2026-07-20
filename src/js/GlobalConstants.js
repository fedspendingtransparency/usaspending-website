/**
 * GlobalConstants.js
 * Created by Maxwell Kendall 7/8/19
*/

import local from "./LocalConstants";

const filesServerUrlByEnv = {
    sandbox: 'https://files-nonprod.usaspending.gov',
    qat: 'https://files-nonprod.usaspending.gov',
    staging: 'https://files-staging.usaspending.gov',
    prod: 'https://files.usaspending.gov'
};

const globalConstants = {
    API: local?.localConstants?.API || import.meta.env.USASPENDING_API,
    LOCAL: false,
    QAT: (import.meta.env.ENV === 'qat' || import.meta.env.ENV === 'sandbox'),
    STAGING: (import.meta.env.ENV === 'staging'),
    PERF_LOG: false,
    MAPBOX_TOKEN: local?.localConstants?.MAPBOX_TOKEN || import.meta.env.MAPBOX_TOKEN,
    PROD: import.meta.env.ENV === 'prod',
    FILES_SERVER_BASE_URL: import.meta.env.FILES_SERVER_BASE_URL || filesServerUrlByEnv[import.meta.env.ENV],
    DUNS_LABEL: 'Legacy ',
    REQUEST_VERSION: '2020-06-01',
    IS_NEW_DOWNLOAD: (import.meta.env.ENV === 'qat' || import.meta.env.ENV === 'sandbox'),
    FEATURED_CONTENT_ROTATION: "week"   // "week" or "sprint"
};

export default globalConstants;

