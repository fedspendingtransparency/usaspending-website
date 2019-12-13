import { mockAwardFederalAccounts, mockReferencedAwardCounts, mockReferencedAwards, mockFederalAccountFunding, mockAwardFundingMetaData, mockIdvActivity } from '../../../models/award/mockAwardApi';

export const fetchReferencedAwardsCounts = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockReferencedAwardCounts
                });
            });
        }),
        cancel: jest.fn()
    }
);

export const fetchReferencedAwards = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockReferencedAwards
                });
            });
        }),
        cancel: jest.fn()
    }
);


export const fetchAwardFedAccountFunding = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockFederalAccountFunding
                });
            });
        }),
        cancel: jest.fn()
    }
);

export const fetchIdvFundingSummary = () => ({
    promise: new Promise((resolve) => {
        process.nextTick(() => {
            resolve({
                data: mockAwardFundingMetaData
            });
        });
    }),
    cancel: jest.fn()
});

export const fetchIdvFederalAccounts = () => ({
    promise: new Promise((resolve) => {
        process.nextTick(() => {
            resolve({ data: mockAwardFederalAccounts });
        });
    }),
    cancel: jest.fn()
});

export const fetchIdvActivity = () => ({
    promise: new Promise((resolve) => {
        process.nextTick(() => {
            resolve({ data: mockIdvActivity });
        });
    }),
    cancel: jest.fn()
});
