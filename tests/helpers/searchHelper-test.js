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

test('isSearchHashReady knows when theres a hash', () => {
    expect(isSearchHashReady('/search')).toEqual(false);
    expect(isSearchHashReady('/search/')).toEqual(false);
    expect(isSearchHashReady('/search/test')).toEqual(true);
});
