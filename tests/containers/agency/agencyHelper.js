import { mockObligatedAmounts, mockCgacCode, mockFiscalQuarter }
    from './visualizations/mocks/mockObligatedAmounts';

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

// Fetch Agency CGAC Code
export const fetchAgencyCgacCode = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockCgacCode
                });
            });
        }),
        cancel: jest.fn()
    }
);

// Fetch Agency Fiscal Quarter
export const fetchAgencyFiscalQuarter = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockFiscalQuarter
                });
            });
        }),
        cancel: jest.fn()
    }
);
