import { mockAwards } from './mockAward';

// Fetch Individual Awards
export const fetchAward = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockAwards
                });
            });
        }),
        cancel: jest.fn()
    }
);
