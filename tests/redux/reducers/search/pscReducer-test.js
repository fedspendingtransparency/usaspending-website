/**
 * pscReducer-test.js
 * Created by Kevin Li 9/13/17
 */

import pscReducer from 'redux/reducers/search/pscReducer';

describe('pscReducer', () => {
    describe('SET_AUTOCOMPLETE_PSC', () => {
        it('should update the array to the provided values', () => {
            let state = pscReducer(undefined, {});
            expect(state).toEqual([]);

            const action = {
                type: 'SET_AUTOCOMPLETE_PSC',
                psc: ['a', 'b']
            };

            state = pscReducer(state, action);
            expect(state).toEqual(['a', 'b']);
        });
    });
});
