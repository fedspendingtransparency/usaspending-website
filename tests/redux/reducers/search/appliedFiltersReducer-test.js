/**
 * @jest-environment jsdom
 */
import { Set } from 'immutable';

import appliedFiltersReducer, { initialState } from 'redux/reducers/search/appliedFiltersReducer';

describe('appliedFiltersReducer', () => {
    it('should return the initial state by default', () => {
        expect(
            appliedFiltersReducer(undefined, {})
        ).toEqual(initialState);
    });

    describe('APPLY_STAGED_FILTERS', () => {
        it('should set the filter object to the provided object', () => {
            const newFilters = Object.assign({}, initialState.filters, {
                timePeriodFY: new Set(['1990'])
            });

            const action = {
                type: 'APPLY_STAGED_FILTERS',
                filters: newFilters
            };

            const newState = appliedFiltersReducer(undefined, action);
            expect(newState.filters.timePeriodFY).toEqual(new Set(['1990']));
        });
    });

    describe('RESTORE_HASHED_FILTERS', () => {
        it('should set the filter object to the provided object', () => {
            const newFilters = Object.assign({}, initialState.filters, {
                timePeriodFY: new Set(['1990'])
            });

            const action = {
                type: 'RESTORE_HASHED_FILTERS',
                filters: newFilters
            };

            const newState = appliedFiltersReducer(undefined, action);
            expect(newState.filters.timePeriodFY).toEqual(new Set(['1990']));
        });
    });

    describe('CLEAR_APPLIED_FILTERS', () => {
        it('should should return the initial state', () => {
            const newFilters = Object.assign({}, initialState.filters, {
                timePeriodFY: new Set(['1990'])
            });

            const modifiedState = {
                filters: newFilters,
                _empty: false,
                _complete: false
            };

            expect(modifiedState).not.toEqual(initialState);

            const action = {
                type: 'CLEAR_APPLIED_FILTERS'
            };

            const restoredState = appliedFiltersReducer(modifiedState, action);
            expect(restoredState).toEqual(initialState);
        });
    });

    describe('SET_APPLIED_FILTER_EMPTINESS', () => {
        it('should set the _empty value', () => {
            let state = appliedFiltersReducer(undefined, {});
            expect(state._empty).toBeTruthy();

            const action = {
                type: 'SET_APPLIED_FILTER_EMPTINESS',
                empty: false
            };
            state = appliedFiltersReducer(state, action);
            expect(state._empty).toBeFalsy();
        });
    });

    describe('SET_APPLIED_FILTER_COMPLETION', () => {
        it('should set the _complete value', () => {
            let state = appliedFiltersReducer(undefined, {});
            expect(state._complete).toBeTruthy();

            const action = {
                type: 'SET_APPLIED_FILTER_COMPLETION',
                complete: false
            };
            state = appliedFiltersReducer(state, action);
            expect(state._complete).toBeFalsy();
        });
    });
});
