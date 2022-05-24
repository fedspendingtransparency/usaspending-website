/**
 * AgencyDetailsPage.jsx
 */

import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoadingMessage, ErrorMessage, ShareIcon } from 'data-transparency-ui';

import { fetchAgencyOverview } from 'apis/agency';
import { agencyPageMetaTags } from 'helpers/metaTagHelper';
import { getAgencyDetailEmail } from 'helpers/aboutTheDataHelper';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';

import Note from 'components/sharedComponents/Note';
import PageWrapper from 'components/sharedComponents/PageWrapper';
import AgencyDetailsContainer from 'containers/aboutTheData/AgencyDetailsContainer';
import { modalTitles, modalClassNames } from 'dataMapping/aboutTheData/modals';
import BaseAgencyOverview from 'models/v2/agency/BaseAgencyOverview';
import ExternalLink from 'components/sharedComponents/ExternalLink';
import { agencyNotes } from './componentMapping/agencyNotes';
import AboutTheDataModal from './AboutTheDataModal';
import { useAgencySlugs } from "../../containers/agency/WithAgencySlugs";

require('pages/aboutTheData/aboutTheData.scss');

const AgencyDetailsPage = () => {
    const { agencyCode } = useParams();
    const [, topTierCodes] = useAgencySlugs();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [agencyOverview, setAgencyOverview] = useState(null);
    const [showModal, setShowModal] = useState('');
    const [modalData, setModalData] = useState(null);
    const overviewRequest = useRef(null);

    let slug = '';
    if (agencyOverview && agencyOverview.toptierCode) {
        slug = topTierCodes[agencyOverview.toptierCode];
    }

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
        <PageWrapper
            pageName="Agency Profile"
            classNames="about-the-data about-the-data_agency-details-page"
            metaTagProps={agencyOverview ? agencyPageMetaTags(agencyOverview) : {}}
            overLine="Agency Profile"
            title={agencyOverview?.name}
            toolBarComponents={[
                <ShareIcon
                    url={getBaseUrl(`submission-statistics/agency/${agencyCode}`)}
                    onShareOptionClick={handleShare} />
            ]}>
            <main id="main-content" className="main-content">
                {loading && <LoadingMessage />}
                {error && <ErrorMessage description={errorMessage} />}
                {(!loading && !error) && (
                    <>
                        <div className="heading-container">
                            <div className="back-link">
                                <Link to={{
                                    pathname: "/submission-statistics",
                                    search: `?${new URLSearchParams({ tab: 'submissions' }).toString()}`
                                }}>
                                    <FontAwesomeIcon icon="angle-left" />&nbsp;Back to All Agencies
                                </Link>
                            </div>
                            <h2 className="header">{agencyOverview?.name}</h2>
                            <div className="agency-info">
                                {agencyOverview?.website && (
                                    <div className="agency-info__group">
                                        <h5>Agency Contact Information</h5>
                                        <div className="more-info-note">Contact this Agency with questions about their submissions</div>
                                        <div className="agency-info__website">
                                            <ExternalLink url={agencyOverview.website} />
                                        </div>
                                    </div>
                                )}
                                {agencyOverview?.id && (
                                    <div className="agency-info__group">
                                        <h5>Agency Profile Page</h5>
                                        <div className="more-info-note">Learn more about this Agency&#39;s spending</div>
                                        <div className="agency-info__website">
                                            <Link to={`/agency/${slug}`}>
                                                {agencyOverview.name}
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <AgencyDetailsContainer
                            agencyName={agencyOverview?.name}
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
        </PageWrapper>
    );
};

export default AgencyDetailsPage;
