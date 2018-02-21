import { mockApiResponse } from './mockData';

export const fetchBreakdown = () => ({
    promise: new Promise((resolve) => {
        process.nextTick(() => {
            resolve({
                data: mockApiResponse
            });
        });
    }),
    cancel: jest.fn()
});
