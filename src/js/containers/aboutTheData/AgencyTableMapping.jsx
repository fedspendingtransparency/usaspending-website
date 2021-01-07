/**
 * agencyTables.js
 * Created by Lizzie Salita 11/25/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { TooltipComponent, TooltipWrapper } from "data-transparency-ui";
import { columnTooltips } from 'components/aboutTheData/dataMapping/tooltipContentMapping';

const Tooltip = ({ title, position = "right" }) => (
    <TooltipWrapper
        icon="info"
        tooltipPosition={position}
        tooltipComponent={(
            <TooltipComponent title={title}>
                {columnTooltips[title]}
            </TooltipComponent>
        )} />
);

Tooltip.propTypes = {
    title: PropTypes.string.isRequired,
    position: PropTypes.oneOf(['left', 'right'])
};

export const agenciesTableColumns = {
    publications: [
        { title: 'name', displayName: 'Agency  Name', icon: <TooltipWrapper icon="info" tooltipComponent={<TooltipComponent title="Test Tooltip"><div>Test content for tooltip</div></TooltipComponent>} /> },
        { title: 'percent_of_total', displayName: 'Percent of Total Federal Budget' },
        {
            title: 'Q1',
            displayName: 'FY 2020 Q1',
            columnSpan: "2",
            subColumnNames: [
                { displayName: 'P1', title: 'P1' },
                { displayName: 'P2', title: 'P2' }
            ]
        },
        {
            title: 'Q2',
            displayName: 'FY 2020 Q2',
            columnSpan: "4",
            subColumnNames: [
                { displayName: 'P3', title: 'P3' },
                { displayName: 'P4', title: 'P4' },
                { displayName: 'P5', title: 'P5' },
                { displayName: 'P6', title: 'P6' }
            ]
        },
        {
            title: 'Q3',
            displayName: 'FY 2020 Q3',
            columnSpan: "3",
            subColumnNames: [
                { displayName: 'P7', title: 'P7' },
                { displayName: 'P8', title: 'P8' },
                { displayName: 'P9', title: 'P9' }
            ]
        },
        {
            title: 'Q4',
            displayName: 'FY 2020 Q4',
            columnSpan: "3",
            subColumnNames: [
                { displayName: 'P10', title: 'P10' },
                { displayName: 'P11', title: 'P11' },
                { displayName: 'P12', title: 'P12' }
            ]
        }
    ],
    submissions: [
        {
            title: "agency_name",
            displayName: "Agency Name"
        },
        {
            title: "current_total_budget_authority_amount",
            displayName: "Percent of Total Federal Budget"
        },
        {
            title: "recent_publication_date_certified",
            displayName: "Most Recent Publication Date",
            icon: (<Tooltip title="Most Recent Update" />)
        },
        {
            title: "tas_obligation_not_in_gtas_total",
            displayName: "Count of Agency TAS in GTAS Not in File A",
            icon: (
                <Tooltip title="Number of TASs Missing in Account Balance Data" />
            )
        },
        {
            title: "obligation_difference",
            displayName: "Difference in File A and File B Obligations"
        },
        {
            title: "unlinked_contract_award_count",
            displayName: "Number of Unlinked Contract Awards"
        },
        {
            title: "unlinked_assistance_award_count",
            displayName: "Count of Unlinked Assistance Awards",
            icon: (
                <Tooltip title="Number of Unlinked Assistance Awards" />
            )
        }
    ]
};

// TODO - delete after API integration
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
