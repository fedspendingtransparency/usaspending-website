import { awardingAgency } from '../../mockVisualizations';

// Fetch Transactions Total
export const performTransactionsTotalSearch = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: awardingAgency
                });
            });
        }),
        cancel: jest.fn()
    }
);
