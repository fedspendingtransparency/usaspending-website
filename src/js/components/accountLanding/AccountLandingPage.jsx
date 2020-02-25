/**
 * AccountLandingPage.jsx
 * Created by Lizzie Salita 8/4/17
 */

import React from 'react';

import { accountLandingPageMetaTags } from 'helpers/metaTagHelper';
import Footer from 'containers/Footer';

import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import StickyHeader from 'components/sharedComponents/stickyHeader/StickyHeader';
import Header from 'components/sharedComponents/header/Header';
import AccountLandingContainer from 'containers/accountLanding/AccountLandingContainer';

export default class AccountLandingPage extends React.Component {
    render() {
        return (
            <div className="usa-da-account-landing">
                <MetaTags {...accountLandingPageMetaTags} />
                <Header />
                <StickyHeader>
                    <div className="sticky-header__title">
                        <h1 tabIndex={-1} id="main-focus">
                            Federal Account Profiles
                        </h1>
                    </div>
                </StickyHeader>
                <main
                    id="main-content"
                    className="main-content">
                    <AccountLandingContainer />
                </main>
                <Footer />
            </div>
        );
    }
}
