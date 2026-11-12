/**
 * GlobalConstants.js
 * Created by Maxwell Kendall 7/8/19
*/

import { localConstants as local } from './LocalConstants';

const filesServerUrlByEnv = {
    sandbox: 'https://files-nonprod.usaspending.gov',
    qat: 'https://files-nonprod.usaspending.gov',
    staging: 'https://files-staging.usaspending.gov',
    prod: 'https://files.usaspending.gov'
};

const globalConstants = {
    API: local?.API || process.env.USASPENDING_API || 'https://api.usaspending.gov/api/',
    LOCAL: false,
    QAT: (process.env.ENV === 'qat' || process.env.ENV === 'sandbox'),
    STAGING: (process.env.ENV === 'staging'),
    PERF_LOG: false,
    MAPBOX_TOKEN: local?.MAPBOX_TOKEN || process.env.MAPBOX_TOKEN,
    PROD: process.env.ENV === 'prod',
    FILES_SERVER_BASE_URL: process.env.FILES_SERVER_BASE_URL || filesServerUrlByEnv[process.env.ENV],
    DUNS_LABEL: 'Legacy ',
    REQUEST_VERSION: '2020-06-01',
    FEATURED_CONTENT_ROTATION: 'week', // "week" or "sprint"
    LLM_HEADER_VALUE: local?.LLM_HEADER_VALUE || process.env.X_LLM_API_KEY
};

// Named exports are kept alongside the default so both
// `import GlobalConstants from` and `import { QAT } from` keep working.
export const {
    API,
    LOCAL,
    QAT,
    STAGING,
    PERF_LOG,
    MAPBOX_TOKEN,
    PROD,
    FILES_SERVER_BASE_URL,
    DUNS_LABEL,
    REQUEST_VERSION,
    FEATURED_CONTENT_ROTATION,
    LLM_HEADER_VALUE
} = globalConstants;

export default globalConstants;
