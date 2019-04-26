import { mockResponse } from './mockFullDownload';

export const requestFullDownload = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockResponse
                });
            });
        }),
        cancel: jest.fn()
    }
);

export const requestDownloadStatus = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                const finishedResponse = Object.assign({}, mockResponse, {
                    status: 'finished'
                });
                resolve({
                    data: finishedResponse
                });
            });
        }),
        cancel: jest.fn()
    }
);

export const requestDownloadCount = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: {
                        transaction_rows_gt_limit: false
                    }
                });
            });
        }),
        cancel: jest.fn()
    }
);
