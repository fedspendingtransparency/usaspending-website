import { spendingByCategory } from '../../mockVisualizations';

// Fetch Categories
export const performCategorySearch = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: spendingByCategory
                });
            });
        }),
        cancel: jest.fn()
    }
);
