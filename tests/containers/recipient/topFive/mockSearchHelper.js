import { mockStateCategoryApi } from '../../../models/state/mockStateApi';

export const performSpendingByCategorySearch = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockStateCategoryApi
                });
            });
        }),
        cancel: jest.fn()
    }
);
