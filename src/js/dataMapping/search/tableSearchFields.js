const tableSearchFields = {
    contracts: {
        _order: [
            'piid',
            'recipient_name',
            'period_of_performance_start_date',
            'period_of_performance_end_date',
            'total_obligations',
            'contract_award_type',
            'awarding_agency_name'
        ],
        piid: 'Award ID',
        recipient_name: 'Recipient Name',
        period_of_performance_start_date: 'Start Date',
        period_of_performance_end_date: 'End Date',
        total_obligations: 'Total Funded To-Date',
        contract_award_type: 'Award Type',
        awarding_agency_name: 'Awarding Agency'
    },
    grants: {
        _order: [
            'fain',
            'recipient_name',
            'period_of_performance_start_date',
            'period_of_performance_end_date',
            'total_obligations',
            'financial_assistance_award_type',
            'awarding_agency_name'
        ],
        fain: 'Award ID',
        recipient_name: 'Recipient Name',
        period_of_performance_start_date: 'Start Date',
        period_of_performance_end_date: 'End Date',
        total_obligations: 'Total Funded To-Date',
        financial_assistance_award_type: 'Award Type',
        awarding_agency_name: 'Awarding Agency'
    },
    direct_payments: {
        _order: [
            'fain',
            'recipient_name',
            'period_of_performance_start_date',
            'period_of_performance_end_date',
            'total_obligations',
            'financial_assistance_award_type',
            'awarding_agency_name'
        ],
        fain: 'Award ID',
        recipient_name: 'Recipient Name',
        period_of_performance_start_date: 'Start Date',
        period_of_performance_end_date: 'End Date',
        total_obligations: 'Total Funded To-Date',
        financial_assistance_award_type: 'Award Type',
        awarding_agency_name: 'Awarding Agency'
    },
    loans: {
        _order: [
            'fain',
            'recipient_name',
            'period_of_performance_start_date',
            'period_of_performance_end_date',
            'financial_assistance_award_type',
            'awarding_agency_name'
        ],
        fain: 'Award ID',
        recipient_name: 'Recipient Name',
        period_of_performance_start_date: 'Start Date',
        period_of_performance_end_date: 'End Date',
        financial_assistance_award_type: 'Award Type',
        awarding_agency_name: 'Awarding Agency'
    },
    insurance: {
        _order: [
            'fain',
            'recipient_name',
            'period_of_performance_start_date',
            'period_of_performance_end_date',
            'total_obligations',
            'financial_assistance_award_type',
            'awarding_agency_name'
        ],
        fain: 'Award ID',
        recipient_name: 'Recipient Name',
        period_of_performance_start_date: 'Start Date',
        period_of_performance_end_date: 'End Date',
        total_obligations: 'Total Funded To-Date',
        financial_assistance_award_type: 'Award Type',
        awarding_agency_name: 'Awarding Agency'
    }
};

export default tableSearchFields;
