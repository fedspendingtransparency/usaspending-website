import { mockReferencedAwardCounts, mockReferencedAwards, mockFederalAccountFunding } from '../../../models/awardsV2/mockAwardApi';

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
