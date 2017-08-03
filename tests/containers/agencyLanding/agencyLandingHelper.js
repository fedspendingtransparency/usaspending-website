import { mockData } from './mockToptierAgencies';

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
