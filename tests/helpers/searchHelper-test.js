import { initialState } from 'redux/reducers/search/searchFiltersReducer';
import { areFiltersEqual, isSearchHashReady } from 'helpers/searchHelper';

test('areFiltersEqual should return true when selected filters are effectively blank', () => {
    expect(areFiltersEqual(initialState, initialState)).toBeTruthy();
});

test('areFiltersEqual should return false when filters are selected', () => {
    expect(areFiltersEqual(initialState, {
        ...initialState,
        timePeriodFY: new Set(['2020'])
    })).toBeFalsy();
});

test('areFiltersEqual should return false when filters are selected', () => {
    expect(areFiltersEqual(initialState, {
        ...initialState,
        timePeriodFY: new Set(['2020'])
    })).toBeFalsy();
});

test.each([
    ['', false],
    ['/?', false],
    ['/?fy=2020&period=12&hash=', false],
    ['/?fy=2020&period=12&hash=t', true]
])('when input (a query param) is %s return value is %s', (input, rtrn) => {
    expect(isSearchHashReady({ search: input })).toEqual(rtrn);
});

