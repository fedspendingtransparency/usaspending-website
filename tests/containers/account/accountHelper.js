import { mockAccountProgramActivities } from './filters/mockAccountProgramActivities';
import { mockAccount, mockBalances } from './mockAccount';

// Fetch Program Activities
export const fetchProgramActivities = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockAccountProgramActivities
                });
            });
        }),
        cancel: jest.fn()
    }
);

// Fetch Federal Accounts
export const fetchFederalAccount = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockAccount
                });
            });
        }),
        cancel: jest.fn()
    }
);

// Fetch TAS Balances
export const fetchTasBalanceTotals = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockBalances.outlay
                });
            });
        }),
        cancel: jest.fn()
    }
);
