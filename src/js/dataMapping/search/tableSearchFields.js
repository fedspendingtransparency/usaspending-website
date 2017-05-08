const tableSearchFields = {
    columnWidths: {
        award_id: 160,
        recipient_name: 310,
        period_of_performance_start_date: 150,
        period_of_performance_current_end_date: 150,
        total_obligation: 220,
        type: 230,
        funding_agency_name: 280,
        funding_subtier_name: 280
    },
    defaultSortDirection: {
        award_id: 'asc',
        recipient_name: 'asc',
        period_of_performance_start_date: 'desc',
        period_of_performance_current_end_date: 'desc',
        total_obligation: 'desc',
        type: 'asc',
        funding_agency_name: 'asc',
        funding_subtier_name: 'asc'
    },
    contracts: {
        _defaultSortField: 'total_obligation',
        _order: [
            'award_id',
            'recipient_name',
            'period_of_performance_start_date',
            'period_of_performance_current_end_date',
            'total_obligation',
            'funding_agency_name',
            'funding_subtier_name',
            'type'
        ],
        _requestFields: [
            'id',
            'piid',
            'fain',
            'uri',
            'recipient',
            'period_of_performance_start_date',
            'period_of_performance_current_end_date',
            'total_obligation',
            'type_description',
            'funding_agency'
        ],
        _mapping: {
            award_id: 'piid',
            recipient_name: 'recipient__recipient_name',
            period_of_performance_start_date: 'period_of_performance_start_date',
            period_of_performance_current_end_date: 'period_of_performance_current_end_date',
            total_obligation: 'total_obligation',
            type: 'type',
            funding_agency_name: 'funding_agency__toptier_agency__name',
            funding_subtier_name: 'funding_agency__subtier_agency__name'
        },
        award_id: 'Award ID',
        recipient_name: 'Recipient Name',
        period_of_performance_start_date: 'Start Date',
        period_of_performance_current_end_date: 'End Date',
        total_obligation: 'Award Amount',
        type: 'Award Type',
        funding_agency_name: 'Funding Agency',
        funding_subtier_name: 'Funding Sub-Agency'
    },
    grants: {
        _defaultSortField: 'total_obligation',
        _order: [
            'award_id',
            'recipient_name',
            'period_of_performance_start_date',
            'period_of_performance_current_end_date',
            'total_obligation',
            'funding_agency_name',
            'funding_subtier_name',
            'type'
        ],
        _requestFields: [
            'id',
            'piid',
            'fain',
            'uri',
            'recipient',
            'period_of_performance_start_date',
            'period_of_performance_current_end_date',
            'total_obligation',
            'type_description',
            'funding_agency'
        ],
        _mapping: {
            award_id: 'fain',
            recipient_name: 'recipient__recipient_name',
            period_of_performance_start_date: 'period_of_performance_start_date',
            period_of_performance_current_end_date: 'period_of_performance_current_end_date',
            total_obligation: 'total_obligation',
            type: 'type',
            funding_agency_name: 'funding_agency__toptier_agency__name',
            funding_subtier_name: 'funding_agency__subtier_agency__name'
        },
        award_id: 'Award ID',
        recipient_name: 'Recipient Name',
        period_of_performance_start_date: 'Start Date',
        period_of_performance_current_end_date: 'End Date',
        total_obligation: 'Award Amount',
        type: 'Award Type',
        funding_agency_name: 'Funding Agency',
        funding_subtier_name: 'Funding Sub-Agency'
    },
    direct_payments: {
        _defaultSortField: 'total_obligation',
        _order: [
            'award_id',
            'recipient_name',
            'period_of_performance_start_date',
            'period_of_performance_current_end_date',
            'total_obligation',
            'funding_agency_name',
            'funding_subtier_name',
            'type'
        ],
        _requestFields: [
            'id',
            'piid',
            'fain',
            'uri',
            'recipient',
            'period_of_performance_start_date',
            'period_of_performance_current_end_date',
            'total_obligation',
            'type_description',
            'funding_agency'
        ],
        _mapping: {
            award_id: 'fain',
            recipient_name: 'recipient__recipient_name',
            period_of_performance_start_date: 'period_of_performance_start_date',
            period_of_performance_current_end_date: 'period_of_performance_current_end_date',
            total_obligation: 'total_obligation',
            type: 'type',
            funding_agency_name: 'funding_agency__toptier_agency__name',
            funding_subtier_name: 'funding_agency__subtier_agency__name'
        },
        award_id: 'Award ID',
        recipient_name: 'Recipient Name',
        period_of_performance_start_date: 'Start Date',
        period_of_performance_current_end_date: 'End Date',
        total_obligation: 'Award Amount',
        type: 'Award Type',
        funding_agency_name: 'Funding Agency',
        funding_subtier_name: 'Funding Sub-Agency'
    },
    loans: {
        columnWidths: {
            award_id: 160,
            recipient_name: 310,
            action_date: 150,
            face_value_loan_guarantee: 220,
            original_loan_subsidy_cost: 230,
            funding_agency_name: 280,
            funding_subtier_name: 280
        },
        _defaultSortField: 'face_value_loan_guarantee',
        sortDirection: {
            award_id: 'asc',
            recipient_name: 'asc',
            action_date: 'desc',
            face_value_loan_guarantee: 'desc',
            original_loan_subsidy_cost: 'desc',
            funding_agency_name: 'asc',
            funding_subtier_name: 'asc'
        },
        _order: [
            'award_id',
            'recipient_name',
            'action_date',
            'face_value_loan_guarantee',
            'original_loan_subsidy_cost',
            'funding_agency_name',
            'funding_subtier_name'
        ],
        _requestFields: [
            'id',
            'piid',
            'fain',
            'uri',
            'recipient',
            'action_date',
            'latest_transaction',
            'funding_agency'
        ],
        _mapping: {
            award_id: 'fain',
            recipient_name: 'recipient__recipient_name',
            action_date: 'latest_transaction__action_date',
            face_value_loan_guarantee: 'latest_transaction__assistance_data__face_value_loan_guarantee',
            original_loan_subsidy_cost: 'latest_transaction__assistance_data__original_loan_subsidy_cost',
            funding_agency_name: 'funding_agency__toptier_agency__name',
            funding_subtier_name: 'funding_agency__subtier_agency__name'
        },
        award_id: 'Award ID',
        recipient_name: 'Recipient Name',
        action_date: 'Issued Date',
        face_value_loan_guarantee: 'Loan Value',
        original_loan_subsidy_cost: 'Subsidy Cost',
        funding_agency_name: 'Funding Agency',
        funding_subtier_name: 'Funding Sub-Agency'
    },
    insurance: {
        _defaultSortField: 'total_obligation',
        _order: [
            'award_id',
            'recipient_name',
            'period_of_performance_start_date',
            'period_of_performance_current_end_date',
            'total_obligation',
            'funding_agency_name',
            'funding_subtier_name',
            'type'
        ],
        _requestFields: [
            'id',
            'piid',
            'fain',
            'uri',
            'recipient',
            'period_of_performance_start_date',
            'period_of_performance_current_end_date',
            'total_obligation',
            'type_description',
            'funding_agency'
        ],
        _mapping: {
            award_id: 'fain',
            recipient_name: 'recipient__recipient_name',
            period_of_performance_start_date: 'period_of_performance_start_date',
            period_of_performance_current_end_date: 'period_of_performance_current_end_date',
            total_obligation: 'total_obligation',
            type: 'type',
            funding_agency_name: 'funding_agency__toptier_agency__name',
            funding_subtier_name: 'funding_agency__subtier_agency__name'
        },
        award_id: 'Award ID',
        recipient_name: 'Recipient Name',
        period_of_performance_start_date: 'Start Date',
        period_of_performance_current_end_date: 'End Date',
        total_obligation: 'Award Amount',
        type: 'Award Type',
        funding_agency_name: 'Funding Agency',
        funding_subtier_name: 'Funding Sub-Agency'
    }
};

export default tableSearchFields;
