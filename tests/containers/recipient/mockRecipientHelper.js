import { mockRecipientOverview, mockChildRecipients } from '../../models/recipient/mockRecipientApi';

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
