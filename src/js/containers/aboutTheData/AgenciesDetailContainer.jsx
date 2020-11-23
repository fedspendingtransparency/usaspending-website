import React, { useEffect, useState } from 'react';
import { useParams, withRouter, Link } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import PropTypes from 'prop-types';


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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AboutTheDataModal from "components/aboutTheData/AboutTheDataModal";
import { modalTitles, modalClassNames } from 'dataMapping/aboutTheData/modals';

require('pages/aboutTheData/agenciesDetailPage.scss');

const message = 'Data in this table will be updated whenever the underlying data submissions change or new submissions are added.';

const propTypes = {
    agency: PropTypes.object,
    agencyId: PropTypes.string
};

export const AgenciesDetailContainer = (props) => {
    const { agencyId } = useParams();
    const [showModal, setShowModal] = useState('');
    const dispatch = useDispatch();

    const onClick = (e) => {
        e.persist();
        if (e?.target) {
            dispatch(showModal(e.target.parentNode.getAttribute('data-href') || e.target.getAttribute('data-href') || e.target.value));
        }
    };

    // Modal Logic
    const modalClick = (e) => {
        e.preventDefault();
        setShowModal(e.target.value);
    };
    const closeModal = () => setShowModal('');

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
                    {/* TODO - Modal Buttons - DELETE THIS CODE */}
                    <button value="publicationDates" onClick={modalClick}>Publication Dates</button>
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
                    <Note message={message} />
                </div>
                <AboutTheDataModal
                    mounted={!!showModal.length}
                    type={showModal}
                    className={modalClassNames[showModal]}
                    title={modalTitles[showModal]}
                    agencyName={props.agency.overview.name}
                    fiscalYear={2020}
                    fiscalPeriod={8}
                    closeModal={closeModal} />
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
