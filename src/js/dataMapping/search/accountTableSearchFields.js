/**
 * accountTableSearchFields.js
 * Created by michaelbray on 1/16/18.
 *
 */

/* eslint-disable max-len */
const accountTableSearchFields = {
    defaultSortDirection: {
        award_id: 'asc',
        recipient_name: 'asc',
        period_of_performance_start_date: 'desc',
        period_of_performance_current_end_date: 'desc',
        total_obligation: 'desc',
        type: 'asc',
        awarding_agency_name: 'asc',
        awarding_subtier_name: 'asc',
        face_value_loan_guarantee: 'desc'
    },
    contracts: {
        _defaultSortField: 'total_obligation',
        _order: [
            'award_id',
            'recipient_name',
            'period_of_performance_start_date',
            'period_of_performance_current_end_date',
            'total_obligation',
            'type',
            'awarding_agency_name',
            'awarding_subtier_name'
        ],
        _mapping: {
            award_id: 'piid',
            recipient_name: 'recipient__recipient_name',
            period_of_performance_start_date: 'period_of_performance_start_date',
            period_of_performance_current_end_date: 'period_of_performance_current_end_date',
            total_obligation: 'total_obligation',
            type: 'type_description',
            awarding_agency_name: 'awarding_agency__toptier_agency__name',
            awarding_subtier_name: 'awarding_agency__subtier_agency__name'
        },
        award_id: 'Award ID',
        recipient_name: 'Recipient Name',
        period_of_performance_start_date: 'Start Date',
        period_of_performance_current_end_date: 'End Date',
        total_obligation: 'Award Amount',
        type: 'Contract Award Type',
        awarding_agency_name: 'Awarding Agency',
        awarding_subtier_name: 'Awarding Sub Agency'
    },
    grants: {
        _defaultSortField: 'total_obligation',
        _order: [
            'award_id',
            'recipient_name',
            'period_of_performance_start_date',
            'period_of_performance_current_end_date',
            'total_obligation',
            'awarding_agency_name',
            'awarding_subtier_name',
            'type'
        ],
        _mapping: {
            award_id: 'fain',
            recipient_name: 'recipient__recipient_name',
            period_of_performance_start_date: 'period_of_performance_start_date',
            period_of_performance_current_end_date: 'period_of_performance_current_end_date',
            total_obligation: 'total_obligation',
            type: 'type',
            awarding_agency_name: 'awarding_agency__toptier_agency__name',
            awarding_subtier_name: 'awarding_agency__subtier_agency__name'
        },
        award_id: 'Award ID',
        recipient_name: 'Recipient Name',
        period_of_performance_start_date: 'Start Date',
        period_of_performance_current_end_date: 'End Date',
        total_obligation: 'Award Amount',
        awarding_agency_name: 'Awarding Agency',
        awarding_subtier_name: 'Awarding Sub Agency',
        type: 'Award Type'
    },
    direct_payments: {
        _defaultSortField: 'total_obligation',
        _order: [
            'award_id',
            'recipient_name',
            'period_of_performance_start_date',
            'period_of_performance_current_end_date',
            'total_obligation',
            'awarding_agency_name',
            'awarding_subtier_name',
            'type'
        ],
        _mapping: {
            award_id: 'fain',
            recipient_name: 'recipient__recipient_name',
            period_of_performance_start_date: 'period_of_performance_start_date',
            period_of_performance_current_end_date: 'period_of_performance_current_end_date',
            total_obligation: 'total_obligation',
            type: 'type',
            awarding_agency_name: 'awarding_agency__toptier_agency__name',
            awarding_subtier_name: 'awarding_agency__subtier_agency__name'
        },
        award_id: 'Award ID',
        recipient_name: 'Recipient Name',
        period_of_performance_start_date: 'Start Date',
        period_of_performance_current_end_date: 'End Date',
        total_obligation: 'Award Amount',
        awarding_agency_name: 'Awarding Agency',
        awarding_subtier_name: 'Awarding Sub Agency',
        type: 'Award Type'
    },
    loans: {
        _defaultSortField: 'face_value_loan_guarantee',
        sortDirection: {
            award_id: 'asc',
            recipient_name: 'asc',
            action_date: 'desc',
            face_value_loan_guarantee: 'desc',
            original_loan_subsidy_cost: 'desc',
            awarding_agency_name: 'asc',
            awarding_subtier_name: 'asc'
        },
        _order: [
            'award_id',
            'recipient_name',
            'action_date',
            'face_value_loan_guarantee',
            'original_loan_subsidy_cost',
            'awarding_agency_name',
            'awarding_subtier_name'
        ],
        _mapping: {
            award_id: 'fain',
            recipient_name: 'recipient__recipient_name',
            action_date: 'latest_transaction__action_date',
            face_value_loan_guarantee: 'latest_transaction__assistance_data__face_value_loan_guarantee',
            original_loan_subsidy_cost: 'latest_transaction__assistance_data__original_loan_subsidy_cost',
            awarding_agency_name: 'awarding_agency__toptier_agency__name',
            awarding_subtier_name: 'awarding_agency__subtier_agency__name'
        },
        award_id: 'Award ID',
        recipient_name: 'Recipient Name',
        action_date: 'Issued Date',
        face_value_loan_guarantee: 'Loan Value',
        original_loan_subsidy_cost: 'Subsidy Cost',
        awarding_agency_name: 'Awarding Agency',
        awarding_subtier_name: 'Awarding Sub Agency'
    },
    other: {
        _defaultSortField: 'total_obligation',
        _order: [
            'award_id',
            'recipient_name',
            'period_of_performance_start_date',
            'period_of_performance_current_end_date',
            'total_obligation',
            'awarding_agency_name',
            'awarding_subtier_name',
            'type'
        ],
        _mapping: {
            award_id: 'fain',
            recipient_name: 'recipient__recipient_name',
            period_of_performance_start_date: 'period_of_performance_start_date',
            period_of_performance_current_end_date: 'period_of_performance_current_end_date',
            total_obligation: 'total_obligation',
            type: 'type',
            awarding_agency_name: 'awarding_agency__toptier_agency__name',
            awarding_subtier_name: 'awarding_agency__subtier_agency__name'
        },
        award_id: 'Award ID',
        recipient_name: 'Recipient Name',
        period_of_performance_start_date: 'Start Date',
        period_of_performance_current_end_date: 'End Date',
        total_obligation: 'Award Amount',
        awarding_agency_name: 'Awarding Agency',
        awarding_subtier_name: 'Awarding Sub Agency',
        type: 'Award Type'
    }
};
/* eslint-enable max-len */

export default accountTableSearchFields;
