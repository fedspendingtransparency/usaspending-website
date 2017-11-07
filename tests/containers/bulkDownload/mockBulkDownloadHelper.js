import { mockStatusResponse, mockAgencies } from './mockData';

export const requestAgenciesList = () => ({
    promise: new Promise((resolve) => {
        process.nextTick(() => {
            resolve({
                data: {
                    agencies: mockAgencies,
                    sub_agencies: [],
                    federal_accounts: []
                }
            });
        });
    }),
    cancel: jest.fn()
});

export const requestBulkDownloadStatus = () => ({
    promise: new Promise((resolve) => {
        process.nextTick(() => {
            resolve({
                data: mockStatusResponse
            });
        });
    }),
    cancel: jest.fn()
});