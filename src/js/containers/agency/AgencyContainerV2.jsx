/**
 * AgencyPage.jsx
 * Created by Maxwell Kendall 01/31/2020
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { agencyPageMetaTags } from 'helpers/metaTagHelper';

import { setAgencyOverview, resetAgency } from "../../redux/actions/agency/agencyActions";

import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'components/sharedComponents/header/Header';
import StickyHeader from 'components/sharedComponents/stickyHeader/StickyHeader';
import Footer from 'components/sharedComponents/Footer';
import { LoadingWrapper } from 'components/sharedComponents/Loading';

require('pages/agency/v2/index.scss');

const AgencyProfileV2 = ({
    agencyOverview,
    agencyId,
    resetAgency,
    setAgencyOverview
}) => {
    return (
        <div className="usa-da-agency-page">
            <MetaTags {...agencyPageMetaTags} />
            <Header />
            <StickyHeader>
                <div className="sticky-header__title">
                    <h1 tabIndex={-1} id="main-focus">
                        Agency Profile
                    </h1>
                </div>
            </StickyHeader>
            <LoadingWrapper>
                <main id="main-content" className="main-content">
                    YOOOO
                </main>
            </LoadingWrapper>
            <Footer />
        </div>
    );
};

const mapStateToProps = (state) => ({
    agencyOverview: state.agency.overview,
    agencyId: state.agency.id
});

const mapDispatchToProps = (dispatch) => ({
    resetAgency: () => dispatch(resetAgency()),
    setAgencyOverview: (agency) => dispatch(setAgencyOverview(agency))
});

export default connect(mapStateToProps, mapDispatchToProps)(AgencyProfileV2);

// export default AgencyProfileV2;

