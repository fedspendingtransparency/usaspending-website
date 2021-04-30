export const mockAPI = {
    totals: {
        data: {
            results: [
                {
                    total_budgetary_resources: 8000.72,
                    fiscal_year: 2020,
                    fiscal_period: 6
                },
                {
                    total_budgetary_resources: 4000.00,
                    fiscal_year: 2020,
                    fiscal_period: 5
                },
                {
                    total_budgetary_resources: 10000,
                    fiscal_year: 2020,
                    fiscal_period: 7
                },
                {
                    total_budgetary_resources: 10002,
                    fiscal_year: 2000,
                    fiscal_period: 8
                }
            ]
        }
    },
    publications: {
        data: {
            page_metadata: {
                page: 1,
                hasNext: false,
                limit: 10,
                hasPrevious: false,
                total: 2
            },
            results: [
                {
                    agency_name: "Mock Agency",
                    abbreviation: "ABC",
                    toptier_code: "020",
                    current_total_budget_authority_amount: 8000.72,
                    periods: [
                        {
                            period: 2,
                            quarter: 1,
                            submission_dates: {
                                publication_date: "2020-01-20T11:59:21Z",
                                certification_date: "2020-01-21T10:58:21Z"
                            },
                            quarterly: false
                        }
                    ]
                },
                {
                    agency_name: "Mock Agency",
                    abbreviation: "ABC",
                    toptier_code: "123",
                    current_total_budget_authority_amount: 8000.72,
                    periods: [
                        {
                            period: 1,
                            quarter: 1,
                            submission_dates: {
                                publication_date: "2020-01-20T11:59:21Z",
                                certification_date: "2020-01-21T10:58:21Z"
                            },
                            quarterly: true
                        },
                        {
                            period: 2,
                            quarter: 1,
                            submission_dates: {
                                publication_date: "2020-01-20T11:59:21Z",
                                certification_date: "2020-01-21T10:58:21Z"
                            },
                            quarterly: true
                        },
                        {
                            period: 12,
                            quarter: 4,
                            submission_dates: {
                                publication_date: null,
                                certification_date: null
                            },
                            quarterly: false
                        }
                    ]
                }
            ]
        }
    },
    submissions: {
        data: {
            page_metadata: {
                page: 1,
                hasNext: false,
                hasPrevious: false,
                limit: 10,
                total: 2
            },
            results: [
                {
                    agency_name: "Mock Agency",
                    abbreviation: "ABC",
                    toptier_code: "123",
                    agency_id: 123,
                    current_total_budget_authority_amount: 8000.72,
                    recent_publication_date: "2020-01-10T11:59:21Z",
                    recent_publication_date_certified: false,
                    tas_account_discrepancies_totals: {
                        gtas_obligation_total: 50000,
                        tas_accounts_total: 23923,
                        tas_obligation_not_in_gtas_total: 343345,
                        missing_tas_accounts_count: 2000
                    },
                    obligation_difference: 4000.00,
                    unlinked_contract_award_count: 20002,
                    unlinked_assistance_award_count: 10001,
                    assurance_statement_url: 'https://files.usaspending.gov/agency_submissions/Raw%20DATA%20Act%20Files/2020/Q1/MockAgency(ABC)-Assurance_Statement.txt'
                },
                {
                    agency_name: "Mock Agency 2",
                    abbreviation: "XYZ",
                    toptier_code: "456",
                    agency_id: 789,
                    current_total_budget_authority_amount: 8000.72,
                    recent_publication_date: null,
                    recent_publication_date_certified: true,
                    tas_account_discrepancies_totals: {
                        gtas_obligation_total: 60000,
                        tas_accounts_total: 23913,
                        tas_obligation_not_in_gtas_total: 11543,
                        missing_tas_accounts_count: 1000
                    },
                    obligation_difference: 4000.00,
                    unlinked_contract_award_count: 20002,
                    unlinked_assistance_award_count: 10001,
                    assurance_statement_url: 'https://files.usaspending.gov/agency_submissions/Raw%20DATA%20Act%20Files/2020/Q1/MockAgency(ABC)-Assurance_Statement.txt'
                }
            ]
        }
    }
};

export const mockReportingPeriodRow = {
    data: {
        page_metadata: {
            page: 1,
            hasNext: false,
            hasPrevious: false,
            limit: 10,
            total: 2
        },
        results: [
            {
                fiscal_year: 2020,
                fiscal_period: 12,
                current_total_budget_authority_amount: 8000.72,
                recent_publication_date: "2020-01-10T11:59:21Z",
                recent_publication_date_certified: false,
                tas_account_discrepancies_totals: {
                    gtas_obligation_total: 55234,
                    tas_accounts_total: 23923,
                    tas_obligation_not_in_gtas_total: 343345,
                    missing_tas_accounts_count: 20
                },
                percent_of_total_budgetary_resources: 2.1,
                obligation_difference: 4000.00,
                unlinked_contract_award_count: 20002,
                unlinked_assistance_award_count: 10001,
                assurance_statement_url: 'https://files.usaspending.gov/agency_submissions/Raw%20DATA%20Act%20Files/2020/Q1/MockAgency(ABC)-Assurance_Statement.txt'
            }
        ]
    }
};
