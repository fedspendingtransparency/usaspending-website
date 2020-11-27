import React, { useRef, useEffect, useState } from 'react';
import { useParams, withRouter, Link } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import PropTypes from 'prop-types';
import { Table, TooltipComponent, TooltipWrapper } from "data-transparency-ui";
import { throttle } from 'lodash';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { agencyPageMetaTags } from 'helpers/metaTagHelper';
import { fetchAgencyOverview } from 'helpers/agencyHelper';
import { setAgencyOverview } from 'redux/actions/agency/agencyActions';
import AgencyOverviewModel from 'models/agency/AgencyOverviewModel';
import * as agencyActions from 'redux/actions/agency/agencyActions';
import { bindActionCreators } from 'redux';

import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'containers/shared/HeaderContainer';
import Footer from 'containers/Footer';
import StickyHeader from 'components/sharedComponents/stickyHeader/StickyHeader';
import Note from 'components/sharedComponents/Note';
import AgencyDownloadLinkCell from 'components/aboutTheData/AgencyDownloadLinkCell';
import CellWithModal from 'components/aboutTheData/CellWithModal';
import AboutTheDataModal from "components/aboutTheData/AboutTheDataModal";
import { modalTitles, modalClassNames } from 'dataMapping/aboutTheData/modals';

require('pages/aboutTheData/agenciesDetailPage.scss');

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
            unlinked_asst_awd: 5
        },
        {
            fiscal_year: "FY 2020: P05",
            percent_total_budget: 29.18,
            recent_update: "09/29/2020",
            discrepancy_count: 0,
            obligation_difference: 324.91,
            unlinked_cont_awd: 1176,
            unlinked_asst_awd: 5096
        },
        {
            fiscal_year: "FY 2020: P04",
            percent_total_budget: 17.04,
            recent_update: "09/29/2020",
            discrepancy_count: 39,
            obligation_difference: 1102064503.38,
            unlinked_cont_awd: 42270,
            unlinked_asst_awd: 979
        },
        {
            fiscal_year: "FY 2020: Q1 / P03",
            percent_total_budget: 13.62,
            recent_update: "09/28/2020",
            discrepancy_count: 0,
            obligation_difference: 0,
            unlinked_cont_awd: 352,
            unlinked_asst_awd: 6
        },
        {
            fiscal_year: "FY 2020: P01 - P02",
            percent_total_budget: 9.14,
            recent_update: "10/15/2020",
            discrepancy_count: 1,
            obligation_difference: 240672,
            unlinked_cont_awd: 264,
            unlinked_asst_awd: 377277
        },
        {
            fiscal_year: "FY 2019: Q4 / P12",
            percent_total_budget: 7.95,
            recent_update: "09/30/2020",
            discrepancy_count: 0,
            obligation_difference: 0,
            unlinked_cont_awd: 30,
            unlinked_asst_awd: 13
        },
        {
            fiscal_year: "FY 2019: Q3 / P09",
            percent_total_budget: 4.20,
            recent_update: "09/28/2020",
            discrepancy_count: 4,
            obligation_difference: 4850766868.94,
            unlinked_cont_awd: 13898,
            unlinked_asst_awd: 1373279
        },
        {
            fiscal_year: "FY 2019: Q2 / P06",
            percent_total_budget: 3.49,
            recent_update: "09/29/2020",
            discrepancy_count: 0,
            obligation_difference: 0,
            unlinked_cont_awd: 216,
            unlinked_asst_awd: 0
        },
        {
            fiscal_year: "FY 2019: Q1 / P03",
            percent_total_budget: 3.36,
            recent_update: "10/22/2020",
            discrepancy_count: 0,
            obligation_difference: 0.18,
            unlinked_cont_awd: 8880,
            unlinked_asst_awd: 68283
        },
        {
            fiscal_year: "FY 2018: Q4 / P12",
            percent_total_budget: 3.17,
            recent_update: "09/29/2020",
            discrepancy_count: 1,
            obligation_difference: 124086515.13,
            unlinked_cont_awd: 41,
            unlinked_asst_awd: 5738
        }
    ]
};

const message = "All numeric figures in this table are calculated based on the set of TAS owned by each agency, as opposed to the set of TAS that the agency directly reported to USAspending.gov. In the vast majority of cases, these are exactly the same (upwards of 95% of TAS—with these TAS representing over 99% of spending—are submitted and owned by the same agency). This display decision is consistent with our practice throughout the website of grouping TAS by the owning agency rather than the reporting agency. While reporting agencies are not identified in this table, they are available in the Custom Account Download in the reporting_agency_name field.";

const propTypes = {
    agency: PropTypes.object,
    agencyId: PropTypes.string
};

export const AgenciesDetailContainer = (props) => {
    const [sortStatus, updateSort] = useState({ field: "", direction: "asc" });
    const [{ vertical: isVertialSticky, horizontal: isHorizontalSticky }, setIsSticky] = useState({ vertical: false, horizontal: false });
    const { agencyId } = useParams();
    const [showModal, setShowModal] = useState('');
    const [modalAgency, setModalAgency] = useState('');
    const dispatch = useDispatch();
    const tableRef = useRef(null);
    const handleScroll = throttle(() => {
        const { scrollLeft: horizontal, scrollTop: vertical } = tableRef.current;
        setIsSticky({ vertical, horizontal });
    }, 100);

    const handleUpdateSort = (field, direction) => {
        updateSort({ field, direction });
    };

    const modalClick = (modalType, agencyName) => {
        setShowModal(modalType);
        setModalAgency(agencyName);
    };
    const closeModal = () => setShowModal('');

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
            unlinked_asst_awd: unlinkedAsst
        }) => [
            (<div className="generic-cell-content">{ fiscalYear }</div>),
            (<div className="generic-cell-content">{ total }</div>),
            (<CellWithModal data={recentUpdate} openModal={modalClick} modalType="publicationDates" agencyName={props.agency.overviewname} />),
            (<CellWithModal data={missingTasCount} openModal={modalClick} modalType="missingAccountBalance" agencyName={props.agency.overviewname} />),
            (<div className="generic-cell-content">{ obligationDiff }</div>),
            (<div className="generic-cell-content">{ unlinkedCont }</div>),
            (<div className="generic-cell-content">{ unlinkedAsst }</div>),
            (<div className="generic-cell-content"><AgencyDownloadLinkCell /></div>)
        ]
    );

    const onClick = (e) => {
        e.persist();
        if (e?.target) {
            dispatch(showModal(e.target.parentNode.getAttribute('data-href') || e.target.getAttribute('data-href') || e.target.value));
        }
    };

    useEffect(() => {
        // request overview for agency
        const agencyOverviewRequest = fetchAgencyOverview(agencyId);
        agencyOverviewRequest.promise
            .then((res) => {
                // parse the response using our data model
                const agency = new AgencyOverviewModel(Object.assign({}, res.data.results, {
                    agency_id: agencyId
                }), true);
                // store the data model object in Redux
                dispatch(setAgencyOverview(agency));
            }).catch((err) => {
                console.error(err);
            });
    }, [agencyId]);

    return (
        <div className="usa-da__about-the-data__agencies-page">
            <MetaTags {...agencyPageMetaTags} />
            <Header />
            <StickyHeader>
                <div className="sticky-header__title">
                    <h1 tabIndex={-1}>
                        Agency Submission Data
                    </h1>
                </div>
            </StickyHeader>
            <main id="main-content" className="main-content">
                <div className="heading-container">
                    <div className="back-link">
                        <a href="/about-the-data/agencies"><FontAwesomeIcon icon="angle-left" />&nbsp;Back to All Agencies</a>
                    </div>
                    <h2 className="header">Submission Data</h2>
                    <h2 className="sub-header">{props.agency.overview.name}</h2>
                    <div className="lower-details">
                        <div className="agency-info-group">
                            <h5>Agency Contact Information</h5>
                            <div className="more-info-note">Contact this Agency with questions about their submissions</div>
                            <div className="agency-website">
                                <button
                                    className="usa-button-link"
                                    role="link"
                                    value={props.agency.overview.website}
                                    onClick={onClick}>
                                    {props.agency.overview.website}
                                    <span
                                        data-href={props.agency.overview.website}
                                        className="usa-button-link__icon">
                                        <FontAwesomeIcon
                                            data-href={props.agency.overview.website}
                                            icon="external-link-alt" />
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className="agency-info-group">
                            <h5>Agency Profile Page</h5>
                            <div className="more-info-note">Learn more about this Agency&#39;s spending</div>
                            <div className="agency-website">
                                <Link to={`/agency/${agencyId}`}>
                                    {props.agency.overview.name}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table-container" ref={tableRef} onScroll={handleScroll}>
                    <Table
                        rows={rows}
                        classNames={`usda-table-w-grid ${verticalStickyClass} ${horizontalStickyClass}`}
                        columns={columns}
                        updateSort={handleUpdateSort}
                        currentSort={sortStatus} />
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

AgenciesDetailContainer.propTypes = propTypes;


const AgencyDetailContainerWithRouter = withRouter(AgenciesDetailContainer);
export default connect(
    (state) => ({
        agency: state.agency
    }),
    (dispatch) => bindActionCreators(agencyActions, dispatch)
)(AgencyDetailContainerWithRouter);
