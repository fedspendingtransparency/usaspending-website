/**
 * disasterHelper
 * Created by Max Kendall 02/5/2021
* */

// We should start keeping our mock API helpers here to level up our file organization

export const mockDefCodes = [
    { code: 'L', disaster: 'covid_19' },
    { code: 'M', disaster: 'covid_19' },
    { code: 'A', disaster: 'not_covid-19' }
];

export const mockOverviewData = {
    data: {
        funding: [],
        total_budget_authority: 0,
        spending: {
            award_obligations: 0,
            award_outlays: 0,
            total_obligations: 0,
            total_outlays: 0
        }
    }
};

export const mockAwardAmounts = {
    data: {
        obligation: 0,
        outlay: 0,
        awardCount: 0,
        faceValueOfLoan: 0
    }
};

export const fetchDEFCodesMockReturnValue = ({
    promise: new Promise((resolve) => {
        process.nextTick(() => {
            resolve({ data: { codes: mockDefCodes } });
        });
    }),
    cancel: jest.fn()
});

