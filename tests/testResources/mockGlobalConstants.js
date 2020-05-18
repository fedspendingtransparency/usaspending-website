export default {
    // LOCAL
    API: "http://localhost:8000/api/",
    LOCAL_ROOT: "",
    GITHUB: "",
    GA_TRACKING_ID: "",
    LOCAL: false,
    DEV: true,
    IN_BETA: false,
    KEYWORD_AVAILABLE: true,
    PERF_LOG: false,
    OVERRIDE_FISCAL_YEAR: false,
    FISCAL_YEAR: 2017,
    MAPBOX_TOKEN:
    ""
};

Object.defineProperty(window, 'open', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
    }))
});

