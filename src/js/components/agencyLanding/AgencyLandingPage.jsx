/**
 * AgencyLandingPage.jsx
 * Created by Lizzie Salita 7/7/17
 */

import React from 'react';
import { ShareIcon } from 'data-transparency-ui';

import { agencyLandingPageMetaTags } from 'helpers/metaTagHelper';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';

import PageWrapper from 'components/sharedComponents/PageWrapper';

import AgencyLandingContainer from 'containers/agencyLanding/AgencyLandingContainer';

require('pages/agencyLanding/agencyLandingPage.scss');

const emailSubject = 'USAspending.gov Agency Profiles';

export default class AgencyLandingPage extends React.Component {
    handleShare = (name) => {
        handleShareOptionClick(name, 'agency', {
            subject: emailSubject,
            body: `View all of the Agency Profiles on USAspending.gov: ${getBaseUrl('agency')}`
        });
    };

    render() {
        return (
            <PageWrapper
                pageName="Agency Profiles"
                classNames="usa-da-agency-landing"
                title="Agency Profiles"
                metaTagProps={agencyLandingPageMetaTags}
                toolBarComponents={[
                    <ShareIcon
                        onShareOptionClick={this.handleShare}
                        url={getBaseUrl('agency')} />
                ]}>
                <main
                    id="main-content"
                    className="main-content">
                    <AgencyLandingContainer />
                </main>
            </PageWrapper>
        );
    }
}
