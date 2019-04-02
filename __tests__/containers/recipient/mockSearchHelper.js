import { mockYears } from './mockData';

export const performSpendingOverTimeSearch = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockYears
                });
            });
        }),
        cancel: jest.fn()
    }
);