/**
 * agencyTables.js
 * Created by Lizzie Salita 11/25/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { TooltipComponent, TooltipWrapper } from "data-transparency-ui";

const Tooltip = ({ title }) => (
    <TooltipComponent title={title}>
        <p>Placeholder for tooltip component.</p>
    </TooltipComponent>
);

Tooltip.propTypes = {
    title: PropTypes.string.isRequired
};

export const agenciesTableColumns = {
    dates: [
        { title: 'name', displayName: 'Agency  Name', icon: <TooltipWrapper icon="info" tooltipComponent={<TooltipComponent title="Test Tooltip"><div>Test content for tooltip</div></TooltipComponent>} /> },
        { title: 'total', displayName: 'Total Budgetary  Resources' },
        {
            title: 'Q4',
            displayName: 'FY 2020 Q4',
            columnSpan: "2",
            subColumnNames: [
                { displayName: 'P10', title: 'P10' },
                { displayName: 'P11', title: 'P11' }
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
            title: 'Q2',
            displayName: 'FY 2020 Q2',
            columnSpan: "4",
            subColumnNames: [
                { displayName: 'P6', title: 'P6' },
                { displayName: 'P5', title: 'P5' },
                { displayName: 'P4', title: 'P4' },
                { displayName: 'P3', title: 'P3' }
            ]
        },
        {
            title: 'Q1',
            displayName: 'FY 2020 Q1',
            columnSpan: "2",
            subColumnNames: [
                { displayName: 'P2', title: 'P2' },
                { displayName: 'P1', title: 'P1' }
            ]
        }
    ],
    details: [
        {
            title: "name",
            displayName: "Agency Name"
        },
        {
            title: "total",
            displayName: "Total Budgetary Resources"
        },
        {
            title: "publication_date",
            displayName: "Most Recent Publication Date",
            icon: (
                <TooltipWrapper
                    icon="info"
                    tooltipComponent={<Tooltip title="Most Recent Publication Date" />} />
            )
        },
        {
            title: "tas_not_in_file_a",
            displayName: "Count of Agency TAS in GTAS Not in File A"
        },
        {
            title: "publication_date",
            displayName: "% of Total Amount"
        },
        {
            title: "file_a_b_diff",
            displayName: "Difference in File A and File B Obligations"
        },
        {
            title: "unlinked_asst_award_count",
            displayName: "Count of Unlinked Assistance Awards"
        }
    ]
};

// TODO - delete after API integration
export const mockAPI = {
    dates: {
        page_metadata: {
            page: 1,
            hasNext: false,
            hasPrevious: false,
            total: 2
        },
        results: [
            {
                name: "Department of Health and Human Services",
                abbreviation: "DHHS",
                code: "020",
                current_total_budget_authority_amount: 8361447130497.72,
                periods: [{
                    period: 2,
                    quarter: 1,
                    date: "2020-01-20T11:59:21Z",
                    certified: true,
                    quarterly: false,
                    submitted: true
                }]
            },
            {
                name: "Department of Treasury",
                abbreviation: "DOT",
                code: "021",
                current_total_budget_authority_amount: 8361447130497.72,
                periods: [{
                    period: 2,
                    quarter: 1,
                    date: "2020-01-20T11:59:21Z",
                    certified: false,
                    quarterly: false,
                    submitted: true
                }]
            }
        ]
    },
    details: {
        page_metadata: {
            page: 1,
            hasNext: false,
            hasPrevious: false,
            total: 2
        },
        results: [
            {
                name: "Department of Health and Human Services",
                abbreviation: "DHHS",
                code: "020",
                fiscal_year: 2020,
                fiscal_period: 12,
                current_total_budget_authority_amount: 8361447130497.72,
                recent_publication_date: "2020-01-10T11:59:21Z",
                recent_publication_date_certified: false,
                discrepancy_count: 20,
                obligation_difference: 436376232652.87,
                tas_account_discrepancies_totals: {
                    gtas_obligation_total: 55234,
                    tas_accounts_total: 23923,
                    tas_obligation_not_in_gtas_total: 343345,
                    missing_tas_accounts_count: 20
                }
            },
            {
                name: "Department of Treasury",
                abbreviation: "DOT",
                code: "021",
                fiscal_year: 2020,
                fiscal_period: 9,
                current_total_budget_authority_amount: 8361447130497.72,
                recent_publication_date: null,
                recent_publication_date_certified: true,
                discrepancy_count: 10,
                obligation_difference: 436376232652.87,
                tas_account_discrepancies_totals: {
                    gtas_obligation_total: 55234,
                    tas_accounts_total: 23923,
                    tas_obligation_not_in_gtas_total: 343345,
                    missing_tas_accounts_count: 20
                }
            },
            {
                name: "Department of Treasury",
                abbreviation: "DOT",
                code: "021",
                fiscal_year: 2020,
                fiscal_period: 9,
                current_total_budget_authority_amount: 8361447130497.72,
                recent_publication_date: null,
                recent_publication_date_certified: true,
                discrepancy_count: 10,
                obligation_difference: 436376232652.87,
                tas_account_discrepancies_totals: {
                    gtas_obligation_total: 55234,
                    tas_accounts_total: 23923,
                    tas_obligation_not_in_gtas_total: 343345,
                    missing_tas_accounts_count: 20
                }
            },
            {
                name: "Department of Treasury",
                abbreviation: "DOT",
                code: "021",
                fiscal_year: 2020,
                fiscal_period: 9,
                current_total_budget_authority_amount: 8361447130497.72,
                recent_publication_date: null,
                recent_publication_date_certified: true,
                discrepancy_count: 10,
                obligation_difference: 436376232652.87,
                tas_account_discrepancies_totals: {
                    gtas_obligation_total: 55234,
                    tas_accounts_total: 23923,
                    tas_obligation_not_in_gtas_total: 343345,
                    missing_tas_accounts_count: 20
                }
            },
            {
                name: "Department of Treasury",
                abbreviation: "DOT",
                code: "021",
                fiscal_year: 2020,
                fiscal_period: 9,
                current_total_budget_authority_amount: 8361447130497.72,
                recent_publication_date: null,
                recent_publication_date_certified: true,
                discrepancy_count: 10,
                obligation_difference: 436376232652.87,
                tas_account_discrepancies_totals: {
                    gtas_obligation_total: 55234,
                    tas_accounts_total: 23923,
                    tas_obligation_not_in_gtas_total: 343345,
                    missing_tas_accounts_count: 20
                }
            },
            {
                name: "Department of Treasury",
                abbreviation: "DOT",
                code: "021",
                fiscal_year: 2020,
                fiscal_period: 9,
                current_total_budget_authority_amount: 8361447130497.72,
                recent_publication_date: null,
                recent_publication_date_certified: true,
                discrepancy_count: 10,
                obligation_difference: 436376232652.87,
                tas_account_discrepancies_totals: {
                    gtas_obligation_total: 55234,
                    tas_accounts_total: 23923,
                    tas_obligation_not_in_gtas_total: 343345,
                    missing_tas_accounts_count: 20
                }
            },
            {
                name: "Department of Treasury",
                abbreviation: "DOT",
                code: "021",
                fiscal_year: 2020,
                fiscal_period: 9,
                current_total_budget_authority_amount: 8361447130497.72,
                recent_publication_date: null,
                recent_publication_date_certified: true,
                discrepancy_count: 10,
                obligation_difference: 436376232652.87,
                tas_account_discrepancies_totals: {
                    gtas_obligation_total: 55234,
                    tas_accounts_total: 23923,
                    tas_obligation_not_in_gtas_total: 343345,
                    missing_tas_accounts_count: 20
                }
            },
            {
                name: "Department of Treasury",
                abbreviation: "DOT",
                code: "021",
                fiscal_year: 2020,
                fiscal_period: 9,
                current_total_budget_authority_amount: 8361447130497.72,
                recent_publication_date: null,
                recent_publication_date_certified: true,
                discrepancy_count: 10,
                obligation_difference: 436376232652.87,
                tas_account_discrepancies_totals: {
                    gtas_obligation_total: 55234,
                    tas_accounts_total: 23923,
                    tas_obligation_not_in_gtas_total: 343345,
                    missing_tas_accounts_count: 20
                }
            },
            {
                name: "Department of Treasury",
                abbreviation: "DOT",
                code: "021",
                fiscal_year: 2020,
                fiscal_period: 9,
                current_total_budget_authority_amount: 8361447130497.72,
                recent_publication_date: null,
                recent_publication_date_certified: true,
                discrepancy_count: 10,
                obligation_difference: 436376232652.87,
                tas_account_discrepancies_totals: {
                    gtas_obligation_total: 55234,
                    tas_accounts_total: 23923,
                    tas_obligation_not_in_gtas_total: 343345,
                    missing_tas_accounts_count: 20
                }
            },
            {
                name: "Department of Treasury",
                abbreviation: "DOT",
                code: "021",
                fiscal_year: 2020,
                fiscal_period: 9,
                current_total_budget_authority_amount: 8361447130497.72,
                recent_publication_date: null,
                recent_publication_date_certified: true,
                discrepancy_count: 10,
                obligation_difference: 436376232652.87,
                tas_account_discrepancies_totals: {
                    gtas_obligation_total: 55234,
                    tas_accounts_total: 23923,
                    tas_obligation_not_in_gtas_total: 343345,
                    missing_tas_accounts_count: 20
                }
            },
            {
                name: "Department of Treasury",
                abbreviation: "DOT",
                code: "021",
                fiscal_year: 2020,
                fiscal_period: 9,
                current_total_budget_authority_amount: 8361447130497.72,
                recent_publication_date: null,
                recent_publication_date_certified: true,
                discrepancy_count: 10,
                obligation_difference: 436376232652.87,
                tas_account_discrepancies_totals: {
                    gtas_obligation_total: 55234,
                    tas_accounts_total: 23923,
                    tas_obligation_not_in_gtas_total: 343345,
                    missing_tas_accounts_count: 20
                }
            },
            {
                name: "Department of Treasury",
                abbreviation: "DOT",
                code: "021",
                fiscal_year: 2020,
                fiscal_period: 9,
                current_total_budget_authority_amount: 8361447130497.72,
                recent_publication_date: null,
                recent_publication_date_certified: true,
                discrepancy_count: 10,
                obligation_difference: 436376232652.87,
                tas_account_discrepancies_totals: {
                    gtas_obligation_total: 55234,
                    tas_accounts_total: 23923,
                    tas_obligation_not_in_gtas_total: 343345,
                    missing_tas_accounts_count: 20
                }
            }
        ]
    }
};
