/**
 * AgencyLandingPage.jsx
 * Created by Lizzie Salita 7/7/17
 */

import React from 'react';
import { PageHeader } from 'data-transparency-ui';

import { agencyLandingPageMetaTags } from 'helpers/metaTagHelper';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';


import Footer from 'containers/Footer';
import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'containers/shared/HeaderContainer';

import AgencyLandingContainer from 'containers/agencyLanding/AgencyLandingContainer';

require('pages/agencyLanding/agencyLandingPage.scss');

const emailSubject = 'USAspending.gov Agency Profiles';

export default class AgencyLandingPage extends React.Component {
    handleShare = (name) => {
        handleShareOptionClick(name, 'agency', {
            subject: emailSubject
        });
    };

    render() {
        return (
            <div className="usa-da-agency-landing">
                <MetaTags {...agencyLandingPageMetaTags} />
                <Header />
                <PageHeader
                    title="Agency Profiles"
                    shareProps={{
                        url: getBaseUrl('agency'),
                        onShareOptionClick: this.handleShare
                    }}>
                    <main
                        id="main-content"
                        className="main-content">
                        <AgencyLandingContainer />
                    </main>
                    <Footer />
                </PageHeader>
            </div>
        );
    }
}
