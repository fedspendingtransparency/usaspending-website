import { mockAwardFederalAccounts, mockReferencedAwardCounts, mockReferencedAwards, mockFederalAccountFunding, mockAwardFundingMetaData } from '../../../models/awardsV2/mockAwardApi';

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

export const fetchAwardFundingSummary = () => ({
    promise: new Promise((resolve) => {
        process.nextTick(() => {
            resolve({
                data: mockAwardFundingMetaData
            });
        });
    }),
    cancel: jest.fn()
});

export const fetchAwardFederalAccounts = () => ({
    promise: new Promise((resolve) => {
        process.nextTick(() => {
            resolve({ data: mockAwardFederalAccounts });
        });
    }),
    cancel: jest.fn()
});
