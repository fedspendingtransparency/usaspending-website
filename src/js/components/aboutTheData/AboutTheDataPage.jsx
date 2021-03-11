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
import { getAllAgenciesEmail } from "helpers/aboutTheDataHelper";
import StickyHeader from "components/sharedComponents/stickyHeader/StickyHeader";
import AboutTheDataModal from "components/aboutTheData/AboutTheDataModal";
import { LoadingWrapper } from "components/sharedComponents/Loading";
import AgenciesContainer from 'containers/aboutTheData/AgenciesContainer';
import { useLatestAccountData, useValidTimeBasedQueryParams } from 'containers/account/WithLatestFy';
import { useQueryParams, combineQueryParams, getQueryParamString } from 'helpers/queryParams';
import { modalTitles, modalClassNames } from 'dataMapping/aboutTheData/modals';
import { tabTooltips } from './dataMapping/tooltipContentMapping';
import TimeFilters from './TimeFilters';

require('pages/aboutTheData/aboutTheData.scss');

const AboutTheDataPage = ({ history }) => {
    const { search } = useLocation();
    const params = useQueryParams();
    const {
        fy: urlFy,
        period: urlPeriod,
        tab: activeTab
    } = params;
    const [, submissionPeriods, { year: latestFy, period: latestPeriod }] = useLatestAccountData();
    const [selectedFy, selectedPeriod, setTime] = useValidTimeBasedQueryParams(urlFy, urlPeriod);
    const [showModal, setShowModal] = useState('');
    const [modalData, setModalData] = useState(null);

    useEffect(() => {
        if (!activeTab) {
            const paramsWithTab = combineQueryParams(params, { tab: 'submissions' });
            history.replace({
                pathname: '',
                search: getQueryParamString(paramsWithTab)
            });
        }
    }, [activeTab]);

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
        history.push({
            search: `?${new URLSearchParams({ fy: urlFy, period: urlPeriod, tab }).toString()}`
        });
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
                                onTimeFilterSelection={setTime}
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
