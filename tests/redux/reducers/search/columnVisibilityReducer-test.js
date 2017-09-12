/**
 * columnVisibilityReducer-test.js
 * Created by Lizzie Salita 5/18/17
 */

import { OrderedSet } from 'immutable';
import columnVisibilityReducer from 'redux/reducers/search/columnVisibilityReducer';
import initialState from 'redux/reducers/search/columnVisibilityReducerInitialState';

import { mockColumns, mutableVersion } from './mockColumns';

describe('columnVisibilityReducer', () => {
    it('should return the initial state by default', () => {
        expect(
            columnVisibilityReducer(undefined, {})
        ).toEqual(initialState);
    });

    describe('TOGGLE_COLUMN_VISIBILITY', () => {
        it('should make a column hidden if it was visible', () => {
            const action = {
                type: 'TOGGLE_COLUMN_VISIBILITY',
                column: 'Third Column',
                tableType: 'contracts'
            };
            const startingState = columnVisibilityReducer(mockColumns, {});
            expect(startingState.contracts.visibleOrder).toEqual(
                new OrderedSet(['First Column', 'Second Column'])
            );
            expect(startingState.contracts.hiddenOrder).toEqual(
                new OrderedSet(['Third Column', 'Fourth Column'])
            );
            const state = columnVisibilityReducer(startingState, action);
            expect(state.contracts.visibleOrder).toEqual(
                new OrderedSet(['First Column', 'Second Column', 'Third Column'])
            );
            expect(state.contracts.hiddenOrder).toEqual(
                new OrderedSet(['Fourth Column'])
            );
        });
        it('should make a column visible if it was hidden', () => {
            const action = {
                type: 'TOGGLE_COLUMN_VISIBILITY',
                column: 'First Column',
                tableType: 'contracts'
            };
            const startingState = columnVisibilityReducer(mockColumns, {});
            expect(startingState.contracts.visibleOrder).toEqual(
                new OrderedSet(['First Column', 'Second Column'])
            );
            expect(startingState.contracts.hiddenOrder).toEqual(
                new OrderedSet(['Third Column', 'Fourth Column'])
            );
            const state = columnVisibilityReducer(startingState, action);
            expect(state.contracts.visibleOrder).toEqual(
                new OrderedSet(['Second Column'])
            );
            expect(state.contracts.hiddenOrder).toEqual(
                new OrderedSet(['Third Column', 'Fourth Column', 'First Column'])
            );
        });
    });

    describe('RESET_COLUMN_VISIBILITY', () => {
        it('should reset the column visibility to the initial state', () => {
            const startingState = columnVisibilityReducer(mockColumns, {});
            expect(startingState).toEqual(mockColumns);

            const action = {
                type: 'RESET_COLUMN_VISIBILITY'
            };

            // reset the state
            const state = columnVisibilityReducer(startingState, action);
            expect(state).toEqual(initialState);
        });
    });

    describe('REORDER_COLUMNS', () => {
        it('should change the order of the visible columns', () => {
            const startingState = columnVisibilityReducer(mockColumns, {});
            expect(startingState.contracts.visibleOrder).toEqual(
                new OrderedSet(['First Column', 'Second Column'])
            );

            const action = {
                type: 'REORDER_COLUMNS',
                tableType: 'contracts',
                dragIndex: 1,
                hoverIndex: 0
            };

            const state = columnVisibilityReducer(startingState, action);
            expect(state.contracts.visibleOrder).toEqual(
                new OrderedSet(['Second Column', 'First Column'])
            );
        });
    });

    describe('POPULATE_COLUMN_VISIBILITY', () => {
        it('should overwrite the entire store with the given value', () => {
            const startingState = columnVisibilityReducer(undefined, {});
            expect(startingState).toEqual(initialState);

            const action = {
                type: 'POPULATE_COLUMN_VISIBILITY',
                fullSet: {
                    contracts: mutableVersion,
                    grants: mutableVersion,
                    direct_payments: mutableVersion,
                    loans: mutableVersion,
                    other: mutableVersion
                }
            };

            const state = columnVisibilityReducer(startingState, action);
            expect(state).toEqual(mockColumns);
        });
    });
});
