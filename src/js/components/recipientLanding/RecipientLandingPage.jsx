/**
 * RecipientLandingPage.jsx
 * Created by David Trinh 7/2/18
 */

import React from 'react';
import { PageHeader } from 'data-transparency-ui';

import { recipientLandingPageMetaTags } from 'helpers/metaTagHelper';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';


import Footer from 'containers/Footer';
import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'containers/shared/HeaderContainer';

import RecipientLandingContainer from 'containers/recipientLanding/RecipientLandingContainer';

require('pages/recipientLanding/recipientLandingPage.scss');

const slug = 'recipient';
const emailSubject = 'USAspending.gov Recipient Profiles';

export default class RecipientLandingPage extends React.Component {
    handleShare = (name) => {
        handleShareOptionClick(name, slug, { subject: emailSubject });
    };

    render() {
        return (
            <div className="usa-da-recipient-landing">
                <MetaTags {...recipientLandingPageMetaTags} />
                <Header />
                <PageHeader
                    title="Recipient Profiles"
                    shareProps={{
                        url: getBaseUrl(slug),
                        onShareOptionClick: this.handleShare
                    }}>
                    <main id="main-content" className="main-content">
                        <RecipientLandingContainer />
                    </main>
                    <Footer />
                </PageHeader>
            </div>
        );
    }
}

