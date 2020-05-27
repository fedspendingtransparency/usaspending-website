/**
 * GlobalConstants.js
 * Created by Maxwell Kendall 7/8/19
*/

const moment = require('moment');

const dayOfCaresRelease = moment('2020-08-01');

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
    CARES_ACT_RELEASED: (
        process.env.ENV === 'dev' ||
        process.env.ENV === 'sandbox' ||
        moment().isAfter(dayOfCaresRelease)
    )
};

module.exports = globalConstants;

