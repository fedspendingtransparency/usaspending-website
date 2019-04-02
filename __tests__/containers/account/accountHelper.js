import { mockAccountProgramActivities } from './filters/mockAccountProgramActivities';
import { mockAvailableOC } from './filters/mockObjectClass';
import { mockAccount, mockBalances, mockSnapshot } from './mockAccount';

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

// Fetch Federal Account Fiscal Year Snapshot
export const fetchFederalAccountFYSnapshot = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockSnapshot
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

export const fetchTasCategoryTotals = () => (
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

export const fetchAvailableObjectClasses = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockAvailableOC
                });
            });
        }),
        cancel: jest.fn()
    }
);
