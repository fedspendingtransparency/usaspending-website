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
            switch (action.tableType) {
                case `contracts`: {
                    const updatedVisible = ColumnVisibilityFuncs.toggleItem(
                        state[action.tableType].visibleColumns, action.column);
                    const updatedHidden = ColumnVisibilityFuncs.toggleItem(
                        state[action.tableType].hiddenColumns, action.column);
                    return Object.assign({}, state, {
                        contracts: {
                            visibleColumns: updatedVisible,
                            hiddenColumns: updatedHidden
                        },
                        grants: state.grants,
                        direct_payments: state.direct_payments,
                        loans: state.loans,
                        insurance: state.insurance
                    });
                }
                case `grants`: {
                    const updatedVisible = ColumnVisibilityFuncs.toggleItem(
                        state[action.tableType].visibleColumns, action.column);
                    const updatedHidden = ColumnVisibilityFuncs.toggleItem(
                        state[action.tableType].hiddenColumns, action.column);
                    return Object.assign({}, state, {
                        contracts: state.contracts,
                        grants: {
                            visibleColumns: updatedVisible,
                            hiddenColumns: updatedHidden
                        },
                        direct_payments: state.direct_payments,
                        loans: state.loans,
                        insurance: state.insurance
                    });
                }
                case `direct_payments`: {
                    const updatedVisible = ColumnVisibilityFuncs.toggleItem(
                        state[action.tableType].visibleColumns, action.column);
                    const updatedHidden = ColumnVisibilityFuncs.toggleItem(
                        state[action.tableType].hiddenColumns, action.column);
                    return Object.assign({}, state, {
                        contracts: state.contracts,
                        grants: state.grants,
                        direct_payments: {
                            visibleColumns: updatedVisible,
                            hiddenColumns: updatedHidden
                        },
                        loans: state.loans,
                        insurance: state.insurance
                    });
                }
                case `loans`: {
                    const updatedVisible = ColumnVisibilityFuncs.toggleItem(
                        state[action.tableType].visibleColumns, action.column);
                    const updatedHidden = ColumnVisibilityFuncs.toggleItem(
                        state[action.tableType].hiddenColumns, action.column);
                    return Object.assign({}, state, {
                        contracts: state.contracts,
                        grants: state.grants,
                        direct_payments: state.direct_payments,
                        loans: {
                            visibleColumns: updatedVisible,
                            hiddenColumns: updatedHidden
                        },
                        insurance: state.insurance
                    });
                }
                case `insurance`: {
                    const updatedVisible = ColumnVisibilityFuncs.toggleItem(
                        state[action.tableType].visibleColumns, action.column);
                    const updatedHidden = ColumnVisibilityFuncs.toggleItem(
                        state[action.tableType].hiddenColumns, action.column);
                    return Object.assign({}, state, {
                        contracts: state.contracts,
                        grants: state.grants,
                        direct_payments: state.direct_payments,
                        loans: state.loans,
                        insurance: {
                            visibleColumns: updatedVisible,
                            hiddenColumns: updatedHidden
                        }
                    });
                }
                default:
                    return state;
            }
        }
        case 'RESET_COLUMN_VISIBILITY': {
            return initialState;
        }
        default:
            return state;
    }
};

export default columnVisibilityReducer;
