/**
 * cfdaReducer-test.js
 * Created by Kevin Li 9/13/17
 */

import cfdaReducer from 'redux/reducers/search/cfdaReducer';

describe('cfdaReducer', () => {
    describe('SET_AUTOCOMPLETE_NAICS', () => {
        it('should update the array to the provided values', () => {
            let state = cfdaReducer(undefined, {});
            expect(state).toEqual([]);

            const action = {
                type: 'SET_AUTOCOMPLETE_CFDA',
                cfda: ['a', 'b']
            };

            state = cfdaReducer(state, action);
            expect(state).toEqual(['a', 'b']);
        });
    });
});
