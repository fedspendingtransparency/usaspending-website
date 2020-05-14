/**
 * AgencyLandingPage.jsx
 * Created by Lizzie Salita 7/7/17
 */

import React from 'react';

import { agencyLandingPageMetaTags } from 'helpers/metaTagHelper';
import { getBaseUrl } from 'helpers/socialShare';

import Footer from 'containers/Footer';
import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'components/sharedComponents/header/Header';
import StickyHeader from 'components/sharedComponents/stickyHeader/StickyHeader';
import ShareIcon from 'components/sharedComponents/stickyHeader/ShareIcon';

import AgencyLandingContainer from 'containers/agencyLanding/AgencyLandingContainer';

require('pages/agencyLanding/agencyLandingPage.scss');

const slug = 'agency';
const emailSubject = 'USAspending.gov Agency Profiles';

export default class AgencyLandingPage extends React.Component {
    render() {
        return (
            <div className="usa-da-agency-landing">
                <MetaTags {...agencyLandingPageMetaTags} />
                <Header />
                <StickyHeader>
                    <div className="sticky-header__title">
                        <h1 tabIndex={-1} id="main-focus">
                            Agency Profiles
                        </h1>
                    </div>
                    <div className="sticky-header__toolbar">
                        <ShareIcon
                            slug={slug}
                            email={{
                                subject: emailSubject,
                                body: `Search for different Federal Agencies on USAspending.gov: ${getBaseUrl(slug)}`
                            }} />
                    </div>
                </StickyHeader>
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
