
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
        subtier_agency_name: "Subtier Agency 1",
        subtier_agency_id: 5
    },
    {
        subtier_agency_name: "Subtier Agency 2",
        subtier_agency_id: 6
    }
];

export const mockRedux = {
    bulkDownload: {
        dataType: 'awards',
        awards: {
            award_levels: ['prime_awards'],
            filters: {
                award_types: ['contracts'],
                agency: '',
                sub_agency: '',
                date_type: 'action_date',
                date_range: {
                    start_date: '11-01-2016',
                    end_date: '11-01-2017'
                }
            },
            columns: [],
            file_format: 'csv'
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