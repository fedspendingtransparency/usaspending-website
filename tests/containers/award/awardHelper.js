import { mockApi } from './mockResults';

// Fetch Individual Awards
export const fetchAward = () => (
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
