/**
 * AgencyDetailsPage.jsx
 */

import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoadingMessage, ErrorMessage, PageHeader } from 'data-transparency-ui';

import { agencyPageMetaTags } from 'helpers/metaTagHelper';
import { fetchAgencyOverview } from 'helpers/agencyV2Helper';
import { getAgencyDetailEmail } from 'helpers/aboutTheDataHelper';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';
import { getStickyBreakPointForSidebar } from 'helpers/stickyHeaderHelper';

import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'containers/shared/HeaderContainer';
import Footer from 'containers/Footer';
import Note from 'components/sharedComponents/Note';
import AgencyDetailsContainer from 'containers/aboutTheData/AgencyDetailsContainer';
import { modalTitles, modalClassNames } from 'dataMapping/aboutTheData/modals';
import BaseAgencyOverview from 'models/v2/agencyV2/BaseAgencyOverview';
import ExternalLink from 'components/sharedComponents/ExternalLink';
import { agencyNotes } from './componentMapping/agencyNotes';
import AboutTheDataModal from './AboutTheDataModal';

require('pages/aboutTheData/aboutTheData.scss');

const AgencyDetailsPage = () => {
    const { agencyCode } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [agencyOverview, setAgencyOverview] = useState(null);
    const [showModal, setShowModal] = useState('');
    const [modalData, setModalData] = useState(null);
    const overviewRequest = useRef(null);

    const modalClick = (modalType, agencyData) => {
        setModalData(agencyData);
        setShowModal(modalType);
    };
    const closeModal = () => {
        setShowModal('');
        setModalData(null);
    };

    const getOverviewData = async () => {
        if (!loading) setLoading(true);
        if (error) {
            setError(false);
            setErrorMessage('');
        }
        if (overviewRequest.current) overviewRequest.current.cancel();
        try {
            overviewRequest.current = fetchAgencyOverview(agencyCode);
            const { data } = await overviewRequest.current.promise;
            const agency = Object.create(BaseAgencyOverview);
            agency.populate(data);
            setAgencyOverview(agency);
            setLoading(false);
            overviewRequest.current = null;
        }
        catch (err) {
            console.error(err);
            setError(true);
            setErrorMessage(err.message);
            setLoading(false);
            overviewRequest.current = null;
        }
    };

    useEffect(() => {
        if (overviewRequest.current) overviewRequest.current.cancel();
    }, []);

    useEffect(() => {
        getOverviewData();
    }, [agencyCode]);

    const message = agencyNotes[agencyCode] || '';

    const handleShare = (name) => {
        handleShareOptionClick(name, `submission-statistics/agency/${agencyCode}`, getAgencyDetailEmail(agencyOverview?.name, agencyCode));
    };

    return (
        <div className="about-the-data about-the-data_agency-details-page">
            <MetaTags {...agencyPageMetaTags} />
            <Header />
            <PageHeader
                title={agencyOverview?.name}
                stickyBreakPoint={getStickyBreakPointForSidebar()}
                overLine="Agency Submission Data"
                shareProps={{
                    url: getBaseUrl(`submission-statistics/agency/${agencyCode}`),
                    onShareOptionClick: handleShare
                }}>
                <main id="main-content" className="main-content">
                    {loading && <LoadingMessage />}
                    {error && <ErrorMessage description={errorMessage} />}
                    {(!loading && !error) && (
                        <>
                            <div className="heading-container">
                                <div className="back-link">
                                    <Link to={{
                                        pathname: "/submission-statistics/",
                                        search: `?${new URLSearchParams({ tab: 'submissions' }).toString()}`
                                    }}>
                                        <FontAwesomeIcon icon="angle-left" />&nbsp;Back to All Agencies
                                    </Link>
                                </div>
                                <h2 className="header">{agencyOverview?.name}</h2>
                                <div className="agency-info">
                                    {agencyOverview.website && (
                                        <div className="agency-info__group">
                                            <h5>Agency Contact Information</h5>
                                            <div className="more-info-note">Contact this Agency with questions about their submissions</div>
                                            <div className="agency-info__website">
                                                <ExternalLink url={agencyOverview.website} />
                                            </div>
                                        </div>
                                    )}
                                    {agencyOverview.id && (
                                        <div className="agency-info__group">
                                            <h5>Agency Profile Page</h5>
                                            <div className="more-info-note">Learn more about this Agency&#39;s spending</div>
                                            <div className="agency-info__website">
                                                <Link to={`/agency/${agencyOverview.id}`}>
                                                    {agencyOverview.name}
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <AgencyDetailsContainer
                                agencyName={agencyOverview.name}
                                modalClick={modalClick}
                                agencyCode={agencyCode} />
                            {message && <Note message={message} />}
                        </>
                    )}
                    <AboutTheDataModal
                        mounted={!!showModal.length}
                        type={showModal}
                        className={modalClassNames[showModal]}
                        title={modalTitles(modalData?.type)[showModal]}
                        agencyData={modalData}
                        closeModal={closeModal} />
                </main>
                <Footer />
            </PageHeader>
        </div>
    );
};

export default AgencyDetailsPage;
