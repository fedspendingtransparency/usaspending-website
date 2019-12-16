import { mockSubawards } from './mockSubawards';
import mockContractTransaction from './mockContractTransaction';

export const performSubawardSearch = () => ({
    promise: new Promise((resolve) => {
        resolve({
            data: mockSubawards
        });
    }),
    cancel: jest.fn()
});


export const fetchAwardTransaction = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockContractTransaction
                });
            });
        }),
        cancel: jest.fn()
    }
);
