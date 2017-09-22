import { cfda } from '../../mockVisualizations';

// Spending by Category Search
export const performSpendingByCategorySearch = () => (
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
