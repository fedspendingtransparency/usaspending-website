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
        _budgetaryResources: 5000000,
        _managingAgency: "Mock Agency",
        _managingAgencyAcronym: "XYZ",
        accountId: 1,
        accountName: "Mock Account",
        accountNumber: "123-4567"
    }, {
        _budgetaryResources: 6500000,
        _managingAgency: "Mock Agency 2",
        _managingAgencyAcronym: "ABC",
        accountId: 2,
        accountName: "Mock Account 2",
        accountNumber: "098-7654"
    }, {
        _budgetaryResources: 4500000,
        _managingAgency: "Mock Agency 3",
        _managingAgencyAcronym: "DEF",
        accountId: 3,
        accountName: "Test Account",
        accountNumber: "234-5678"
    }
];