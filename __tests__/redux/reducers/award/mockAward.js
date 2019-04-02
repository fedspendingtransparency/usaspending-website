export const mockAwardResponse = {
    total_metadata: {
        count: 2
    },
    page_metadata: {
        page: 1,
        has_next_page: true
    },
    results: [
        {
            financial_accounts_by_awards_id: 1,
            program_activity_name: 'Reimbursable program activity',
            certified_date: null,
            treasury_account: {
                treasury_account_identifier: 69481,
                tas_rendering_label: '0892017/20180228',
                account_title: 'Departmental Administration, Energy Programs, Energy',
                reporting_agency_id: '089',
                reporting_agency_name: 'Department of Energy'
            },
            program_activity_code: 801,
            object_class: '254',
            transaction_obligations: [{
                transaction_obligated_amount: '-323015.00'
            }]
        }, {
            financial_accounts_by_awards_id: 2,
            program_activity_name: 'Wind Energy',
            certified_date: null,
            treasury_account: {
                treasury_account_identifier: 35975,
                tas_rendering_label: '089X0321',
                account_title: 'Energy Efficiency and Renewable Energy, Energy Programs, Energy',
                reporting_agency_id: '089',
                reporting_agency_name: 'Department of Energy'
            },
            program_activity_code: 102,
            object_class: '254',
            transaction_obligations: [{
                transaction_obligated_amount: '-11522.00'
            }]
        }
    ]
};

export const mockTransactions = [
    {
        id: 40904,
        type: 'D',
        type_description: 'Unknown Type',
        action_date: '11/30/2016',
        action_type: 'C',
        federal_action_obligation: '$4,437,307',
        modification_number: '959',
        description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - TAS::97 4555::TAS - OBLIGATE SPP DOD FUNDING - NOVEMBER 30 2016'
    },
    {
        id: 40905,
        type: 'D',
        type_description: 'Unknown Type',
        action_date: '11/30/2016',
        action_type: 'C',
        federal_action_obligation: '$9,740,762',
        modification_number: '958',
        description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - OBLIGATE $9,740,762.00 IN DOE APPROPRIATED FUNDING AND $4,278,014.31 IN NON-APPROPRIATED FUNDS; CUMULATIVE NA FUNDS - $435,532,331.16.'
    },
    {
        id: 40906,
        type: 'D',
        type_description: 'Unknown Type',
        action_date: '11/17/2016',
        action_type: 'C',
        federal_action_obligation: '$241,000',
        modification_number: '957',
        description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - OBLIGATE $241,000.00 IN DOE APPROPRIATED FUNDING AND $0.00 IN NON-APPROPRIATED FUNDS; CUMULATIVE NA FUNDS - $431,254,316.85.'
    },
    {
        id: 40907,
        type: 'D',
        type_description: 'Unknown Type',
        action_date: '11/10/2016',
        action_type: 'C',
        federal_action_obligation: '$40,000',
        modification_number: '956',
        description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - OBLIGATE $40,000.00 IN DOE APPROPRIATED FUNDING AND $0.00 IN NON-APPROPRIATED FUNDS; CUMULATIVE NA FUNDS - $431,254,316.85.'
    },
    {
        id: 40909,
        type: 'D',
        type_description: 'Unknown Type',
        action_date: '11/7/2016',
        action_type: 'C',
        federal_action_obligation: '$21,007,166',
        modification_number: '955',
        description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - OBLIGATE $21,007,166.00 IN DOE APPROPRIATED FUNDING AND $0.00 IN NON-APPROPRIATED FUNDS; CUMULATIVE NA FUNDS - $431,254,316.85.'
    },
    {
        id: 40908,
        type: 'D',
        type_description: 'Unknown Type',
        action_date: '11/8/2016',
        action_type: 'B',
        federal_action_obligation: '$0',
        modification_number: '954',
        description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - REVISE APPENDIX E TO INCORPORATE RCN OR-66'
    },
    {
        id: 39973,
        type: 'D',
        type_description: 'Definitive Contract',
        action_date: '10/27/2016',
        action_type: null,
        federal_action_obligation: '$1,537,201',
        modification_number: '953',
        description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - TAS::97 0400::TAS - OBLIGATE SPP DOD FUNDING - OCTOBER 27 2016'
    },
    {
        id: 39849,
        type: 'D',
        type_description: 'Definitive Contract',
        action_date: '10/27/2016',
        action_type: null,
        federal_action_obligation: '$25,840,226',
        modification_number: '952',
        description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - OBLIGATE $25,840,225.75 IN DOE APPROPRIATED FUNDING AND $0.00 IN NON-APPROPRIATED FUNDS; CUMULATIVE NA FUNDS - $431,254,316.85.'
    },
    {
        id: 39862,
        type: 'D',
        type_description: 'Definitive Contract',
        action_date: '10/20/2016',
        action_type: null,
        federal_action_obligation: '$154,805,714',
        modification_number: '951',
        description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - OBLIGATE $154,805,714.00 IN DOE APPROPRIATED FUNDING AND $0.00 IN NON-APPROPRIATED FUNDS; CUMULATIVE NA FUNDS - $431,254,316.85.'
    },
    {
        id: 36839,
        type: 'D',
        type_description: 'Definitive Contract',
        action_date: '10/26/2015',
        action_type: null,
        federal_action_obligation: '$498,104',
        modification_number: '913',
        description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - TAS::68 0108::TAS - OBLIGATE SPP EPA FUNDING - OCTOBER 2015'
    },
    {
        id: 36757,
        type: 'D',
        type_description: 'Definitive Contract',
        action_date: '10/26/2015',
        action_type: null,
        federal_action_obligation: '$150,330,700',
        modification_number: '912',
        description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - OBLIGATE $150,330,700.26 IN DOE APPROPRIATED FUNDING; NON-APPROPRIATED FUNDS CURRENT ACTION = $1,523,053.45; NON-APPROPRIATED FUNDS CUMULATIVE SINCE MOD. 234 = $413,663,188.76.'
    },
    {
        id: 36791,
        type: 'D',
        type_description: 'Definitive Contract',
        action_date: '10/15/2015',
        action_type: null,
        federal_action_obligation: '$0',
        modification_number: '911',
        description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - REVISE APPENDIX E TO INCORPORATE RCN OR-62'
    },
    {
        id: 34869,
        type: 'D',
        type_description: 'Definitive Contract',
        action_date: '10/30/2014',
        action_type: null,
        federal_action_obligation: '-$14,274',
        modification_number: '860',
        description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - RECOVERY TAS::89 0227::TAS - DEOBLIGATE SC ARRA FUNDING FROM PROJECT ENTITLED "NUCLEAR PHYSICS - NUCLEAR SCIENCE WORKFORCE"'
    }
];

