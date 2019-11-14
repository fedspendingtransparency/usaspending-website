import { mockCount, mockAward } from './mockResponses';

export const fetchAwardCounts = () => ({
    promise: new Promise((resolve) => {
        resolve({
            data: mockCount
        })
    }),
    cancel: jest.fn()
});

export const performSpendingByAwardSearch = () => ({
    promise: new Promise((resolve) => {
        resolve({
            data: mockAward
        })
    }),
    cancel: jest.fn()
});
