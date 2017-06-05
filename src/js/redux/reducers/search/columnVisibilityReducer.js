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
        case `TOGGLE_COLUMN_VISIBILITY`: {
            const updatedVisible = ColumnVisibilityFuncs.toggleItem(
                state[action.tableType].visibleColumns, action.column);
            const updatedHidden = ColumnVisibilityFuncs.toggleItem(
                state[action.tableType].hiddenColumns, action.column);
            return Object.assign({}, state, {
                [action.tableType]: {
                    visibleColumns: updatedVisible,
                    hiddenColumns: updatedHidden
                }
            });
        }
        case 'REORDER_COLUMNS': {
            const tableType = action.tableType;

            const updatedVisible = ColumnVisibilityFuncs.spliceColumnOrder(
                state[`${tableType}`].visibleColumns,
                action.dragIndex, action.hoverIndex);

            return Object.assign({}, state, {
                [action.tableType]: {
                    visibleColumns: updatedVisible,
                    hiddenColumns: state[`${tableType}`].hiddenColumns
                }
            });
        }
        case 'RESET_COLUMN_VISIBILITY': {
            return initialState;
        }
        default:
            return state;
    }
};

export default columnVisibilityReducer;
