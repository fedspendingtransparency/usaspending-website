/**
 * GlobalConstants.js
 * Created by Maxwell Kendall 7/8/19
 */

// use the correct GlobalConstants file based on the current environment

// Production ENV values
const prod = {
    // PROD
    API: 'https://api.usaspending.gov/api/',
    LOCAL_ROOT: "",
    GITHUB: "",
    GA_TRACKING_ID: "UA-92617810-1",
    LOCAL: false,
    DEV: true,
    IN_BETA: false,
    KEYWORD_AVAILABLE: true,
    PERF_LOG: false,
    MAPBOX_TOKEN:
    "pk.eyJ1IjoidXNhc3BlbmRpbmciLCJhIjoiY2l6ZnZjcmh0MDBtbDMybWt6NDR4cjR6ZSJ9.zsCqjJgrMDOA-i1RcCvGvg"
};

// Development ENV values
const dev = {
    // LOCAL
    API: "http://localhost:8000/api/",
    LOCAL_ROOT: "",
    GITHUB: "",
    GA_TRACKING_ID: "UA-92617810-1",
    LOCAL: false,
    DEV: true,
    IN_BETA: false,
    KEYWORD_AVAILABLE: true,
    PERF_LOG: false,
    MAPBOX_TOKEN:
    "pk.eyJ1IjoidXNhc3BlbmRpbmciLCJhIjoiY2l6ZnZjcmh0MDBtbDMybWt6NDR4cjR6ZSJ9.zsCqjJgrMDOA-i1RcCvGvg"
};

const globalConstants = {
    development: dev,
    production: prod
};

export default globalConstants[process.env.NODE_ENV];

