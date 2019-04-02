import { mockStateOverview, mockStateList } from './mockData';
import { mockBreakdownApi } from '../../models/state/mockStateApi';

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

export const fetchAwardBreakdown = jest.fn(() => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockBreakdownApi
                });
            });
        }),
        cancel: jest.fn()
    }
));
