
// Fetch State Overview
import { mockStateOverview, mockAwardBreakdown } from './mockData';

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

export const fetchAwardBreakdown = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockAwardBreakdown
                });
            });
        }),
        cancel: jest.fn()
    }
);
