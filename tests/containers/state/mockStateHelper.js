
// Fetch State Overview
import { mockStateOverview, mockStateList } from './mockData';

export const fetchStateOverview = jest.fn(() => (
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
));

export const fetchStateList = jest.fn(() => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockStateList
                });
            });
        }),
        cancel: jest.fn()
    }
));
