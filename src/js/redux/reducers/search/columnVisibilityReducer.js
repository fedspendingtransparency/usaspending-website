/**
 * columnVisibilityReducer.js
 * Created by Lizzie Salita 5/04/17
 **/

import { Record } from 'immutable';

import * as ColumnVisibilityFuncs from './filters/ColumnVisibilityFunctions';

import initialState from './columnVisibilityReducerInitialState';

export const VisibilityRecord = Record(initialState);

const columnVisibilityReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_COLUMN_VISIBILITY': {
            const updatedVisible = ColumnVisibilityFuncs.toggleItem(
                state[action.tableType].visibleOrder, action.column);
            const updatedHidden = ColumnVisibilityFuncs.toggleItem(
                state[action.tableType].hiddenOrder, action.column);

            const updatedTableType = Object.assign({}, state[action.tableType], {
                visibleOrder: updatedVisible,
                hiddenOrder: updatedHidden
            });

            return Object.assign({}, state, {
                [action.tableType]: updatedTableType
            });
        }
        case 'REORDER_COLUMNS': {
            const tableType = action.tableType;

            const updatedVisible = ColumnVisibilityFuncs.spliceColumnOrder(
                state[`${tableType}`].visibleOrder,
                action.dragIndex, action.hoverIndex);

            const updatedTableType = Object.assign({}, state[action.tableType], {
                visibleOrder: updatedVisible
            });

            return Object.assign({}, state, {
                [action.tableType]: updatedTableType
            });
        }
        case 'POPULATE_COLUMN_VISIBILITY': {
            // overwrite the entire store with a given value
            const immutableSet = ColumnVisibilityFuncs.convertDataSetToImmutable(action.fullSet);
            return Object.assign({}, immutableSet);
        }
        case 'RESET_COLUMN_VISIBILITY': {
            return initialState;
        }
        default:
            return state;
    }
};

export default columnVisibilityReducer;
