/**
 * RecipientLandingPage.jsx
 * Created by David Trinh 7/2/18
 */

import React from 'react';

import { recipientLandingPageMetaTags } from 'helpers/metaTagHelper';
import { getBaseUrl } from 'helpers/socialShare';

import Footer from 'containers/Footer';
import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import ShareIcon from 'components/sharedComponents/stickyHeader/ShareIcon';
import Header from 'components/sharedComponents/header/Header';
import StickyHeader from 'components/sharedComponents/stickyHeader/StickyHeader';

import RecipientLandingContainer from 'containers/recipientLanding/RecipientLandingContainer';

require('pages/recipientLanding/recipientLandingPage.scss');

const slug = 'recipient';
const emailSubject = 'USAspending.gov Recipient Profiles';

export default class RecipientLandingPage extends React.Component {
    render() {
        return (
            <div className="usa-da-recipient-landing">
                <MetaTags {...recipientLandingPageMetaTags} />
                <Header />
                <StickyHeader>
                    <div className="sticky-header__title">
                        <h1 tabIndex={-1} id="main-focus">
                           Recipient Profiles
                        </h1>
                    </div>
                    <div className="sticky-header__toolbar">
                        <ShareIcon
                            slug={slug}
                            email={{
                                subject: emailSubject,
                                body: `View all of the Recipient Profiles on USAspending.gov: ${getBaseUrl(slug)}`
                            }} />
                    </div>
                </StickyHeader>
                <main
                    id="main-content"
                    className="main-content">
                    <RecipientLandingContainer />
                </main>
                <Footer />
            </div>
        );
    }
}

