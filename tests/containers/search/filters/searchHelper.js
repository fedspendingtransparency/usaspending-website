import { mockRecipientDUNS } from './recipientFilter/mockRecipients';
import { mockAgencies } from './agencyFilter/mockAgencies';
import { mockApi, mockV2TableApi, mockTabCount } from '../table/mockAwards';
import { mockCFDA } from './cfda/mockCFDA';
import { mockNAICS, naicsMock2 } from './naics/mockNAICS';
import { mockPSC } from './psc/mockPSC';

import { mockHash, mockFilters } from '../mockSearchHashes';

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

// fetch CFDA
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

// fetch NAICS
export const fetchNAICS = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockNAICS
                });
            });
        }),
        cancel: jest.fn()
    }
);

// fetch PSC
export const fetchPSC = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockPSC
                });
            });
        }),
        cancel: jest.fn()
    }
);

// Fetch Award Counts v2
export const performSpendingByAwardTabCountSearch = () => (
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

// v2 Award Search
export const performPagedSpendingByAwardSearch = () => (
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

export const generateUrlHash = jest.fn(() => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockHash
                });
            });
        }),
        cancel: jest.fn()
    }
));

export const restoreUrlHash = jest.fn(() => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockFilters
                });
            });
        }),
        cancel: jest.fn()
    }
));

export const fetchLastUpdate = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: {
                        last_update: '01/01/1984'
                    }
                });
            });
        }),
        cancel: jest.fn()
    }
);

export const performSpendingByAwardSearch = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockV2TableApi
                });
            });
        }),
        cancel: jest.fn()
    }
);

const newError = new Error('Bad');

export const naicsRequest = (fail) => {
    if (fail) {
        return (
            {
                promise: new Promise((resolve, reject) => {
                    reject(newError);
                }),
                cancel: jest.fn()
            }
        );
    }
    return (
        {
            promise: new Promise((resolve) => {
                resolve({
                    data: { results: naicsMock2 }
                });
            }),
            cancel: jest.fn()
        }
    );
};
