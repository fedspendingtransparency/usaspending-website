import { mockContract } from './mockAward';

// Fetch Individual Awards
export const fetchAwardV2 = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockContract
                });
            });
        }),
        cancel: jest.fn()
    }
);
