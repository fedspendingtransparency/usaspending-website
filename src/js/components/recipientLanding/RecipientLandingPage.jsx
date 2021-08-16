/**
 * RecipientLandingPage.jsx
 * Created by David Trinh 7/2/18
 */

import React from 'react';
import { ShareIcon } from 'data-transparency-ui';

import { recipientLandingPageMetaTags } from 'helpers/metaTagHelper';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';

import RecipientLandingContainer from 'containers/recipientLanding/RecipientLandingContainer';
import PageWrapper from 'components/sharedComponents/PageWrapper';

require('pages/recipientLanding/recipientLandingPage.scss');

const slug = 'recipient';
const emailSubject = 'USAspending.gov Recipient Profiles';

export default class RecipientLandingPage extends React.Component {
    handleShare = (name) => {
        handleShareOptionClick(name, slug, {
            subject: emailSubject,
            body: `View all of the Recipient Profiles on USAspending.gov: ${getBaseUrl(slug)}`
        });
    };

    render() {
        return (
            <PageWrapper
                pageName="Recipient Profiles"
                classNames="usa-da-recipient-landing"
                title="Recipient Profiles"
                metaTagProps={recipientLandingPageMetaTags}
                toolBarComponents={[
                    <ShareIcon
                        onShareOptionClick={this.handleShare}
                        url={getBaseUrl(slug)} />
                ]}>
                <main id="main-content" className="main-content">
                    <RecipientLandingContainer />
                </main>
            </PageWrapper>
        );
    }
}

