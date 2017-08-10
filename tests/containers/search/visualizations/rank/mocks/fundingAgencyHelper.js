import { fundingAgency } from '../../mockVisualizations';

// Fetch Categories
export const performFinancialAccountAggregation = () => (
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
