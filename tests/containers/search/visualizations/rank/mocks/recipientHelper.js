import { recipient } from '../../mockVisualizations';

// Spending by Category Search
export const performSpendingByCategorySearch = () => (
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
