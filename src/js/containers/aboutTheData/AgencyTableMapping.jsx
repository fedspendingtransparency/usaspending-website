/**
 * AgencyTableMapping.jsx
 * Created by Lizzie Salita 11/25/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { TooltipComponent, TooltipWrapper } from 'data-transparency-ui';
import { columnTooltips } from 'components/aboutTheData/componentMapping/tooltipContentMapping';

const Tooltip = ({
    title,
    id = '',
    position = 'right',
    className = ''
}) => (
    <TooltipWrapper
        icon="info"
        className={className}
        tooltipPosition={position}
        tooltipComponent={
            <TooltipComponent className={title} title={title}>{columnTooltips[id || title]}</TooltipComponent>
        } />
);

Tooltip.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string,
    position: PropTypes.oneOf(['left', 'right']),
    className: PropTypes.string
};
// these are the sub-columns that get removed for each FY
export const publicationsSubColumnPeriodFilters = {
    2020: ['P01 - P02', 'P04', 'P05'],
    2019: ['P01 - P02', 'P04', 'P05', 'P07', 'P08', 'P10', 'P11'],
    2018: ['P01 - P02', 'P04', 'P05', 'P07', 'P08', 'P10', 'P11'],
    2017: ['P01 - P02', 'P03', 'P04', 'P05', 'P07', 'P08', 'P10', 'P11']
};

const publicationsSubColumnFilterFunction = (fy) => (column) => {
    if (column?.subColumnNames) {
        const filteredPeriodColumns = column
            .subColumnNames
            .filter((subColumn) => !publicationsSubColumnPeriodFilters[fy].find((period) => (period === subColumn.displayName)));
        return {
            ...column,
            columnSpan: `${filteredPeriodColumns.length}`,
            subColumnNames: filteredPeriodColumns
        };
    }
    return column;
};

export const parsePeriods = (periods) => periods.map(({ publicationDate }) => (
    <div className="generic-cell-content">
        {(publicationDate) && publicationDate}
        {!publicationDate && "--"}
    </div>
));

export const agenciesTableColumns = {
    publications: (fy) => {
        const columns = [
            { title: 'agency_name', displayName: 'Agency Name' },
            {
                title: 'current_total_budget_authority_amount',
                right: true,
                displayName: 'Percent of Total Federal Budget',
                icon: <Tooltip title="Percent of Total Federal Budget" id="percentOfBudgetPublications" />
            },
            {
                title: 'Q1',
                displayName: `FY ${fy} Q1`,
                columnSpan: '2',
                subColumnNames: [
                    { displayName: 'P01 - P02', title: 'publication_date,2' },
                    { displayName: 'P03', title: 'publication_date,3' }
                ]
            },
            {
                title: 'Q2',
                displayName: `FY ${fy} Q2`,
                columnSpan: '3',
                subColumnNames: [
                    { displayName: 'P04', title: 'publication_date,4' },
                    { displayName: 'P05', title: 'publication_date,5' },
                    { displayName: 'P06', title: 'publication_date,6' }
                ]
            },
            {
                title: 'Q3',
                displayName: `FY ${fy} Q3`,
                columnSpan: '3',
                subColumnNames: [
                    { displayName: 'P07', title: 'publication_date,7' },
                    { displayName: 'P08', title: 'publication_date,8' },
                    { displayName: 'P09', title: 'publication_date,9' }
                ]
            },
            {
                title: 'Q4',
                displayName: `FY ${fy} Q4`,
                columnSpan: '3',
                subColumnNames: [
                    { displayName: 'P10', title: 'publication_date,10' },
                    { displayName: 'P11', title: 'publication_date,11' },
                    { displayName: 'P12', title: 'publication_date,12' }
                ]
            }
        ];
        if (!fy || parseInt(fy, 10) >= 2021) return columns;
        // 2017 removes all Q1 periods, so we remove the quarter
        if (fy === '2017') columns.splice(2, 1);
        return columns.map(publicationsSubColumnFilterFunction(fy));
    },
    submissions: [
        {
            title: 'agency_name',
            displayName: 'Agency Name'
        },
        {
            title: 'current_total_budget_authority_amount',
            displayName: 'Percent of Total Federal Budget',
            right: true,
            icon: <Tooltip title="Percent of Total Federal Budget" id="percentOfBudgetSubmissions" />
        },
        {
            title: 'recent_publication_date',
            displayName: 'Most Recent Update',
            icon: <Tooltip title="Most Recent Update" />
        },
        {
            title: 'missing_tas_accounts_count',
            displayName: 'Number of TASs Missing from Account Balance Data',
            icon: <Tooltip title="Number of TASs Missing from Account Balance Data" position="left" />,
            right: true
        },
        {
            title: 'obligation_difference',
            displayName: 'Reporting Difference in Obligations',
            icon: <Tooltip title="Reporting Difference in Obligations" />,
            right: true
        },
        {
            title: 'unlinked_contract_award_count',
            displayName: 'Number of Unlinked Contract Awards',
            icon: <Tooltip title="Number of Unlinked Contract Awards" className="wide wide_right" />,
            right: true
        },
        {
            title: 'unlinked_assistance_award_count',
            displayName: 'Number of Unlinked Assistance Awards',
            icon: <Tooltip title="Number of Unlinked Assistance Awards" position="left" className="wide wide_left" />,
            right: true
        },
        {
            title: 'assurance_statements',
            displayName: 'Agency Comments',
            icon: <Tooltip title="Agency Comments" position="left" />
        }
    ]
};

export const agencyDetailsColumns = [
    {
        title: 'fiscal_year',
        displayName: 'Reporting Period'
    },
    {
        title: 'percent_of_total_budgetary_resources',
        displayName: 'Percent of Total Federal Budget',
        right: true
    },
    {
        title: 'recent_publication_date',
        displayName: 'Most Recent Update',
        icon: <Tooltip title="Most Recent Update" />
    },
    {
        title: 'missing_tas_accounts_count',
        displayName: 'Number of TASs Missing from Account Balance Data',
        icon: <Tooltip title="Number of TASs Missing from Account Balance Data" />,
        right: true
    },
    {
        title: 'obligation_difference',
        displayName: 'Reporting Difference in Obligations',
        icon: <Tooltip title="Reporting Difference in Obligations" />,
        right: true
    },
    {
        title: 'unlinked_contract_award_count',
        displayName: 'Number of Unlinked Contract Awards',
        icon: <Tooltip title="Number of Unlinked Contract Awards" className="wide wide_right" />,
        right: true
    },
    {
        title: 'unlinked_assistance_award_count',
        displayName: 'Number of Unlinked Assistance Awards',
        icon: <Tooltip title="Number of Unlinked Assistance Awards" position="left" className="wide wide_left" />,
        right: true
    },
    {
        title: 'assurance_statements',
        displayName: 'Agency Comments',
        icon: <Tooltip title="Agency Comments" position="left" />
    }
];
