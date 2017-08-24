import { fundingAgency } from '../../mockVisualizations';

// Spending by Category Search
export const performSpendingByCategorySearch = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: fundingAgency
                });
            });
        }),
        cancel: jest.fn()
    }
);
