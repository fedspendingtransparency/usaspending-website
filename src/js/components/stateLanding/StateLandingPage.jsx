/**
 * StateLanding.jsx
 * Created by Kevin Li 5/23/18
 */

import React from 'react';
import { PageHeader } from 'data-transparency-ui';

import { stateLandingPageMetaTags } from 'helpers/metaTagHelper';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';


import Footer from 'containers/Footer';
import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'containers/shared/HeaderContainer';

import StateLandingContainer from 'containers/stateLanding/StateLandingContainer';

require('pages/stateLanding/stateLandingPage.scss');

const slug = 'state';
const emailSubject = 'USAspending.gov State Profiles';

export default class StateLandingPage extends React.Component {
    handleShare = (name) => {
        handleShareOptionClick(name, slug, {
            subject: emailSubject,
            body: `View all of the State Profiles on USAspending.gov: ${getBaseUrl(slug)}`
        });
    };

    render() {
        return (
            <div className="usa-da-state-landing">
                <MetaTags {...stateLandingPageMetaTags} />
                <Header />
                <PageHeader
                    title="State Profiles"
                    shareProps={{
                        url: getBaseUrl(slug),
                        onShareOptionClick: this.handleShare
                    }}>
                    <main
                        id="main-content"
                        className="main-content">
                        <div className="landing-page">
                            <div className="landing-page__overview">
                                <h2
                                    className="landing-page__title">
                                    Find a State Profile.
                                </h2>
                                <div className="landing-page__description">
                                    Find insights into the awards that fall within a particular U.S. state or territory with the tools and data breakdowns found in our State Profile pages.
                                </div>
                            </div>
                            <StateLandingContainer />
                        </div>
                    </main>
                    <Footer />
                </PageHeader>
            </div>
        );
    }
}
