import { mockData, mockSearchResults } from './mockToptierAgencies';

export const fetchAllAgencies = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockData
                });
            });
        }),
        cancel: jest.fn()
    }
);

export const fetchSearchResults = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockSearchResults
                });
            });
        }),
        cancel: jest.fn()
    }
);