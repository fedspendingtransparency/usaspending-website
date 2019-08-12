import {
    aidResults,
    ataResults,
    bpoaResults,
    epoaResults,
    aResults,
    mainResults,
    subResults
} from './mockData';

// Fetch AIDs for Autocomplete
export const fetchAIDs = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: {
                        results: aidResults
                    }
                });
            });
        }),
        cancel: jest.fn()
    }
);

export const fetchATAs = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: {
                        results: ataResults
                    }
                });
            });
        }),
        cancel: jest.fn()
    }
);

export const fetchBPOAs = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: {
                        results: bpoaResults
                    }
                });
            });
        }),
        cancel: jest.fn()
    }
);

export const fetchEPOAs = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: {
                        results: epoaResults
                    }
                });
            });
        }),
        cancel: jest.fn()
    }
);

export const fetchMAINs = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: {
                        results: mainResults
                    }
                });
            });
        }),
        cancel: jest.fn()
    }
);

export const fetchSUBs = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: {
                        results: subResults
                    }
                });
            });
        }),
        cancel: jest.fn()
    }
);

export const fetchAs = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: {
                        results: aResults
                    }
                });
            });
        }),
        cancel: jest.fn()
    }
);
