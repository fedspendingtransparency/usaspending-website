import React, { useRef, useState } from "react";
import PropTypes from 'prop-types';
import { Table, TooltipComponent, TooltipWrapper, Tabs } from "data-transparency-ui";
import { throttle } from 'lodash';

import Header from "containers/shared/HeaderContainer";
import Footer from "containers/Footer";
import StickyHeader from "components/sharedComponents/stickyHeader/StickyHeader";
import Note from "components/sharedComponents/Note";
import DrilldownCell from 'components/aboutTheData/DrilldownCell';
import CellWithModal from 'components/aboutTheData/CellWithModal';
import AboutTheDataModal from "components/aboutTheData/AboutTheDataModal";
import { modalTitles, modalClassNames } from 'dataMapping/aboutTheData/modals';

require("pages/aboutTheData/agenciesPage.scss");

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

const TableTabLabel = ({ label, tooltipComponent = <Tooltip title={label} /> }) => (
    <div className="table-tab-label">
        <span>{label}</span>
        <TooltipWrapper tooltipComponent={tooltipComponent} icon="info" />
    </div>
);

TableTabLabel.propTypes = {
    label: PropTypes.string.isRequired,
    tooltipComponent: PropTypes.element
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

const message = "All numeric figures in this table are calculated based on the set of TAS owned by each agency, as opposed to the set of TAS that the agency directly reported to USAspending.gov. In the vast majority of cases, these are exactly the same (upwards of 95% of TAS—with these TAS representing over 99% of spending—are submitted and owned by the same agency). This display decision is consistent with our practice throughout the website of grouping TAS by the owning agency rather than the reporting agency. While reporting agencies are not identified in this table, they are available in the Custom Account Download in the reporting_agency_name field.";

const AgenciesContainer = () => {
    const [sortStatus, updateSort] = useState({ field: "", direction: "asc" });
    const [activeTab, setActiveTab] = useState('details'); // details or dates
    const [{ vertical: isVertialSticky, horizontal: isHorizontalSticky }, setIsSticky] = useState({ vertical: false, horizontal: false });
    const [showModal, setShowModal] = useState('');
    const [modalAgency, setModalAgency] = useState('');
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
    // Modal Logic
    const modalClick = (modalType, agencyName) => {
        setShowModal(modalType);
        setModalAgency(agencyName);
    };
    const closeModal = () => setShowModal('');

    const handleSwitchTab = (tab) => {
        setActiveTab(tab);
    };

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
            (<CellWithModal data={publicationDate} openModal={modalClick} modalType="publicationDates" agencyName={name} />),
            (<CellWithModal data={GtasNotInFileA} openModal={modalClick} modalType="missingAccountBalance" agencyName={name} />),
            (<div className="generic-cell-content">% placeholder</div>),
            (<div className="generic-cell-content">{differenceInFileAAndB}</div>)
        ]
    );

    return (
        <div className="usa-da__about-the-data__agencies-page">
            <Header />
            <StickyHeader>
                <div className="sticky-header__title">
                    <h1 tabIndex={-1}>Agency Submission Statistics</h1>
                </div>
            </StickyHeader>
            <main id="main-content" className="main-content">
                <div className="heading-container">
                    <h2 className="header">About These Statistics</h2>
                    <p className="sub-header">Agencies submit data monthly and/or quarterly to USAspending.gov. The table below shows information about the status and content of agency financial data submissions, and it will be updated as agencies publish/certify new submissions or republish/recertify existing submissions.</p>
                </div>
                <div className="table-controls">
                    <Tabs
                        active={activeTab}
                        switchTab={handleSwitchTab}
                        types={[
                            { internal: 'details', label: <TableTabLabel label="Statistics by Reporting Period" /> },
                            { internal: 'dates', label: <TableTabLabel label="Updates by  Fiscal Year" /> }
                        ]} />
                    <div className="table-controls__time-and-search">
                        <p>Place holder for Search components etc...</p>
                    </div>
                </div>
                {/* TODO - Modal Buttons - DELETE THIS CODE */}
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
                <Note message={message} />
                <AboutTheDataModal
                    mounted={!!showModal.length}
                    type={showModal}
                    className={modalClassNames[showModal]}
                    title={modalTitles[showModal]}
                    agencyName={modalAgency}
                    fiscalYear={2020}
                    fiscalPeriod={8}
                    closeModal={closeModal}
                    totalObligationsNotInGTAS={45999} />
            </main>
            <Footer />
        </div>
    );
};

export default AgenciesContainer;
