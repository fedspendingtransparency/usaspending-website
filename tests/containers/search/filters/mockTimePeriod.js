import { Set } from 'immutable';

export const mockActions = {
    updateTimePeriod: jest.fn()
};

export const mockRedux = {
    filterTimePeriodType: 'fy',
    filterTimePeriodFY: new Set(['1990']),
    filterTimePeriodStart: null,
    filterTimePeriodEnd: null
};
