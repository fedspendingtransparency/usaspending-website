/**
 * searchOrderReducer-test.js
 * Created by Kevin Li 1/17/17
 */

import Immutable from 'immutable';

import searchOrderReducer, { OrderRecord, initialState } from 'redux/reducers/search/searchOrderReducer';

// NOTE: In this test, we use Immutable's is() comparison function to check for equality between
// Record objects due to internal Immutable Record key/values that cause the objects not to be
// directly comparable to their plain JS objects

describe('searchOrderReducer', () => {
    it('should validate that Immutable.is() is an appropriate comparator', () => {
        const firstValue = new OrderRecord({
            field: 'Award ID',
            direction: 'desc'
        });

        const secondValue = new OrderRecord({
            field: 'recipient_name',
            direction: 'asc'
        });

        const thirdValue = new OrderRecord({
            field: 'Award ID',
            direction: 'desc'
        });

        // different values should return false
        expect(Immutable.is(firstValue, secondValue)).toBeFalsy();
        // first and third values are different instances
        expect(firstValue).not.toBe(thirdValue);
        // but should return true as having the same values
        expect(Immutable.is(firstValue, thirdValue)).toBeTruthy();
    });

    it('should return the correct default state', () => {
        expect(
            Immutable.is(searchOrderReducer(undefined, {}), new OrderRecord())
        ).toBeTruthy();
    });

    describe('SET_SEARCH_ORDER', () => {
        it('should update the search order with the input values', () => {
            const action = {
                type: 'SET_SEARCH_ORDER',
                field: 'recipient_name',
                direction: 'asc'
            };

            const expected = {
                field: 'recipient_name',
                direction: 'asc'
            };

            const updatedState = searchOrderReducer(undefined, action);

            expect(Immutable.is(updatedState, new OrderRecord(expected))).toBeTruthy();
        });
    });

    describe('RESET_SEARCH_ORDER', () => {
        it('should reset the seach order to the initial state', () => {
            const firstAction = {
                type: 'SET_SEARCH_ORDER',
                field: 'recipient_name',
                direction: 'asc'
            };

            const secondAction = {
                type: 'RESET_SEARCH_ORDER'
            };

            const firstExpected = {
                field: 'recipient_name',
                direction: 'asc'
            };

            // modify the state
            let updatedState = searchOrderReducer(undefined, firstAction);
            expect(updatedState.toJS()).toEqual(firstExpected);

            // reset the state
            updatedState = searchOrderReducer(updatedState, secondAction);
            expect(updatedState.toJS()).toEqual(initialState);
        });
    });
});
