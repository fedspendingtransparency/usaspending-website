import React, { useRef, useState } from "react";
import PropTypes from 'prop-types';
import { Table, TooltipComponent, TooltipWrapper } from "data-transparency-ui";
import { throttle } from "lodash";

import Header from "containers/shared/HeaderContainer";
import Footer from "containers/Footer";
import StickyHeader from "components/sharedComponents/stickyHeader/StickyHeader";
import Note from "components/sharedComponents/Note";
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

const rows = mockAPIResponse.results.map(
    ({
        name,
        abbreviation,
        current_total_budget_authority_amount: total,
        recent_publication_date: publicationDate,
        discrepancy_count: GtasNotInFileA,
        obligation_difference: differenceInFileAAndB
    }) => [
        `${name} (${abbreviation})`,
        total,
        publicationDate,
        GtasNotInFileA,
        differenceInFileAAndB
    ]
);

const message =
  "Data in this table will be updated whenever the underlying data submissions change or new submissions are added.";

const AgenciesContainer = () => {
    const [sortStatus, updateSort] = useState({ field: "", direction: "asc" });
    const [{ vertical: isVertialSticky, horizontal: isHorizontalSticky }, setIsSticky] = useState({ vertical: false, horizontal: false });
    const [showModal, setShowModal] = useState('');
    const tableRef = useRef(null);
    const handleScroll = throttle(() => {
        const { scrollLeft: horizontal, scrollTop: vertical } = tableRef.current;
        setIsSticky({ vertical, horizontal });
    }, 100);

    const verticalStickyClass = isVertialSticky ? 'sticky-y-table' : '';
    const horizontalStickyClass = isHorizontalSticky ? 'sticky-x-table' : '';
    // Modal Logic
    const modalClick = (e) => {
        e.preventDefault();
        setShowModal(e.target.value);
    };
    const closeModal = () => setShowModal('');

    return (
        <div className="usa-da__about-the-data__agencies-page">
            <Header />
            <StickyHeader>
                <div className="sticky-header__title">
                    <h1 tabIndex={-1}>Agency Submission Data</h1>
                </div>
            </StickyHeader>
            <main id="main-content" className="main-content">
                <div className="heading-container">
                    <h2 className="header">Submission Data</h2>
                    <h3 className="sub-header">All Agencies</h3>
                </div>
                {/* TODO - Modal Buttons - DELETE THIS CODE */}
                <button value="publicationDates" onClick={modalClick}>Publication Dates</button>
                <button value="missingAccountBalance" onClick={modalClick}>Missing Account Balance</button>
                <div className="table-container" ref={tableRef} onScroll={handleScroll}>
                    <Table
                        rows={rows}
                        classNames={`usda-table-w-grid test ${verticalStickyClass} ${horizontalStickyClass}`}
                        columns={columns}
                        updateSort={updateSort}
                        currentSort={sortStatus} />
                </div>
                <Note message={message} />
                <AboutTheDataModal
                    mounted={!!showModal.length}
                    type={showModal}
                    className={modalClassNames[showModal]}
                    title={modalTitles[showModal]}
                    agencyName={`${rows[0][0]}`}
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
