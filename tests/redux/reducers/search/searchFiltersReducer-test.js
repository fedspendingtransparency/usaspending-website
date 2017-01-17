/**
 * searchFiltersReducer-test.js
 * Created by Kevin Li 1/17/17
 */

import { Set, OrderedMap } from 'immutable';

import searchFiltersReducer from 'redux/reducers/search/searchFiltersReducer';

const initialState = {
    awardType: new Set(),
    timePeriodType: 'fy',
    timePeriodFY: new Set(),
    timePeriodStart: null,
    timePeriodEnd: null,
    selectedLocations: new OrderedMap(),
    locationDomesticForeign: 'all'
};

describe('searchFiltersReducer', () => {
    it('should return the initial state by default', () => {
        expect(
            searchFiltersReducer(undefined, {})
        ).toEqual(initialState);
    });

    describe('TOGGLE_SEARCH_FILTER_AWARD_TYPE', () => {
        const action = {
            type: 'TOGGLE_SEARCH_FILTER_AWARD_TYPE',
            awardType: '09'
        };

        it('should add a value if it does not currently exist in the set', () => {
            const startingState = Object.assign({}, initialState);

            expect(
                searchFiltersReducer(startingState, action).awardType
            ).toEqual(new Set([
                '09'
            ]));
        });

        it('should remove a value if currently exists in the set', () => {
            const startingState = Object.assign({}, initialState, {
                awardType: new Set(['09'])
            });

            expect(
                searchFiltersReducer(startingState, action).awardType
            ).toEqual(new Set([]));
        });
    });

    describe('BULK_SEACH_FILTER_AWARD_TYPE', () => {
        it('should add the provided values when the direction is "add"', () => {
            const action = {
                type: 'BULK_SEARCH_FILTER_AWARD_TYPE',
                awardTypes: [
                    '10',
                    '06'
                ],
                direction: 'add'
            };

            const startingState = Object.assign({}, initialState);

            expect(
                searchFiltersReducer(startingState, action).awardType
            ).toEqual(new Set([
                '10',
                '06'
            ]));
        });

        it('should remove the provided values when the direction is "remove"', () => {
            const action = {
                type: 'BULK_SEARCH_FILTER_AWARD_TYPE',
                awardTypes: [
                    '10',
                    '06'
                ],
                direction: 'remove'
            };

            const startingState = Object.assign({}, initialState, {
                awardType: new Set(['09', '10', '06'])
            });

            expect(
                searchFiltersReducer(startingState, action).awardType
            ).toEqual(new Set([
                '09'
            ]));
        });
    });

    describe('UPDATE_SEARCH_FILTER_TIME_PERIOD', () => {
        it('should set the time period value to the provided action data', () => {
            const action = {
                type: 'UPDATE_SEARCH_FILTER_TIME_PERIOD',
                dateType: 'fy',
                fy: [
                    '2017',
                    '2015',
                    '2013'
                ],
                start: null,
                end: null
            };

            const expected = {
                timePeriodType: 'fy',
                timePeriodFY: new Set([
                    '2017',
                    '2015',
                    '2013'
                ]),
                timePeriodStart: null,
                timePeriodEnd: null
            };

            const updatedState = searchFiltersReducer(undefined, action);

            Object.keys(expected).forEach((key) => {
                expect(updatedState[key]).toEqual(expected[key]);
            });
        });
    });

    describe('UPDATE_SELECTED_LOCATIONS', () => {
        const action = {
            type: 'UPDATE_SELECTED_LOCATIONS',
            location: {
                matched_ids: [2, 3],
                place_type: 'CITY',
                parent: 'INDIANA',
                place: 'PAWNEE'
            }
        };

        const expectedCity = {
            matched_ids: [2, 3],
            place_type: 'CITY',
            parent: 'INDIANA',
            place: 'PAWNEE'
        };

        const cityId = `2,3_PAWNEE_CITY`;

        it('should add the provided location if it does not currently exist in the filter', () => {
            const updatedState = searchFiltersReducer(undefined, action);
            expect(updatedState.selectedLocations).toEqual(new OrderedMap({
                [cityId]: expectedCity
            }));
        });

        it('should remove the provided location if already exists in the filter', () => {
            const startingState = Object.assign({}, initialState, {
                selectedLocations: new OrderedMap({
                    [cityId]: expectedCity
                })
            });

            const updatedState = searchFiltersReducer(startingState, action);
            expect(updatedState.selectedLocations).toEqual(new OrderedMap());
        });
    });

    describe('UPDATE_DOMESTIC_FOREIGN', () => {
        it('should set the domestic/foreign filter scope to the input string', () => {
            const action = {
                type: 'UPDATE_DOMESTIC_FOREIGN',
                selection: 'domestic'
            };

            const updatedState = searchFiltersReducer(undefined, action);
            expect(updatedState.locationDomesticForeign).toEqual('domestic');
        });
    });

    describe('UPDATE_SEARCH_FILTER_GENERIC', () => {
        it('should set an arbitrary child filter key with the given filter value', () => {
            const action = {
                type: 'UPDATE_SEARCH_FILTER_GENERIC',
                filterType: 'timePeriodType',
                filterValue: 'dr'
            };

            const updatedState = searchFiltersReducer(undefined, action);
            expect(updatedState.timePeriodType).toEqual('dr');
        });
    });

    describe('CLEAR_SEARCH_FILTER_ALL', () => {
        it('should reset the search filters to the initial state after multiple actions have been'
            + ' performed', () => {
            const firstAction = {
                type: 'UPDATE_DOMESTIC_FOREIGN',
                selection: 'domestic'
            };

            const secondAction = {
                type: 'UPDATE_SEARCH_FILTER_TIME_PERIOD',
                dateType: 'fy',
                fy: [
                    '2017',
                    '2015',
                    '2013'
                ],
                start: null,
                end: null
            };

            const firstExpected = 'domestic';
            const secondExpected = {
                timePeriodType: 'fy',
                timePeriodFY: new Set([
                    '2017',
                    '2015',
                    '2013'
                ]),
                timePeriodStart: null,
                timePeriodEnd: null
            };

            // perform the first action that updates the domestic/foreign scope
            let updatedState = searchFiltersReducer(undefined, firstAction);
            expect(updatedState.locationDomesticForeign).toEqual(firstExpected);

            // perform the second action to modify the time period
            updatedState = searchFiltersReducer(updatedState, secondAction);
            Object.keys(secondExpected).forEach((key) => {
                expect(updatedState[key]).toEqual(secondExpected[key]);
            });

            // validate that the changes from the first action remained
            expect(updatedState.locationDomesticForeign).toEqual(firstExpected);

            // reset the state to its initial value
            const finalAction = {
                type: 'CLEAR_SEARCH_FILTER_ALL'
            };
            updatedState = searchFiltersReducer(updatedState, finalAction);
            expect(updatedState).toEqual(initialState);
        });
    });
});
