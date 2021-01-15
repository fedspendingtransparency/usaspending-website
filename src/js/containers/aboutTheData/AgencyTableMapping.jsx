/**
 * AgencyTableMapping.jsx
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
        { title: 'agency_name', displayName: 'Agency  Name', icon: <TooltipWrapper icon="info" tooltipComponent={<TooltipComponent title="Test Tooltip"><div>Test content for tooltip</div></TooltipComponent>} /> },
        { title: 'current_total_budget_authority_amount', displayName: 'Percent of Total Federal Budget' },
        {
            title: 'Q1',
            displayName: 'FY 2020 Q1',
            columnSpan: "2",
            subColumnNames: [
                { displayName: 'P1', title: 'publication_date,1' },
                { displayName: 'P2', title: 'publication_date,2' }
            ]
        },
        {
            title: 'Q2',
            displayName: 'FY 2020 Q2',
            columnSpan: "4",
            subColumnNames: [
                { displayName: 'P3', title: 'publication_date,3' },
                { displayName: 'P4', title: 'publication_date,4' },
                { displayName: 'P5', title: 'publication_date,5' },
                { displayName: 'P6', title: 'publication_date,6' }
            ]
        },
        {
            title: 'Q3',
            displayName: 'FY 2020 Q3',
            columnSpan: "3",
            subColumnNames: [
                { displayName: 'P7', title: 'publication_date,7' },
                { displayName: 'P8', title: 'publication_date,8' },
                { displayName: 'P9', title: 'publication_date,9' }
            ]
        },
        {
            title: 'Q4',
            displayName: 'FY 2020 Q4',
            columnSpan: "3",
            subColumnNames: [
                { displayName: 'P10', title: 'publication_date,10' },
                { displayName: 'P11', title: 'publication_date,11' },
                { displayName: 'P12', title: 'publication_date,12' }
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
        },
        {
            title: "assurance_statements",
            displayName: "Agency Comments",
            icon: (
                <Tooltip title="Agency Comments" position="left" />
            )
        }
    ]
};
