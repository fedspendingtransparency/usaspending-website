export const mockData = {
    data: {
        page: 1,
        limit: 2,
        count: 3,
        fy: '1987',
        results: [
            {
                account_id: 1,
                account_number: '123-4567',
                account_name: 'Mock Account',
                managing_agency: 'Mock Agency',
                managing_agency_acronym: 'XYZ',
                budgetary_resources: 5000000
            },
            {
                account_id: 2,
                account_number: '098-7654',
                account_name: 'Mock Account 2',
                managing_agency: 'Mock Agency 2',
                managing_agency_acronym: 'ABC',
                budgetary_resources: 6500000
            },
            {
                account_id: 3,
                account_number: '234-5678',
                account_name: 'Test Account',
                managing_agency: 'Mock Agency 3',
                managing_agency_acronym: 'DEF',
                budgetary_resources: 4500000
            }
        ]
    }
};

export const mockParsed = [
    {
        "account_id": 1,
        "account_name": "Mock Account",
        "account_number": "123-4567",
        "budgetary_resources": 5000000,
        "display": {
            "account_name": "Mock Account",
            "account_number": "123-4567",
            "budgetary_resources": "$5,000,000",
            "managing_agency": "Mock Agency (XYZ)"
        },
        "managing_agency": "Mock Agency (XYZ)"
    }, {
        "account_id": 2,
        "account_name": "Mock Account 2",
        "account_number": "098-7654",
        "budgetary_resources": 6500000,
        "display": {
            "account_name": "Mock Account 2",
            "account_number": "098-7654",
            "budgetary_resources": "$6,500,000",
            "managing_agency": "Mock Agency 2 (ABC)"
        },
        "managing_agency": "Mock Agency 2 (ABC)"
    }, {
        "account_id": 3,
        "account_name": "Test Account",
        "account_number": "234-5678",
        "budgetary_resources": 4500000,
        "display": {
            "account_name": "Test Account",
            "account_number": "234-5678",
            "budgetary_resources": "$4,500,000",
            "managing_agency": "Mock Agency 3 (DEF)"
        },
        "managing_agency": "Mock Agency 3 (DEF)"
    }
];