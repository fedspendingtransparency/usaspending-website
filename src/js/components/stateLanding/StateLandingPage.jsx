/**
 * StateLanding.jsx
 * Created by Kevin Li 5/23/18
 */

import React from 'react';
import { ShareIcon } from 'data-transparency-ui';

import PageWrapper from 'components/sharedComponents/PageWrapper';
import { stateLandingPageMetaTags } from 'helpers/metaTagHelper';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';

import StateLandingContainer from 'containers/stateLanding/StateLandingContainer';

require('pages/stateLanding/stateLandingPage.scss');

const slug = 'state';
const emailSubject = 'USAspending.gov State Profiles';

const StateLandingPage = () => {
    const handleShare = (name) => {
        handleShareOptionClick(name, slug, {
            subject: emailSubject,
            body: `View all of the State Profiles on USAspending.gov: ${getBaseUrl(slug)}`
        });
    };

    return (
        <PageWrapper
            pageName="State Profiles"
            classNames="usa-da-state-landing"
            title="State Profiles"
            metaTagProps={stateLandingPageMetaTags}
            toolBarComponents={[
                <ShareIcon
                    onShareOptionClick={handleShare}
                    url={getBaseUrl(slug)} />
            ]}>
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
        </PageWrapper>
    );
};

export default StateLandingPage;
