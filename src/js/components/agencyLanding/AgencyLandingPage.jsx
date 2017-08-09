/**
 * AgencyLandingPage.jsx
 * Created by Lizzie Salita 7/7/17
 */

import React from 'react';

import { agencyLandingPageMetaTags } from 'helpers/metaTagHelper';

import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'components/sharedComponents/header/Header';
import Footer from 'components/sharedComponents/Footer';
import AgencyLandingContainer from 'containers/agencyLanding/AgencyLandingContainer';
import AgencyLandingHeader from './header/AgencyLandingHeader';

export default class AgencyLandingPage extends React.Component {
    render() {
        return (
            <div className="usa-da-agency-landing">
                <MetaTags {...agencyLandingPageMetaTags} />
                <Header />
                <AgencyLandingHeader />
                <main
                    id="main-content"
                    className="main-content">
                    <AgencyLandingContainer />
                </main>
                <Footer />
            </div>
        );
    }
}
