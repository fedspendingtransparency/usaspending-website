import mockFinancialSystem from '../mockFinancialSystemDetails';
import mockContractTransaction from './mockContractTransaction';

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

export const performFinancialSystemLookup = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockFinancialSystem
                });
            });
        }),
        cancel: jest.fn()
    }
);