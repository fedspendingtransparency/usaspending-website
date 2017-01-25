const tableSearchFields = {
    columnWidths: {
        id: 130,
        recipient_name: 280,
        period_of_performance_start_date: 120,
        period_of_performance_current_end_date: 120,
        total_obligation: 190,
        type: 200,
        awarding_agency_name: 250
    },
    defaultSortDirection: {
        id: 'asc',
        recipient_name: 'asc',
        period_of_performance_start_date: 'desc',
        period_of_performance_current_end_date: 'desc',
        total_obligation: 'desc',
        type: 'asc',
        awarding_agency_name: 'asc'
    },
    contracts: {
        _order: [
            'id',
            'recipient_name',
            'period_of_performance_start_date',
            'period_of_performance_current_end_date',
            'total_obligation',
            'type',
            'awarding_agency_name'
        ],
        _requestFields: [
            'piid',
            'fain',
            'uri',
            'recipient',
            'period_of_performance_start_date',
            'period_of_performance_current_end_date',
            'total_obligation',
            'type',
            'awarding_agency'
        ],
        _mapping: {
            id: 'piid',
            recipient_name: 'recipient__recipient_name',
            period_of_performance_start_date: 'period_of_performance_start_date',
            period_of_performance_current_end_date: 'period_of_performance_current_end_date',
            total_obligation: 'total_obligation',
            type: 'type',
            awarding_agency_name: 'awarding_agency__toptier_agency__name'
        },
        id: 'Award ID',
        recipient_name: 'Recipient Name',
        period_of_performance_start_date: 'Start Date',
        period_of_performance_current_end_date: 'End Date',
        total_obligation: 'Total Funded To-Date',
        type: 'Award Type',
        awarding_agency_name: 'Awarding Agency'
    },
    grants: {
        _order: [
            'id',
            'recipient_name',
            'period_of_performance_start_date',
            'period_of_performance_current_end_date',
            'total_obligation',
            'type',
            'awarding_agency_name'
        ],
        _requestFields: [
            'piid',
            'fain',
            'uri',
            'recipient',
            'period_of_performance_start_date',
            'period_of_performance_current_end_date',
            'total_obligation',
            'type',
            'awarding_agency'
        ],
        _mapping: {
            id: 'fain',
            recipient_name: 'recipient__recipient_name',
            period_of_performance_start_date: 'period_of_performance_start_date',
            period_of_performance_current_end_date: 'period_of_performance_current_end_date',
            total_obligation: 'total_obligation',
            type: 'type',
            awarding_agency_name: 'awarding_agency__toptier_agency__name'
        },
        id: 'Award ID',
        recipient_name: 'Recipient Name',
        period_of_performance_start_date: 'Start Date',
        period_of_performance_current_end_date: 'End Date',
        total_obligation: 'Total Funded To-Date',
        type: 'Award Type',
        awarding_agency_name: 'Awarding Agency'
    },
    direct_payments: {
        _order: [
            'id',
            'recipient_name',
            'period_of_performance_start_date',
            'period_of_performance_current_end_date',
            'total_obligation',
            'type',
            'awarding_agency_name'
        ],
        _requestFields: [
            'piid',
            'fain',
            'uri',
            'recipient',
            'period_of_performance_start_date',
            'period_of_performance_current_end_date',
            'total_obligation',
            'type',
            'awarding_agency'
        ],
        _mapping: {
            id: 'fain',
            recipient_name: 'recipient__recipient_name',
            period_of_performance_start_date: 'period_of_performance_start_date',
            period_of_performance_current_end_date: 'period_of_performance_current_end_date',
            total_obligation: 'total_obligation',
            type: 'type',
            awarding_agency_name: 'awarding_agency__toptier_agency__name'
        },
        id: 'Award ID',
        recipient_name: 'Recipient Name',
        period_of_performance_start_date: 'Start Date',
        period_of_performance_current_end_date: 'End Date',
        total_obligation: 'Total Funded To-Date',
        type: 'Award Type',
        awarding_agency_name: 'Awarding Agency'
    },
    loans: {
        _order: [
            'id',
            'recipient_name',
            'period_of_performance_start_date',
            'period_of_performance_current_end_date',
            'type',
            'awarding_agency_name'
        ],
        _requestFields: [
            'piid',
            'fain',
            'uri',
            'recipient',
            'period_of_performance_start_date',
            'period_of_performance_current_end_date',
            'total_obligation',
            'type',
            'awarding_agency'
        ],
        _mapping: {
            id: 'fain',
            recipient_name: 'recipient__recipient_name',
            period_of_performance_start_date: 'period_of_performance_start_date',
            period_of_performance_current_end_date: 'period_of_performance_current_end_date',
            total_obligation: 'total_obligation',
            type: 'type',
            awarding_agency_name: 'awarding_agency__toptier_agency__name'
        },
        id: 'Award ID',
        recipient_name: 'Recipient Name',
        period_of_performance_start_date: 'Start Date',
        period_of_performance_current_end_date: 'End Date',
        type: 'Award Type',
        awarding_agency_name: 'Awarding Agency'
    },
    insurance: {
        _order: [
            'id',
            'recipient_name',
            'period_of_performance_start_date',
            'period_of_performance_current_end_date',
            'total_obligation',
            'type',
            'awarding_agency_name'
        ],
        _requestFields: [
            'piid',
            'fain',
            'uri',
            'recipient',
            'period_of_performance_start_date',
            'period_of_performance_current_end_date',
            'total_obligation',
            'type',
            'awarding_agency'
        ],
        _mapping: {
            id: 'fain',
            recipient_name: 'recipient__recipient_name',
            period_of_performance_start_date: 'period_of_performance_start_date',
            period_of_performance_current_end_date: 'period_of_performance_current_end_date',
            total_obligation: 'total_obligation',
            type: 'type',
            awarding_agency_name: 'awarding_agency__toptier_agency__name'
        },
        id: 'Award ID',
        recipient_name: 'Recipient Name',
        period_of_performance_start_date: 'Start Date',
        period_of_performance_current_end_date: 'End Date',
        total_obligation: 'Total Funded To-Date',
        type: 'Award Type',
        awarding_agency_name: 'Awarding Agency'
    }
};

export default tableSearchFields;
