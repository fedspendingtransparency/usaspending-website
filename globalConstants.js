// Production ENV values
const production = {
    // DEV
    // API: "https://dev-api.usaspending.gov/api/",
    // STAGING
    // API: 'https://staging-api.usaspending.gov/api/',
    // SANDBOX
    // API: 'https://sandbox-api.usaspending.gov/api/',
    // PROD
    API: 'https://api.usaspending.gov/',
    // MOCK
    // API: 'http://localhost:5000/api/',
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
const development = {
    // DEV
    API: "https://dev-api.usaspending.gov/api/",
    // STAGING
    // API: 'https://staging-api.usaspending.gov/api/',
    // SANDBOX
    // API: 'https://sandbox-api.usaspending.gov/api/',
    // PROD
    // API: 'https://api.usaspending.gov/',
    // MOCK
    // API: 'http://localhost:5000/api/',
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
const sandbox = {
    // DEV
    // API: "https://dev-api.usaspending.gov/api/",
    // STAGING
    // API: 'https://staging-api.usaspending.gov/api/',
    // SANDBOX
    API: 'https://sandbox-api.usaspending.gov/api/',
    // PROD
    // API: 'https://api.usaspending.gov/',
    // MOCK
    // API: 'http://localhost:5000/api/',
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

const staging = {
    // DEV
    // API: "https://dev-api.usaspending.gov/api/",
    // STAGING
    API: 'https://staging-api.usaspending.gov/api/',
    // SANDBOX
    // API: 'https://sandbox-api.usaspending.gov/api/',
    // PROD
    // API: 'https://api.usaspending.gov/',
    // MOCK
    // API: 'http://localhost:5000/api/',
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
    staging,
    development,
    sandbox,
    production
};

export default globalConstants[process.env.NODE_ENV];
