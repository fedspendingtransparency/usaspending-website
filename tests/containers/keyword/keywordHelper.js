import { mockApi, mockSummary } from './mockResults';

export const fetchSummary = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockSummary
                });
            });
        }),
        cancel: jest.fn()
    }
);

export const performKeywordSearch = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockApi
                });
            });
        }),
        cancel: jest.fn()
    }
);