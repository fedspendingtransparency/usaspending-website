const tableSearchFields = {
    columnWidths: {
        award_id: 120,
        recipient_name: 270,
        period_of_performance_start_date: 130,
        period_of_performance_current_end_date: 130,
        total_obligation: 160,
        type: 160,
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
        _order: [
            'award_id',
            'recipient_name',
            'period_of_performance_start_date',
            'period_of_performance_current_end_date',
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
        type: 'Award Type',
        funding_agency_name: 'Funding Agency',
        funding_subtier_name: 'Funding Sub-Agency'
    },
    insurance: {
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
