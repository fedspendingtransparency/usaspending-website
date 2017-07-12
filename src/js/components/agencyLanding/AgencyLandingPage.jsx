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
                    <div className="agency-landing-content">
                        <div className="agency-landing-overview">
                            <h3>Find an Agency Profile.</h3>
                            <h6>Understand the current spending of agencies in our agency profiles.</h6>
                            <p>Sixty-six federal agencies report data to USAspending.gov. These include the
                                15 executive departments whose leaders sit on the President&#39;s Cabinet, as well
                                as small independent boards and commissions. They range in size from $700 billion
                                down to less than $200,000.</p>
                        </div>
                        <AgencyLandingContainer />
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}
