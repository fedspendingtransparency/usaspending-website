import { cfda } from '../../mockVisualizations';

// Fetch Transactions Total
export const performTransactionsTotalSearch = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: cfda
                });
            });
        }),
        cancel: jest.fn()
    }
);
