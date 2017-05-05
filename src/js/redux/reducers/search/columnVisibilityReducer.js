/**
 * columnVisibilityReducer.js
 * Created by Lizzie Salita 5/04/17
 **/

import { Record, OrderedSet } from 'immutable';

import * as ColumnVisibilityFuncs from './filters/ColumnVisibilityFunctions';

const initialState = {
    visibleColumns: new OrderedSet(
        [
            'award_id',
            'recipient_name',
            'period_of_performance_start_date',
            'period_of_performance_current_end_date',
            'total_obligation',
            'funding_agency_name',
            'funding_subtier_name',
            'type'
        ]
    ),
    hiddenColumns: new OrderedSet()
};

const VisibilityRecord = Record(initialState);

const columnVisibilityReducer = (state = new VisibilityRecord(), action) => {
    switch (action.type) {
        case `TOGGLE_COLUMN_VISIBILITY`: {
            const updatedVisible = ColumnVisibilityFuncs.toggleItem(
                state.visibleColumns, action.column);
            const updatedHidden = ColumnVisibilityFuncs.toggleItem(
                state.hiddenColumns, action.column);
            return Object.assign({}, state, {
                visibleColumns: updatedVisible,
                hiddenColumns: updatedHidden
            });
        }
        case 'RESET_COLUMN_VISIBILITY': {
            return new VisibilityRecord();
        }
        default:
            return state;
    }
};

export default columnVisibilityReducer;
