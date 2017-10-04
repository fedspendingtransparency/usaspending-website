/**
 * recordReducer-test.js
 * Created by Kevin Li 9/13/17
 */

import { List } from 'immutable';
import recordReducer from 'redux/reducers/records/recordReducer';

describe('recordReducer', () => {
    describe('BULK_INSERT_RECORD_SET', () => {
        it('should append the inbound data with the existing data set', () => {
            let state = recordReducer({
                awards: new List(['a', 'b'])
            }, {});

            const action = {
                type: 'BULK_INSERT_RECORD_SET',
                field: 'awards',
                data: ['c']
            };

            state = recordReducer(state, action);
            expect(state.awards.toJS()).toEqual(['a', 'b', 'c']);
        });
    });

    describe('CLEAR_RECORDS', () => {
        let state = recordReducer({
            awards: new List(['a', 'b'])
        }, {});

        const action = {
            type: 'CLEAR_RECORDS'
        };

        state = recordReducer(state, action);
        expect(state.awards.toJS()).toEqual([]);
    });
});
