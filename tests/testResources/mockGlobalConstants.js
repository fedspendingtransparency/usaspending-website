export default {
    // LOCAL
    API: "http://localhost:8000/api/",
    LOCAL: false,
    QAT: true,
    PERF_LOG: false,
    MAPBOX_TOKEN: "",
    ARP_RELEASED: true
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

