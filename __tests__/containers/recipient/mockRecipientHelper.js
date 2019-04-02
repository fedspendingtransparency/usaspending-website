import { mockRecipientOverview, mockChildRecipients } from '../../models/recipient/mockRecipientApi';
import { mockTrendline } from './mockData';

export const fetchRecipientOverview = jest.fn(() => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockRecipientOverview
                });
            });
        }),
        cancel: jest.fn()
    }
));

export const fetchChildRecipients = jest.fn(() => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockChildRecipients
                });
            });
        }),
        cancel: jest.fn()
    }
));

export const fetchNewAwardCounts = jest.fn(() => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockTrendline
                });
            });
        }),
        cancel: jest.fn()
    }
));
