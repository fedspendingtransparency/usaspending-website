/**
 * AboutTheDataPage.jsx
 * Created by Lizzie Salita 11/25/20
 */

import React, { useState } from "react";
import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";
import { TooltipComponent, TooltipWrapper, Tabs } from "data-transparency-ui";

import Header from "containers/shared/HeaderContainer";
import Footer from "containers/Footer";
import { getPeriodWithTitleById } from "helpers/aboutTheDataHelper";
import StickyHeader from "components/sharedComponents/stickyHeader/StickyHeader";
import Note from "components/sharedComponents/Note";
import AboutTheDataModal from "components/aboutTheData/AboutTheDataModal";
import AgenciesContainer from 'containers/aboutTheData/AgenciesContainer';
import { modalTitles, modalClassNames } from 'dataMapping/aboutTheData/modals';
import { tabTooltips } from './dataMapping/tooltipContentMapping';
import TimeFilters from "./TimeFilters";

require("pages/aboutTheData/agenciesPage.scss");

const TableTabLabel = ({ label }) => {
    const tooltipComponent = (
        <TooltipComponent title={label}>
            {tabTooltips[label]}
        </TooltipComponent>
    );
    return (
        <div className="table-tab-label">
            <span>{label}</span>
            <TooltipWrapper tooltipComponent={tooltipComponent} icon="info" />
        </div>
    );
};

TableTabLabel.propTypes = {
    label: PropTypes.string.isRequired
};

const message = "All numeric figures in this table are calculated based on the set of TAS owned by each agency, as opposed to the set of TAS that the agency directly reported to USAspending.gov. In the vast majority of cases, these are exactly the same (upwards of 95% of TAS—with these TAS representing over 99% of spending—are submitted and owned by the same agency). This display decision is consistent with our practice throughout the website of grouping TAS by the owning agency rather than the reporting agency. While reporting agencies are not identified in this table, they are available in the Custom Account Download in the reporting_agency_name field.";

const AboutTheDataPage = ({
    history
}) => {
    const { fy: urlFy, period: urlPeriod } = useParams();
    const [selectedFy, setSelectedFy] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState(null);

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

    const updateUrl = (newFy, newPeriod) => {
        history.push({ pathname: `/about-the-data/agencies/${newFy}/${newPeriod}` });
    };

    const handleSwitchTab = (tab) => {
        setActiveTab(tab);
    };

    const onTimeFilterSelection = (fy, p = urlPeriod) => {
        const newPeriodWithTitle = typeof p === 'object'
            ? p
            : getPeriodWithTitleById(p);
        if (selectedFy !== fy && selectedPeriod?.id !== newPeriodWithTitle.id) {
            setSelectedPeriod(p);
            setSelectedFy(fy);
            updateUrl(fy, newPeriodWithTitle.id);
        }
        else if (selectedPeriod?.id === newPeriodWithTitle.id) {
            setSelectedFy(fy);
            updateUrl(fy, newPeriodWithTitle.id);
        }
        else if (fy === selectedFy) {
            setSelectedPeriod(newPeriodWithTitle);
            updateUrl(fy, newPeriodWithTitle.id);
        }
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
                            {
                                internal: 'details',
                                label: "Statistics by Reporting Period",
                                labelContent: <TableTabLabel label="Statistics by Reporting Period" />
                            },
                            {
                                internal: 'dates',
                                label: "Updates by  Fiscal Year",
                                labelContent: <TableTabLabel label="Updates by Fiscal Year" />
                            }
                        ]} />
                    <TimeFilters
                        activeTab={activeTab}
                        onTimeFilterSelection={onTimeFilterSelection}
                        selectedPeriod={selectedPeriod}
                        selectedFy={selectedFy}
                        urlPeriod={urlPeriod}
                        urlFy={urlFy} />
                </div>
                <AgenciesContainer
                    openModal={modalClick}
                    activeTab={activeTab}
                    selectedFy={selectedFy}
                    selectedPeriod={selectedPeriod
                        ? selectedPeriod.id
                        : ''
                    } />
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

AboutTheDataPage.propTypes = {
    history: PropTypes.object
};

export default AboutTheDataPage;
