import { mockContract, mockAwardAmounts } from '../../models/awardsV2/mockAwardApi';

// Fetch Individual Awards
export const fetchAwardV2 = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockContract
                });
            });
        }),
        cancel: jest.fn()
    }
);

export const fetchAwardAmounts = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockAwardAmounts
                });
            });
        }),
        cancel: jest.fn()
    }
);
