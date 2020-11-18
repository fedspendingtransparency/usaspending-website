/**
 * GlobalConstants.js
 * Created by Maxwell Kendall 7/8/19
*/

// This can be updated to remove "isDti" after DTI migration
const isDti = process.env.USASPENDING_API.indexOf('.dti.') > -1;
const filesServerUrlByEnv = {
    dev: `https://files-nonprod.${isDti ? 'dti.' : ''}usaspending.gov`,
    sandbox: `https://files-nonprod.${isDti ? 'dti.' : ''}usaspending.gov`,
    qat: `https://files-nonprod.${isDti ? 'dti.' : ''}usaspending.gov`,
    staging: `https://files-staging.${isDti ? 'dti.' : ''}usaspending.gov`,
    prod: `https://files.${isDti ? 'dti.' : ''}usaspending.gov`
};

const globalConstants = {
    API: process.env.USASPENDING_API,
    LOCAL_ROOT: "",
    GITHUB: "",
    LOCAL: false,
    DEV: (process.env.ENV === 'dev' || process.env.ENV === 'sandbox'),
    KEYWORD_AVAILABLE: true,
    PERF_LOG: false,
    OVERRIDE_FISCAL_YEAR: false,
    FISCAL_YEAR: 2017,
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
    QAT: (process.env.ENV === 'qat'),
    FILES_SERVER_BASE_URL: filesServerUrlByEnv[process.env.ENV],
    // Phase 1 release
    CARES_ACT_RELEASED: true,
    // Phase 2 release
    CARES_ACT_RELEASED_2: true
};

module.exports = globalConstants;
