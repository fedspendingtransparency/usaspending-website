import { mockCount, mockAward } from './mockResponses';

export const fetchAwardCounts = () => ({
    promise: new Promise((resolve) => {
        resolve({
            data: mockCount
        })
    }),
    cancel: jest.fn()
});

export const performSearch = () => ({
    promise: new Promise((resolve) => {
        resolve({
            data: mockAward
        })
    }),
    cancel: jest.fn()
});