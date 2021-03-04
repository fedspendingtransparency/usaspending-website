/**
 * AboutTheDataPage.jsx
 * Created by Lizzie Salita 11/25/20
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Tabs } from "data-transparency-ui";
import { Link, useLocation } from "react-router-dom";

import Header from "containers/shared/HeaderContainer";
import ShareIcon from "components/sharedComponents/stickyHeader/ShareIcon";
import Footer from "containers/Footer";
import { getPeriodWithTitleById, getAllAgenciesEmail } from "helpers/aboutTheDataHelper";
import StickyHeader from "components/sharedComponents/stickyHeader/StickyHeader";
import AboutTheDataModal from "components/aboutTheData/AboutTheDataModal";
import { LoadingWrapper } from "components/sharedComponents/Loading";
import AgenciesContainer from 'containers/aboutTheData/AgenciesContainer';
import { useLatestAccountData } from 'containers/account/WithLatestFy';
import { modalTitles, modalClassNames } from 'dataMapping/aboutTheData/modals';
import { tabTooltips } from './dataMapping/tooltipContentMapping';
import TimeFilters from './TimeFilters';

require('pages/aboutTheData/aboutTheData.scss');

const AboutTheDataPage = ({
    history
}) => {
    const { search } = useLocation();
    const query = new URLSearchParams(useLocation().search);
    const urlFy = query.get('fy');
    const urlPeriod = query.get('period');
    const activeTab = query.get('tab');
    const [, submissionPeriods, { year: latestFy, period: latestPeriod }] = useLatestAccountData();
    const [selectedFy, setSelectedFy] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState(null);

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

    useEffect(() => {
        if ((!urlFy || !urlPeriod || !activeTab) && submissionPeriods.size && latestFy && latestPeriod) {
            history.replace({
                pathname: `/submission-statistics/`,
                search: `?${new URLSearchParams({ fy: latestFy, period: latestPeriod, tab: 'submissions' }).toString()}`
            });
        }
    }, [history, latestFy, latestPeriod, submissionPeriods.size, urlFy, urlPeriod]);

    const updateUrl = (newFy, newPeriod, tab = activeTab) => {
        history.push({
            pathname: `/submission-statistics/`,
            search: `?${new URLSearchParams({ fy: newFy, period: newPeriod, tab }).toString()}`
        });
    };

    const handleSwitchTab = (tab) => {
        updateUrl(selectedFy, selectedPeriod, tab);
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
        <div className="about-the-data about-the-data_agencies-page">
            <Header />
            <StickyHeader>
                <div className="sticky-header__title">
                    <h1 tabIndex={-1}>Agency Submission Statistics</h1>
                </div>
                {urlFy && urlPeriod && activeTab && (
                    <div className="sticky-header__toolbar">
                        <ShareIcon slug={`submission-statistics/${search}`} email={getAllAgenciesEmail(urlFy, urlPeriod, activeTab)} />
                    </div>
                )}
            </StickyHeader>
            <main id="main-content" className="main-content">
                <div className="heading-container">
                    <h2 className="header">About These Statistics</h2>
                    <p className="sub-header">
                        In accordance with the 2014 DATA Act, federal agencies submit financial data
                        on a quarterly and/or monthly basis to USAspending.gov. The table below
                        shows information about the status and content of these submissions. It will
                        be updated as agencies publish/certify new submissions or
                        republish/recertify existing submissions. For more information about the data in this table, visit <Link to="data-sources">the Data Sources and Methodology page.</Link>
                    </p>
                </div>
                <LoadingWrapper isLoading={!activeTab}>
                    <>
                        <div className="table-controls">
                            <Tabs
                                active={activeTab}
                                switchTab={handleSwitchTab}
                                types={[
                                    {
                                        internal: 'submissions',
                                        label: "Statistics by Submission Period",
                                        tooltip: tabTooltips["Statistics by Submission Period"]
                                    },
                                    {
                                        internal: 'publications',
                                        label: "Updates by Fiscal Year",
                                        tooltip: tabTooltips["Updates by Fiscal Year"]
                                    }
                                ]} />
                            <TimeFilters
                                submissionPeriods={submissionPeriods}
                                latestFy={latestFy}
                                latestPeriod={latestPeriod}
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
                        <AboutTheDataModal
                            mounted={!!showModal.length}
                            type={showModal}
                            className={modalClassNames[showModal]}
                            title={modalTitles(modalData?.type)[showModal]}
                            agencyData={{
                                ...modalData,
                                fiscalYear: parseInt(selectedFy, 10),
                                fiscalPeriod: parseInt(selectedPeriod?.id, 10) || 0
                            }}
                            closeModal={closeModal} />
                    </>
                </LoadingWrapper>
            </main>
            <Footer />
        </div>
    );
};

AboutTheDataPage.propTypes = {
    history: PropTypes.object
};

export default AboutTheDataPage;
