import { fundingAgency } from '../../mockVisualizations';

// Fetch Categories
export const performCategorySearch = () => (
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
