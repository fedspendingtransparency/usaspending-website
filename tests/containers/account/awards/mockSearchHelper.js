import { mockCount, mockAward } from './mockResponses';

export const performSpendingByAwardTabCountSearch = () => ({
    promise: new Promise((resolve) => {
        resolve({
            data: mockCount
        });
    }),
    cancel: jest.fn()
});

export const performSpendingByAwardSearch = () => ({
    promise: new Promise((resolve) => {
        resolve({
            data: mockAward
        });
    }),
    cancel: jest.fn()
});
