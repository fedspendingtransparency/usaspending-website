/**
 * naicsReducer-test.js
 * Created by Kevin Li 9/13/17
 */

import naicsReducer from 'redux/reducers/search/naicsReducer';

describe('naicsReducer', () => {
    describe('SET_AUTOCOMPLETE_NAICS', () => {
        it('should update the array to the provided values', () => {
            let state = naicsReducer(undefined, {});
            expect(state).toEqual([]);

            const action = {
                type: 'SET_AUTOCOMPLETE_NAICS',
                naics: ['a', 'b']
            };

            state = naicsReducer(state, action);
            expect(state).toEqual(['a', 'b']);
        });
    });
});
