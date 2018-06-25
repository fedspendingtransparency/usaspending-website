import { mockRecipientOverview } from '../../models/recipient/mockRecipientApi';

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

