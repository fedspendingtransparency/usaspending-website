/**
 * autocompleteReducer-test.js
 * Created by Kevin Li 1/17/17
 */

import autocompleteReducer from 'redux/reducers/search/autocompleteReducer';

describe('autocompleteReducer', () => {
    it('should return an empty array by default', () => {
        expect(autocompleteReducer(undefined, {})).toEqual([]);
    });

    describe('SET_AUTOCOMPLETE_LOCATIONS', () => {
        it('should return a new instance of the input location array', () => {
            const action = {
                type: 'SET_AUTOCOMPLETE_LOCATIONS',
                locations: [
                    {
                        parent: 'INDIANA',
                        place_type: 'CITY',
                        place: 'PAWNEE',
                        matched_ids: [2, 3]
                    },
                    {
                        parent: 'INDIANA',
                        place_type: 'CITY',
                        place: 'BOSTON',
                        matched_ids: [4, 5]
                    }
                ]
            };

            const updatedState = autocompleteReducer(undefined, action);

            // the value should be equal
            expect(updatedState).toEqual(action.locations);
            // but it should be its own instance
            expect(updatedState).not.toBe(action.locations);
        });
    });
});
