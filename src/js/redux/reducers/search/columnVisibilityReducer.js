/**
 * columnVisibilityReducer.js
 * Created by Lizzie Salita 5/04/17
 **/

import { OrderedSet } from 'immutable';

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
        hiddenColumns: new OrderedSet(
            [
                'description',
                'date_signed',
                'potential_total_value_of_award',
                'awarding_agency_name',
                'awarding_subtier_name',
                'awarding_office_name',
                'funding_office_name',
                'recipient_street',
                'recipient_country',
                'recipient_state_province',
                'recipient_county',
                'recipient_city',
                'recipient_zip_postal',
                'pop_city',
                'pop_zip',
                'pop_country',
                'pop_state_province',
                'recipient_duns',
                'recipient_parent_duns',
                'type_of_contract_pricing',
                'recipient_congressional_district',
                'recipient_phone',
                'recipient_fax',
                'pop_congressional_district',
                'pop_county',
                'contract_parent_id',
                'contract_idv_type',
                'contract_idc_type',
                'contract_idv_agency_id',
                'contract_multiple_idv',
                'contract_solicitation_id',
                'contract_solicitation_procedures',
                'contract_number_offers',
                'contract_extent_competed',
                'contract_set_aside_type',
                'contract_commercial_acquisition_procedures',
                'contract_commercial_test_program',
                'contract_evaluated_preference',
                'contract_fed_biz_opps',
                'contract_small_business_competitiveness_demo',
                'contract_psc_code',
                'contract_naics_code',
                'contract_naics_description',
                'contract_dod_claimant_code',
                'contract_program_system_or_equipment_code',
                'contract_it_commercial_category',
                'contract_sea_transport',
                'contract_clinger_cohen_act',
                'contract_davis_bacon_act',
                'contract_service_contract_act',
                'contract_walsh_healey_act',
                'contract_consolidated',
                'contract_cost_or_pricing_data',
                'contract_domestic_or_foreign',
                'contract_fair_opportunity_limited_sources',
                'contract_foreign_funding',
                'contract_interagency_contacting_authority',
                'contract_major_program',
                'contract_multi_year_contract',
                'contract_price_evaluation_adjustment_preference',
                'contract_program_acronym',
                'contract_purchase_card_as_payment_method',
                'contract_subcontracting_plan'
            ]
        )
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
