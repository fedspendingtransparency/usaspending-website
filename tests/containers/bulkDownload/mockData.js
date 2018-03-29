
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
            name: "Agency 1",
            toptier_agency_id: 123,
            cgac_code: "292"
        },
        {
            name: "Agency 2",
            toptier_agency_id: 456,
            cgac_code: "123"
        }
    ],
    other_agencies: [
        {
            name: "Agency 3",
            toptier_agency_id: 789,
            cgac_code: "987"
        },
        {
            name: "Agency 4",
            toptier_agency_id: 321,
            cgac_code: "765"
        }
    ]
};

export const mockSubAgencies = [
    {
        subtier_agency_name: "Subtier Agency 1"
    },
    {
        subtier_agency_name: "Subtier Agency 2"
    }
];

export const mockRedux = {
    params: {
        type: ''
    },
    bulkDownload: {
        dataType: 'awards',
        awards: {
            awardLevels: {
                primeAwards: true,
                subAwards: false
            },
            awardTypes: {
                contracts: false,
                grants: true,
                directPayments: false,
                loans: true,
                otherFinancialAssistance: false
            },
            agency: {
                id: '123',
                name: 'Mock Agency'
            },
            subAgency: {
                name: 'Mock Sub-Agency'
            },
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
            columns: [],
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
    status: "finished",
    total_rows: 1000,
    file_name: "mock_file.zip",
    total_size: 1000,
    total_columns: 200,
    message: null,
    url: "mockurl/mock_file.zip",
    seconds_elapsed: "0.5001"
};

export const mockAwardDownloadResponse = {
    status: "ready",
    total_rows: 1000,
    file_name: "mock_file.zip",
    total_size: 1000,
    total_columns: 200,
    message: null,
    url: "mockurl/mock_file.zip",
    seconds_elapsed: "0.5001"
};

export const mockArchiveResponse = {
    monthly_files: [
        {
            agency_name: "Mock Agency 1",
            agency_acronym: "ABC",
            file_name: "mockFile1.zip",
            updated_date: "1987-12-12",
            fiscal_year: "1988",
            url: "http://mockFile_full.zip"
        },
        {
            agency_name: "Mock Agency 2",
            agency_acronym: "DEF",
            file_name: "mockFile2.zip",
            updated_date: "1987-12-18",
            fiscal_year: "1988",
            url: "http://mockFile_delta.zip"
        }
    ]
};

export const mockParams = {
    type: ''
};