import { mockRecipientLocation, mockRecipientDUNS } from './recipientFilter/mockRecipients';
import { mockAgencies } from './agencyFilter/mockAgencies';
import { mockAwardIDs } from './awardID/mockAwardIDs';
import { mockBudgetCategoryAccounts, mockBudgetCategoryFunctions }
    from './budgetCategory/mockBudgetCategories';
import { mockApi, mockTabCount } from '../table/mockAwards';
import { mockCFDA } from './cfda/mockCFDA';

// Fetch Locations for Autocomplete
export const fetchLocations = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockRecipientLocation
                });
            });
        }),
        cancel: jest.fn()
    }
);

// Fetch Recipients
export const fetchRecipients = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockRecipientDUNS
                });
            });
        }),
        cancel: jest.fn()
    }
);

// Fetch Agencies
export const fetchAwardingAgencies = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockAgencies
                });
            });
        }),
        cancel: jest.fn()
    }
);

export const fetchFundingAgencies = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockAgencies
                });
            });
        }),
        cancel: jest.fn()
    }
);

export const fetchCFDA = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockCFDA
                });
            });
        }),
        cancel: jest.fn()
    }
);

// Fetch Award IDs
export const fetchAwardIDs = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockAwardIDs
                });
            });
        }),
        cancel: jest.fn()
    }
);

// Fetch Federal Accounts
export const fetchFederalAccounts = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockBudgetCategoryAccounts
                });
            });
        }),
        cancel: jest.fn()
    }
);

// Fetch Budget Functions
export const fetchBudgetFunctions = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockBudgetCategoryFunctions
                });
            });
        }),
        cancel: jest.fn()
    }
);

// Fetch Award Counts
export const fetchAwardCounts = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockTabCount
                });
            });
        }),
        cancel: jest.fn()
    }
);

// Perform Paged Search
export const performPagedSearch = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockApi
                });
            });
        }),
        cancel: jest.fn()
    }
);
