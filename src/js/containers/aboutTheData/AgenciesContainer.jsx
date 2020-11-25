import React, { useRef, useState } from "react";
import PropTypes from 'prop-types';
import { Table, TooltipComponent, TooltipWrapper } from "data-transparency-ui";
import { throttle } from 'lodash';

import DrilldownCell from 'components/aboutTheData/DrilldownCell';
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
            name: "Department of Health and Human Services",
            abbreviation: "DHHS",
            code: "020",
            fiscal_year: 2020,
            fiscal_period: 12,
            current_total_budget_authority_amount: 8361447130497.72,
            recent_publication_date: "2020-01-10T11:59:21Z",
            recent_publication_date_certified: false,
            discrepancy_count: 20,
            obligation_difference: 436376232652.87
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
            obligation_difference: 436376232652.87
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
            obligation_difference: 436376232652.87
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
            obligation_difference: 436376232652.87
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
            obligation_difference: 436376232652.87
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
            obligation_difference: 436376232652.87
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
            obligation_difference: 436376232652.87
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
            obligation_difference: 436376232652.87
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
            obligation_difference: 436376232652.87
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
            obligation_difference: 436376232652.87
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
            obligation_difference: 436376232652.87
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
            obligation_difference: 436376232652.87
        }
    ]
};

const mockDatesApiResponse = {
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
};

const dateRows = mockDatesApiResponse.results
    .map(({
        name,
        abbreviation,
        code,
        current_total_budget_authority_amount: total,
        periods
    }) => ([
        (<DrilldownCell data={`${name} (${abbreviation})`} id={code} />),
        (<div className="generic-cell-content">{total}</div>),
        ...periods.map(({ date }) => (<div className="generic-cell-content">{date}</div>))
    ]));

const propTypes = {
    openModal: PropTypes.func.isRequired,
    activeTab: PropTypes.oneOf(['dates', 'details'])
};

const AgenciesContainer = ({ activeTab, openModal }) => {
    const [sortStatus, updateSort] = useState({ field: "", direction: "asc" });
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

    // TODO - create a data model for agency row
    const rows = mockAPIResponse.results.map(
        ({
            name,
            abbreviation,
            code,
            current_total_budget_authority_amount: total,
            recent_publication_date: publicationDate,
            discrepancy_count: GtasNotInFileA,
            obligation_difference: differenceInFileAAndB
        }) => [
            // TODO: handle agencies with no code
            (<DrilldownCell data={`${name} (${abbreviation})`} id={code} />),
            (<div className="generic-cell-content">{ total }</div>),
            (<CellWithModal data={publicationDate} openModal={openModal} modalType="publicationDates" agencyName={name} />),
            (<CellWithModal data={GtasNotInFileA} openModal={openModal} modalType="missingAccountBalance" agencyName={name} />),
            (<div className="generic-cell-content">% placeholder</div>),
            (<div className="generic-cell-content">{differenceInFileAAndB}</div>)
        ]
    );

    return (
        <div className="table-container" ref={tableRef} onScroll={handleScroll}>
            {activeTab === 'details' && (
                <Table
                    rows={rows}
                    classNames={`usda-table-w-grid ${verticalStickyClass} ${horizontalStickyClass}`}
                    columns={columns}
                    updateSort={handleUpdateSort}
                    currentSort={sortStatus} />
            )}
            {activeTab === 'dates' && (
                <Table
                    rows={dateRows}
                    classNames={`usda-table-w-grid ${verticalStickyClass} ${horizontalStickyClass}`}
                    columns={[
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
                    ]}
                    updateSort={handleUpdateSort}
                    currentSort={sortStatus} />
            )}
        </div>
    );
};

AgenciesContainer.propTypes = propTypes;

export default AgenciesContainer;
