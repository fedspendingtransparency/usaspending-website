import { mockData } from './mockFederalAccounts';

export const fetchAllAccounts = () => (
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