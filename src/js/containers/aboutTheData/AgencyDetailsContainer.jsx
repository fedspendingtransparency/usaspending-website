/**
 * AgencyDetailsContainer.jsx
 */

import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Table, TooltipComponent, TooltipWrapper } from 'data-transparency-ui';
import { throttle } from 'lodash';

import AgencyDownloadLinkCell from 'components/aboutTheData/AgencyDownloadLinkCell';
import CellWithModal from 'components/aboutTheData/CellWithModal';

const Tooltip = ({ title }) => (
    <TooltipComponent title={title}>
        <p>Place holder for tooltip component.</p>
    </TooltipComponent>
);

Tooltip.propTypes = {
    title: PropTypes.string.isRequired
};

const columns = [
    {
        title: "fiscal_year",
        displayName: "Reporting Period"
    },
    {
        title: "total",
        displayName: "Percent of Total Federal Budget",
        icon: (
            <TooltipWrapper
                icon="info"
                tooltipComponent={<Tooltip title="Percent of Total Federal Budget" />} />
        )
    },
    {
        title: "publication_date",
        displayName: "Most Recent Update",
        icon: (
            <TooltipWrapper
                icon="info"
                tooltipComponent={<Tooltip title="Most Recent Update" />} />
        )
    },
    {
        title: "missing_tas_count",
        displayName: "Number of TASs Missing from Account Balance Data",
        icon: (
            <TooltipWrapper
                icon="info"
                tooltipComponent={<Tooltip title="TASs Missing from Account Balance Data" />} />
        )
    },
    {
        title: "obligation_different",
        displayName: "Reporting Difference in Obligations",
        icon: (
            <TooltipWrapper
                icon="info"
                tooltipComponent={<Tooltip title="Reporting Difference in Obligations" />} />
        )
    },
    {
        title: "unlinked_cont_award_count",
        displayName: "Number of Unlinked Contract Awards",
        icon: (
            <TooltipWrapper
                icon="info"
                tooltipComponent={<Tooltip title="Number of Unlinked Contract Awards" />} />
        )
    },
    {
        title: "unlinked_asst_award_count",
        displayName: "Number of Unlinked Assistance Awards",
        icon: (
            <TooltipWrapper
                icon="info"
                tooltipComponent={<Tooltip title="Number of Unlinked Assistance Awards" />} />
        )
    },
    {
        title: "assurance_statements",
        displayName: "Assurance Statements",
        icon: (
            <TooltipWrapper
                icon="info"
                tooltipComponent={<Tooltip title="Assurance Statements" />} />
        )
    }
];

const mockAPIResponse = {
    page_metadata: {
        page: 1,
        hasNext: false,
        hasPrevious: false,
        total: 2
    },
    results: [
        {
            fiscal_year: "FY 2020: Q2 / P06",
            percent_total_budget: 41.23,
            recent_update: "09/29/2020",
            discrepancy_count: 2,
            obligation_difference: 0,
            unlinked_cont_awd: 782,
            unlinked_asst_awd: 5,
            assurance_statement_file: "Raw%20DATA%20Act%20Files/2020/P08/073%20-%20Small%20Business%20Administration%20(SBA)/2020-P08-073_Small%20Business%20Administration%20(SBA)-Assurance_Statement.txt"
        },
        {
            fiscal_year: "FY 2020: P05",
            percent_total_budget: 29.18,
            recent_update: "09/29/2020",
            discrepancy_count: 0,
            obligation_difference: 324.91,
            unlinked_cont_awd: 1176,
            unlinked_asst_awd: 5096,
            assurance_statement_file: "Raw%20DATA%20Act%20Files/2020/P08/073%20-%20Small%20Business%20Administration%20(SBA)/2020-P08-073_Small%20Business%20Administration%20(SBA)-Assurance_Statement.txt"
        },
        {
            fiscal_year: "FY 2020: P04",
            percent_total_budget: 17.04,
            recent_update: "09/29/2020",
            discrepancy_count: 39,
            obligation_difference: 1102064503.38,
            unlinked_cont_awd: 42270,
            unlinked_asst_awd: 979,
            assurance_statement_file: "Raw%20DATA%20Act%20Files/2020/P08/073%20-%20Small%20Business%20Administration%20(SBA)/2020-P08-073_Small%20Business%20Administration%20(SBA)-Assurance_Statement.txt"
        },
        {
            fiscal_year: "FY 2020: Q1 / P03",
            percent_total_budget: 13.62,
            recent_update: "09/28/2020",
            discrepancy_count: 0,
            obligation_difference: 0,
            unlinked_cont_awd: 352,
            unlinked_asst_awd: 6,
            assurance_statement_file: "Raw%20DATA%20Act%20Files/2020/P08/073%20-%20Small%20Business%20Administration%20(SBA)/2020-P08-073_Small%20Business%20Administration%20(SBA)-Assurance_Statement.txt"
        },
        {
            fiscal_year: "FY 2020: P01 - P02",
            percent_total_budget: 9.14,
            recent_update: "10/15/2020",
            discrepancy_count: 1,
            obligation_difference: 240672,
            unlinked_cont_awd: 264,
            unlinked_asst_awd: 377277,
            assurance_statement_file: "Raw%20DATA%20Act%20Files/2020/P08/073%20-%20Small%20Business%20Administration%20(SBA)/2020-P08-073_Small%20Business%20Administration%20(SBA)-Assurance_Statement.txt"
        },
        {
            fiscal_year: "FY 2019: Q4 / P12",
            percent_total_budget: 7.95,
            recent_update: "09/30/2020",
            discrepancy_count: 0,
            obligation_difference: 0,
            unlinked_cont_awd: 30,
            unlinked_asst_awd: 13,
            assurance_statement_file: "Raw%20DATA%20Act%20Files/2020/P08/073%20-%20Small%20Business%20Administration%20(SBA)/2020-P08-073_Small%20Business%20Administration%20(SBA)-Assurance_Statement.txt"
        },
        {
            fiscal_year: "FY 2019: Q3 / P09",
            percent_total_budget: 4.20,
            recent_update: "09/28/2020",
            discrepancy_count: 4,
            obligation_difference: 4850766868.94,
            unlinked_cont_awd: 13898,
            unlinked_asst_awd: 1373279,
            assurance_statement_file: "Raw%20DATA%20Act%20Files/2020/P08/073%20-%20Small%20Business%20Administration%20(SBA)/2020-P08-073_Small%20Business%20Administration%20(SBA)-Assurance_Statement.txt"
        },
        {
            fiscal_year: "FY 2019: Q2 / P06",
            percent_total_budget: 3.49,
            recent_update: "09/29/2020",
            discrepancy_count: 0,
            obligation_difference: 0,
            unlinked_cont_awd: 216,
            unlinked_asst_awd: 0,
            assurance_statement_file: "Raw%20DATA%20Act%20Files/2020/P08/073%20-%20Small%20Business%20Administration%20(SBA)/2020-P08-073_Small%20Business%20Administration%20(SBA)-Assurance_Statement.txt"
        },
        {
            fiscal_year: "FY 2019: Q1 / P03",
            percent_total_budget: 3.36,
            recent_update: "10/22/2020",
            discrepancy_count: 0,
            obligation_difference: 0.18,
            unlinked_cont_awd: 8880,
            unlinked_asst_awd: 68283,
            assurance_statement_file: "Raw%20DATA%20Act%20Files/2020/P08/073%20-%20Small%20Business%20Administration%20(SBA)/2020-P08-073_Small%20Business%20Administration%20(SBA)-Assurance_Statement.txt"
        },
        {
            fiscal_year: "FY 2018: Q4 / P12",
            percent_total_budget: 3.17,
            recent_update: "09/29/2020",
            discrepancy_count: 1,
            obligation_difference: 124086515.13,
            unlinked_cont_awd: 41,
            unlinked_asst_awd: 5738,
            assurance_statement_file: "Raw%20DATA%20Act%20Files/2020/P08/073%20-%20Small%20Business%20Administration%20(SBA)/2020-P08-073_Small%20Business%20Administration%20(SBA)-Assurance_Statement.txt"
        }
    ]
};

const propTypes = {
    // agencyCode: PropTypes.string,
    agencyName: PropTypes.string,
    modalClick: PropTypes.func
};

const AgencyDetailsContainer = ({ modalClick, agencyName }) => {
    const [sortStatus, updateSort] = useState({ field: '', direction: 'asc' });
    const [{ vertical: isVertialSticky, horizontal: isHorizontalSticky }, setIsSticky] = useState({ vertical: false, horizontal: false });
    const tableRef = useRef(null);
    const handleScroll = throttle(() => {
        const { scrollLeft: horizontal, scrollTop: vertical } = tableRef.current;
        setIsSticky({ vertical, horizontal });
    }, 100);

    const handleUpdateSort = (field, direction) => {
        updateSort({ field, direction });
    };

    const verticalStickyClass = isVertialSticky ? 'sticky-y-table' : '';
    const horizontalStickyClass = isHorizontalSticky ? 'sticky-x-table' : '';

    const rows = mockAPIResponse.results.map(
        ({
            fiscal_year: fiscalYear,
            percent_total_budget: total,
            recent_update: recentUpdate,
            discrepancy_count: missingTasCount,
            obligation_difference: obligationDiff,
            unlinked_cont_awd: unlinkedCont,
            unlinked_asst_awd: unlinkedAsst,
            assurance_statement_file: assuranceStatementFile
        }) => [
            (<div className="generic-cell-content">{ fiscalYear }</div>),
            (<div className="generic-cell-content">{ total }</div>),
            (<CellWithModal data={recentUpdate} openModal={modalClick} modalType="publicationDates" agencyName={agencyName} />),
            (<CellWithModal data={missingTasCount} openModal={modalClick} modalType="missingAccountBalance" agencyName={agencyName} />),
            (<div className="generic-cell-content">{ obligationDiff }</div>),
            (<div className="generic-cell-content">{ unlinkedCont }</div>),
            (<div className="generic-cell-content">{ unlinkedAsst }</div>),
            (<div className="generic-cell-content"><AgencyDownloadLinkCell file={assuranceStatementFile} /></div>)
        ]
    );

    return (
        <div className="table-container" ref={tableRef} onScroll={handleScroll}>
            <Table
                rows={rows}
                classNames={`usda-table-w-grid ${verticalStickyClass} ${horizontalStickyClass}`}
                columns={columns}
                updateSort={handleUpdateSort}
                currentSort={sortStatus} />
        </div>
    );
};

AgencyDetailsContainer.propTypes = propTypes;
export default AgencyDetailsContainer;
