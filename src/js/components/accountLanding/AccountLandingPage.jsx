/**
 * AccountLandingPage.jsx
 * Created by Lizzie Salita 8/4/17
 */

import React from 'react';
import { PageHeader } from 'data-transparency-ui';

import { accountLandingPageMetaTags } from 'helpers/metaTagHelper';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';


import Footer from 'containers/Footer';
import Header from 'containers/shared/HeaderContainer';

import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import AccountLandingContainer from 'containers/accountLanding/AccountLandingContainer';

const slug = 'federal_account';
const emailSubject = 'USAspending.gov Federal Account Profiles';

export default class AccountLandingPage extends React.Component {
    handleShare = (name) => {
        handleShareOptionClick(name, slug, {
            subject: emailSubject,
            body: `View all of the Federal Account Profiles on USAspending.gov: ${getBaseUrl(slug)}`
        });
    };
    render() {
        return (
            <div className="usa-da-account-landing">
                <MetaTags {...accountLandingPageMetaTags} />
                <Header />
                <PageHeader
                    title="Federal Account Profiles"
                    shareProps={{
                        url: getBaseUrl(slug),
                        onShareOptionClick: this.handleShare
                    }}>
                    <main
                        id="main-content"
                        className="main-content">
                        <AccountLandingContainer />
                    </main>
                    <Footer />
                </PageHeader>
            </div>
        );
    }
}
