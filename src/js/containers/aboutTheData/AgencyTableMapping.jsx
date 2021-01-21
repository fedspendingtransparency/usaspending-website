/**
 * AgencyTableMapping.jsx
 * Created by Lizzie Salita 11/25/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { TooltipComponent, TooltipWrapper } from 'data-transparency-ui';
import { columnTooltips } from 'components/aboutTheData/dataMapping/tooltipContentMapping';

const Tooltip = ({ title, position = 'right' }) => (
    <TooltipWrapper
        icon="info"
        tooltipPosition={position}
        tooltipComponent={
            <TooltipComponent title={title}>{columnTooltips[title]}</TooltipComponent>
        } />
);

Tooltip.propTypes = {
    title: PropTypes.string.isRequired,
    position: PropTypes.oneOf(['left', 'right'])
};

export const agenciesTableColumns = {
    publications: (fy) => [
        { title: 'agency_name', displayName: 'Agency Name' },
        {
            title: 'current_total_budget_authority_amount',
            displayName: 'Percent of Total Federal Budget'
        },
        {
            title: 'Q1',
            displayName: `FY ${fy} Q1`,
            columnSpan: '3',
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
    ],
    submissions: [
        {
            title: 'agency_name',
            displayName: 'Agency Name'
        },
        {
            title: 'current_total_budget_authority_amount',
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
            displayName: 'Number of TAS Missing from Account Balance Data',
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
            icon: <Tooltip title="Number of Unlinked Contract Awards" />,
            right: true
        },
        {
            title: 'unlinked_assistance_award_count',
            displayName: 'Number of Unlinked Assistance Awards',
            icon: <Tooltip title="Number of Unlinked Assistance Awards" position="left" />,
            right: true
        },
        {
            title: 'assurance_statements',
            displayName: 'Agency Comments',
            icon: <Tooltip title="Agency Comments" position="left" />,
            right: true
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
        title: 'unlinked_cont_award_count',
        displayName: 'Number of Unlinked Contract Awards',
        icon: <Tooltip title="Number of Unlinked Contract Awards" />,
        right: true
    },
    {
        title: 'unlinked_asst_award_count',
        displayName: 'Number of Unlinked Assistance Awards',
        icon: <Tooltip title="Number of Unlinked Assistance Awards" position="left" />,
        right: true
    },
    {
        title: 'assurance_statements',
        displayName: 'Agency Comments',
        icon: <Tooltip title="Agency Comments" position="left" />
    }
];
