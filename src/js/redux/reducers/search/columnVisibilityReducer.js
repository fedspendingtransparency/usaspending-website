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
            switch (action.tableType) {
                case `contracts`: {
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
        case 'REORDER_COLUMNS': {
            const tableType = action.tableType;

            const updatedVisible = ColumnVisibilityFuncs.spliceColumnOrder(
                state[`${tableType}`].visibleColumns,
                action.dragIndex, action.hoverIndex);

            switch (action.tableType) {
                case `contracts`: {
                    return Object.assign({}, state, {
                        contracts: {
                            visibleColumns: updatedVisible,
                            hiddenColumns: state[`${tableType}`].hiddenColumns
                        },
                        grants: state.grants,
                        direct_payments: state.direct_payments,
                        loans: state.loans,
                        insurance: state.insurance
                    });
                }
                case `grants`: {
                    return Object.assign({}, state, {
                        contracts: state.contracts,
                        grants: {
                            visibleColumns: updatedVisible,
                            hiddenColumns: state[`${tableType}`].hiddenColumns
                        },
                        direct_payments: state.direct_payments,
                        loans: state.loans,
                        insurance: state.insurance
                    });
                }
                case `direct_payments`: {
                    return Object.assign({}, state, {
                        contracts: state.contracts,
                        grants: state.grants,
                        direct_payments: {
                            visibleColumns: updatedVisible,
                            hiddenColumns: state[`${tableType}`].hiddenColumns
                        },
                        loans: state.loans,
                        insurance: state.insurance
                    });
                }
                case `loans`: {
                    return Object.assign({}, state, {
                        contracts: state.contracts,
                        grants: state.grants,
                        direct_payments: state.direct_payments,
                        loans: {
                            visibleColumns: updatedVisible,
                            hiddenColumns: state[`${tableType}`].hiddenColumns
                        },
                        insurance: state.insurance
                    });
                }
                case `insurance`: {
                    return Object.assign({}, state, {
                        contracts: state.contracts,
                        grants: state.grants,
                        direct_payments: state.direct_payments,
                        loans: state.loans,
                        insurance: {
                            visibleColumns: updatedVisible,
                            hiddenColumns: state[`${tableType}`].hiddenColumns
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
