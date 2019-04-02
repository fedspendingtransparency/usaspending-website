import { mockRecipientList } from './mockData';

export const fetchAllRecipients = jest.fn(() => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockRecipientList
                });
            });
        }),
        cancel: jest.fn()
    }
)
);
