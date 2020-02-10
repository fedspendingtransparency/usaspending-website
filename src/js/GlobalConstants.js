/**
 * GlobalConstants.js
 * Created by Maxwell Kendall 7/8/19
 */

const globalConstants = {
    API: process.env.USASPENDING_API,
    LOCAL_ROOT: "",
    GITHUB: "",
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
    LOCAL: false,
    DEV: (process.env.IS_DEV === 'true'),
    KEYWORD_AVAILABLE: true,
    PERF_LOG: false,
    OVERRIDE_FISCAL_YEAR: false,
    FISCAL_YEAR: 2017,
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN
};

module.exports = globalConstants;

