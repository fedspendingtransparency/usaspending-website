import { Set } from 'immutable';

export const mockActions = {
    updateDownloadFilter: jest.fn(),
    updateDownloadParam: jest.fn(),
    setDataType: jest.fn(),
    updateAwardDateRange: jest.fn(),
    clearDownloadFilters: jest.fn(),
    setDownloadExpectedFile: jest.fn(),
    setDownloadPending: jest.fn(),
    setDownloadCollapsed: jest.fn(),
    resetDownload: jest.fn()
};

export const mockAgencies = {
    cfo_agencies: [
        {
            name: 'Agency 1',
            toptier_agency_id: 123,
            toptier_code: '292'
        },
        {
            name: 'Agency 2',
            toptier_agency_id: 456,
            toptier_code: '123'
        }
    ],
    other_agencies: [
        {
            name: 'Agency 3',
            toptier_agency_id: 789,
            toptier_code: '987'
        },
        {
            name: 'Agency 4',
            toptier_agency_id: 321,
            toptier_code: '765'
        }
    ]
};

export const mockBudgetFunctions = [
    {
        budget_function_code: "023",
        budget_function_title: "Department of Robots"
    },
    {
        budget_function_code: "052",
        budget_function_title: "Department of Robots 2"
    }
];

export const mockFederalAccounts = [
    {
        account_id: 1,
        account_title: "Account 1"
    },
    {
        account_id: 10,
        account_title: "Account 2"
    }
];

export const mockBudgetSubfunctions = [
    {
        budget_subfunction_code: "032",
        budget_subfunction_title: "Mock Department 1"
    },
    {
        budget_subfunction_code: "023",
        budget_subfunction_title: "Mock Department 2"
    }
];

export const mockSubAgencies = [
    {
        subtier_agency_name: 'Subtier Agency 1'
    },
    {
        subtier_agency_name: 'Subtier Agency 2'
    }
];

export const mockProps = {
    match: {
        params: {
            type: ''
        }
    },
    history: {
        replace: jest.fn()
    },
    bulkDownload: {
        dataType: 'awards',
        awards: {
            awardTypes: {
                primeAwards: new Set(['grants', 'loans']),
                subAwards: new Set(['sub_contracts'])
            },
            agency: {
                id: '123',
                name: 'Mock Agency'
            },
            subAgency: {
                name: 'Mock Sub-Agency'
            },
            agencyType: 'funding_agency',
            locationType: 'recipient_location',
            location: {
                country: {
                    code: 'USA',
                    name: 'United States'
                },
                state: {
                    code: 'HI',
                    name: 'Hawaii'
                }
            },
            dateType: 'action_date',
            dateRange: {
                startDate: '11-01-2016',
                endDate: '11-01-2017'
            },
            defCodes: ["L", "M", "N", "O", "P"],
            columns: [],
            fileFormat: 'csv'
        },
        accounts: {
            accountLevel: 'treasuryAccount',
            federalAccount: {
                id: '212',
                name: 'Mock Federal Account'
            },
            budgetFunction: {
                code: '300',
                title: "Mock Budget Function"
            },
            budgetSubfunction: {
                code: '123',
                title: "Mock Budget Sub Function"
            },
            agency: {
                id: '123',
                name: 'Mock Agency'
            },
            fy: '1989',
            defCodes: ["L", "M", "N", "O", "P"],
            quarter: '1',
            period: '',
            submissionTypes: ['accountBalances'],
            fileFormat: 'csv'
        },
        download: {
            expectedFile: '',
            expectedUrl: '',
            pendingDownload: false,
            showCollapsedProgress: false
        }
    }
};

export const mockStatusResponse = {
    status: 'finished',
    total_rows: 1000,
    file_name: 'mock_file.zip',
    total_size: 1000,
    total_columns: 200,
    message: null,
    url: 'mockurl/mock_file.zip',
    seconds_elapsed: '0.5001'
};

export const mockAwardDownloadResponse = {
    file_name: 'mock_file.zip',
    file_url: 'mockurl/mock_file.zip',
    status_url: 'download/status?file_name=mock_file.zip',
    download_request: { download_details: 'for award' }
};

export const mockArchiveResponse = {
    monthly_files: [
        {
            agency_name: 'Mock Agency 1',
            agency_acronym: 'ABC',
            file_name: 'mockFile1.zip',
            updated_date: '1987-12-12',
            fiscal_year: '1988',
            url: 'http://mockFile_full.zip'
        },
        {
            agency_name: 'Mock Agency 2',
            agency_acronym: 'DEF',
            file_name: 'mockFile2.zip',
            updated_date: '1987-12-18',
            fiscal_year: '1988',
            url: 'http://mockFile_delta.zip'
        }
    ]
};

export const mockParams = {
    type: ''
};
