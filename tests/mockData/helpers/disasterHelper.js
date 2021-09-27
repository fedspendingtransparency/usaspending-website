/**
 * disasterHelper
 * Created by Max Kendall 02/5/2021
* */

// We should start keeping our mock API helpers here to level up our file organization

export const mockDefCodes = {
    data: {
        codes: [
            { code: 'L', disaster: 'covid_19' },
            { code: 'M', disaster: 'covid_19' },
            { code: 'A', disaster: 'not_covid-19' }
        ]
    }
};

export const mockDefcParams = mockDefCodes.data.codes.filter((c) => c.disaster === 'covid_19').map((code) => code.code);

export const fetchDEFCodesMockReturnValue = ({
    promise: new Promise((resolve) => {
        process.nextTick(() => {
            resolve(mockDefCodes);
        });
    }),
    cancel: jest.fn()
});

