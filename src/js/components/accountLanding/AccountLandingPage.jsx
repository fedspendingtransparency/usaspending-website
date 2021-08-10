/**
 * AccountLandingPage.jsx
 * Created by Lizzie Salita 8/4/17
 */

import React from 'react';
import { ShareIcon } from 'data-transparency-ui';

import { accountLandingPageMetaTags } from 'helpers/metaTagHelper';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';

import PageWrapper from 'components/sharedComponents/PageWrapper';
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
            <PageWrapper
                pageName="Federal Account Profiles"
                classNames="usa-da-account-landing"
                title="Federal Account Profiles"
                metaTagProps={accountLandingPageMetaTags}
                toolBarComponents={[
                    <ShareIcon
                        onShareOptionClick={this.handleShare}
                        url={getBaseUrl(slug)} />
                ]}>
                <main
                    id="main-content"
                    className="main-content">
                    <AccountLandingContainer />
                </main>
            </PageWrapper>
        );
    }
}
