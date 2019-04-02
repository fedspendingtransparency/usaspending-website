import { mockApi } from './mockData';

export const performSpendingOverTimeSearch = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockApi
                });
            })
        }),
        cancel: jest.fn()
    }
);
