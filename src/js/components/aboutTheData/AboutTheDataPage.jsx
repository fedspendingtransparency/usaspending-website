/**
 * AboutTheDataPage.jsx
 * Created by Lizzie Salita 11/25/20
 */

import React, { useState } from "react";
import PropTypes from 'prop-types';
import { TooltipComponent, TooltipWrapper, Tabs } from "data-transparency-ui";

import Header from "containers/shared/HeaderContainer";
import Footer from "containers/Footer";
import StickyHeader from "components/sharedComponents/stickyHeader/StickyHeader";
import Note from "components/sharedComponents/Note";
import AboutTheDataModal from "components/aboutTheData/AboutTheDataModal";
import AgenciesContainer from 'containers/aboutTheData/AgenciesContainer';
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

const message = "All numeric figures in this table are calculated based on the set of TAS owned by each agency, as opposed to the set of TAS that the agency directly reported to USAspending.gov. In the vast majority of cases, these are exactly the same (upwards of 95% of TAS—with these TAS representing over 99% of spending—are submitted and owned by the same agency). This display decision is consistent with our practice throughout the website of grouping TAS by the owning agency rather than the reporting agency. While reporting agencies are not identified in this table, they are available in the Custom Account Download in the reporting_agency_name field.";

const AboutTheDataPage = () => {
    const [activeTab, setActiveTab] = useState('details'); // details or dates
    const [showModal, setShowModal] = useState('');
    const [modalData, setModalData] = useState(null);

    // Modal Logic
    const modalClick = (modalType, agencyData) => {
        setModalData(agencyData);
        setShowModal(modalType);
    };
    const closeModal = () => {
        setShowModal('');
        setModalData(null);
    };

    const handleSwitchTab = (tab) => {
        setActiveTab(tab);
    };

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
                <AgenciesContainer openModal={modalClick} activeTab={activeTab} />
                <Note message={message} />
                <AboutTheDataModal
                    mounted={!!showModal.length}
                    type={showModal}
                    className={modalClassNames[showModal]}
                    title={modalTitles[showModal]}
                    agencyData={modalData}
                    fiscalYear={2020}
                    fiscalPeriod={8}
                    closeModal={closeModal}
                    totalObligationsNotInGTAS={45999} />
            </main>
            <Footer />
        </div>
    );
};

export default AboutTheDataPage;
