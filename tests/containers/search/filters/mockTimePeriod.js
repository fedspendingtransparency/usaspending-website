import { Set } from 'immutable';
import { initialState } from 'redux/reducers/search/searchFiltersReducer';

export const mockActions = {
    updateTimePeriod: jest.fn()
};

export const mockRedux = {
    filterTimePeriodType: 'fy',
    filterTimePeriodFY: new Set(['1990']),
    filterTimePeriodStart: null,
    filterTimePeriodEnd: null,
    appliedFilters: initialState
};
