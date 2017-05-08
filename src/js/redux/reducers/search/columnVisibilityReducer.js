/**
 * columnVisibilityReducer.js
 * Created by Lizzie Salita 5/04/17
 **/

import { Record, OrderedSet } from 'immutable';

import * as ColumnVisibilityFuncs from './filters/columnVisibilityFunctions';

const initialState = {
    contracts: {
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
    },
    grants: {
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
    },
    direct_payments: {
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
    },
    loans: {
        visibleColumns: new OrderedSet(
            [
                'award_id',
                'recipient_name',
                'action_date',
                'face_value_loan_guarantee',
                'original_loan_subsidy_cost',
                'funding_agency_name',
                'funding_subtier_name'
            ]
        ),
        hiddenColumns: new OrderedSet()
    },
    insurance: {
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
    }
};

const VisibilityRecord = Record(initialState);

const columnVisibilityReducer = (state = new VisibilityRecord(), action) => {
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
            return new VisibilityRecord();
        }
        default:
            return state;
    }
};

export default columnVisibilityReducer;
