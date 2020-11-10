import React, { useState } from "react";
import { Table, TooltipComponent, TooltipWrapper } from "data-transparency-ui";

import Header from "containers/shared/HeaderContainer";
import Footer from "containers/Footer";
import StickyHeader from "components/sharedComponents/stickyHeader/StickyHeader";
import Note from "components/sharedComponents/Note";

require("pages/aboutTheData/agenciesPage.scss");

const Tooltip = (title) => (
  <TooltipComponent title={title}>
    <p>Place holder for tooltip component.</p>
  </TooltipComponent>
);

const columns = [
  {
    title: "name",
    displayName: "Budget Function",
  },
  {
    title: "total",
    displayName: "Amount",
  },
  {
    title: "publication_date",
    displayName: "Most Recent Publication Date",
    icon: (
      <TooltipWrapper
        icon="info"
        tooltipComponent={<Tooltip title="Most Recent Publication Date" />}
      />
    ),
  },
  {
    title: "tas_not_in_file_a",
    displayName: "Count of Agency TAS in GTAS Not in File A",
  },
  {
    title: "publication_date",
    displayName: "% of Total Amount",
  },
  {
    title: "file_a_b_diff",
    displayName: "Difference in File A and File B Obligations",
  },
  {
    title: "unlinked_asst_award_count",
    displayName: "Count of Unlinked Assistance Awards",
  },
];

const mockAPIResponse = {
  page_metadata: {
    page: 1,
    hasNext: false,
    hasPrevious: false,
    total: 2,
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
    },
  ],
};

const rows = mockAPIResponse.results.map(
  ({
    name,
    abbreviation,
    current_total_budget_authority_amount: total,
    recent_publication_date: publicationDate,
    discrepancy_count: GtasNotInFileA,
    obligation_difference: differenceInFileAAndB
  }) => {
    return [
      `${name} (${abbreviation})`,
      total,
      publicationDate,
      GtasNotInFileA,
      differenceInFileAAndB
    ];
  }
);

const message =
  "Data in this table will be updated whenever the underlying data submissions change or new submissions are added.";

const AgenciesContainer = () => {
  const [sortStatus, updateSort] = useState({ field: "", direction: "asc" });

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
          <Table
            rows={rows}
            classNames="usda-table-w-grid"
            columns={columns}
            updateSort={updateSort}
            currentSort={sortStatus} />
          <Note message={message} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AgenciesContainer;
