/**
 * AccountLandingPage.jsx
 * Created by Lizzie Salita 8/4/17
 */

import React from 'react';

import { accountLandingPageMetaTags } from 'helpers/metaTagHelper';

import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'components/sharedComponents/header/Header';
import Footer from 'components/sharedComponents/Footer';
import AccountLandingContainer from 'containers/accountLanding/AccountLandingContainer';
import AccountLandingHeader from './header/AccountLandingHeader';

export default class AccountLandingPage extends React.Component {
    render() {
        return (
            <div className="usa-da-account-landing">
                <MetaTags {...accountLandingPageMetaTags} />
                <Header />
                <AccountLandingHeader />
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
