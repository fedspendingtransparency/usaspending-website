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
        type_description: 'asc',
        awarding_agency_name: 'asc',
        awarding_subtier_name: 'asc',
        date_signed: 'desc',
        latest_transaction__assistance_data__face_value_loan_guarantee: 'desc',
        latest_transaction__assistance_data__original_loan_subsidy_cost: 'desc'
    },
    modelMapping: {
        awardId: 'id',
        recipientName: 'recipient__recipient_name',
        startDate: 'period_of_performance_start_date',
        endDate: 'period_of_performance_current_end_date',
        awardAmount: 'total_obligation',
        awardType: 'type_description',
        awardingToptierAgency: 'awarding_agency__toptier_agency__name',
        awardingSubtierAgency: 'awarding_agency__subtier_agency__name',
        issuedDate: 'date_signed',
        loanValue: 'latest_transaction__assistance_data__face_value_loan_guarantee',
        subsidyCost: 'latest_transaction__assistance_data__original_loan_subsidy_cost'
    },
    contracts: {
        _defaultSortField: 'total_obligation',
        _order: [
            'award_id',
            'recipient_name',
            'period_of_performance_start_date',
            'period_of_performance_current_end_date',
            'total_obligation',
            'awarding_agency_name',
            'awarding_subtier_name',
            'type_description'
        ],
        _mapping: {
            award_id: 'awardId',
            recipient_name: 'recipientName',
            period_of_performance_start_date: 'startDate',
            period_of_performance_current_end_date: 'endDate',
            total_obligation: 'awardAmount',
            type_description: 'awardType',
            awarding_agency_name: 'awardingToptierAgency',
            awarding_subtier_name: 'awardingSubtierAgency'
        },
        award_id: 'Award ID',
        recipient_name: 'Recipient Name',
        period_of_performance_start_date: 'Start Date',
        period_of_performance_current_end_date: 'End Date',
        total_obligation: 'Award Amount',
        type_description: 'Contract Award Type',
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
            'type_description'
        ],
        _mapping: {
            award_id: 'awardId',
            recipient_name: 'recipientName',
            period_of_performance_start_date: 'startDate',
            period_of_performance_current_end_date: 'endDate',
            total_obligation: 'awardAmount',
            type_description: 'awardType',
            awarding_agency_name: 'awardingToptierAgency',
            awarding_subtier_name: 'awardingSubtierAgency'
        },
        award_id: 'Award ID',
        recipient_name: 'Recipient Name',
        period_of_performance_start_date: 'Start Date',
        period_of_performance_current_end_date: 'End Date',
        total_obligation: 'Award Amount',
        awarding_agency_name: 'Awarding Agency',
        awarding_subtier_name: 'Awarding Sub Agency',
        type_description: 'Award Type'
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
            'type_description'
        ],
        _mapping: {
            award_id: 'awardId',
            recipient_name: 'recipientName',
            period_of_performance_start_date: 'startDate',
            period_of_performance_current_end_date: 'endDate',
            total_obligation: 'awardAmount',
            type_description: 'awardType',
            awarding_agency_name: 'awardingToptierAgency',
            awarding_subtier_name: 'awardingSubtierAgency'
        },
        award_id: 'Award ID',
        recipient_name: 'Recipient Name',
        period_of_performance_start_date: 'Start Date',
        period_of_performance_current_end_date: 'End Date',
        total_obligation: 'Award Amount',
        awarding_agency_name: 'Awarding Agency',
        awarding_subtier_name: 'Awarding Sub Agency',
        type_description: 'Award Type'
    },
    loans: {
        _defaultSortField: 'latest_transaction__assistance_data__original_loan_subsidy_cost',
        // sortDirection: {
        //     award_id: 'asc',
        //     recipient_name: 'asc',
        //     action_date: 'desc',
        //     face_value_loan_guarantee: 'desc',
        //     original_loan_subsidy_cost: 'desc',
        //     awarding_agency_name: 'asc',
        //     awarding_subtier_name: 'asc'
        // },
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
            award_id: 'awardId',
            recipient_name: 'recipientName',
            action_date: 'issuedDate',
            face_value_loan_guarantee: 'loanValue',
            original_loan_subsidy_cost: 'subsidyCost',
            awarding_agency_name: 'awardingToptierAgency',
            awarding_subtier_name: 'awardingSubtierAgency'
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
            'type_description'
        ],
        _mapping: {
            award_id: 'awardId',
            recipient_name: 'recipientName',
            period_of_performance_start_date: 'startDate',
            period_of_performance_current_end_date: 'endDate',
            total_obligation: 'awardAmount',
            type_description: 'awardType',
            awarding_agency_name: 'awardingToptierAgency',
            awarding_subtier_name: 'awardingSubtierAgency'
        },
        award_id: 'Award ID',
        recipient_name: 'Recipient Name',
        period_of_performance_start_date: 'Start Date',
        period_of_performance_current_end_date: 'End Date',
        total_obligation: 'Award Amount',
        awarding_agency_name: 'Awarding Agency',
        awarding_subtier_name: 'Awarding Sub Agency',
        type_description: 'Award Type'
    }
};
/* eslint-enable max-len */

export default accountTableSearchFields;
