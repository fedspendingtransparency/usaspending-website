import { initialState } from 'redux/reducers/search/searchFiltersReducer';
import { areFiltersEqual } from 'helpers/searchHelper';

describe('areFiltersEqual', () => {
    it('should return true when selected filters are effectively blank', () => {
        expect(areFiltersEqual(initialState, initialState)).toBeTruthy();
    });
    it('should return false when filters are selected', () => {
        expect(areFiltersEqual(initialState, {
            ...initialState,
            timePeriodFY: new Set(['2020'])
        })).toBeFalsy();
    });
});
