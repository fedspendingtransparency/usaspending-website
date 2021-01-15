export const mockAPI = {
    totals: {
        data: {
            results: [
                {
                    total_budgetary_resources: 8361447130497.72,
                    fiscal_year: 2020,
                    fiscal_period: 6
                },
                {
                    total_budgetary_resources: 234525.72,
                    fiscal_year: 2020,
                    fiscal_period: 5
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
                    agency_name: "Department of Health and Human Services",
                    abbreviation: "DHHS",
                    agency_code: "020",
                    current_total_budget_authority_amount: 8361447130497.72,
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
                    agency_name: "Department of Treasury",
                    abbreviation: "DOT",
                    agency_code: "021",
                    current_total_budget_authority_amount: 8361447130497.72,
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
                            period: 3,
                            quarter: 1,
                            submission_dates: {
                                publication_date: "2020-01-20T11:59:21Z",
                                certification_date: "2020-01-21T10:58:21Z"
                            },
                            quarterly: false
                        },
                        {
                            period: 4,
                            quarter: 2,
                            submission_dates: {
                                publication_date: "2020-01-20T11:59:21Z",
                                certification_date: "2020-01-21T10:58:21Z"
                            },
                            quarterly: false
                        },
                        {
                            period: 5,
                            quarter: 2,
                            submission_dates: {
                                publication_date: "2020-01-20T11:59:21Z",
                                certification_date: "2020-01-21T10:58:21Z"
                            },
                            quarterly: false
                        },
                        {
                            period: 6,
                            quarter: 2,
                            submission_dates: {
                                publication_date: "2020-01-20T11:59:21Z",
                                certification_date: "2020-01-21T10:58:21Z"
                            },
                            quarterly: false
                        },
                        {
                            period: 7,
                            quarter: 3,
                            submission_dates: {
                                publication_date: "2020-01-20T11:59:21Z",
                                certification_date: "2020-01-21T10:58:21Z"
                            },
                            quarterly: false
                        },
                        {
                            period: 8,
                            quarter: 3,
                            submission_dates: {
                                publication_date: "2020-01-20T11:59:21Z",
                                certification_date: "2020-01-21T10:58:21Z"
                            },
                            quarterly: false
                        },
                        {
                            period: 9,
                            quarter: 3,
                            submission_dates: {
                                publication_date: "2020-01-20T11:59:21Z",
                                certification_date: "2025-01-21T10:58:21Z"
                            },
                            quarterly: false
                        },
                        {
                            period: 10,
                            quarter: 4,
                            submission_dates: {
                                publication_date: null,
                                certification_date: null
                            },
                            quarterly: false
                        },
                        {
                            period: 11,
                            quarter: 4,
                            submission_dates: {
                                publication_date: null,
                                certification_date: null
                            },
                            quarterly: false
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
                    agency_name: "Department of Health and Human Services",
                    abbreviation: "DHHS",
                    agency_code: "020",
                    agency_id: 123,
                    current_total_budget_authority_amount: 8361447130497.72,
                    recent_publication_date: "2020-01-10T11:59:21Z",
                    recent_publication_date_certified: false,
                    tas_account_discrepancies_totals: {
                        gtas_obligation_total: 55234,
                        tas_accounts_total: 23923,
                        tas_obligation_not_in_gtas_total: 343345,
                        missing_tas_accounts_count: 20
                    },
                    obligation_difference: 436376232652.87
                },
                {
                    agency_name: "Department of Treasury",
                    abbreviation: "DOT",
                    agency_code: "021",
                    agency_id: 789,
                    current_total_budget_authority_amount: 8361447130497.72,
                    recent_publication_date: null,
                    recent_publication_date_certified: true,
                    tas_account_discrepancies_totals: {
                        gtas_obligation_total: 66432,
                        tas_accounts_total: 23913,
                        tas_obligation_not_in_gtas_total: 11543,
                        missing_tas_accounts_count: 10
                    },
                    obligation_difference: 436376232652.87
                },
                {
                    agency_name: "Department of Treasury",
                    abbreviation: "DOT",
                    agency_code: "021",
                    agency_id: 789,
                    current_total_budget_authority_amount: 8361447130497.72,
                    recent_publication_date: null,
                    recent_publication_date_certified: true,
                    tas_account_discrepancies_totals: {
                        gtas_obligation_total: 66432,
                        tas_accounts_total: 23913,
                        tas_obligation_not_in_gtas_total: 11543,
                        missing_tas_accounts_count: 10
                    },
                    obligation_difference: 436376232652.87
                },
                {
                    agency_name: "Department of Treasury",
                    abbreviation: "DOT",
                    agency_code: "021",
                    agency_id: 789,
                    current_total_budget_authority_amount: 8361447130497.72,
                    recent_publication_date: null,
                    recent_publication_date_certified: true,
                    tas_account_discrepancies_totals: {
                        gtas_obligation_total: 66432,
                        tas_accounts_total: 23913,
                        tas_obligation_not_in_gtas_total: 11543,
                        missing_tas_accounts_count: 10
                    },
                    obligation_difference: 436376232652.87
                },
                {
                    agency_name: "Department of Treasury",
                    abbreviation: "DOT",
                    agency_code: "021",
                    agency_id: 789,
                    current_total_budget_authority_amount: 8361447130497.72,
                    recent_publication_date: null,
                    recent_publication_date_certified: true,
                    tas_account_discrepancies_totals: {
                        gtas_obligation_total: 66432,
                        tas_accounts_total: 23913,
                        tas_obligation_not_in_gtas_total: 11543,
                        missing_tas_accounts_count: 10
                    },
                    obligation_difference: 436376232652.87
                },
                {
                    agency_name: "Department of Treasury",
                    abbreviation: "DOT",
                    agency_code: "021",
                    agency_id: 789,
                    current_total_budget_authority_amount: 8361447130497.72,
                    recent_publication_date: null,
                    recent_publication_date_certified: true,
                    tas_account_discrepancies_totals: {
                        gtas_obligation_total: 66432,
                        tas_accounts_total: 23913,
                        tas_obligation_not_in_gtas_total: 11543,
                        missing_tas_accounts_count: 10
                    },
                    obligation_difference: 436376232652.87
                },
                {
                    agency_name: "Department of Treasury",
                    abbreviation: "DOT",
                    agency_code: "021",
                    agency_id: 789,
                    current_total_budget_authority_amount: 8361447130497.72,
                    recent_publication_date: null,
                    recent_publication_date_certified: true,
                    tas_account_discrepancies_totals: {
                        gtas_obligation_total: 66432,
                        tas_accounts_total: 23913,
                        tas_obligation_not_in_gtas_total: 11543,
                        missing_tas_accounts_count: 10
                    },
                    obligation_difference: 436376232652.87
                },
                {
                    agency_name: "Department of Treasury",
                    abbreviation: "DOT",
                    agency_code: "021",
                    agency_id: 789,
                    current_total_budget_authority_amount: 8361447130497.72,
                    recent_publication_date: null,
                    recent_publication_date_certified: true,
                    tas_account_discrepancies_totals: {
                        gtas_obligation_total: 66432,
                        tas_accounts_total: 23913,
                        tas_obligation_not_in_gtas_total: 11543,
                        missing_tas_accounts_count: 10
                    },
                    obligation_difference: 436376232652.87
                },
                {
                    agency_name: "Department of Treasury",
                    abbreviation: "DOT",
                    agency_code: "021",
                    agency_id: 789,
                    current_total_budget_authority_amount: 8361447130497.72,
                    recent_publication_date: null,
                    recent_publication_date_certified: true,
                    tas_account_discrepancies_totals: {
                        gtas_obligation_total: 66432,
                        tas_accounts_total: 23913,
                        tas_obligation_not_in_gtas_total: 11543,
                        missing_tas_accounts_count: 10
                    },
                    obligation_difference: 436376232652.87
                },
                {
                    agency_name: "Department of Treasury",
                    abbreviation: "DOT",
                    agency_code: "021",
                    agency_id: 789,
                    current_total_budget_authority_amount: 8361447130497.72,
                    recent_publication_date: null,
                    recent_publication_date_certified: true,
                    tas_account_discrepancies_totals: {
                        gtas_obligation_total: 66432,
                        tas_accounts_total: 23913,
                        tas_obligation_not_in_gtas_total: 11543,
                        missing_tas_accounts_count: 10
                    },
                    obligation_difference: 436376232652.87
                }
            ]
        }
    }
};
