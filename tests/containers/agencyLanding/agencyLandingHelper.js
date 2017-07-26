import { mockAgencies, mockSearchResults } from './mockToptierAgencies';

export const fetchAllAgencies = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockAgencies
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