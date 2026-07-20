/**
 * AboutTheDataPage.jsx
 * Created by Lizzie Salita 11/25/20
 */

import React, { useEffect, useState } from 'react';
import { Tabs, FlexGridCol, FlexGridRow } from "data-transparency-ui";
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from "react-router";
import { getAllAgenciesEmail } from "../../helpers/aboutTheDataHelper";
import { getBaseUrl, handleShareOptionClick } from '../../helpers/socialShare';
import AboutTheDataModal from "../../components/agencySubmissionStats/AboutTheDataModal";
import { LoadingWrapper } from "../../components/sharedComponents/Loading";
import PageWrapper from '../../components/sharedComponents/PageWrapper';
import ShareIcon508 from '../../components/sharedComponents/buttons/ShareIcon508';
import AgenciesContainer from '../../containers/agencySubmissionStats/AgenciesContainer';
import { useLatestAccountData, useValidTimeBasedQueryParams } from
    '../../containers/account/WithLatestFy';
import { combineQueryParams, getQueryParamString } from '../../helpers/queryParams';
import { modalTitles, modalClassNames } from '../../dataMapping/agencySubmissionStats/modals';
import TimeFilters from './TimeFilters';
import { showModal } from '../../redux/actions/modal/modalActions';
import useQueryParams from "../../hooks/useQueryParams";
import H2PageHeader from '../sharedComponents/header/H2PageHeader';

import '../../../_scss/pages/agencySubmissionStats/aboutTheData.scss';

/*
This page is called Agency Submission Statistics IRL
https://www.usaspending.gov/submission-statistics?tab=submissions&fy=2024&period=2
 */

const AboutTheDataPage = () => {
    const { search } = useLocation();
    const navigate = useNavigate();
    const params = useQueryParams();
    const {
        fy: urlFy,
        period: urlPeriod,
        tab: activeTab
    } = params;
    const [, submissionPeriods, { year: latestFy, period: latestPeriod }] = useLatestAccountData();
    const [selectedFy, selectedPeriod, setTime] = useValidTimeBasedQueryParams(urlFy, urlPeriod);
    const [showModalLocal, setShowModalLocal] = useState('');
    const [modalData, setModalData] = useState(null);
    const dispatch = useDispatch();
    const handleShareDispatch = (url) => {
        dispatch(showModal(url));
    };
    useEffect(() => {
        if (!activeTab) {
            const paramsWithTab = combineQueryParams(params, { tab: 'submissions' });
            navigate({
                pathname: ``,
                search: `${getQueryParamString(paramsWithTab)}`
            }, { replace: true });
        }
    }, [activeTab, navigate, params]);

    // Modal Logic
    const modalClick = (modalType, agencyData) => {
        setModalData(agencyData);
        setShowModalLocal(modalType);
    };
    const closeModal = () => {
        setShowModalLocal('');
        setModalData(null);
    };

    const handleSwitchTab = (tab) => {
        navigate({
            search: `?${new URLSearchParams({ fy: urlFy, period: urlPeriod, tab }).toString()}`
        });
    };

    const slug = `submission-statistics/${search}`;

    const handleShare = (name) => {
        handleShareOptionClick(
            name,
            slug,
            getAllAgenciesEmail(urlFy, urlPeriod, activeTab),
            handleShareDispatch
        );
    };

    /* eslint-disable max-len */
    const subtitle = (<>
        <p className="sub-header">
            In accordance with the 2014 DATA Act, federal agencies submit financial data
            on a quarterly and/or monthly basis to USAspending.gov. The table below
            shows information about the status and content of these submissions. It will
            be updated as agencies publish/certify new submissions or
            republish/recertify existing submissions.
        </p>
        <p className="sub-header">
            <span className="sub-header-span">Statistics by Submission Period </span>
            - Please note that if you select the first or second period of a quarter, you will only see data from agencies that upload monthly. Only by selecting the last period of each quarter (i.e., P03, P06, P09, P12) will you see data for all agencies, including quarterly-submitting agencies.
        </p>
        <p className="sub-header">
            <span className="sub-header-span">Updates by Fiscal Year </span>
            - The columns for the last period of each quarter (i.e., P03, P06, P09, P12) do show data for all agencies.
        </p>
        <p className="sub-header">
            <span className="sub-header-span">Please Note: </span>
            Fiscal years start in October (Period 1), and starting in FY 2022 (i.e., October 2021), all agencies will report monthly data to USAspending.gov.
        </p>
        <p className="sub-header">
            For more information about the data in this table, visit
            <Link className="sub-header-link" to="/submission-statistics/data-sources"> the Data Sources and Methodology page.</Link>
        </p>
    </>);
    /* eslint-enable max-len */

    return (
        <PageWrapper
            pageName="Agency Submission Statistics"
            classNames="about-the-data about-the-data_agencies-page"
            title="Agency Submission Statistics"
            toolBarComponents={[
                <ShareIcon508
                    url={getBaseUrl(slug)}
                    onShareOptionClick={handleShare} />
            ]}>
            <main id="main-content" className="main-content">
                <FlexGridRow className="agency-submission-stat-row">
                    <FlexGridCol width={12} >
                        <H2PageHeader
                            title="About These Statistics"
                            subtitle={subtitle}
                            className="heading-container" />
                    </FlexGridCol>
                </FlexGridRow>
                <FlexGridRow className="agency-submission-stat-row">
                    <FlexGridCol width={12} className="agency-submission-stat-col" >
                        <LoadingWrapper isLoading={!activeTab}>
                            <>
                                <div className="table-controls">
                                    <Tabs
                                        active={activeTab}
                                        switchTab={handleSwitchTab}
                                        types={[
                                            {
                                                internal: 'submissions',
                                                label: "Statistics by Submission Period"
                                            },
                                            {
                                                internal: 'publications',
                                                label: "Updates by Fiscal Year"
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
                                    id="usa-dt-modal__agency-submission-statistics"
                                    mounted={!!showModalLocal.length}
                                    type={showModalLocal}
                                    className={modalClassNames[showModalLocal]}
                                    title={modalTitles(modalData?.type)[showModalLocal]}
                                    agencyData={{
                                        ...modalData,
                                        fiscalYear: parseInt(selectedFy, 10),
                                        fiscalPeriod: parseInt(selectedPeriod?.id, 10) || 0
                                    }}
                                    closeModal={closeModal} />
                            </>
                        </LoadingWrapper>
                    </FlexGridCol>
                </FlexGridRow>
            </main>
        </PageWrapper>

    );
};

export default AboutTheDataPage;
