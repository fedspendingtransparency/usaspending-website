/**
 * RecipientLandingPage.jsx
 * Created by David Trinh 7/2/18
 */

import React from 'react';

import { recipientLandingPageMetaTags } from 'helpers/metaTagHelper';

import Footer from 'containers/Footer';
import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'components/sharedComponents/header/Header';
import StickyHeader from 'components/sharedComponents/stickyHeader/StickyHeader';

import RecipientLandingContainer from 'containers/recipientLanding/RecipientLandingContainer';

require('pages/recipientLanding/recipientLandingPage.scss');

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

