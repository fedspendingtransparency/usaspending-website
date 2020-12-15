/**
 * AgencyDetailsPage.jsx
 */

import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoadingMessage, ErrorMessage } from 'data-transparency-ui';

import { agencyPageMetaTags } from 'helpers/metaTagHelper';
import { mockFetchAgencyOverview } from 'helpers/agencyV2Helper';

import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'containers/shared/HeaderContainer';
import Footer from 'containers/Footer';
import StickyHeader from 'components/sharedComponents/stickyHeader/StickyHeader';
import Note from 'components/sharedComponents/Note';
import AgencyDetailsContainer from 'containers/aboutTheData/AgencyDetailsContainer';
import { modalTitles, modalClassNames } from 'dataMapping/aboutTheData/modals';
import BaseAgencyOverview from 'models/v2/agencyV2/BaseAgencyOverview';
import ExternalLink from 'components/sharedComponents/ExternalLink';
import AboutTheDataModal from './AboutTheDataModal';

require('pages/aboutTheData/agencyDetailsPage.scss');

const message = 'All numeric figures in this table are calculated based on the set of TAS owned by each agency, as opposed to the set of TAS that the agency directly reported to USAspending.gov. In the vast majority of cases, these are exactly the same (upwards of 95% of TAS—with these TAS representing over 99% of spending—are submitted and owned by the same agency). This display decision is consistent with our practice throughout the website of grouping TAS by the owning agency rather than the reporting agency. While reporting agencies are not identified in this table, they are available in the Custom Account Download in the reporting_agency_name field.';

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

    useEffect(() => {
        const getOverviewData = async () => {
            // TODO - replace mock API request
            overviewRequest.current = mockFetchAgencyOverview(agencyCode);
            try {
                const { data } = await overviewRequest.current.promise;
                const agency = Object.create(BaseAgencyOverview);
                agency.populate(data);
                setAgencyOverview(agency);
                setLoading(false);
            }
            catch (err) {
                console.error(err);
                setErrorMessage(err.message);
                setLoading(false);
                setError(true);
            }
        };
        getOverviewData();
        overviewRequest.current = null;
        return () => {
            if (overviewRequest.current) {
                overviewRequest.cancel();
            }
        };
    }, [agencyCode]);

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
                {loading && <LoadingMessage />}
                {error && <ErrorMessage description={errorMessage} />}
                {(!loading && !error) && (
                    <>
                        <div className="heading-container">
                            <div className="back-link">
                                <a href="/about-the-data/agencies"><FontAwesomeIcon icon="angle-left" />&nbsp;Back to All Agencies</a>
                            </div>
                            <h2 className="header">{agencyOverview.name}</h2>
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
                        <AgencyDetailsContainer agencyName={agencyOverview.name} modalClick={modalClick} agencyCode={agencyCode} />
                        <Note message={message} />
                    </>
                )}
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

export default AgencyDetailsPage;
