
// Fetch State Overview
import { mockStateOverview } from './mockData';

export const fetchStateOverview = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockStateOverview
                });
            });
        }),
        cancel: jest.fn()
    }
);
