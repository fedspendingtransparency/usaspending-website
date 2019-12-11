import { mockSubawards } from './mockSubawards';

export const performSubawardSearch = () => ({
    promise: new Promise((resolve) => {
        resolve({
            data: mockSubawards
        });
    }),
    cancel: jest.fn()
});