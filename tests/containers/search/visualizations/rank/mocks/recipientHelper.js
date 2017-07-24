import { recipient } from '../../mockVisualizations';

// Fetch Transactions Total for Geo
export const performTransactionsTotalSearch = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: recipient
                });
            });
        }),
        cancel: jest.fn()
    }
);
