import { mockObligatedAmounts, mockCgacCode, mockFiscalQuarter }
    from './visualizations/mocks/mockObligatedAmounts';

import { mockRecipient } from './visualizations/mocks/mockRecipient';

import { mockMajorObjectClasses, mockMinorObjectClasses } from './visualizations/mocks/mockObjectClasses';

// Fetch Agency Obligated Amounts
export const fetchAgencyObligatedAmounts = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockObligatedAmounts
                });
            });
        }),
        cancel: jest.fn()
    }
);

export const fetchAwardRecipients = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockRecipient
                });
            });
        }),
        cancel: jest.fn()
    }
);

export const fetchAgencyMajorObjectClasses = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockMajorObjectClasses
                });
            });
        }),
        cancel: jest.fn()
    }
);

export const fetchAgencyMinorObjectClasses = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockMinorObjectClasses
                });
            });
        }),
        cancel: jest.fn()
    }
);
