import { mockApiReponse } from './mockData';

export const fetchBreakdown = () => ({
    promise: new Promise((resolve) => {
        process.nextTick(() => {
            resolve({
                data: mockApiReponse
            });
        });
    }),
    cancel: jest.fn()
});
