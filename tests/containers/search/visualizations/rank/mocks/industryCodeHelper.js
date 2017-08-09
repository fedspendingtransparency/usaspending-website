import { industryCode } from '../../mockVisualizations';

// Fetch Industry Codes
export const performTransactionsTotalSearch = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: industryCode
                });
            });
        }),
        cancel: jest.fn()
    }
);
